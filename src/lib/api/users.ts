'use server';

import fetchClient from '@/lib/api/fetchClient';
import { ErrorRes, UserInfoRes } from '@/types/api.types';
import { redirect } from 'next/navigation';

type UserActionState = UserInfoRes | ErrorRes | null;

/**
 * 회원가입
 * @param state - 이전 상태(사용하지 않음)
 * @param formData - 회원가입 폼 데이터(FormData 객체)
 * @returns 회원가입 결과 응답 객체
 * @description
 * 첨부파일(프로필 이미지)이 있으면 파일 업로드 후 받은 파일경로를 회원 정보에 추가해서 회원가입 API를 호출
 */
export async function signup(
  _state: UserActionState,
  formData: FormData,
): Promise<UserActionState> {
  let data: UserInfoRes | ErrorRes;

  try {
    // 회원가입 요청 바디 생성
    // API 참고: https://fesp-api.koyeb.app/market/apidocs/#/%ED%9A%8C%EC%9B%90/post_users_
    const body = {
      type: formData.get('type') || 'user',
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      address: {
        postalCode: formData.get('postalCode'),
        streetAddress: `${formData.get('address')}, ${formData.get('detail-address')}`,
      },
      phone: formData.get('phone'),
    };

    // 회원가입 API 호출
    data = await fetchClient<UserInfoRes>('/users', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다.' };
  }

  if (data.ok === 1) {
    redirect('/login');
  } else {
    return data; // 실패 시에만 리턴
  }
}

/**
 * 로그인
 * @param state - 이전 상태(사용하지 않음)
 * @param formData - 로그인 폼 데이터(FormData 객체)
 * @returns 로그인 결과 응답 객체
 * @description
 * 이메일/비밀번호로 로그인 API 호출
 */
export async function login(
  _state: UserActionState,
  formData: FormData,
): Promise<UserActionState> {
  const email = formData.get('email');
  const password = formData.get('password');
  const body = {
    email,
    password,
  };
  console.log('body', body);
  console.log('formData', formData);

  try {
    const data = await fetchClient<UserInfoRes>('/users/login', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    console.log('data', data);
    return data;
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다.' };
  }
}
