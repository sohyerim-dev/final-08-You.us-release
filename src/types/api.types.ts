import type { User } from '@/types/user.types';

// 파일 업로드 결과 타입
export interface FileUploadRes {
  ok: 1;
  item: {
    name: string;
    path: string;
  }[];
}

// 회원 정보 타입
export interface UserInfoRes {
  ok: 1;
  item: User;
}

// 서버 검증 에러 타입
export interface ServerValidationError {
  type: string;
  value: string;
  msg: string;
  location: string;
}

// 에러 타입
export interface ErrorRes {
  ok: 0;
  message: string;
  errors?: {
    [fieldName: string]: ServerValidationError;
  };
}
