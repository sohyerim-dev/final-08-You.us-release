'use client';

import Button from '@/components/ui/Button';
import { useEffect, useRef, useState } from 'react';

type Props = {
  question: string;
  autoFocus?: boolean;
  options?: readonly string[];
  initialValue?: string;
  onDone: (value: string) => void;
};

const OTHER = '기타';

export default function QuestionBox({
  question,
  autoFocus,
  options,
  initialValue,
  onDone,
}: Props) {
  const hasOptions = !!options && options.length > 0;

  // initialValue가 선택지 중 하나면 선택형 유지, 아니면(기타 직접입력) 텍스트 입력 상태로
  const isInitialOther =
    initialValue !== undefined &&
    hasOptions &&
    !options.includes(initialValue as string);

  const [showInput, setShowInput] = useState(!hasOptions || isInitialOther);
  const [value, setValue] = useState(
    isInitialOther ? (initialValue ?? '') : '',
  );
  const [enter, setEnter] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => setEnter(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (autoFocus && showInput) inputRef.current?.focus();
  }, [autoFocus, showInput]);

  const handleOptionClick = (option: string) => {
    if (option === OTHER) {
      setShowInput(true);
    } else {
      onDone(option);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onDone(trimmed);
    setValue('');
  };

  return (
    <div
      className={[
        'mt-[5vh] w-[calc(100%-2rem)] sm:w-[90%] md:w-[85%] lg:w-135 lg:max-w-135',
        'transition duration-800 ease-out',
        enter ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
      ].join(' ')}
    >
      <fieldset className="card border-primary flex w-full flex-col items-center gap-0 overflow-hidden rounded-[40px] border bg-gray-50">
        <legend className="sr-only">선물 추천 질문</legend>

        {/* 질문 헤더 */}
        <div className="bg-primary flex h-32 w-full flex-col items-center justify-center rounded-none px-6 py-0">
          <h2 className="text-body-lg text-center font-bold text-gray-50">
            {question}
          </h2>
        </div>

        {/* 선택형 UI */}
        {hasOptions && !showInput ? (
          <div className="grid w-full grid-cols-2 gap-3 px-6 py-6">
            {options.map((option) => {
              const isSelected = initialValue === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleOptionClick(option)}
                  className={[
                    'flex items-center gap-2 rounded-xl border-2 px-3 py-3 text-sm font-medium transition',
                    option === OTHER
                      ? 'col-span-2 justify-center'
                      : 'justify-start',
                    isSelected
                      ? 'bg-primary border-primary text-white'
                      : 'border-primary/40 text-primary hover:bg-primary/10',
                  ].join(' ')}
                >
                  {/* 체크박스 아이콘 */}
                  <span
                    className={[
                      'flex h-4 w-4 shrink-0 items-center justify-center rounded border-2',
                      isSelected
                        ? 'border-white bg-white'
                        : 'border-primary/60 bg-transparent',
                    ].join(' ')}
                  >
                    {isSelected && (
                      <svg
                        className="text-primary h-2.5 w-2.5"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  {option}
                </button>
              );
            })}
          </div>
        ) : (
          /* 텍스트 입력 UI */
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="flex w-full flex-col items-center gap-0 px-0 pb-10"
          >
            {hasOptions && (
              <button
                type="button"
                onClick={() => {
                  setShowInput(false);
                  setValue('');
                }}
                className="border-primary/40 text-primary hover:bg-primary/10 mt-5 mb-5 flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                선택지로 돌아가기
              </button>
            )}

            <label htmlFor="answer" className="sr-only">
              답변
            </label>
            <input
              ref={inputRef}
              id="answer"
              name="answer"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="직접 입력해 주세요."
              className="border-primary text-primary w-full rounded-xl border-2 bg-gray-50 p-4 outline-0 lg:w-82.5 lg:rounded-[10px] lg:p-2.5"
              autoComplete="off"
            />
            <Button
              type="submit"
              className="w-full leading-4 lg:mt-7.5 lg:w-auto"
            >
              입력
            </Button>
          </form>
        )}
      </fieldset>
    </div>
  );
}
