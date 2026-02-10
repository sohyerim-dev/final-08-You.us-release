export default function ProductDtailContent({ content }: { content: string }) {
  return (
    <div className="space-y-8 py-8">
      {/* 상품정보 */}
      <div
        className="[&_img]:!mx-auto [&_img]:!block [&_img]:!w-full [&_img]:!max-w-[500px]"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
