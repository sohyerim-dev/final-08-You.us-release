export const tagTranslations = {
  // recipient
  parent: '부모님',
  teacher: '선생님',
  lover: '연인',
  friend: '친구',
  coworker: '직장동료',
  sibling: '형제자매',

  // gender
  male: '남성',
  female: '여성',
  unspecified: '성별무관',

  // ageGroup
  child: '어린이',
  teen: '10대',
  '20s': '20대',
  '30s': '30대',
  '40s': '40대',
  '50s': '50대',
  '60plus': '60대 이상',

  // occasion
  birthday: '생일',
  thanks: '감사',
  anniversary: '기념일',
  holiday: '명절',
  housewarming: '집들이',
  celebration: '축하',

  // style
  practical: '실용적인',
  premium: '고급스러운',
  emotional: '감성적인',
  cute: '귀여운',
  light: '가벼운',

  // price (필요하면 가격도 변환)
  '10000': '1만원대',
  '20000': '2만원대',
  '30000': '3만원대',
} as const;

export type TagKey = keyof typeof tagTranslations;

export const TAG_GROUPS: Record<string, string[]> = {
  관계: ['friend', 'coworker', 'parent', 'teacher', 'sibling', 'lover'],
  성별: ['male', 'female', 'unspecified'],
  연령대: ['child', 'teen', '20s', '30s', '40s', '50s', '60plus'],
  상황: [
    'birthday',
    'thanks',
    'anniversary',
    'holiday',
    'housewarming',
    'celebration',
  ],
  스타일: ['practical', 'premium', 'emotional', 'cute', 'light'],
};
