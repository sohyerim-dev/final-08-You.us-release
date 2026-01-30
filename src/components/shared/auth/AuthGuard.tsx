'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface AuthGuardProps {
  children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()

  useEffect(() => {
    // 로그인 여부 체크, 리다이렉트
  }, [router])

  return <>{children}</>
}
