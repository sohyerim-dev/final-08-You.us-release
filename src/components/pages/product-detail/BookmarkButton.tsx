'use client';

import { useState, useEffect } from 'react';
import useUserStore from '@/lib/zustand/auth/userStore';
import fetchClient from '@/lib/api/fetchClient';
import { SingleBookmarkResponse } from '@/types/bookmark.types';
import { toast } from 'react-toastify';

export default function BookmarkButton({ productId }: { productId: number }) {
  //하트색상 상태변경
  const [isBookmarked, setIsBookmarked] = useState(false);
  //저장해둔 북마크 ID를 초기화
  const [bookmarkId, setBookmarkId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = useUserStore.getState().user?.token?.accessToken;
    if (!token) return;

    fetchClient<SingleBookmarkResponse>(`/bookmarks/product/${productId}`)
      .then((data) => {
        if (data.ok) {
          setIsBookmarked(true);
          setBookmarkId(data.item._id);
        }
      })
      .catch(() => {
        setIsBookmarked(false);
      });
  }, [productId]);

  const handleBookmarkToggle = async () => {
    if (!useUserStore.getState().user) {
      toast.error('로그인이 필요한 기능입니다.');
      return;
    }

    setIsLoading(true);
    try {
      if (isBookmarked && bookmarkId) {
        await fetchClient(`/bookmarks/${bookmarkId}`, { method: 'DELETE' });
        setIsBookmarked(false);
        setBookmarkId(null);
        toast.success('찜 목록에서 삭제되었습니다.');
      } else {
        const data = await fetchClient<SingleBookmarkResponse>(
          '/bookmarks/product',
          {
            method: 'POST',
            body: JSON.stringify({ target_id: productId }),
          },
        );
        setIsBookmarked(true);
        setBookmarkId(data.item._id);
        toast.success('찜 목록에 추가되었습니다.');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      aria-label={isBookmarked ? '북마크 해제' : '북마크'}
      onClick={handleBookmarkToggle}
      disabled={isLoading}
      className="flex h-13 w-13 shrink-0 cursor-pointer items-center justify-center rounded border border-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <svg
        className={`h-6 w-6 shrink-0 ${isBookmarked ? 'text-red-500' : 'text-gray-600'}`}
        fill={isBookmarked ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
}
