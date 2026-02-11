'use client';

import Button from '@/components/common/Button';
import { useState } from 'react';

import SelectedOptionItem from '@/components/pages/product-detail/OptionItems';
import BookmarkButton from '@/components/pages/product-detail/BookmarkButton';
import { ProductItem } from '@/types/product.types';
import useUserStore from '@/lib/zustand/auth/userStore';
import { fetchServerCartCount } from '@/lib/zustand/cartStore';
import { toast } from 'react-toastify';
import fetchClient from '@/lib/api/fetchClient';
import { CartResponse } from '@/types/cart.types';
import { useCategoryStore } from '@/lib/zustand/categoryStore';

interface SelectedOption {
  id: string;
  name: string;
  color?: string;
  size?: string;
  price: number;
  quantity: number;
  isDefault?: boolean;
}

// 옵션 조합 생성 함수 (size와 color 옵션을 하나로 통일)
function buildOptionCombinations({
  color: colors = [],
  size: sizes = [],
}: {
  color?: string[];
  size?: string[];
}) {
  if (colors.length > 0 && sizes.length > 0) {
    // 둘 다 있으면 조합 (-이거 건들지마세요 split용)
    return colors.flatMap((c) => sizes.map((s) => `${c} - ${s}`));
  }
  if (colors.length > 0) return colors;
  if (sizes.length > 0) return sizes;
  return [];
}

export default function ProductDetailInfo({
  product,
}: {
  product: ProductItem;
}) {
  const { name, price, extra } = product;
  //로그인 여부관리
  const user = useUserStore((state) => state.user);
  const category = useCategoryStore((state) => state.categories);

  const optionList = buildOptionCombinations(extra.options);
  const hasOptions = optionList.length > 0;

  //카테고리 value찾기
  const [parentCode, subCode] = extra.category;

  const parentCategory = category.find((cat) => cat.code === parentCode)!;
  const subCategory = parentCategory.sub!.find((sub) => sub.code === subCode)!;

  const categoryString = `${parentCategory.value} > ${subCategory.value}`;

  // 옵션 없으면 기본 상품 1개 선택, 옵션 있으면 빈 배열
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>(
    hasOptions
      ? []
      : [
          {
            id: 'default',
            name,
            price,
            quantity: 1,
            isDefault: true,
          },
        ],
  );

  const handleOptionSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) return;

    //이미 선택된 옵션 목록이 있는지 확인 (모든속성 color로 통일)
    const exists = selectedOptions.find((opt) => opt.name === value);
    if (!exists) {
      const hasColor = (extra.options.color?.length ?? 0) > 0;
      // const hasSize = (extra.options.size?.length ?? 0) > 0;

      let color: string | undefined;
      // let size: string | undefined;

      if (hasColor) {
        color = value;
      }

      setSelectedOptions([
        ...selectedOptions,
        {
          id: value,
          name: value,
          price,
          color,
          // size,
          quantity: 1,
          isDefault: false,
        },
      ]);
    }

    e.target.value = '';
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setSelectedOptions(
      selectedOptions.map((opt) =>
        opt.id === id ? { ...opt, quantity: newQuantity } : opt,
      ),
    );
  };

  const handleRemove = (id: string) => {
    setSelectedOptions(selectedOptions.filter((opt) => opt.id !== id));
  };

  const totalPrice = selectedOptions.reduce(
    (sum, opt) => sum + opt.price * opt.quantity,
    0,
  );

  const [isCartLoading, setIsCartLoading] = useState(false);

  // 선택 옵션 초기화 (장바구니 담은 후 리셋)
  const resetOptions = () => {
    setSelectedOptions(
      hasOptions
        ? []
        : [{ id: 'default', name, price, quantity: 1, isDefault: true }],
    );
  };

  // 장바구니 api 전송 이벤트
  const selectOptionSubmit = async () => {
    //옵션 있는지 여부
    if (hasOptions && selectedOptions.length === 0) {
      toast.error('옵션을 선택해주세요.');
      return;
    }

    if (!user) {
      toast.error('로그인이 필요한 기능입니다.');
      return;
    }

    setIsCartLoading(true);

    try {
      for (const opt of selectedOptions) {
        const res = await fetchClient<CartResponse>('/carts', {
          method: 'POST',
          body: JSON.stringify({
            product_id: product._id,
            quantity: opt.quantity,
            ...(opt.color && { color: opt.color }),
            // ...(opt.size && { size: opt.size }),
          }),
        });

        if (!res.ok) {
          throw new Error('장바구니 담기에 실패했습니다.');
        }
      }
      toast.success('장바구니에 담았습니다.');
      fetchServerCartCount();
      resetOptions();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsCartLoading(false);
    }
  };

  return (
    <div className="relative h-full min-w-0">
      <div className="min-w-0 space-y-7 pb-20">
        <p className="bg-category text-primary w-fit rounded-2xl p-1 text-sm">
          {categoryString}
        </p>

        <h1 className="sr-only">상품 상세 페이지</h1>

        <h2 className="text-body-md font-bold wrap-break-word">{name}</h2>

        <p className="text-primary text-2xl font-bold">
          {price.toLocaleString()}원
        </p>

        {hasOptions && (
          <div className="flex min-w-0 items-center gap-3 border-t py-4">
            <label
              htmlFor="option-select"
              className="text-body-sm shrink-0 text-gray-500"
            >
              옵션
            </label>
            <select
              id="option-select"
              className="w-full flex-1 rounded border border-gray-300 p-3 text-sm"
              defaultValue=""
              onChange={handleOptionSelect}
            >
              <option value="" disabled>
                옵션을 선택해주세요
              </option>
              {optionList.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* 선택된 옵션 목록 */}
        <div className="space-y-1">
          {selectedOptions.map((option) => (
            <SelectedOptionItem
              key={option.id}
              id={option.id}
              name={option.name}
              price={option.price}
              quantity={option.quantity}
              onQuantityChange={handleQuantityChange}
              onRemove={option.isDefault ? undefined : handleRemove}
            />
          ))}
        </div>

        {/* 총 상품금액 */}
        <div className="flex items-center justify-between py-4">
          <span className="text-body-sm text-gray-600">총 상품금액</span>
          <span className="text-primary text-2xl font-bold">
            {totalPrice.toLocaleString()}원
          </span>
        </div>
      </div>

      <div className="absolute right-0 bottom-0 left-0 flex gap-3 pt-4">
        {/* 북마크 버튼 */}
        <BookmarkButton productId={product._id} />

        {/* 알림 버튼 */}
        {/* <button
          aria-label="알림 설정"
          className="flex h-13 w-13 shrink-0 items-center justify-center rounded border border-gray-300"
        >
          <svg
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button> */}
        {/* 장바구니 */}
        <Button
          className="w-full rounded"
          onClick={selectOptionSubmit}
          disabled={isCartLoading}
        >
          {isCartLoading ? '담는 중...' : '장바구니'}
        </Button>
      </div>
    </div>
  );
}
