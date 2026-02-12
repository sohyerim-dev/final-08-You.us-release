'use client';

import Button from '@/components/common/Button';
import { uploadFile } from '@/lib/api/files';
import { createReview, updateReview } from '@/lib/api/mypage';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

type ReviewFormProps = {
  mode: 'create' | 'edit';
  reviewId?: string;
  productInfo: {
    imageSrc: string;
    orderId?: number;
    productId?: number;
    imageAlt: string;
    name: string;
  };
  createdAt?: string;
  initialData?: {
    rating: number;
    content: string;
    images: string[];
  };
};

export default function ReviewForm({
  mode,
  reviewId,
  productInfo,
  createdAt,
  initialData,
}: ReviewFormProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(mode === 'create');
  const [rating, setRating] = useState(initialData?.rating || 0);
  const [content, setContent] = useState(initialData?.content || '');
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [newFiles, setNewFiles] = useState<{ file: File; preview: string }[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const fileImage = useRef<HTMLInputElement>(null);

  const title = mode === 'create' ? '후기 작성' : '후기 상세';
  console.log('product정보테스트', productInfo);
  // 별점 렌더링
  const renderStars = () => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => isEditing && setRating(star)}
            className={`text-xl ${isEditing ? 'cursor-pointer' : 'cursor-default'}`}
          >
            <span className={star <= rating ? 'text-primary' : 'text-gray-300'}>
              ★
            </span>
          </button>
        ))}
        <span className="text-body-sm ml-1">{rating}/5</span>
      </div>
    );
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = () => {
    fileImage.current?.click();
  };

  // 폼 제출 핸들러
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const uploadedPaths = await Promise.all(
        newFiles.map((item) => uploadFile(item.file)),
      );
      const allImages = [...images, ...uploadedPaths];

      // create 모드일 때
      if (mode === 'create') {
        const body = {
          order_id: productInfo.orderId,
          product_id: productInfo.productId,
          rating,
          content,
          extra: { title: productInfo.name, images: allImages },
        };
        await createReview(body);
        toast.success('후기가 등록되었습니다.');
        router.push('/mypage/reviews');
      }

      // edit 모드일 때
      else if (mode === 'edit' && reviewId) {
        const body = {
          rating,
          content,
          extra: { title: productInfo.name, images: allImages },
        };
        await updateReview(reviewId, body);
        toast.success('후기가 수정되었습니다.');
        router.push('/mypage/reviews');
      }
    } catch (error) {
      toast.error(
        mode === 'edit'
          ? '후기 수정에 실패했습니다.'
          : '후기 등록에 실패했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  // 취소 시 원래 데이터로 복원
  const handleCancel = () => {
    setRating(initialData?.rating || 0);
    setContent(initialData?.content || '');
    setImages(initialData?.images || []);
    setNewFiles([]);
    setIsEditing(false);
  };

  return (
    <>
      <div>
        <div className="border-primary border-b p-4">
          <h2 className="text-body-lg font-bold">{title}</h2>
        </div>
        <div className="rounded border border-gray-200 bg-white">
          {/* 상품 정보 */}
          <div className="border-primary flex items-end justify-between border-b p-4">
            <div className="flex items-center gap-4">
              <Image
                src={productInfo.imageSrc}
                alt={productInfo.imageAlt}
                width={60}
                height={60}
                className="h-15 w-15 shrink-0 rounded border border-gray-200 object-cover"
              />
              <div className="flex flex-col gap-1">
                <p className="text-body-md line-clamp-1 font-medium">
                  {productInfo.name}
                </p>
                {renderStars()}
              </div>
            </div>
            {createdAt && (
              <span className="text-body-sm hidden text-gray-500 md:block">
                작성일 : {createdAt.slice(0, 10)}
              </span>
            )}
          </div>

          {/* 이미지 업로드 영역 */}
          <div className="border-primary flex gap-2 border-b p-4">
            {/* 업로드 버튼 */}
            <button
              type="button"
              disabled={!isEditing}
              onClick={handleImageUpload}
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded border border-gray-300 bg-gray-50 hover:not-disabled:bg-gray-100 disabled:cursor-default disabled:opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                />
              </svg>
            </button>
            <input
              type="file"
              hidden
              accept="image/*"
              ref={fileImage}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const preview = URL.createObjectURL(file);
                setNewFiles((prev) => [...prev, { file, preview }]);
              }}
            ></input>

            {/* 기존 이미지 미리보기 */}
            {images.map((img, idx) => (
              <div
                key={`existing-${idx}`}
                className="relative h-16 w-16 shrink-0"
              >
                <Image
                  src={img}
                  alt={`리뷰 이미지 ${idx + 1}`}
                  fill
                  unoptimized
                  className="rounded border border-gray-200 object-cover"
                />
                {isEditing && (
                  <button
                    type="button"
                    onClick={() =>
                      setImages((prev) => prev.filter((_, i) => i !== idx))
                    }
                    className="bg-primary absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs text-white"
                  >
                    X
                  </button>
                )}
              </div>
            ))}
            {/* 새로 추가한 이미지 미리보기 */}
            {newFiles.map((item, idx) => (
              <div key={`new-${idx}`} className="relative h-16 w-16 shrink-0">
                <Image
                  src={item.preview}
                  alt={`새 이미지 ${idx + 1}`}
                  fill
                  unoptimized
                  className="rounded border border-gray-200 object-cover"
                />
                {isEditing && (
                  <button
                    type="button"
                    onClick={() =>
                      setNewFiles((prev) => prev.filter((_, i) => i !== idx))
                    }
                    className="bg-primary absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs text-white"
                  >
                    X
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* 리뷰 텍스트 */}
          <div className="p-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              readOnly={!isEditing}
              placeholder="&gt; 후기를 작성해주세요."
              className={`text-body-md h-32 w-full resize-none p-3 focus:outline-none ${
                isEditing
                  ? 'focus:border-primary'
                  : 'cursor-default bg-gray-50 text-gray-700'
              }`}
            />
          </div>

          {/* 하단 버튼 */}
          <div className="flex justify-end gap-2 p-4">
            {isEditing ? (
              <>
                {mode === 'edit' ? (
                  <Button
                    variant="update"
                    className="text-body-sm w-75 lg:w-40.5"
                    onClick={handleCancel}
                    disabled={isLoading}
                  >
                    취소
                  </Button>
                ) : (
                  <Link href="/mypage/reviews" className="w-75 lg:w-40.5">
                    <Button
                      tabIndex={-1}
                      variant="update"
                      className="text-body-sm w-full"
                    >
                      취소
                    </Button>
                  </Link>
                )}
                <Button
                  className="text-body-sm w-75 lg:w-40.5"
                  onClick={handleSubmit}
                  disabled={isLoading} // 로딩 중 클릭 방지
                >
                  {isLoading
                    ? mode === 'create'
                      ? '등록 중...'
                      : '저장 중...'
                    : mode === 'create'
                      ? '등록하기'
                      : '저장'}
                </Button>
              </>
            ) : (
              <Button
                className="text-body-sm w-75 lg:w-40.5"
                onClick={() => setIsEditing(true)}
              >
                수정하기
              </Button>
            )}
          </div>
        </div>
      </div>
      <Button
        variant="update"
        className="text-body-sm w-75 lg:w-full"
        onClick={() => router.back()}
      >
        뒤로가기
      </Button>
    </>
  );
}
