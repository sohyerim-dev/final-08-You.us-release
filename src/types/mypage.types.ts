import { StaticImport } from 'next/dist/shared/lib/get-img-props';

// 회원 정보 타입
export interface MyUser {
  ok: number;
  item: {
    _id: number;
    email: string;
    name: string;
    image?: string | undefined | StaticImport;
    token?: {
      accessToken: string;
      refreshToken: string;
    };
    address: { streetAddress?: string; postalCode?: string };
    phone: string;
  };
}

//회원정보 수정타입
export interface UserReset {
  email?: string;
  name?: string;
  image?: string | undefined | StaticImport;
  address?: { streetAddress?: string; postalCode?: string };
  phone?: string;
}
