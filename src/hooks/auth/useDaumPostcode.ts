'use client';

import { useEffect, useState } from 'react';
import type { DaumPostcodeData } from '@/types/daum.types';

export default function useDaumPostcode() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(() => {
    if (typeof window !== 'undefined' && window.daum?.Postcode) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    // 서버에서 실행 방지
    if (typeof window === 'undefined') return;

    // 이미 로드됐으면 스킵
    if (window.daum?.Postcode) {
      return;
    }

    const script = document.createElement('script');
    script.src =
      '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      // cleanup 시 스크립트 제거
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const openPostcode = (onComplete: (data: DaumPostcodeData) => void) => {
    if (typeof window === 'undefined') return;

    if (!isScriptLoaded || !window.daum) {
      console.error('Daum Postcode script not loaded');
      return;
    }

    new window.daum.Postcode({ oncomplete: onComplete }).open();
  };

  return { openPostcode, isScriptLoaded };
}
