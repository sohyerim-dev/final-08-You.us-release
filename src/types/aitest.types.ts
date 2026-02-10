export type QuestionFormProps = {
  question: string;
  example?: string;
  autoFocus?: boolean;
};

export type Answer = {
  question: string;
  value: string;
};

// =========================
// AI Gift Recommend Types
// =========================

export type Recipient =
  | 'parent'
  | 'teacher'
  | 'lover'
  | 'friend'
  | 'coworker'
  | 'child';

export type AgeGroup =
  | 'child'
  | 'teen'
  | '20s'
  | '30s'
  | '40s'
  | '50s'
  | '60plus';

export type Occasion =
  | 'birthday'
  | 'thanks'
  | 'anniversary'
  | 'holiday'
  | 'housewarming'
  | 'celebration';

export type Style = 'practical' | 'premium' | 'emotional' | 'cute' | 'light';

export type PriceRange = {
  min: number;
  max: number;
};

export type RecommendTags = {
  recipient: Recipient;
  gender: 'male' | 'female' | 'unspecified';
  ageGroup: AgeGroup;
  occasion: Occasion;
  priceRange: PriceRange;
  style: Style;
};

// =========================
// API Payload
// =========================

export type RecommendRequestBody = {
  answers: string[];
};

export type RecommendResponseBody = {
  tags: RecommendTags;
};

export type RecommendResult = {
  tags: {
    recipient: string;
    gender: string;
    ageGroup: string;
    occasion: string;
    priceRange: {
      min: number;
      max: number;
    };
    style: string;
  };
};

type WarningLevel = 'hard' | 'soft';

export type Warning = {
  level: WarningLevel;
  title: string;
  detail: string;
};
