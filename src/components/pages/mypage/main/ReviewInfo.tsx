type ReviewInfoProps = {
  deliveryStatus: 'SHIPPING' | 'DELIVERED';
  reviewStatus: 'NONE' | 'WRITTEN';
  scope: { rating: number } | null;
};

export default function ReviewInfo({
  deliveryStatus,
  reviewStatus,
  scope,
}: ReviewInfoProps) {
  if (deliveryStatus === 'SHIPPING') return null;

  if (reviewStatus === 'NONE' || scope === null) {
    return (
      <span>
        <span className="text-gray-300">☆☆☆☆☆</span> ?/5
      </span>
    );
  }

  return (
    <p>
      <span className="text-primary">{'★'.repeat(scope.rating)}</span>
      <span className="text-gray-300">{'★'.repeat(5 - scope.rating)}</span>
      {scope.rating}/5
    </p>
  );
}
