import fetchClient from '@/lib/api/fetchClient';
import { ErrorRes, UserInfoRes } from '@/types/api.types';
import { BookmarkResponse } from '@/types/bookmark.types';
import { MyUser, UserReset } from '@/types/mypage.types';
import { Orders } from '@/types/order.types';
import { ReviewItem, ReviewResponse } from '@/types/review.types';

export async function getMyproduct() {
  //찜한 상품 목록 불러오기
  const products = await fetchClient<BookmarkResponse>('/bookmarks/product');
  // console.log(products);

  return products;
}

export async function getMyorder() {
  //주문 목록 불러오기
  const order = await fetchClient<Orders>('/orders');
  console.log('주문 목록:', order);

  return order;
}

export async function getMyReviews() {
  //내 후기 목록 불러오기
  const reviews = await fetchClient<ReviewResponse>('/replies');
  return reviews;
}

export async function getReviewById(reviewId: string) {
  const review = await fetchClient<{ ok: number; item: ReviewItem }>(
    `/replies/${reviewId}`,
  );
  return review;
}

export async function createReview(body: {
  rating: number;
  content: string;
  extra: { title: string; images: string[] };
}) {
  return await fetchClient('/replies', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function updateReview(
  reviewId: string,
  body: {
    rating: number;
    content: string;
    extra: { title: string; images: string[] };
  },
) {
  return await fetchClient(`/replies/${reviewId}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
}

export async function getUserItem({ userId }: { userId: number }) {
  //회원 상세정보 불러오기
  const userItem = await fetchClient<MyUser>(`/users/${userId}`);
  // const userItem = await fetchClient<MyUser>('/users/4');
  // const user = userItem.item;
  // return user;
  return userItem;
}

/**
 * 프로필 수정
 * @param userId - 수정할 사용자 ID
 * @param updateData - 수정할 데이터 (이미지 경로 포함 가능)
 * @returns 수정 결과 응답 객체
 */
export async function updateProfile(
  userId: number,
  updateData: UserReset,
): Promise<UserInfoRes | ErrorRes> {
  console.log('사용자:', userId);
  console.log('데이터:', updateData);
  try {
    // console.log('데이터 확인:', updateData);
    // 프로필 수정 API 호출
    const data = await fetchClient<UserInfoRes>(`/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(updateData),
    });
    return data;
  } catch (error) {
    console.error('프로필 수정 실패:', error);
    return { ok: 0, message: '프로필 수정에 실패했습니다.' };
  }
}
