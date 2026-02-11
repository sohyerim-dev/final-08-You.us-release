import DeliveredIcon from '@/components/pages/mypage/orders/DeliveredIcon';
import ShippingIcon from '@/components/pages/mypage/orders/ShippingIcon';
import { OrderState } from '@/types/order.types';

const ORDER_STATUS_MAP: Record<OrderState, string> = {
  OS010: '주문완료',
  OS020: '결제완료',
  OS030: '배송준비중',
  OS035: '배송중',
  OS040: '배송완료',
};

export default function OrderStatusHeader({
  status,
  date,
}: {
  status: string;
  date: string;
}) {
  const label = ORDER_STATUS_MAP[status as OrderState] ?? '주문완료';
  const isDelivered = status === 'OS040';

  return (
    <div className="border-primary ml-3 flex items-center border-y bg-white p-2">
      {isDelivered ? <DeliveredIcon /> : <ShippingIcon />}
      <p
        className={`text-body-md font-bold ${
          isDelivered ? 'text-gray-500' : 'text-primary'
        }`}
      >
        {label}
      </p>
      <time className="text-body-sm ml-7.5 text-gray-500">
        {date.slice(0, 10)}
      </time>
    </div>
  );
}
