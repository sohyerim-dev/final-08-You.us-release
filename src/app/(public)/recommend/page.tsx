import RecommendClient from '@/components/pages/recommend/RecommendClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '선물 추천 테스트',
  description: '간단한 질문에 답하고 딱 맞는 선물을 추천받으세요.',
};

export default function RecommendPage() {
  return <RecommendClient />;
}
