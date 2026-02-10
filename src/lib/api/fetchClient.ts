import useUserStore from '@/lib/zustand/auth/userStore';
import { ServerValidationError } from '@/types/api.types';

const API_SERVER = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';
// 토큰 갱신할 때 사용하는 URL 경로
const REFRESH_URL = '/auth/refresh';

/**
 * API 호출 중 발생하는 에러를 커스텀하기 위한 클래스
 */
export class ApiError extends Error {
  status: number;
  errors?: { [fieldName: string]: ServerValidationError };

  constructor(
    message: string,
    status: number,
    errors?: { [fieldName: string]: ServerValidationError },
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}

// fetch 함수에 전달할 옵션 타입 정의
// RequestInit는 기본 fetch 옵션 (method, body 등)
// params는 쿼리 파라미터 (?page=1&limit=10 같은 거)
interface FetchOptions extends RequestInit {
  params?: Record<string, string>; // { page: '1', limit: '10' } 형태
}

// T는 제네릭 타입 - 호출할 때 응답 타입을 지정할 수 있음
// 예: fetchClient<Product[]>('/products') 하면 T가 Product[]이 됨
export async function fetchClient<T>(
  url: string, // API 엔드포인트 (예: '/products')
  options: FetchOptions = {}, // fetch 옵션 (기본값 빈 객체)
): Promise<T> {
  // 성공하면 T 타입

  // Zustand 스토어에서 유저 정보와 관련 함수들 가져오기
  // getState()는 컴포넌트 밖에서도 스토어 값을 읽을 수 있게 해줌
  const { user, setUser, resetUser } = useUserStore.getState();

  // options에서 params를 분리하고 나머지는 fetchOptions에 담기
  // ...fetchOptions는 method, body 같은 나머지 옵션들
  const { params, ...fetchOptions } = options;

  // URL이 '/api/'로 시작하면 Next.js 내부 API라고 판단
  // 예: '/api/recommend' → 내부 API, '/products' → 외부 API
  const isInternalApi = url.startsWith('/api/');

  // 내부 API면 그대로 사용, 외부 API면 API_SERVER 붙이기
  // 예: 내부 - '/api/recommend', 외부 - 'https://fesp-api.koyeb.app/products'
  let fullUrl = isInternalApi ? url : `${API_SERVER}${url}`;

  // params가 있으면 쿼리 스트링으로 변환해서 URL에 붙이기
  if (params) {
    // URLSearchParams는 객체를 ?key=value&key2=value2 형태로 변환
    const searchParams = new URLSearchParams(params);
    fullUrl += `?${searchParams.toString()}`;
    // 예: '/products' + '?page=1&limit=10' → '/products?page=1&limit=10'
  }

  // HTTP 요청 헤더 설정 시작
  const headers = new Headers(fetchOptions.headers);
  // 보내는 데이터가 JSON 형식이라고 알려줌
  headers.set('Content-Type', 'application/json');
  // 받는 데이터도 JSON 형식으로 받겠다고 알려줌
  headers.set('Accept', 'application/json');

  // 외부 API일 때만 Client-Id 헤더 추가
  // (내부 Next.js API는 필요 없음)
  if (!isInternalApi) {
    headers.set('Client-Id', CLIENT_ID);
  }

  // 로그인한 사용자가 있고, 토큰 갱신 요청이 아니면
  // Authorization 헤더에 accessToken 추가
  if (user && url !== REFRESH_URL) {
    headers.set('Authorization', `Bearer ${user.token?.accessToken}`);
    // Bearer는 토큰 방식을 나타내는 키워드
  }

  // response 변수를 미리 선언 (try-catch 밖에서도 사용하려고)
  let response: Response;

  try {
    // 실제 API 요청 보내기
    response = await fetch(fullUrl, {
      ...fetchOptions, // method, body 등
      headers, // 위에서 설정한 헤더들
    });
  } catch (error) {
    // 네트워크 에러 (인터넷 끊김, 서버 다운 등)
    console.error('fetch 실패:', error);
    throw new ApiError('네트워크 요청에 실패했습니다.', 500);
  }

  // 401 에러 처리 (인증 만료) - 내부 API는 건너뛰기
  // 401 = Unauthorized (권한 없음, 토큰 만료)
  if (response.status === 401 && !isInternalApi) {
    // 토큰 갱신 요청 자체가 401이면 완전히 로그아웃
    // (refresh token도 만료된 상황)
    if (url === REFRESH_URL) {
      navigateLogin(); // 로그인 페이지로 이동
      throw new ApiError('인증이 만료되었습니다.', 401);
    }

    // 로그인 상태가 아니면 로그인 페이지로
    if (!user) {
      navigateLogin();
      throw new ApiError('로그인이 필요합니다.', 401);
    }

    try {
      // refreshToken 가져오기
      // localStorage에 저장된 거 먼저 확인, 없으면 sessionStorage, 없으면 store에서 가져오기
      const refreshToken =
        localStorage.getItem('refreshToken') ||
        sessionStorage.getItem('refreshToken') ||
        user.token?.refreshToken;

      // refreshToken도 없으면 로그인 필요
      if (!refreshToken) {
        navigateLogin();
        throw new ApiError('인증 정보가 없습니다.', 401);
      }

      // refreshToken으로 새 accessToken 받아오기
      const refreshResponse = await fetch(`${API_SERVER}${REFRESH_URL}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Client-Id': CLIENT_ID,
          Authorization: `Bearer ${refreshToken}`, // refreshToken 보내기
        },
      });

      // 토큰 갱신 실패하면 에러
      if (!refreshResponse.ok) {
        throw new ApiError('토큰 갱신 실패', refreshResponse.status);
      }

      // 갱신된 토큰 받아오기
      const refreshData = await refreshResponse.json();
      // API 응답 구조에 따라 item 안에 있을 수도, 바로 있을 수도
      const { accessToken, refreshToken: newRefreshToken } =
        refreshData.item || refreshData;

      // Zustand store에 새 토큰 저장
      setUser({
        ...user, // 기존 유저 정보 유지
        token: { accessToken, refreshToken: newRefreshToken }, // 토큰만 업데이트
      });

      // 원래 저장된 곳에 다시 저장 (localStorage 또는 sessionStorage)
      if (localStorage.getItem('refreshToken')) {
        localStorage.setItem('refreshToken', newRefreshToken);
      } else if (sessionStorage.getItem('refreshToken')) {
        sessionStorage.setItem('refreshToken', newRefreshToken);
      }

      // 새 accessToken으로 원래 요청 다시 보내기
      headers.set('Authorization', `Bearer ${accessToken}`);
      response = await fetch(fullUrl, {
        ...fetchOptions,
        headers,
      });
    } catch (refreshError) {
      // 토큰 갱신 실패하면 로그아웃 처리
      console.error('토큰 갱신 실패:', refreshError);
      resetUser(); // Zustand store 초기화
      localStorage.removeItem('refreshToken'); // localStorage 삭제
      sessionStorage.removeItem('refreshToken'); // sessionStorage 삭제
      navigateLogin(); // 로그인 페이지로
      throw refreshError; // 에러 다시 던지기
    }
  }

  // 응답을 JSON으로 변환
  const data = await response.json();
  if (data.ok === 0) {
    throw new ApiError(
      data.message || 'API 요청에 실패했습니다.',
      response.status,
      data.errors, // 서버의 필드별 유효성 검사 에러도 함께 전달
    );
  }

  // 타입 단언해서 반환
  return data as T;
}

// 로그인 페이지로 이동하는 함수
function navigateLogin() {
  // window는 브라우저에만 존재
  // 서버 사이드에서 실행되면 window가 없으니까
  // 서버 환경에선 아무것도 안 하고 리턴
  if (typeof window === 'undefined') return;

  // 사용자에게 로그인 페이지로 갈지 물어보기
  // 나중에 모달로 수정하기
  const gotoLogin = confirm(
    '로그인 후 이용 가능합니다.\n로그인 페이지로 이동하시겠습니까?',
  );

  // 여기부터 브라우저에서 실행
  if (gotoLogin) {
    // 현재 페이지 경로 저장 (로그인 후 다시 돌아오려고)
    const currentPath = window.location.pathname;
    // 로그인 페이지로 이동 + redirect 파라미터에 현재 경로 저장
    // 예: /login?redirect=%2Fproducts
    window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
  }
}

// 다른 파일에서 import 할 수 있게 export
export default fetchClient;
