// lib/auth/naver.ts
const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
const NAVER_REDIRECT_URI =
  process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI ||
  'http://localhost:3000/login/callback/naver';

/**
 * 네이버 로그인 URL 생성
 */
export function getNaverLoginUrl() {
  // CSRF 방지용 랜덤 state 생성
  const state = Math.random().toString(36).substring(2, 15);

  // state를 sessionStorage에 저장 (나중에 검증용)
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('naver_state', state);
  }

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: NAVER_CLIENT_ID!,
    redirect_uri: NAVER_REDIRECT_URI,
    state: state,
  });

  return `https://nid.naver.com/oauth2.0/authorize?${params.toString()}`;
}
