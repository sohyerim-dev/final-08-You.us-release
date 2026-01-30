interface paginationType {
  currentPage?: number
  totalPages?: number
  onPageChange: (page: number) => void
  maxVisible?: number
}

const Pagination = ({
  currentPage = 1,
  totalPages = 10,
  onPageChange,
  maxVisible = 5, // 한번에 보여줄 페이지 수
}: paginationType) => {
  // 페이지 범위 계산
  const getPageNumbers = () => {
    const pages = []
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    let endPage = Math.min(totalPages, startPage + maxVisible - 1)

    // 끝쪽에 있을 때 시작 페이지 조정
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    return pages
  }

  //이전 버튼
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }
  //다음 버튼
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <div className="flex items-center gap-2">
      {/* 이전 버튼 */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 transition-all hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
          <path
            d="M6 10L2 6L6 2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* 페이지 번호들 */}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`h-10 w-10 rounded-xl font-bold italic transition-all ${
            page === currentPage
              ? 'bg-primary text-gray-50 shadow-md'
              : 'border border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      ))}

      {/* 다음 버튼 */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 transition-all hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
          <path
            d="M2 2L6 6L2 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  )
}

export default Pagination
