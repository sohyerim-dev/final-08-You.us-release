'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { DaumPostcodeData } from '@/types/daum.types';
import useDaumPostcode from '@/hooks/auth/useDaumPostcode';
import TermsModal from '@/components/modals/TermsModal';
import { useActionState } from 'react';
import { signup } from '@/lib/api/users';
import { toast } from 'react-toastify';

export default function SignupForm() {
  const [state, formAction, isPending] = useActionState(signup, {
    ok: 0,
    message: '',
  });
  const { openPostcode } = useDaumPostcode();
  const [addressData, setAddressData] = useState({
    postalCode: '',
    address: '',
    detailAddress: '',
  });
  const [phone, setPhone] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'terms' | 'privacy';
  }>({
    isOpen: false,
    type: 'terms',
  });

  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
  });

  const isFormValid =
    formData.email.trim() !== '' &&
    formData.password.trim() !== '' &&
    formData.password.length >= 8 &&
    formData.name.trim() !== '' &&
    addressData.postalCode.trim() !== '' &&
    addressData.address.trim() !== '' &&
    addressData.detailAddress.trim() !== '' &&
    phone.replace(/-/g, '').length >= 10 &&
    agreements.terms &&
    agreements.privacy;

  useEffect(() => {
    if (!state) return;

    if (state.ok === 1) {
      toast.success('회원가입이 완료되었습니다!');
    } else if (state.ok === 0 && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  const handleSearchAddress = () => {
    openPostcode((data: DaumPostcodeData) => {
      let addr = '';
      let extraAddr = '';

      if (data.userSelectedType === 'R') {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }

      if (data.userSelectedType === 'R') {
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddr +=
            extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
        }
        if (extraAddr !== '') {
          extraAddr = ' (' + extraAddr + ')';
        }
      }

      setAddressData({
        postalCode: data.zonecode,
        address: addr + extraAddr,
        detailAddress: '',
      });

      document.getElementById('detail-address')?.focus();
    });
  };

  const handleDetailAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAddressData((prev) => ({
      ...prev,
      detailAddress: e.target.value,
    }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numbers = value.replace(/[^0-9]/g, '');

    let formatted = '';
    if (numbers.length <= 3) {
      formatted = numbers;
    } else if (numbers.length <= 7) {
      formatted = `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else if (numbers.length <= 11) {
      formatted = `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
    } else {
      formatted = `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
    }

    setPhone(formatted);
  };

  const phoneNumbers = phone.replace(/-/g, '');

  const openModal = (type: 'terms' | 'privacy') => {
    setModalState({ isOpen: true, type });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: 'terms' });
  };

  const handleAllAgree = (checked: boolean) => {
    setAgreements({
      terms: checked,
      privacy: checked,
    });
  };

  return (
    <>
      <form action={formAction}>
        <div className="mt-10 flex flex-col items-start">
          <label htmlFor="email" className="text-caption mb-2.5">
            이메일<span className="text-red-500">*</span>
          </label>
          <Input
            name="email"
            id="email"
            placeholder="이메일"
            className="w-90 lg:w-112.5"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            required
          />
        </div>

        <div className="mt-2.5 flex flex-col items-start">
          <label htmlFor="password" className="text-caption mb-2.5">
            패스워드<span className="text-red-500">*</span>
          </label>
          <Input
            name="password"
            id="password"
            placeholder="패스워드 (최소 8자)"
            className="w-90 lg:w-112.5"
            type="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            required
            minLength={8}
          />
        </div>

        <div className="mt-5 flex flex-col items-start">
          <label htmlFor="name" className="text-caption mb-2.5">
            이름<span className="text-red-500">*</span>
          </label>
          <Input
            name="name"
            id="name"
            placeholder="이름"
            className="w-90 lg:w-112.5"
            type="text"
            autoComplete="name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            required
          />
        </div>

        <div className="mt-5 flex flex-col items-start">
          <label htmlFor="postalCode" className="text-caption mb-2.5">
            우편번호<span className="text-red-500">*</span>
          </label>
          <div className="flex flex-row items-center">
            <Input
              name="postalCode"
              id="postalCode"
              placeholder="우편번호"
              className="w-50 lg:w-60"
              type="text"
              value={addressData.postalCode}
              readOnly
              required
            />
            <Button
              type="button"
              className="address-search ml-2.5"
              onClick={handleSearchAddress}
            >
              주소 검색
            </Button>
          </div>
        </div>

        <div className="mt-2.5 flex flex-col items-start">
          <label htmlFor="address" className="text-caption mb-2.5">
            주소<span className="text-red-500">*</span>
          </label>
          <Input
            name="address"
            id="address"
            placeholder="주소"
            className="w-90 lg:w-112.5"
            type="text"
            value={addressData.address}
            readOnly
            required
          />
        </div>

        <div className="mt-2.5 flex flex-col items-start">
          <label htmlFor="detail-address" className="text-caption mb-2.5">
            상세주소<span className="text-red-500">*</span>
          </label>
          <Input
            name="detail-address"
            id="detail-address"
            placeholder="상세주소"
            className="w-90 lg:w-112.5"
            type="text"
            value={addressData.detailAddress}
            onChange={handleDetailAddressChange}
            required
          />
        </div>

        <div className="mt-5 flex flex-col items-start">
          <label htmlFor="phone" className="text-caption mb-2.5">
            연락처<span className="text-red-500">*</span>
          </label>
          <Input
            id="phone-display"
            placeholder="010-1234-5678"
            className="w-90 lg:w-112.5"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={handlePhoneChange}
            maxLength={13}
            required
          />
          <input type="hidden" name="phone" value={phoneNumbers} />
        </div>

        <div className="mt-10 w-90 lg:w-112.5">
          <div className="rounded-sm border border-gray-900 p-4">
            <label className="flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={agreements.terms && agreements.privacy}
                onChange={(e) => handleAllAgree(e.target.checked)}
                className="h-5 w-5 rounded border-gray-300"
              />
              <span className="ml-3 font-semibold">전체 동의</span>
            </label>

            <div className="my-3 border-t"></div>

            <label className="flex cursor-pointer items-start">
              <input
                type="checkbox"
                checked={agreements.terms}
                onChange={(e) =>
                  setAgreements((prev) => ({
                    ...prev,
                    terms: e.target.checked,
                  }))
                }
                className="mt-1 h-4 w-4 rounded border-gray-300"
              />
              <span className="ml-3 flex-1">
                <span className="text-red-500">[필수]</span> 이용약관 동의
                <button
                  type="button"
                  onClick={() => openModal('terms')}
                  className="ml-2 text-sm text-blue-600 underline"
                >
                  보기
                </button>
              </span>
            </label>

            <label className="mt-3 flex cursor-pointer items-start">
              <input
                type="checkbox"
                checked={agreements.privacy}
                onChange={(e) =>
                  setAgreements((prev) => ({
                    ...prev,
                    privacy: e.target.checked,
                  }))
                }
                className="mt-1 h-4 w-4 rounded border-gray-300"
              />
              <span className="ml-3 flex-1">
                <span className="text-red-500">[필수]</span> 개인정보 처리방침
                동의
                <button
                  type="button"
                  onClick={() => openModal('privacy')}
                  className="ml-2 text-sm text-blue-600 underline"
                >
                  보기
                </button>
              </span>
            </label>
          </div>
        </div>

        <Button
          type="submit"
          className="mt-10 mb-20 w-full"
          disabled={!isFormValid || isPending}
        >
          {isPending ? '처리 중...' : '회원가입'}
        </Button>
      </form>

      <TermsModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        type={modalState.type}
      />
    </>
  );
}
