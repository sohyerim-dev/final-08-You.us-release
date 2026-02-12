import { RecommendTags } from '@/types/aitest.types';

export function buildPrompt(answers: string[]) {
  const safeAnswers = answers.map((a) => (a ?? '').toString().trim());
  const joined = safeAnswers.map((a, i) => `${i + 1}. ${a}`).join('\n');

  return `
너는 한국어 사용자 입력을 정해진 태그로 강제 매핑하는 분류기다.
추가 질문을 하지 말고, 반드시 아래 JSON 스키마로만 출력해라.
다른 텍스트/설명/코드블록/마크다운을 절대 출력하지 마라.

[입력 답변]
${joined}

[출력 스키마]
{
  "recipient": "parent|teacher|lover|friend|coworker|sibling|child",
  "gender": "male|female|unspecified",
  "ageGroup": "child|teen|20s|30s|40s|50s|60plus",
  "occasion": "birthday|thanks|anniversary|holiday|housewarming|celebration",
  "priceRange": { "min": number, "max": number | null },
  "style": "practical|premium|emotional|cute|light"
}

[필수 규칙: 절대 위반 금지]
- other, unknown 같은 값은 절대 사용하지 마라. 위 enum 중 하나로 반드시 선택해라.
- 애매하면 가장 가까운 태그로 보수적으로 강제 매핑해라.
- priceRange는 반드시 min/max 숫자로 채워ra. (원 단위 정수)
- max가 없는 경우 null을 사용해라.

[recipient 매핑 규칙]

- parent: 부모님/엄마/아빠/어머니/아버지/부모님 친구/친구 부모님/어른/어르신
※ 부모 세대 및 연장자만 해당. 형제자매·사촌은 포함하지 않음
- sibling: 형/누나/오빠/언니/남동생/여동생/형제/자매/사촌/사촌형/사촌누나/사촌오빠/사촌언니/사촌동생/사촌형제
- child: 자식/아들/딸/아이/어린이/유아/초등학생/조카
※ 보호자 입장에서 선물을 주는 '어린 상대' 전용
- teacher: 선생님/교수님/강사/튜터/코치
- lover: 남친/여친/연인/남편/아내/배우자/커플/우리(연인 맥락), 화자 본인의 연인만 해당.
(남친, 여친, 내 남자친구, 내 여자친구, 연인, 남편, 아내, 배우자, 커플)
※ '친구의' 혹은 '친구', '지인의' 혹은 '지인', '누구의' 혹은 '누구' 등이 앞에 붙으면 lover로 분류하지 마라.
- coworker: 직장/회사/동료/팀원/상사/팀장/대표/사장님/거래처/고객/클라이언트/선배/후배/지인
(업무·사회적 관계는 전부 coworker, 애매하면 coworker)
- friend: 친구/절친/동창/지인(친구 맥락) +
친구의 남자친구/친구 남자친구/친구의 여자친구/친구 여자친구
(제3자의 연인은 모두 friend로 분류)

[gender 매핑 규칙]
- male: 남성/남자/아들/아빠/할아버지/형/오빠/남동생/남편/남자친구/남친
- female: 여성/여자/딸/엄마/할머니/누나/언니/여동생/아내/여자친구/여친
- unspecified: 상관없음/모름/비밀/무관/성별 무관/안 정함
- 1번(recipient) 답변에서 성별이 유추 가능하더라도, 반드시 2번(gender) 답변을 기준으로 매핑해ra.
- 애매하면 unspecified로 설정

[ageGroup 매핑 규칙]
- child: 유아/어린이/아이/조카/초등 이하
- teen: 중학생/고등학생/10대/청소년 (초등학생도 teen으로 매핑)
- 20s/30s/40s/50s: 각각 20대/30대/40대/50대
- 60plus: 60대 이상/할머니/할아버지/어르신
- 애매하면 30s로 설정

[occasion 매핑 규칙(우선순위)]
1) birthday: 생일 / 생신 / 생일선물
2) holiday: 설 / 추석 / 명절 / 연말연시
3) thanks: 감사 / 답례 / 스승의날 / 어버이날 / 고마운 분
4) housewarming: 집들이 / 이사 / 신혼집
5) celebration: 승진 / 개업 / 합격 / 취업 / 결혼(결혼 선물) / 축하
6) anniversary: 100일 / 1주년 / 기념일 / 결혼기념일 (연인/부부 맥락)
7) 그 외 전부 thanks


[priceRange 파싱 규칙 — 우선순위 매우 중요]

[우선순위 1: 이상/이하/부터/까지]
- "10만원 이상" => { min: 100000, max: null }
- "5만원 이하" => { min: 0, max: 50000 }
- "3만원부터" => { min: 30000, max: null }
- "7만원까지" => { min: 0, max: 70000 }

[우선순위 2: 범위 표현]
- "n~m만원"(대 없음) =>
  min=n*10000, max=m*10000
- "n만원에서 m만원대" 또는 "n~m만원대" =>
  min=n*10000, max=(m*10000)+9999

[우선순위 3: 만원 단위 표현 (대 없음)]
- "n만원" (한 자리 수, n < 10) =>
  min=n*10000, max=(n*10000)+9999
  예: "5만원" => { min: 50000, max: 59999 }
- "nn만원" (두 자리 수, n >= 10) =>
  십만원 단위로 구간을 나눔
  예: "10만원" => { min: 100000, max: 199999 }
  예: "15만원" => { min: 150000, max: 199999 }
  예: "20만원" => { min: 200000, max: 299999 }
  예: "25만원" => { min: 250000, max: 299999 }
  예: "30만원" => { min: 300000, max: 399999 }
  예: "50만원" => { min: 500000, max: 599999 }
  규칙: 십만원 단위로 올림하여 상한 설정
  10~19만원 => max: 199999
  20~29만원 => max: 299999
  30~39만원 => max: 399999
  40~49만원 => max: 499999
  50~59만원 => max: 599999

[우선순위 4: 만원대 표현]
- "n만원대" (한 자리 수, n < 10) =>
  min=n*10000, max=(n*10000)+9999
  예: "5만원대" => { min: 50000, max: 59999 }
- "nn만원대" (두 자리 수, nn >= 10) =>
  십만원 단위로 구간을 나눔
  예: "10만원대" => { min: 100000, max: 199999 }
  예: "15만원대" => { min: 150000, max: 199999 }
  예: "20만원대" => { min: 200000, max: 299999 }
  예: "25만원대" => { min: 250000, max: 299999 }
  예: "30만원대" => { min: 300000, max: 399999 }
  예: "50만원대" => { min: 500000, max: 599999 }
  규칙: 십만원 단위로 올림하여 상한 설정
  10~19만원대 => max: 199999
  20~29만원대 => max: 299999
  30~39만원대 => max: 399999
  40~49만원대 => max: 499999
  50~59만원대 => max: 599999

[우선순위 5: 천원 단위]
- "n천원" => { min=n*1000, max=(n*1000)+999 }

[최후 규칙]
- 위 모든 규칙에 해당하지 않을 때만
  { min: 30000, max: 39999 } 를 사용해ra.

[style 매핑 규칙(우선순위)]
1) light: 가벼운/부담 없는/간단한
2) cute: 귀여운/아기자기/예쁜/디자인/힙한/힙함/트렌디/트렌디한/핫한/감각적인/유니크한
※ '힙한'은 기본적으로 premium이 아니라 cute로 강제 매핑한다.
3) emotional: 정성/감동/의미/마음
4) premium: 고급/특별/좋은 걸로/브랜드/퀄리티
5) 그 외 전부 practical(실용 포함)

이제 위 규칙에 따라 결과 JSON만 출력해ra.
`.trim();
}

// 타입 체크용(선택)
export const _promptContractExample: RecommendTags = {
  recipient: 'child',
  gender: 'female',
  ageGroup: 'teen',
  occasion: 'birthday',
  priceRange: { min: 30000, max: 39999 },
  style: 'cute',
};
