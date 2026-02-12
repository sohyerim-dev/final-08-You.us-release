'use client';

import AddressInfo from '@/components/pages/checkout/AddressInfo';
import OrderItems from '@/components/pages/checkout/OrderItems';
import PaymentButton from '@/components/pages/checkout/PaymentButton';
import PaymentMethod from '@/components/pages/checkout/PaymentMethod';
import UserInfo from '@/components/pages/checkout/UserInfo';
import getCartItems, { createOrder, deleteCartItems } from '@/lib/api/checkout';
import useUserStore from '@/lib/zustand/auth/userStore';
import { OrderItem } from '@/types/checkout.types';

import Link from 'next/link';
import Script from 'next/script';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import Loading from '@/components/common/Loading';
import { toast } from 'react-toastify';

export default function CheckoutClient() {
  const { user } = useUserStore();
  const router = useRouter();

  const searchParams = useSearchParams();
  const cartItemIds = searchParams.get('id');
  const ArrayCartItemIds = useMemo(() => {
    return cartItemIds?.split(',').map(Number) || [];
  }, [cartItemIds]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [shippingFees, setShippingFees] = useState(3000);
  const [paymentMethod, setPaymentMethod] = useState('deposit');
  const [sumPrice, setSumPrice] = useState(0);
  const [agreePayment, setAgreePayment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [addressInfo, setAddressInfo] = useState({
    name: '',
    phone: '',
    address: '',
    detailAddress: '',
    postalCode: '',
    isDefault: true,
  });
  const [isDefaultAddress, setIsDefaultAddress] = useState(true);

  const isAddressValid =
    isDefaultAddress ||
    !!(
      addressInfo.name &&
      addressInfo.phone &&
      addressInfo.address &&
      addressInfo.detailAddress &&
      addressInfo.postalCode
    );

  useEffect(() => {
    if (!user) {
      const currentPath = window.location.pathname;
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
    }
  }, [user, router]);

  useEffect(() => {
    if (user) {
      const hasAddress = !!(
        user.address?.streetAddress && user.address?.postalCode
      );

      setIsDefaultAddress(hasAddress);

      if (hasAddress) {
        setAddressInfo({
          name: user.name,
          phone: user.phone || '',
          address: user.address.streetAddress.split(',')[0] || '',
          detailAddress: user.address.streetAddress.split(',')[1] || '',
          postalCode: user.address.postalCode,
          isDefault: true,
        });
      } else {
        setAddressInfo({
          name: '',
          phone: '',
          address: '',
          detailAddress: '',
          postalCode: '',
          isDefault: false,
        });
      }
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const fetchCartItems = async () => {
      const items = await getCartItems();
      console.log('아이템즈:', items);
      setShippingFees(items.cost.shippingFees);
      if (items?.item && ArrayCartItemIds) {
        const item = items.item.filter((item) =>
          ArrayCartItemIds.includes(item._id),
        );
        console.log('아이디 배열:', ArrayCartItemIds);
        console.log('필터링된 아이템:', item);
        if (item && item.length > 0) {
          const orders = item.map((item) => ({
            _id: item.product._id,
            image: item.product.image,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            ...(item.size && { size: item.size }),
            ...(item.color && { color: item.color }),
          }));

          setOrderItems(orders);
          console.log('주문 아이템:', orders);
          setSumPrice(
            orders.reduce((sum, item) => sum + item.price * item.quantity, 0),
          );
        }
      }
    };

    fetchCartItems();
  }, [user, ArrayCartItemIds]);

  const handleOrder = async () => {
    if (!user) return;

    if (!isAddressValid) {
      toast.warn('배송지 정보를 모두 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      const orderData = {
        products: orderItems.map((item) => ({
          _id: item._id,
          quantity: item.quantity,
          ...(item.size && { size: item.size }),
          ...(item.color && { color: item.color }),
        })),
        address: {
          name: addressInfo.name,
          value: `${addressInfo.postalCode} ${addressInfo.address}, ${addressInfo.detailAddress}`,
        },
        state: 'OS010',
      };

      console.log('주문 데이터:', orderData);

      const result = await createOrder(orderData);

      if (result.ok === 1) {
        try {
          await deleteCartItems(ArrayCartItemIds);
          console.log('장바구니 삭제 완료');
        } catch (error) {
          console.error('장바구니 삭제 실패:', error);
        }

        router.push(`/checkout/result?orderId=${result.item._id}`);
      } else {
        toast.error('주문에 실패했습니다.');
      }
    } catch (error) {
      console.error('주문 실패:', error);
      toast.error('주문 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardPayment = async () => {
    if (!user || !window.IMP) {
      toast.warn('결제 모듈을 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    if (!isAddressValid) {
      toast.warn('배송지 정보를 모두 입력해주세요.');
      return;
    }

    if (orderItems.length === 0) {
      toast.warn('주문할 상품이 없습니다.');
      return;
    }

    setIsLoading(true);

    const totalAmount = sumPrice + shippingFees;
    // const totalAmount = 1000;
    const merchantUid = `order_${Date.now()}`;
    const productName =
      orderItems.length > 1
        ? `${orderItems[0]?.name || '상품'} 외 ${orderItems.length - 1}건`
        : orderItems[0]?.name || '상품';

    try {
      window.IMP.request_pay(
        {
          channelKey: 'channel-key-bf43e218-5567-4875-96da-3270e1fba054',
          pay_method: 'card',
          merchant_uid: merchantUid,
          name: productName,
          amount: totalAmount,
          buyer_email: user.email,
          buyer_name: addressInfo.name,
          buyer_tel: addressInfo.phone || user.phone || '',
          buyer_addr: `${addressInfo.address}, ${addressInfo.detailAddress}`,
          buyer_postcode: addressInfo.postalCode,
        },
        async (response) => {
          if (response.success) {
            console.log('결제 성공:', response);

            try {
              const orderData = {
                products: orderItems.map((item) => ({
                  _id: item._id,
                  quantity: item.quantity,
                  ...(item.size && { size: item.size }),
                  ...(item.color && { color: item.color }),
                })),
                address: {
                  name: addressInfo.name,
                  value: `${addressInfo.postalCode} ${addressInfo.address}, ${addressInfo.detailAddress}`,
                },
                state: 'OS020',
              };

              const result = await createOrder(orderData);

              if (result.ok === 1) {
                try {
                  await deleteCartItems(ArrayCartItemIds);
                  console.log('장바구니 삭제 완료');
                } catch (error) {
                  console.error('장바구니 삭제 실패:', error);
                }

                router.push(`/checkout/result?orderId=${result.item._id}`);
              } else {
                toast.error('주문 생성에 실패했습니다.');
                setIsLoading(false);
              }
            } catch (error) {
              console.error('주문 생성 실패:', error);
              toast.error('주문 처리 중 오류가 발생했습니다.');
              setIsLoading(false);
            }
          } else {
            console.error('결제 실패:', response);
            toast.error(`결제에 실패했습니다: ${response.error_msg}`);
            setIsLoading(false);
          }
        },
      );
    } catch (error) {
      console.error('카드결제 오류:', error);
      toast.error('결제 중 오류가 발생했습니다.');
      setIsLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  if (orderItems.length === 0) {
    return <Loading />;
  }

  return (
    <>
      <Script
        src="https://cdn.iamport.kr/v1/iamport.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (window.IMP) {
            window.IMP.init('imp14397622');
            console.log('Iamport 초기화 완료');
          }
        }}
      />

      <div className="mx-auto w-full bg-gray-50 px-4 pt-6.25 lg:flex lg:max-w-375 lg:min-w-5xl lg:flex-row lg:justify-center lg:gap-15 lg:px-6.25">
        <h1 className="sr-only">주문・결제 페이지</h1>
        <div className="mb-15 lg:w-200">
          <OrderItems items={orderItems} />
          <form className="mt-7.5">
            <UserInfo user={user} />
            <AddressInfo
              user={user}
              onAddressChange={setAddressInfo}
              isDefaultAddress={isDefaultAddress}
              setIsDefaultAddress={setIsDefaultAddress}
            />
            <PaymentMethod
              payment={paymentMethod}
              setPayment={setPaymentMethod}
            />
          </form>
        </div>
        <section
          aria-labelledby="final-payment-title"
          className="mt-7.5 mb-7.5 h-fit rounded-[14px] border border-gray-200 bg-white px-4 py-7 lg:w-115 lg:px-6"
        >
          <h2
            id="final-payment-title"
            className="text-primary border-primary text-body-md inline-block border-b-2 pb-1 font-bold"
          >
            최종 결제 금액
          </h2>

          <dl className="mt-6">
            <div className="flex items-center justify-between border-b border-gray-200 py-1">
              <dt className="text-body-sm font-medium text-gray-900">
                주문금액
              </dt>
              <dd className="text-body-sm text-gray-900">
                <data value={sumPrice}>{sumPrice.toLocaleString()}원</data>
              </dd>
            </div>

            <div className="flex items-center justify-between py-1">
              <dt className="text-body-sm font-medium text-gray-900">배송비</dt>
              <dd className="text-body-sm text-gray-900">
                <data value={shippingFees}>
                  {shippingFees.toLocaleString()}원
                </data>
              </dd>
            </div>
          </dl>

          <div
            aria-live="polite"
            className="mt-5 flex items-baseline justify-end gap-6"
          >
            <strong className="text-body-md font-bold text-gray-900">
              총 금액
            </strong>
            <strong className="text-primary text-body-md font-extrabold">
              <data value={sumPrice + shippingFees}>
                {(sumPrice + shippingFees).toLocaleString()}원
              </data>
            </strong>
          </div>

          <hr className="my-6 border-gray-200" />

          <div className="flex items-center gap-3">
            <input
              id="agreePayment"
              name="agreePayment"
              type="checkbox"
              required
              checked={agreePayment}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setAgreePayment(e.target.checked);
              }}
              className="accent-primary h-3 w-3 shrink-0"
            />
            <label
              htmlFor="agreePayment"
              className="text-body-sm font-medium text-gray-900"
            >
              주문 내용 확인 및 결제 동의{' '}
              <span className="text-gray-900">(필수)</span>
            </label>
          </div>

          <div className="text-body-sm mt-3 space-y-2 pl-6 text-gray-400">
            <Link href="#" className="underline underline-offset-4">
              개인정보 수집 및 이용 동의
            </Link>
          </div>
          <PaymentButton
            paymentMethod={paymentMethod}
            agreePayment={agreePayment && isAddressValid}
            onOrder={handleOrder}
            onCardPayment={handleCardPayment}
            isLoading={isLoading}
          />
        </section>
      </div>
    </>
  );
}
