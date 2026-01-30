'use client'

import NormalLogin from '@/components/pages/login/NormalLogin'
import SocialLogin from '@/components/pages/login/SocialLogin'
import { LoginType } from '@/types/login.types'
import { useState } from 'react'

export default function LoginPage() {
  const [loginType, setLoginType] = useState<LoginType>('normal')

  const handleLoginType = () => {
    setLoginType((prev) => (prev === 'normal' ? 'social' : 'normal'))
  }

  return loginType === 'normal' ? (
    <NormalLogin handleLoginType={handleLoginType} />
  ) : (
    <SocialLogin handleLoginType={handleLoginType} />
  )
}
