export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import { openai } from '@/lib/openai/client'
import { buildPrompt } from '@/lib/openai/prompt'

export async function POST(req: Request) {
  const { answers } = await req.json()

  const prompt = buildPrompt(answers)

  const response = await openai.responses.create({
    model: 'gpt-5-nano',
    input: prompt,
  })

  // 모델이 “반드시 JSON만” 주도록 프롬프트로 강제했으니
  // 일단 문자열 파싱
  const text = response.output_text?.trim() ?? '{}'
  const tags = JSON.parse(text)

  return NextResponse.json({ tags })
}
