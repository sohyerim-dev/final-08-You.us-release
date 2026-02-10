import type {
  CategoryCodeResponse,
  CategoryCodeError,
} from '@/types/categoryCode.type';

export default async function getCategoryCode(): Promise<
  CategoryCodeResponse | CategoryCodeError
> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID as string;

  try {
    const response = await fetch(`${API_URL}/codes`, {
      headers: {
        'Client-Id': CLIENT_ID,
      },
      cache: 'force-cache',
      next: {
        revalidate: 86400, // 24시간마다 갱신
      },
    });

    const data = await response.json();
    return data;
  } catch (err) {
    return {
      ok: 0,
      message: err instanceof Error ? err.message : String(err),
    };
  }
}
