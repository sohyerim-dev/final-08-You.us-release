// 카테고리 코드 조회 API
export interface CategoryCode {
  sort: number;
  code: string;
  value: string;
  depth: number;
  parent?: string;
  sub?: CategoryCode[];
}

export interface CategoryCodeResponse {
  ok: number;
  item: {
    nested: {
      productCategory: {
        codes: CategoryCode[];
      };
    };
  };
}

export interface CategoryCodeError {
  ok: number;
  message: string;
}
