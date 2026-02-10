import DeliveredIcon from '@/components/pages/mypage/orders/DeliveredIcon';
import ShippingIcon from '@/components/pages/mypage/orders/ShippingIcon';

export default function OrderStatusHeader({
  status,
  date,
}: {
  status: 'SHIPPING' | 'DELIVERED';
  date: string;
}) {
  const isDelivered = status === 'DELIVERED';

  return (
    <div className="border-primary ml-3 flex items-center border-y bg-white p-2">
      {isDelivered ? <DeliveredIcon /> : <ShippingIcon />}
      <p
        className={`text-body-md font-bold ${
          isDelivered ? 'text-gray-500' : 'text-primary'
        }`}
      >
        {isDelivered ? '배송완료' : '배송중'}
      </p>
      <time className="text-body-sm ml-7.5 text-gray-500">
        {date.slice(0, 10)}
      </time>
    </div>
  );
}
