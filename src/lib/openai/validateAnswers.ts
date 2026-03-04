import { z } from 'zod';
import { Warning } from '@/types/aitest.types';

// ──────────────────────────────────────────────────────
// Input schema
// ──────────────────────────────────────────────────────
const AnswersSchema = z.tuple([
  z.string(), // [0] 대상
  z.string(), // [1] 성별
  z.string(), // [2] 연령
  z.string(), // [3] 용도
  z.string(), // [4] 가격
  z.string(), // [5] 스타일/의도
]);

type Answers = z.infer<typeof AnswersSchema>;

// ──────────────────────────────────────────────────────
// Utility functions
// ──────────────────────────────────────────────────────
function normalize(s: string) {
  return (s ?? '').toString().trim().toLowerCase();
}

function extractAgeNumber(ageText: string): number | null {
  const m = normalize(ageText).match(/(\d{1,3})\s*(살|세)?/);
  if (!m) return null;
  const n = Number(m[1]);
  return Number.isFinite(n) ? n : null;
}

function hasAny(text: string, keywords: string[]) {
  return keywords.some((k) => text.includes(k));
}

function parsePriceRange(priceText: string): {
  min: number | null;
  max: number | null;
} {
  const t = normalize(priceText).replace(/\s/g, '');

  // "n만원이하" 또는 "만원이하"(= 1만원 이하)
  const underMan = t.match(/(\d*)만원이하/);
  if (underMan) {
    const n = underMan[1] ? Number(underMan[1]) : 1;
    if (Number.isFinite(n)) return { min: 0, max: n * 10000 };
  }

  const manDae = t.match(/(\d+)만원대/);
  if (manDae) {
    const n = Number(manDae[1]);
    if (Number.isFinite(n)) return { min: n * 10000, max: n * 10000 + 9999 };
  }

  const rangeMan = t.match(/(\d+)~(\d+)만원/);
  if (rangeMan) {
    const a = Number(rangeMan[1]);
    const b = Number(rangeMan[2]);
    if (Number.isFinite(a) && Number.isFinite(b))
      return { min: a * 10000, max: b * 10000 };
  }

  const singleMan = t.match(/(\d+)만원(?!대)/);
  if (singleMan) {
    const n = Number(singleMan[1]);
    if (Number.isFinite(n)) return { min: n * 10000, max: n * 10000 };
  }

  const onlyNum = t.match(/^(\d{4,9})$/);
  if (onlyNum) {
    const n = Number(onlyNum[1]);
    if (Number.isFinite(n)) return { min: n, max: n };
  }

  return { min: null, max: null };
}

// ──────────────────────────────────────────────────────
// Keyword sets
// ──────────────────────────────────────────────────────
const ELDER_HINTS = [
  '부모',
  '부모님',
  '엄마',
  '아빠',
  '어머니',
  '아버지',
  '할머니',
  '할아버지',
  '어르신',
  '어른',
  '친구부모',
  '친구부모님',
  '지인부모',
  '지인부모님',
  '친구의부모',
  '친구의부모님',
  '선생님',
  '교수님',
  '강사',
  '튜터',
  '코치',
];

const YOUNG_HINTS = [
  '유아',
  '어린이',
  '초등',
  '10대',
  '십대',
  '중학생',
  '고등학생',
];
const ADULT_AGE_HINTS = ['20대', '30대', '40대', '50대', '60대', '70대'];
const VAGUE_AGE_HINTS = [
  '모르',
  '미정',
  '상관없',
  '아무나',
  '어른',
  '성인',
  '대충',
];
const MARRIAGE_HINTS = ['결혼', '신혼', '집들이'];
const CHILD_OCCASION_HINTS = ['어린이날', '어린이', '돌잔치', '돌'];
const LIGHT_HINTS = ['가벼운', '부담없는', '부담 없는', '간단한', '소소한'];
const NON_CHILD_TARGET_HINTS = [
  '선생님',
  '교수님',
  '강사',
  '코치',
  '동료',
  '팀장',
  '상사',
  '사장님',
  '거래처',
  '고객',
  '대표',
  ...ELDER_HINTS,
];

// ──────────────────────────────────────────────────────
// Context
// ──────────────────────────────────────────────────────
type ParsedContext = {
  raw: Answers;
  hasElderTarget: boolean;
  isYoung: boolean;
  isAdult: boolean;
  isAgeVague: boolean;
  isMarriageOccasion: boolean;
  isChildOccasion: boolean;
  isNonChildTarget: boolean;
  isVeryLowPrice: boolean;
  isVeryHighPrice: boolean;
  isLightIntent: boolean;
  isPriceVerySpecific: boolean;
};

