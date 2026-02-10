type EmptyStateProps = {
  message: string;
  description?: string;
  action?: React.ReactNode;
};

export default function EmptyState({
  message,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-2 text-center">
      <p className="text-body-md text-gray-500">{message}</p>

      {description && (
        <p className="text-body-sm text-gray-400">{description}</p>
      )}

      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
