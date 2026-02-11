import { Warning } from '@/types/aitest.types';

function normalize(s: string) {
  return (s ?? '').toString().trim().toLowerCase();
}

function extractAgeNumber(ageText: string): number | null {
  const t = normalize(ageText);
  const m = t.match(/(\d{1,3})\s*(살|세)?/);
  if (!m) return null;
  const n = Number(m[1]);
  if (!Number.isFinite(n)) return null;
  return n;
}

function hasAny(text: string, keywords: string[]) {
  return keywords.some((k) => text.includes(k));
}

function parsePriceRange(priceText: string): {
  min: number | null;
  max: number | null;
  isSpecific: boolean;
} {
  const t = normalize(priceText).replace(/\s/g, '');

  if (t.includes('만원이하')) {
    return { min: 0, max: 10000, isSpecific: false };
  }

  const manDae = t.match(/(\d+)만원대/);
  if (manDae) {
    const n = Number(manDae[1]);
    if (Number.isFinite(n)) {
      const min = n * 10000;
      const max = n * 10000 + 9999;
      return { min, max, isSpecific: true };
    }
  }

  const rangeMan = t.match(/(\d+)~(\d+)만원/);
  if (rangeMan) {
    const a = Number(rangeMan[1]);
    const b = Number(rangeMan[2]);
    if (Number.isFinite(a) && Number.isFinite(b)) {
      return { min: a * 10000, max: b * 10000, isSpecific: true };
    }
  }

  const singleMan = t.match(/(\d+)만원(?!대)/);
  if (singleMan) {
    const n = Number(singleMan[1]);
    if (Number.isFinite(n)) {
      return { min: n * 10000, max: n * 10000, isSpecific: true };
    }
  }

  const onlyNum = t.match(/^(\d{4,9})$/);
  if (onlyNum) {
    const n = Number(onlyNum[1]);
    if (Number.isFinite(n)) {
      return { min: n, max: n, isSpecific: true };
    }
  }

  return { min: null, max: null, isSpecific: false };
}