function buildContext(raw: Answers): ParsedContext {
  const [target, , ageRaw, occasion, priceRaw, intent] = raw;
  const a1 = normalize(target);
  const a2 = normalize(ageRaw);
  const a3 = normalize(occasion);
  const a4 = normalize(priceRaw);
  const a5 = normalize(intent);

  const ageNum = extractAgeNumber(ageRaw);
  const { min, max } = parsePriceRange(priceRaw);
  const priceNorm = normalize(priceRaw).replace(/\s/g, '');

  return {
    raw,
    hasElderTarget: hasAny(a1, ELDER_HINTS),
    isYoung: hasAny(a2, YOUNG_HINTS) || (ageNum !== null && ageNum <= 19),
    isAdult: hasAny(a2, ADULT_AGE_HINTS) || (ageNum !== null && ageNum >= 20),
    isAgeVague:
      a2.length === 0 ||
      hasAny(a2, VAGUE_AGE_HINTS) ||
      (ageNum === null && !hasAny(a2, YOUNG_HINTS)),
    isMarriageOccasion: hasAny(a3, MARRIAGE_HINTS),
    isChildOccasion: hasAny(a3, CHILD_OCCASION_HINTS),
    isNonChildTarget: hasAny(a1, NON_CHILD_TARGET_HINTS),
    isVeryLowPrice:
      hasAny(a4, ['1만원', '일만원', '1만', '10000']) ||
      (min !== null && max !== null && max <= 19999),
    isVeryHighPrice:
      (min !== null && min >= 200000) || (max !== null && max >= 200000),
    isLightIntent: hasAny(a5, LIGHT_HINTS),
    isPriceVerySpecific:
      /^\d{4,9}$/.test(priceNorm) ||
      /(\d{1,3}),?\d{3}\s*원/.test(priceRaw) ||
      /(\d+)~(\d+)만원/.test(priceNorm),
  };
}

// ──────────────────────────────────────────────────────
// Validation rules
// ──────────────────────────────────────────────────────
type Rule = {
  test: (ctx: ParsedContext) => boolean;
  warning: (raw: Answers) => Warning;
};

const RULES: Rule[] = [
  {
    test: ({ hasElderTarget, isYoung }) => hasElderTarget && isYoung,
    warning: (raw) => ({
      level: 'hard',
      title:
        '선물 대상과 연령대가 서로 맞지 않아 보여요. 테스트를 다시 진행해주세요.',
      detail: `1번 답변은 "${raw[0]}"인데, 3번 답변은 "${raw[2]}"로 입력됐어요.`,
    }),
  },
  {
    test: ({ isYoung, isMarriageOccasion }) => isYoung && isMarriageOccasion,
    warning: (raw) => ({
      level: 'hard',
      title:
        '연령대와 선물 목적이 서로 맞지 않아 보여요. 테스트를 다시 진행해주세요.',
      detail: `3번 답변은 "${raw[2]}"인데, 4번 답변은 "${raw[3]}"로 입력됐어요.`,
    }),
  },
  {
    test: ({ isMarriageOccasion, isVeryLowPrice }) =>
      isMarriageOccasion && isVeryLowPrice,
    warning: (raw) => ({
      level: 'hard',
      title:
        '결혼·신혼/집들이 선물로는 가격대가 너무 낮아 보여요. 테스트를 다시 진행해주세요.',
      detail: `4번 답변은 "${raw[3]}"인데, 5번 가격대가 "${raw[4]}"로 입력됐어요.`,
    }),
  },
  {
    test: ({ isVeryHighPrice, isLightIntent }) =>
      isVeryHighPrice && isLightIntent,
    warning: (raw) => ({
      level: 'soft',
      title:
        '가벼운 선물 의도와 가격대가 서로 어긋나는 것 같아요. 테스트를 다시 진행해주세요.',
      detail: `6번 답변은 "${raw[5]}"인데, 5번 가격대가 "${raw[4]}"로 입력됐어요.`,
    }),
  },
  {
    test: ({ isChildOccasion, isAdult }) => isChildOccasion && isAdult,
    warning: (raw) => ({
      level: 'hard',
      title:
        '선물 목적과 연령대가 서로 맞지 않아 보여요. 테스트를 다시 진행해주세요.',
      detail: `3번 답변은 "${raw[2]}"인데, 4번 답변은 "${raw[3]}"로 입력됐어요.`,
    }),
  },
  {
    test: ({ isNonChildTarget, isChildOccasion }) =>
      isNonChildTarget && isChildOccasion,
    warning: (raw) => ({
      level: 'hard',
      title:
        '선물 대상과 목적이 서로 맞지 않아 보여요. 테스트를 다시 진행해주세요.',
      detail: `1번 답변은 "${raw[0]}"인데, 4번 답변은 "${raw[3]}"로 입력됐어요.`,
    }),
  },
  {
    test: ({ isAgeVague, isPriceVerySpecific }) =>
      isAgeVague && isPriceVerySpecific,
    warning: (raw) => ({
      level: 'soft',
      title:
        '연령대는 모호한데 가격대만 너무 구체적이에요. 테스트를 다시 진행해주세요.',
      detail: `3번 답변은 "${raw[2]}"인데, 5번 가격대가 "${raw[4]}"로 입력됐어요.`,
    }),
  },
];

// ──────────────────────────────────────────────────────
// Public API
// ──────────────────────────────────────────────────────
export function validateAnswers(answerValues: string[]): Warning[] {
  const parsed = AnswersSchema.safeParse(answerValues);
  if (!parsed.success) return [];

  const ctx = buildContext(parsed.data);
  return RULES.filter((rule) => rule.test(ctx)).map((rule) =>
    rule.warning(ctx.raw),
  );
}
