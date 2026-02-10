import { ModalItem } from '@/app/(with-layout)/cart/page';
import { deleteCartItem, updateCartItem } from '@/lib/api/cart';
import { fetchServerCartCount } from '@/lib/zustand/cartStore';
import { CartItemOnList } from '@/types/cart.types';
import Image from 'next/image';
import Link from 'next/link';

interface CartListItem {
  item: CartItemOnList; // 표시할 상품 정보
  updateItem: (_id: number, item: Partial<CartItemOnList>) => void; // 상품 업데이트 함수
  items: CartItemOnList[]; // 전체 장바구니 상품 목록
  setItems: (items: CartItemOnList[]) => void; // 전체 목록 변경 함수
  setModalItem: (item: ModalItem) => void; // 모달 설정 함수
  setIsLoading: (loading: boolean) => void; // 로딩 상태 변경 함수
}

export default function CartListItem({
  item,
  updateItem,
  items,
  setItems,
  setModalItem,
  setIsLoading,
}: CartListItem) {
  const handleItemCheck = (_id: number) => {
    updateItem(_id, {
      checked: !items.find((item) => item._id === _id)?.checked,
    });
  };

  // 장바구니 상품 수량 변경
  const handleQuantityChange = async (_id: number, delta: number) => {
    const item = items.find((item) => item._id === _id);
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + delta); // 최소 1개 보장

    try {
      await updateCartItem(_id, { quantity: newQuantity }); // API 호출
      updateItem(_id, { quantity: newQuantity }); // 로컬 상태 업데이트
    } catch (error) {
      console.error('수량 변경 실패:', error);
    }
  };

  const handleDelete = async (_id: number) => {
    try {
      setIsLoading(true);
      await deleteCartItem(_id); // API로 삭제
      setItems(items.filter((item) => item._id !== _id)); // 목록에서 제거
      await fetchServerCartCount(); // 헤더 장바구니 수량 갱신
    } catch (error) {
      console.error('삭제 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <article
        key={item._id}
        className="mb-4 rounded border border-gray-300 bg-white px-[24px] pt-[24px] lg:px-[36px] lg:pt-[36px]"
      >
        {/* 스토어 정보 */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="text-body-md flex items-center gap-2">
            <li className="flex items-center gap-2">
              <Link href="/" className="cursor-pointer">
                {item.storeName}
              </Link>
              <span aria-hidden="true" className="text-gray-400">
                &gt;
              </span>
            </li>
          </ol>
        </nav>

        {/* 상품 상세 */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <input
            type="checkbox"
            className="h-4 w-4"
            id={`product-${item._id}`}
            aria-label={`${item.name} 상품 선택`}
            checked={item.checked}
            onChange={() => handleItemCheck(item._id)}
          />

          {/* 상품 이미지 */}
          <figure className="relative h-24 w-24 shrink-0">
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="96px"
              className="object-cover"
              aria-hidden="true"
            />
          </figure>
          {/* 상품 정보 */}
          <div className="flex flex-1 flex-col justify-between gap-4">
            <div className="flex flex-col">
              <div className="mb-2">
                <h3 className="text-body-md mb-1">상품명:{item.name}</h3>
                <p className="text-body-md text-gray-900">옵션:{item.option}</p>
              </div>
              {item.options.color && (
                <button
                  type="button"
                  className="text-body-sm cursor-pointer rounded-sm border border-gray-300 px-[50px] py-2 text-gray-900 max-[639px]:w-full max-[639px]:px-4 sm:self-start"
                  aria-label="상품 옵션 추가"
                  onClick={() => setModalItem({ ...item, type: 'add' })}
                >
                  옵션추가
                </button>
              )}
            </div>
            {/* 수량 및 가격 */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                {item.options && (
                  <button
                    className="text-body-sm mt-4 cursor-pointer rounded-sm border border-gray-300 px-3 py-1 text-gray-900"
                    aria-label="옵션 변경"
                    onClick={() => setModalItem({ ...item, type: 'edit' })}
                  >
                    옵션변경
                  </button>
                )}

                <fieldset
                  className="flex items-center gap-1"
                  role="group"
                  aria-label="수량 조절"
                >
                  <button
                    className="text-body-sm mt-4 cursor-pointer rounded-sm border border-gray-300 px-2 py-1 text-gray-900"
                    aria-label="수량 감소"
                    onClick={() => handleQuantityChange(item._id, -1)}
                  >
                    -
                  </button>
                  <label htmlFor={`quantity-${item._id}`} className="sr-only">
                    상품 수량
                  </label>
                  <input
                    id={`quantity-${item._id}`}
                    type="text"
                    value={item.quantity}
                    readOnly
                    className="text-body-sm mt-4 w-15 rounded-sm border border-gray-300 px-2 py-1 text-center text-gray-900"
                    aria-label="현재 수량"
                  />
                  <button
                    className="text-body-sm mt-4 cursor-pointer rounded-sm border border-gray-300 px-2 py-1 text-gray-900"
                    aria-label="수량 증가"
                    onClick={() => handleQuantityChange(item._id, 1)}
                  >
                    +
                  </button>
                </fieldset>
              </div>

              {/* 가격 및 삭제 */}
              <div className="flex items-center justify-end gap-2">
                <span
                  className="text-body-md mt-4 font-bold text-gray-900"
                  aria-label="상품 가격"
                >
                  {(item.price * item.quantity).toLocaleString()}원
                </span>
                <button
                  type="button"
                  aria-label="상품 삭제"
                  title="상품 삭제"
                  onClick={() => handleDelete(item._id)}
                  className="text-body-md cursor-pointer text-gray-900"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* 주문 금액 */}
        <div className="mt-[35px] flex items-center justify-end gap-2 border-t border-gray-300 pt-9">
          <span className="text-body-md mb-[98px] tracking-tighter text-gray-900">
            주문 금액
          </span>
          <output
            className="mb-[98px] text-lg font-bold"
            aria-label="총 주문 금액"
          >
            {(item.price * item.quantity).toLocaleString()}원
          </output>
        </div>
      </article>
    </>
  );
}
