'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-4xl font-bold">오류 발생</h1>
      <p className="mb-8 text-gray-600">
        문제가 발생했습니다. 다시 시도해주세요.
      </p>
      <button
        onClick={reset}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        다시 시도
      </button>
    </div>
  );
}
