'use server';

const NAVER_CLIENT_ID =
  process.env.NEXT_PUBLIC_NAVER_CLIENT_ID || process.env.NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;
const NAVER_REDIRECT_URI =
  process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI || process.env.NAVER_REDIRECT_URI;
const API_SERVER = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

// 환경변수 체크
if (
  !NAVER_CLIENT_ID ||
  !NAVER_CLIENT_SECRET ||
  !NAVER_REDIRECT_URI ||
  !API_SERVER ||
  !CLIENT_ID
) {
  console.error('필수 환경변수가 설정되지 않았습니다:', {
    NAVER_CLIENT_ID: !!NAVER_CLIENT_ID,
    NAVER_CLIENT_SECRET: !!NAVER_CLIENT_SECRET,
    NAVER_REDIRECT_URI: !!NAVER_REDIRECT_URI,
    API_SERVER: !!API_SERVER,
    CLIENT_ID: !!CLIENT_ID,
  });
}

interface NaverTokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

interface NaverUserResponse {
  resultcode: string;
  message: string;
  response: {
    id: string;
    email: string;
    name: string;
    profile_image?: string;
  };
}

/**
 * 네이버 로그인 처리
 * @param code - 네이버에서 받은 인증 코드
 */
export async function getNaverToken(code: string) {
  try {
    console.log('[NAVER] 로그인 시작');

    // 1. 네이버 액세스 토큰 받기
    const tokenResponse = await fetch('https://nid.naver.com/oauth2.0/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: NAVER_CLIENT_ID!,
        client_secret: NAVER_CLIENT_SECRET!,
        code: code,
        redirect_uri: NAVER_REDIRECT_URI!,
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('NAVER 토큰 응답 실패:', errorText);
      throw new Error('토큰 발급 실패');
    }

    const tokenData: NaverTokenResponse = await tokenResponse.json();
    console.log('NAVER 토큰 받기 성공');

    // 2. 네이버 사용자 정보 가져오기
    const userResponse = await fetch('https://openapi.naver.com/v1/nid/me', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    if (!userResponse.ok) {
      const errorText = await userResponse.text();
      console.error('NAVER 사용자 정보 응답 실패:', errorText);
      throw new Error('사용자 정보 조회 실패');
    }

    const userData: NaverUserResponse = await userResponse.json();
    console.log('NAVER 사용자 정보:', userData.response);

    // 3. 우리 서버에 OAuth 회원가입/로그인 요청
    const signupBody = {
      type: 'user',
      loginType: 'naver',
      name: userData.response.name,
      email: userData.response.email,
      image: userData.response.profile_image || '',
      extra: {
        providerAccountId: userData.response.id,
      },
    };

    console.log('SERVER 회원가입 요청 데이터:', signupBody);

    const signupResponse = await fetch(`${API_SERVER}/users/signup/oauth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
      },
      body: JSON.stringify(signupBody),
    });

    const signupData = await signupResponse.json();
    console.log('SERVER 회원가입 응답:', signupData);

    // 4. 회원가입 결과 확인
    const isNewUser = signupData.ok === 1;
    const isExistingUser =
      signupData.ok === 0 && signupData.message?.includes('이미 가입');

    // 회원가입이 진짜 실패한 경우 (서버 오류 등)
    if (!isNewUser && !isExistingUser) {
      console.error('SERVER 회원가입 실패:', signupData);
      throw new Error(signupData.message || '서버 회원가입 실패');
    }

    // 5. 신규/기존 회원 모두 로그인 시도
    console.log(
      `SERVER ${isNewUser ? '신규 회원' : '기존 회원'} - 로그인 시도`,
    );

    const loginResponse = await fetch(`${API_SERVER}/users/login/with`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
      },
      body: JSON.stringify({
        providerAccountId: userData.response.id,
      }),
    });

    const loginData = await loginResponse.json();
    console.log('SERVER 로그인 응답:', loginData);

    if (!loginResponse.ok || loginData.ok === 0) {
      console.error('SERVER 로그인 실패:', loginData);
      throw new Error('로그인에 실패했습니다.');
    }

    console.log('SERVER 최종 사용자 정보:', loginData.item);

    return {
      ok: 1,
      user: loginData.item,
    };
  } catch (error) {
    console.error('NAVER 로그인 오류:', error);
    return {
      ok: 0,
      message: '네이버 로그인에 실패했습니다.',
    };
  }
}
