'use client';

import { useEffect } from 'react';
import Button from '@/components/common/Button';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy';
}

export default function TermsModal({ isOpen, onClose, type }: TermsModalProps) {
  // ESC 키로 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      // 스크롤 방지
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black"
      onClick={onClose}
    >
      <div
        className="relative mx-4 h-[80vh] w-full max-w-4xl overflow-hidden rounded-lg bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="sticky top-0 flex items-center justify-between border-b bg-white px-6 py-4">
          <h2 className="text-xl font-bold">
            {type === 'terms' ? '이용약관' : '개인정보 처리방침'}
          </h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-gray-700"
            aria-label="닫기"
          >
            ×
          </button>
        </div>

        {/* 내용 */}
        <div className="h-[calc(80vh-130px)] overflow-y-auto px-6 py-4">
          {type === 'terms' ? <TermsContent /> : <PrivacyContent />}
        </div>

        {/* 푸터 */}
        <div className="sticky bottom-0 border-t bg-white px-6 py-4">
          <Button onClick={onClose} className="w-full">
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}

// 이용약관 내용
function TermsContent() {
  return (
    <div className="prose max-w-none">
      <p className="text-sm text-gray-600">시행일: 2025년 2월 5일</p>

      <h3 className="mt-6 text-lg font-bold">제1조 (목적)</h3>
      <p>
        본 약관은 You,Us(이하 &apos;회사&apos;)가 제공하는 선물 추천 서비스(이하
        &apos;서비스&apos;)의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및
        책임사항, 서비스 이용조건 및 절차 등 기본적인 사항을 규정함을 목적으로
        합니다.
      </p>

      <h3 className="mt-6 text-lg font-bold">제2조 (용어의 정의)</h3>
      <ol className="list-decimal pl-5">
        <li>
          &apos;서비스&apos;란 회사가 제공하는 AI 기반 선물 추천 플랫폼 및 관련
          제반 서비스를 의미합니다.
        </li>
        <li>
          &apos;회원&apos;이란 본 약관에 동의하고 회사와 서비스 이용계약을
          체결한 자를 말합니다.
        </li>
        <li>
          &apos;아이디(ID)&apos;란 회원의 식별과 서비스 이용을 위하여 회원이
          설정하고 회사가 승인한 이메일 주소를 말합니다.
        </li>
        <li>
          &apos;비밀번호&apos;란 회원이 부여받은 아이디와 일치된 회원임을
          확인하고 회원의 권익 보호를 위하여 회원이 선정한 문자와 숫자의 조합을
          말합니다.
        </li>
      </ol>

      <h3 className="mt-6 text-lg font-bold">제3조 (약관의 효력 및 변경)</h3>
      <ol className="list-decimal pl-5">
        <li>
          본 약관은 서비스를 이용하고자 하는 모든 회원에 대하여 그 효력을
          발생합니다.
        </li>
        <li>
          회사는 필요한 경우 관련 법령을 위배하지 않는 범위 내에서 본 약관을
          변경할 수 있습니다.
        </li>
        <li>
          약관이 변경되는 경우 회사는 변경사항을 시행일자 7일 전부터 서비스 내
          공지사항을 통해 공지합니다.
        </li>
        <li>
          회원이 변경된 약관에 동의하지 않는 경우, 서비스 이용을 중단하고
          고객센터를 통해 이용 중단을 요청할 수 있습니다.
        </li>
      </ol>

      <h3 className="mt-6 text-lg font-bold">제4조 (회원가입)</h3>
      <ol className="list-decimal pl-5">
        <li>
          회원가입은 이용자가 약관의 내용에 대하여 동의를 한 다음 회원가입
          신청을 하고 회사가 이러한 신청에 대하여 승낙함으로써 체결됩니다.
        </li>
        <li>
          회원가입 시 다음 정보를 제공해야 합니다:
          <ul className="mt-2 list-disc pl-5">
            <li>이메일 주소</li>
            <li>비밀번호</li>
            <li>이름</li>
            <li>연락처</li>
            <li>배송지 정보(우편번호, 주소, 상세주소)</li>
          </ul>
        </li>
        <li>
          회사는 다음 각 호에 해당하는 경우 회원가입을 거부하거나 사후에
          회원자격을 제한 또는 정지시킬 수 있습니다:
          <ul className="mt-2 list-disc pl-5">
            <li>타인의 명의를 도용한 경우</li>
            <li>허위 정보를 기재한 경우</li>
            <li>만 14세 미만인 경우</li>
            <li>
              기타 회원으로 등록하는 것이 회사의 기술상 현저히 지장이 있다고
              판단되는 경우
            </li>
          </ul>
        </li>
      </ol>

      <h3 className="mt-6 text-lg font-bold">
        제5조 (개인정보의 보호 및 관리)
      </h3>
      <ol className="list-decimal pl-5">
        <li>
          회사는 관련 법령이 정하는 바에 따라 회원의 개인정보를 보호하기 위해
          노력합니다.
        </li>
        <li>
          개인정보의 보호 및 사용에 대해서는 관련 법령 및 회사의
          개인정보처리방침이 적용됩니다.
        </li>
        <li>
          회원은 언제든지 자신의 개인정보를 조회하거나 수정할 수 있습니다.
        </li>
      </ol>

      <h3 className="mt-6 text-lg font-bold">제6조 (회원의 의무)</h3>
      <ol className="list-decimal pl-5">
        <li>
          회원은 다음 행위를 하여서는 안 됩니다:
          <ul className="mt-2 list-disc pl-5">
            <li>신청 또는 변경 시 허위내용의 등록</li>
            <li>타인의 정보 도용</li>
            <li>회사가 게시한 정보의 변경</li>
            <li>회사와 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
            <li>
              회사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위
            </li>
            <li>외설 또는 폭력적인 정보를 공개 또는 게시하는 행위</li>
          </ul>
        </li>
        <li>
          회원은 관계법령, 본 약관의 규정, 이용안내 및 서비스와 관련하여 공지한
          주의사항을 준수하여야 합니다.
        </li>
      </ol>

      <h3 className="mt-6 text-lg font-bold">제7조 (서비스의 제공 및 변경)</h3>
      <ol className="list-decimal pl-5">
        <li>
          회사는 다음과 같은 서비스를 제공합니다:
          <ul className="mt-2 list-disc pl-5">
            <li>AI 기반 선물 추천 서비스</li>
            <li>상품 정보 제공 서비스</li>
            <li>커뮤니티 서비스</li>
            <li>기타 회사가 추가 개발하거나 제휴를 통해 제공하는 서비스</li>
          </ul>
        </li>
        <li>
          회사는 서비스의 내용을 변경할 수 있으며, 변경 시 변경사항을 사전에
          공지합니다.
        </li>
      </ol>

      <h3 className="mt-6 text-lg font-bold">제8조 (서비스의 중단)</h3>
      <ol className="list-decimal pl-5">
        <li>
          회사는 설비의 보수점검, 교체, 고장, 통신두절 또는 운영상 상당한 이유가
          있는 경우 서비스 제공을 일시적으로 중단할 수 있습니다.
        </li>
        <li>제1항에 의한 서비스 중단의 경우 회사는 사전에 공지합니다.</li>
      </ol>

      <h3 className="mt-6 text-lg font-bold">제9조 (계약 해지 및 이용 제한)</h3>
      <ol className="list-decimal pl-5">
        <li>
          회원이 서비스 이용을 중단하고자 하는 경우,
          고객센터(support@you-us.com)를 통해 이용 중단을 요청할 수 있습니다.
        </li>
        <li>
          회사는 회원이 본 약관을 위반한 경우 사전통지 없이 이용계약을
          해지하거나 서비스 이용을 제한할 수 있습니다.
        </li>
      </ol>

      <h3 className="mt-6 text-lg font-bold">제10조 (면책조항)</h3>
      <ol className="list-decimal pl-5">
        <li>
          회사는 천재지변 등 불가항력으로 인하여 서비스를 제공할 수 없는 경우
          책임이 면제됩니다.
        </li>
        <li>
          회사는 회원의 귀책사유로 인한 서비스 이용 장애에 대하여 책임을 지지
          않습니다.
        </li>
        <li>
          회사가 제공하는 AI 추천 결과는 참고용이며, 최종 구매 결정은 회원의
          책임입니다.
        </li>
      </ol>

      <h3 className="mt-6 text-lg font-bold">제11조 (분쟁의 해결)</h3>
      <p>
        서비스 이용으로 발생한 분쟁에 대해 소송이 제기될 경우 회사의 본사
        소재지를 관할하는 법원을 전속 관할 법원으로 합니다.
      </p>

      <div className="mt-8 border-t pt-4">
        <p className="text-sm text-gray-600">
          <strong>고객센터</strong>
          <br />
          이메일: support@you-us.com
          <br />
          운영시간: 평일 09:00 - 18:00 (주말 및 공휴일 제외)
          <br />
          <br />
        </p>
      </div>
    </div>
  );
}

