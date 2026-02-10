const API_SERVER = process.env.NEXT_PUBLIC_API_URL;

/**
 * 이미지 경로를 전체 URL로 변환
 * API에서 반환되는 상대 경로를 Next.js Image에서 사용 가능한 형태로 변환
 */
export function getImageUrl(
  imagePath: string | undefined,
  fallback = '/images/common/basic-profile-img.png',
): string {
  if (!imagePath) return fallback;
  // 이미 절대 URL이거나 /로 시작하면 그대로 반환
  if (imagePath.startsWith('http') || imagePath.startsWith('/')) {
    return imagePath;
  }
  // 상대 경로면 API 서버 URL 붙이기
  return `${API_SERVER}/${imagePath}`;
}
