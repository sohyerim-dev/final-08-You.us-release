import RecommendResultClient from '@/components/pages/recommend/RecommendResultClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '추천 결과',
  description: 'AI가 분석한 맞춤 선물 추천 결과를 확인하세요.',
};

export default function RecommendResultPage() {
  return <RecommendResultClient />;
}
