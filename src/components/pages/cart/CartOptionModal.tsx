'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/common/Button';
import { CartItemForCreate, CartItemOnList } from '@/types/cart.types';

import { addToCart, updateCart } from '@/lib/api/cart';
import { ModalItem } from '@/components/pages/cart/CartPageClient';

interface CartAddOptionProps {
  modalItem: ModalItem; // 모달에 표시할 상품 정보
  setItems: (items: CartItemOnList[]) => void; // 장바구니 목록 업데이트 함수
  setModalItem: (item: ModalItem | null) => void; // 모달 닫기 함수
}

export default function CartOptionModal({
  modalItem,
  setModalItem,
  setItems,
}: CartAddOptionProps) {
  const [selectedOption, setSelectedOption] = useState(
    modalItem.type === 'edit' ? modalItem.option : modalItem.options.color?.[0],
  );
  const [quantity, setQuantity] = useState(
    modalItem.type === 'edit' ? modalItem.quantity : 1,
  );
  const handleAdd = async () => {
    // 1. 새 장바구니 아이템 생성
    const newItem: CartItemForCreate = {
      product_id: modalItem.product_id,
      quantity: quantity,
      color: selectedOption,
    };
    // 3. 성공 시 장바구니 목록 업데이트
    const res = await addToCart(newItem);
    // 2. API 호출 - 장바구니에 추가

    if (res.ok) {
      const items: CartItemOnList[] = res.item.map((item) => ({
        _id: item._id,
        product_id: item.product_id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        checked: false, // 새로 추가된 상품은 체크 해제
        option: item.color,
        options: item.product.extra.options,
        image: item.product.image?.path || '',
        storeName: item.product.seller?.name || '',
      }));
      setItems(items); // 전체 장바구니 목록 갱신
    }
    handleClose(); // 모달 닫기
  };

  const handleUpdate = async () => {
    // 1. 수정할 아이템 정보
    const updateItem: CartItemForCreate = {
      _id: modalItem._id, // 기존 아이템 ID 포함
      product_id: modalItem.product_id,
      quantity: quantity,
      color: selectedOption,
    };

    // 2. API 호출 - 장바구니 아이템 수정
    const res = await updateCart(updateItem);

    // 3. 성공 시 장바구니 목록 업데이트 (handleAdd와 동일)
    if (res.ok) {
      const items: CartItemOnList[] = res.item.map((item) => ({
        _id: item._id,
        product_id: item.product_id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        checked: false,
        option: item.color,
        options: item.product.extra.options,
        image: item.product.image?.path || '',
        storeName: item.product.seller?.name || '',
      }));
      setItems(items);
    }
    handleClose();
  };

  const handleClose = () => {
    setModalItem(null); // 모달 아이템을 null로 설정 → 모달 사라짐
  };
  return (
    <>
      <div
        className="bg-opacity-50 fixed inset-0 z-40 bg-gray-900 opacity-80"
        onClick={handleClose}
      />

      {/* 모달 컨텐츠 */}
      <div className="fixed top-1/2 left-1/2 z-50 w-full max-w-[300px] -translate-x-1/2 -translate-y-1/2 rounded bg-gray-100 p-4 shadow-xl">
        {/* 상품 이미지 */}
        <div className="mb-4 flex justify-center">
          <Image
            src={modalItem.image}
            alt={modalItem.name}
            width={300}
            height={300}
            className="object-contain"
          />
        </div>

        {/* 상품명 */}
        <p className="text-body-sm mb-2 text-gray-900">{modalItem.name}</p>

        {/* 가격 */}
        <p className="text-body-sm mb-4 font-bold">
          {modalItem.price.toLocaleString()}원
        </p>

        {/* 옵션 추가 */}
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="text-body-sm mb-4 w-full cursor-pointer rounded-sm border border-gray-300 bg-gray-50 p-2 text-center"
        >
          {modalItem.options.color?.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>

        {/* 수량 조절 */}
        <div className="mb-6 flex items-center justify-end gap-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="flex h-8 w-6 cursor-pointer items-center justify-center rounded-sm border border-gray-300 bg-gray-50"
          >
            -
          </button>
          <span className="w-5 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="flex h-8 w-6 cursor-pointer items-center justify-center rounded-sm border border-gray-300 bg-gray-50"
          >
            +
          </button>
        </div>

        {/* 취소/추가 버튼 */}
        <div className="flex gap-5">
          <Button
            onClick={handleClose}
            className="flex-1 border border-gray-300 bg-gray-50 py-3 text-gray-900 hover:bg-gray-50 hover:text-gray-900"
          >
            취소
          </Button>
          <Button
            onClick={() =>
              modalItem.type === 'edit' ? handleUpdate() : handleAdd()
            }
            className="flex-1 py-3 text-gray-50"
          >
            {modalItem.type === 'edit' ? '수정' : '추가'}
          </Button>
        </div>
      </div>
    </>
  );
}
