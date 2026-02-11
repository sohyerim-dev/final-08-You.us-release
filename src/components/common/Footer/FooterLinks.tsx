'use client';

import { useState } from 'react';
import TermsModal from '@/components/modals/TermsModal';

export default function FooterLinks() {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'terms' | 'privacy' | 'company' | 'dispute';
  }>({
    isOpen: false,
    type: 'terms',
  });

  const openModal = (type: 'terms' | 'privacy' | 'company' | 'dispute') => {
    setModalState({ isOpen: true, type });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: 'terms' });
  };

  const links = [
    { label: '회사소개', action: () => openModal('company') },
    { label: '이용약관', action: () => openModal('terms') },
    { label: '개인정보처리방침', action: () => openModal('privacy') },
    { label: '분쟁사항', action: () => openModal('dispute') },
  ];

  return (
    <>
      <div className="mb-6 flex items-center justify-start gap-1 text-[10px] lg:text-xs">
        {links.map((link, index) => (
          <div key={index}>
            <button
              type="button"
              onClick={link.action}
              className="ont-medium cursor-pointer text-gray-700 transition-colors active:text-rose-600"
            >
              {link.label}
            </button>
            {index < links.length - 1 && (
              <span className="mx-0.5 text-gray-400">|</span>
            )}
          </div>
        ))}
      </div>

      <TermsModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        type={modalState.type}
      />
    </>
  );
}
