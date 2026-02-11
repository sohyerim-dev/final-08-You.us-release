'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { User } from '@/types/user.types';
import { updateProfile } from '@/lib/api/mypage';
import { uploadFile } from '@/lib/api/files';
import useUserStore from '@/lib/zustand/auth/userStore';
import useDaumPostcode from '@/hooks/auth/useDaumPostcode';
import { DaumPostcodeData } from '@/types/daum.types';
import { toast } from 'react-toastify';

const API_SERVER = process.env.NEXT_PUBLIC_API_URL;

// 이미지 경로를 전체 URL로 변환
function getImageUrl(imagePath: string | undefined): string {
  if (!imagePath) return '/images/common/basic-profile-img.png';
  // 이미 절대 URL이거나 /로 시작하면 그대로 반환
  if (imagePath.startsWith('http') || imagePath.startsWith('/')) {
    return imagePath;
  }
  // 상대 경로면 API 서버 URL 붙이기
  return `${API_SERVER}/${imagePath}`;
}

interface ProfileFormProps {
  user: User;
}

type EditingField = 'name' | 'phone' | 'address' | null;

export default function ProfileForm({ user }: ProfileFormProps) {
  const { setUser } = useUserStore();
  const { openPostcode } = useDaumPostcode();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 편집 중인 필드
  const [editingField, setEditingField] = useState<EditingField>(null);

  // 편집 중인 값
  const [editValues, setEditValues] = useState({
    name: user.name || '',
    phone: formatPhone(user.phone || ''),
    streetAddress: user.address?.streetAddress || '',
    postalCode: user.address?.postalCode || '',
  });

  // 이미지 관련 상태
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // 저장 중 상태
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 전화번호 포맷팅
  function formatPhone(phone: string): string {
    const numbers = phone.replace(/[^0-9]/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7)
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  }

  // 전화번호 입력 핸들러
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setEditValues((prev) => ({ ...prev, phone: formatted }));
  };

  // 편집 시작
  const startEditing = (field: EditingField) => {
    setEditingField(field);
    setError(null);
  };

  // 편집 취소
  const cancelEditing = () => {
    setEditValues({
      name: user.name,
      phone: formatPhone(user.phone),
      streetAddress: user.address?.streetAddress || '',
      postalCode: user.address?.postalCode || '',
    });
    setEditingField(null);
    setError(null);
  };

  // 이름 저장
  const saveName = async () => {
    if (!editValues.name.trim()) {
      setError('이름을 입력해주세요.');
      return;
    }

    setIsSaving(true);
    setError(null);

    const result = await updateProfile(user._id, { name: editValues.name });
    toast.success(`이름이 수정되었습니다.`);

    if (result.ok === 1) {
      setUser({ ...user, name: editValues.name });
      setEditingField(null);
    } else {
      setError(result.message || '저장에 실패했습니다.');
    }

    setIsSaving(false);
  };

  // 연락처 저장
  const savePhone = async () => {
    const phoneNumbers = editValues.phone.replace(/-/g, '');
    if (phoneNumbers.length < 10) {
      setError('올바른 연락처를 입력해주세요.');
      return;
    }

    setIsSaving(true);
    setError(null);

    const result = await updateProfile(user._id, { phone: phoneNumbers });
    toast.success(`연락처가 수정되었습니다.`);

    if (result.ok === 1) {
      setUser({ ...user, phone: phoneNumbers });
      setEditingField(null);
    } else {
      setError(result.message || '저장에 실패했습니다.');
    }

    setIsSaving(false);
  };

  // 주소 검색
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

      setEditValues((prev) => ({
        ...prev,
        postalCode: data.zonecode,
        streetAddress: addr + extraAddr,
      }));
    });
  };

  // 주소 저장
  const saveAddress = async () => {
    if (!editValues.streetAddress.trim()) {
      setError('주소를 입력해주세요.');
      return;
    }

    setIsSaving(true);
    setError(null);

    const result = await updateProfile(user._id, {
      address: {
        streetAddress: editValues.streetAddress,
        postalCode: editValues.postalCode,
      },
    });
    toast.success(`주소가 수정되었습니다.`);

    if (result.ok === 1) {
      setUser({
        ...user,
        address: {
          streetAddress: editValues.streetAddress,
          postalCode: editValues.postalCode,
        },
      });
      setEditingField(null);
    } else {
      setError(result.message || '저장에 실패했습니다.');
    }

    setIsSaving(false);
  };

  // 이미지 선택 핸들러
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 크기 체크 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('이미지 크기는 5MB 이하여야 합니다.');
      return;
    }

    // 파일 타입 체크
    if (!file.type.startsWith('image/')) {
      setError('이미지 파일만 업로드 가능합니다.');
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setError(null);
  };

  // 이미지 업로드
  const uploadImage = async () => {
    if (!imageFile) return;

    setIsUploading(true);
    setError(null);

    try {
      // 먼저 파일 업로드
      const imagePath = await uploadFile(imageFile);
      // console.log('이미지: ', imagePath);

      // 프로필에 이미지 경로 저장
      const result = await updateProfile(user._id, { image: imagePath });
      console.log('응답: ', result);
      toast.success(`프로필 이미지가 수정되었습니다.`);

      if (result.ok === 1 && 'item' in result) {
        setUser({ ...user, image: result.item.image });
        setImageFile(null);
        setImagePreview(null);
      } else {
        setError('프로필 이미지 저장에 실패했습니다.');
      }
    } catch {
      setError('이미지 업로드에 실패했습니다.');
    }

    setIsUploading(false);
  };

  // 이미지 업로드 취소
  const cancelImageUpload = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const currentImage = imagePreview || getImageUrl(user.image);

  return (
    <div className="lg:pl-6">
      {/* 프로필 이미지 */}
      <div className="border-primary py-button-y px-button-y flex flex-row items-center gap-3 border-y bg-white lg:w-125 lg:gap-[40px] lg:px-11.25 lg:py-[40px]">
        <div className="h-12.5 w-12.5 shrink-0 overflow-hidden rounded-lg border-2 border-gray-500 lg:h-34.25 lg:w-34.25 lg:rounded-[100px] lg:border-4">
          <Image
            width={137}
            height={137}
            src={currentImage}
            alt="프로필 이미지"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex shrink-0 flex-col gap-2.5 lg:gap-8.75">
          <h3 className="lg:text-body-lg text-[12px]">프로필 이미지</h3>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
          {imageFile ? (
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={uploadImage}
                disabled={isUploading}
                className="border-primary bg-primary lg:text-button px-button-y lg:py-button-y lg:px-button-x rounded-[5px] border py-1.25 text-[12px] text-white lg:rounded-[10px]"
              >
                {isUploading ? '업로드 중...' : '저장'}
              </Button>
              <Button
                type="button"
                onClick={cancelImageUpload}
                disabled={isUploading}
                className="border-primary text-primary lg:text-button px-button-y lg:py-button-y lg:px-button-x rounded-[5px] border bg-gray-50 py-1.25 text-[12px] hover:text-gray-50 lg:rounded-[10px]"
              >
                취소
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="border-primary text-primary lg:text-button px-button-y lg:py-button-y lg:px-button-x rounded-[5px] border bg-gray-50 py-1.25 text-[12px] hover:text-gray-50 lg:rounded-[10px]"
            >
              변경하기
            </Button>
          )}
        </div>
      </div>

      {/* 에러 메시지 */}
      {error && <p className="mt-2 text-[14px] text-red-500">{error}</p>}

      {/* 회원 정보 목록 */}
      <ul className="border-primary mt-7.5 mb-7.5 border-y bg-white pr-4">
        {/* 이름 */}
        <li className="py-button-y flex flex-row items-center border-b border-gray-300 lg:py-[20px]">
          <dt className="lg:text-body-md w-14 text-center text-[12px] lg:w-25">
            이름
          </dt>
          <span aria-hidden="true">|</span>
          {editingField === 'name' ? (
            <div className="flex flex-1 items-center justify-between gap-2 pl-4 lg:pl-7.5">
              <Input
                id="edit-name"
                value={editValues.name}
                onChange={(e) =>
                  setEditValues((prev) => ({ ...prev, name: e.target.value }))
                }
                className="text-body-sm w-35 lg:w-60"
              />
              <div className="flex flex-col gap-1 lg:flex-row">
                <Button
                  type="button"
                  onClick={saveName}
                  disabled={isSaving}
                  className="border-primary bg-primary lg:text-button px-button-y lg:py-button-y lg:px-button-x shrink-0 rounded-[5px] border py-1.25 text-[12px] text-white lg:rounded-[10px]"
                >
                  {isSaving ? '저장 중...' : '저장'}
                </Button>
                <Button
                  type="button"
                  onClick={cancelEditing}
                  disabled={isSaving}
                  className="border-primary text-primary lg:text-button px-button-y lg:py-button-y lg:px-button-x shrink-0 rounded-[5px] border bg-gray-50 py-1.25 text-[12px] hover:text-gray-50 lg:rounded-[10px]"
                >
                  취소
                </Button>
              </div>
            </div>
          ) : (
            <>
              <dd className="lg:text-body-md pl-4 text-[12px] lg:pl-7.5">
                {user.name || '이름을 추가해주세요'}
              </dd>
              <Button
                type="button"
                onClick={() => startEditing('name')}
                className="bg-gary-50 border-primary text-primary lg:text-button px-button-y lg:py-button-y lg:px-button-x ml-auto shrink-0 rounded-[5px] border py-1.25 text-[12px] hover:text-gray-50 lg:rounded-[10px]"
              >
                변경하기
              </Button>
            </>
          )}
        </li>

        {/* 연락처 */}
        <li className="py-button-y flex flex-row items-center border-b border-gray-300 lg:py-[20px]">
          <dt className="lg:text-body-md w-14 text-center text-[12px] lg:w-25">
            연락처
          </dt>
          <span aria-hidden="true">|</span>
          {editingField === 'phone' ? (
            <div className="flex flex-1 items-center justify-between gap-2 pl-4 lg:pl-7.5">
              <Input
                id="edit-phone"
                value={editValues.phone}
                onChange={handlePhoneChange}
                maxLength={13}
                className="text-body-sm w-35 lg:w-60"
              />
              <div className="flex flex-col gap-1 lg:flex-row">
                <Button
                  type="button"
                  onClick={savePhone}
                  disabled={isSaving}
                  className="border-primary bg-primary lg:text-button px-button-y lg:py-button-y lg:px-button-x shrink-0 rounded-[5px] border py-1.25 text-[12px] text-white lg:rounded-[10px]"
                >
                  {isSaving ? '저장 중...' : '저장'}
                </Button>
                <Button
                  type="button"
                  onClick={cancelEditing}
                  disabled={isSaving}
                  className="border-primary text-primary lg:text-button px-button-y lg:py-button-y lg:px-button-x shrink-0 rounded-[5px] border bg-gray-50 py-1.25 text-[12px] hover:text-gray-50 lg:rounded-[10px]"
                >
                  취소
                </Button>
              </div>
            </div>
          ) : (
            <>
              <dd className="lg:text-body-md pl-4 text-[12px] lg:pl-7.5">
                {user.phone
                  ? user.phone.replace(
                      /^(\d{2,3})(\d{3,4})(\d{4})$/,
                      `$1-$2-$3`,
                    )
                  : '연락처를 추가해주세요'}
              </dd>
              <Button
                type="button"
                onClick={() => startEditing('phone')}
                className="bg-gary-50 border-primary text-primary lg:text-button px-button-y lg:py-button-y lg:px-button-x ml-auto shrink-0 rounded-[5px] border py-1.25 text-[12px] hover:text-gray-50 lg:rounded-[10px]"
              >
                변경하기
              </Button>
            </>
          )}
        </li>

        {/* 주소 */}
        <li className="py-button-y flex flex-row items-center border-b border-gray-300 lg:py-[20px]">
          <dt className="lg:text-body-md w-14 pl-2 text-center text-[12px] lg:w-25">
            주소
          </dt>
          <span aria-hidden="true">|</span>
          {editingField === 'address' ? (
            <div className="flex flex-1 flex-col gap-2 pl-4 lg:flex-row lg:justify-between lg:pl-7.5">
              <div>
                <div className="flex items-center gap-2">
                  <Input
                    id="edit-postal"
                    value={editValues.postalCode}
                    readOnly
                    className="w-20 lg:w-24"
                  />
                  <Button
                    type="button"
                    onClick={handleSearchAddress}
                    className="border-primary text-primary lg:text-button px-button-y lg:py-button-y lg:px-button-x shrink-0 rounded-[5px] border bg-gray-50 py-1.25 text-[12px] hover:text-gray-50 lg:rounded-[10px]"
                  >
                    주소 검색
                  </Button>
                </div>
                <Input
                  id="edit-address"
                  value={editValues.streetAddress}
                  readOnly
                  className="mt-3 w-full lg:w-80"
                />
              </div>
              <div className="flex gap-2 lg:flex-col">
                <Button
                  type="button"
                  onClick={saveAddress}
                  disabled={isSaving}
                  className="border-primary bg-primary lg:text-button px-button-y lg:py-button-y lg:px-button-x shrink-0 rounded-[5px] border py-1.25 text-[12px] text-white lg:rounded-[10px]"
                >
                  {isSaving ? '저장 중...' : '저장'}
                </Button>
                <Button
                  type="button"
                  onClick={cancelEditing}
                  disabled={isSaving}
                  className="border-primary text-primary lg:text-button px-button-y lg:py-button-y lg:px-button-x shrink-0 rounded-[5px] border bg-gray-50 py-1.25 text-[12px] hover:text-gray-50 lg:rounded-[10px]"
                >
                  취소
                </Button>
              </div>
            </div>
          ) : (
            <>
              <dd className="lg:text-body-md w-40 pl-4 text-[12px] lg:w-110 lg:pl-7.5">
                {user.address?.streetAddress || '주소를 추가해주세요'}
              </dd>
              <Button
                type="button"
                onClick={() => startEditing('address')}
                className="bg-gary-50 border-primary text-primary lg:text-button px-button-y lg:py-button-y lg:px-button-x ml-auto shrink-0 rounded-[5px] border py-1.25 text-[12px] hover:text-gray-50 lg:rounded-[10px]"
              >
                변경하기
              </Button>
            </>
          )}
        </li>

        {/* 이메일 (읽기 전용) */}
        <li className="py-button-y flex flex-row items-center border-b border-gray-300 lg:py-[35px]">
          <dt className="lg:text-body-md w-14 text-center text-[12px] lg:w-25">
            이메일
          </dt>
          <span aria-hidden="true">|</span>
          <dd className="lg:text-body-md w-40 pl-4 text-[12px] lg:w-120 lg:pl-7.5">
            {user.email}
          </dd>
        </li>
      </ul>
    </div>
  );
}
