import type {
  CategoryCodeResponse,
  CategoryCodeError,
} from '@/types/categoryCode.types';
import fetchClient from '@/lib/api/fetchClient';

export default async function getCategoryCode(): Promise<
  CategoryCodeResponse | CategoryCodeError
> {
  try {
    return await fetchClient<CategoryCodeResponse>('/codes', {
      requireAuth: false,
      cache: 'force-cache',
      next: {
        revalidate: 86400, // 24시간마다 갱신
      },
    });
  } catch (err) {
    return {
      ok: 0,
      message: err instanceof Error ? err.message : String(err),
    };
  }
}