// 개인정보 처리방침 내용
function PrivacyContent() {
  return (
    <div className="prose max-w-none">
      <p className="text-sm text-gray-600">시행일: 2025년 2월 5일</p>

      <h3 className="mt-6 text-lg font-bold">제1조 (개인정보의 처리 목적)</h3>
      <p>
        회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는
        개인정보는 다음의 목적 이외의 용도로는 이용되지 않습니다.
      </p>
      <ol className="list-decimal pl-5">
        <li>
          <strong>회원 가입 및 관리</strong>
          <br />
          회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격
          유지·관리
        </li>
        <li>
          <strong>재화 또는 서비스 제공</strong>
          <br />
          물품배송, 서비스 제공, 콘텐츠 제공, 맞춤 서비스 제공
        </li>
        <li>
          <strong>마케팅 및 광고</strong>
          <br />
          신규 서비스 개발, 이벤트 및 광고성 정보 제공
        </li>
      </ol>

      <h3 className="mt-6 text-lg font-bold">
        제2조 (개인정보의 처리 및 보유기간)
      </h3>
      <ol className="list-decimal pl-5">
        <li>
          회사는 법령에 따른 개인정보 보유·이용기간 내에서 개인정보를
          처리·보유합니다.
        </li>
        <li>
          각각의 개인정보 처리 및 보유 기간:
          <ul className="mt-2 list-disc pl-5">
            <li>
              <strong>회원 가입 및 관리:</strong> 서비스 이용계약 체결 시부터
              이용 중단 요청 시까지
            </li>
            <li>
              <strong>거래 관련 기록:</strong> 전자상거래법에 따라 5년
            </li>
            <li>
              <strong>소비자 불만 기록:</strong> 3년
            </li>
          </ul>
        </li>
      </ol>

      <h3 className="mt-6 text-lg font-bold">
        제3조 (처리하는 개인정보의 항목)
      </h3>
      <p>
        <strong>필수항목</strong>
      </p>
      <ul className="list-disc pl-5">
        <li>이메일 주소</li>
        <li>비밀번호 (암호화 저장)</li>
        <li>이름</li>
        <li>연락처</li>
        <li>배송지 정보 (우편번호, 주소, 상세주소)</li>
      </ul>
      <p className="mt-4">
        <strong>자동 수집 항목</strong>
      </p>
      <ul className="list-disc pl-5">
        <li>접속 IP 정보</li>
        <li>쿠키</li>
        <li>서비스 이용 기록</li>
      </ul>

      <h3 className="mt-6 text-lg font-bold">제4조 (개인정보의 파기)</h3>
      <ol className="list-decimal pl-5">
        <li>
          회사는 개인정보 보유기간 경과, 처리목적 달성 시 지체없이 해당
          개인정보를 파기합니다.
        </li>
        <li>
          파기방법:
          <ul className="mt-2 list-disc pl-5">
            <li>전자적 파일: 복구 불가능한 방법으로 영구 삭제</li>
            <li>인쇄물: 분쇄 또는 소각</li>
          </ul>
        </li>
      </ol>

      <h3 className="mt-6 text-lg font-bold">제5조 (정보주체의 권리)</h3>
      <p>정보주체는 회사에 대해 언제든지 다음 권리를 행사할 수 있습니다:</p>
      <ul className="list-disc pl-5">
        <li>개인정보 열람 요구</li>
        <li>오류 정정 요구</li>
        <li>삭제 요구</li>
        <li>처리정지 요구</li>
      </ul>

      <h3 className="mt-6 text-lg font-bold">
        제6조 (개인정보의 안전성 확보조치)
      </h3>
      <p>회사는 다음과 같은 조치를 취하고 있습니다:</p>
      <ul className="list-disc pl-5">
        <li>관리적 조치: 내부관리계획 수립, 정기적 직원 교육</li>
        <li>기술적 조치: 접근권한 관리, 암호화, 보안프로그램 설치</li>
        <li>물리적 조치: 전산실 접근통제</li>
      </ul>

      <h3 className="mt-6 text-lg font-bold">제7조 (쿠키 사용)</h3>
      <ol className="list-decimal pl-5">
        <li>회사는 맞춤서비스 제공을 위해 쿠키를 사용합니다.</li>
        <li>
          웹브라우저 설정을 통해 쿠키 저장을 거부할 수 있으나, 서비스 이용에
          어려움이 있을 수 있습니다.
        </li>
      </ol>

      <h3 className="mt-6 text-lg font-bold">제8조 (개인정보 보호책임자)</h3>
      <div className="mt-2 rounded bg-gray-50 p-4">
        <p>
          <strong>개인정보 보호책임자</strong>
        </p>
        <p>성명: 개인정보보호팀</p>
        <p>이메일: privacy@you-us.com</p>
        <p>전화: 02-1234-5678</p>
      </div>

      <h3 className="mt-6 text-lg font-bold">제9조 (처리방침 변경)</h3>
      <p>
        본 방침은 2025년 2월 5일부터 적용되며, 변경사항이 있는 경우 시행 7일
        전부터 공지합니다.
        <br />
        <br />
      </p>
    </div>
  );
}
