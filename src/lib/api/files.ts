import { FileUploadRes } from '@/types/api.types';
import useUserStore from '@/lib/zustand/auth/userStore';

const API_SERVER = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

/**
 * 파일 업로드
 * @param file - 업로드할 파일
 * @returns 업로드된 파일 경로
 */
export async function uploadFile(file: File): Promise<string> {
  const { user } = useUserStore.getState();

  const formData = new FormData();
  formData.append('attach', file);

  const headers: HeadersInit = {
    'Client-Id': CLIENT_ID,
  };

  if (user?.token?.accessToken) {
    headers['Authorization'] = `Bearer ${user.token.accessToken}`;
  }

  const response = await fetch(`${API_SERVER}/files`, {
    method: 'POST',
    headers,
    body: formData,
  });

  if (!response.ok) {
    throw new Error('파일 업로드에 실패했습니다.');
  }

  const data: FileUploadRes = await response.json();

  const items = data.item;
  if (data.ok !== 1 || !items || items.length === 0) {
    throw new Error('파일 업로드 응답이 올바르지 않습니다.');
  }

  const firstItem = items[0];
  if (!firstItem) {
    throw new Error('파일 업로드 응답이 올바르지 않습니다.');
  }

  return firstItem.path;
}