export function validateAnswers(answerValues: string[]): Warning[] {
  const a1 = normalize(answerValues[0] ?? ''); // 대상
  // answerValues[1]은 성별 → 검증 불필요
  const a2Raw = answerValues[2] ?? ''; // 연령
  const a2 = normalize(a2Raw);
  const a3 = normalize(answerValues[3] ?? ''); // 용도
  const a4Raw = answerValues[4] ?? ''; // 가격
  const a4 = normalize(a4Raw);
  const a5 = normalize(answerValues[5] ?? ''); // 스타일/의도

  const warnings: Warning[] = [];

  // 공통 키워드
  const elderHints = [
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
  ].map((k) => k.toLowerCase());

  const youngHints = [
    '유아',
    '어린이',
    '초등',
    '10대',
    '십대',
    '중학생',
    '고등학생',
  ].map((k) => k.toLowerCase());

  const marriageHints = ['결혼', '신혼', '집들이'].map((k) => k.toLowerCase());

  const lightHints = [
    '가벼운',
    '부담없는',
    '부담 없는',
    '간단한',
    '소소한',
  ].map((k) => k.toLowerCase());

  const childOccasionHints = ['어린이날', '어린이', '돌잔치', '돌'].map((k) =>
    k.toLowerCase(),
  );

  // 연령 판정
  const ageNum = extractAgeNumber(a2Raw);
  const isYoungByKeyword = hasAny(a2, youngHints);
  const isYoungByNumber = ageNum !== null && ageNum <= 19;
  const isYoung = isYoungByKeyword || isYoungByNumber;

  // 성인 연령 판정
  const adultAgeHints = ['20대', '30대', '40대', '50대', '60대', '70대'].map(
    (k) => k.toLowerCase(),
  );
  const isAdultByKeyword = hasAny(a2, adultAgeHints);
  const isAdultByNumber = ageNum !== null && ageNum >= 20;
  const isAdult = isAdultByKeyword || isAdultByNumber;

  // 연령이 모호/누락인지
  const vagueAgeHints = [
    '모르',
    '미정',
    '상관없',
    '아무나',
    '어른',
    '성인',
    '대충',
  ].map((k) => k.toLowerCase());

  const isAgeVague =
    a2.length === 0 ||
    hasAny(a2, vagueAgeHints) ||
    (ageNum === null && !isYoungByKeyword);

  const hasElderTarget = hasAny(a1, elderHints);
  const isMarriageOccasion = hasAny(a3, marriageHints);
  const isChildOccasion = hasAny(a3, childOccasionHints);

  // 비어린이 대상 판정
  const nonChildTargetHints = [
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
    ...elderHints,
  ].map((k) => k.toLowerCase());

  const isNonChildTarget = hasAny(a1, nonChildTargetHints);

  const price = parsePriceRange(a4Raw);
  const min = price.min;
  const max = price.max;

  const isVeryLowPrice =
    hasAny(a4, ['만원이하', '1만원', '일만원', '1만', '10000']) ||
    (min !== null && max !== null && max <= 19999);

  const isVeryHighPrice =
    (min !== null && min >= 200000) ||
    (max !== null && max >= 200000) ||
    hasAny(a4, ['20만원', '30만원', '50만원', '100만원']);

  const isLightIntent = hasAny(a5, lightHints);

  const isPriceVerySpecific =
    /^\d{4,9}$/.test(normalize(a4Raw).replace(/\s/g, '')) ||
    /(\d{1,3}),?\d{3}\s*원/.test(a4Raw) ||
    /(\d+)~(\d+)만원/.test(normalize(a4Raw).replace(/\s/g, ''));

  // 1) 연장자 대상 × 낮은 연령
  if (hasElderTarget && isYoung) {
    warnings.push({
      level: 'hard',
      title:
        '선물 대상과 연령대가 서로 맞지 않아 보여요. 테스트를 다시 진행해주세요.',
      detail: `1번 답변은 "${answerValues[0] ?? ''}"인데, 3번 답변은 "${answerValues[2] ?? ''}"로 입력됐어요.`,
    });
  }

  // 2) 낮은 연령 × 결혼·신혼 목적
  if (isYoung && isMarriageOccasion) {
    warnings.push({
      level: 'hard',
      title:
        '연령대와 선물 목적이 서로 맞지 않아 보여요. 테스트를 다시 진행해주세요.',
      detail: `3번 답변은 "${answerValues[2] ?? ''}"인데, 4번 답변은 "${answerValues[3] ?? ''}"로 입력됐어요.`,
    });
  }

  // 3) 아주 낮은 가격대 × 결혼/신혼
  if (isMarriageOccasion && isVeryLowPrice) {
    warnings.push({
      level: 'hard',
      title:
        '결혼·신혼/집들이 선물로는 가격대가 너무 낮아 보여요. 테스트를 다시 진행해주세요.',
      detail: `4번 답변은 "${answerValues[3] ?? ''}"인데, 5번 가격대가 "${answerValues[4] ?? ''}"로 입력됐어요.`,
    });
  }

  // 4) 아주 높은 가격대 × 가벼운 선물 의도
  if (isVeryHighPrice && isLightIntent) {
    warnings.push({
      level: 'soft',
      title:
        '가벼운 선물 의도와 가격대가 서로 어긋나는 것 같아요. 테스트를 다시 진행해주세요.',
      detail: `6번 답변은 "${answerValues[5] ?? ''}"인데, 5번 가격대가 "${answerValues[4] ?? ''}"로 입력됐어요.`,
    });
  }

  // 5) 어린이 관련 용도 × 성인 연령
  if (isChildOccasion && isAdult) {
    warnings.push({
      level: 'hard',
      title:
        '선물 목적과 연령대가 서로 맞지 않아 보여요. 테스트를 다시 진행해주세요.',
      detail: `3번 답변은 "${answerValues[2] ?? ''}"인데, 4번 답변은 "${answerValues[3] ?? ''}"로 입력됐어요.`,
    });
  }

  // 6) 비어린이 대상 × 어린이 관련 용도
  if (isNonChildTarget && isChildOccasion) {
    warnings.push({
      level: 'hard',
      title:
        '선물 대상과 목적이 서로 맞지 않아 보여요. 테스트를 다시 진행해주세요.',
      detail: `1번 답변은 "${answerValues[0] ?? ''}"인데, 4번 답변은 "${answerValues[3] ?? ''}"로 입력됐어요.`,
    });
  }

  // 7) 연령대 누락/모호 × 매우 구체적 가격대
  if (isAgeVague && isPriceVerySpecific) {
    warnings.push({
      level: 'soft',
      title:
        '연령대는 모호한데 가격대만 너무 구체적이에요. 테스트를 다시 진행해주세요.',
      detail: `3번 답변은 "${answerValues[2] ?? ''}"인데, 5번 가격대가 "${answerValues[4] ?? ''}"로 입력됐어요.`,
    });
  }

  return warnings;
}
