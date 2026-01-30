'use client'

import Button from '@/components/common/Button'
import { useEffect, useRef, useState } from 'react'

type Props = {
  question: string
  example?: string
  autoFocus?: boolean
  onDone: (value: string) => void
}

export default function QuestionBox({
  question,
  example,
  autoFocus,
  onDone,
}: Props) {
  const [value, setValue] = useState('')
  const [enter, setEnter] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const id = requestAnimationFrame(() => setEnter(true))
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus()
  }, [autoFocus])

  return (
    <div
      className={[
        'mt-[5vh] w-[calc(100%-2rem)] sm:w-[90%] md:w-[85%] lg:w-135 lg:max-w-135',
        'transition duration-800 ease-out',
        enter ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
      ].join(' ')}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onDone(value)
          setValue('')
        }}
        autoComplete="off"
        className="flex flex-col items-center gap-5 lg:gap-0"
      >
        <fieldset className="lg:card lg:border-primary flex w-full flex-col items-center gap-5 lg:gap-0 lg:overflow-hidden lg:rounded-[40px] lg:border lg:bg-gray-50">
          <legend className="sr-only">선물 추천 질문</legend>

          <div className="bg-primary flex w-full flex-col items-center justify-center rounded-2xl px-6 py-5 sm:rounded-3xl sm:px-8 sm:py-6 lg:h-32 lg:rounded-none lg:py-0">
            <h2 className="text-body-lg text-center font-bold text-gray-50">
              {question}
            </h2>
            {example && (
              <h3 className="text-body-sm mt-2 text-center font-normal text-gray-50 lg:hidden">
                {example}
              </h3>
            )}
          </div>

          {example && (
            <h3 className="text-body-md text-gray-90 hidden px-4 text-center font-bold lg:my-8.75 lg:block">
              {example}
            </h3>
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
            placeholder="질문에 대한 답을 적어주세요."
            className="border-primary text-primary w-full rounded-xl border-2 bg-gray-50 p-4 outline-0 lg:w-82.5 lg:rounded-[10px] lg:p-2.5"
            autoComplete="off"
          />

          <Button
            type="submit"
            className="w-full leading-4 lg:mt-7.5 lg:mb-10 lg:w-auto"
          >
            입력
          </Button>
        </fieldset>
      </form>
    </div>
  )
}
