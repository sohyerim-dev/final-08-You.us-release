'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import useDaumPostcode from '@/hooks/auth/useDaumPostcode';
import { DaumPostcodeData } from '@/types/daum.types';
import { User } from '@/types/user.types';
import { useState, useEffect } from 'react';

interface AddressInfoProps {
  user: User;
  onAddressChange: (address: {
    name: string;
    phone: string;
    address: string;
    detailAddress: string;
    postalCode: string;
    isDefault: boolean;
  }) => void;
  isDefaultAddress: boolean;
  setIsDefaultAddress: (value: boolean) => void;
}

export default function AddressInfo({
  user,
  onAddressChange,
  isDefaultAddress,
  setIsDefaultAddress,
}: AddressInfoProps) {
  const hasUserAddress =
    user.address?.streetAddress && user.address?.postalCode;
  const addressLine1 = hasUserAddress
    ? user.address.streetAddress.split(',')[0]
    : '';
  const addressLine2 = hasUserAddress
    ? user.address.streetAddress.split(',')[1] || ''
    : '';
  const { openPostcode } = useDaumPostcode();

  const [addressData, setAddressData] = useState({
    postalCode: '',
    address: '',
    detailAddress: '',
  });

  const [receiverInfo, setReceiverInfo] = useState({
    name: '',
    phone: '',
  });

  useEffect(() => {
    if (isDefaultAddress && hasUserAddress) {
      onAddressChange({
        name: user.name,
        phone: user.phone,
        address: user.address.streetAddress,
        detailAddress: addressLine2,
        postalCode: user.address.postalCode,
        isDefault: true,
      });
    } else {
      onAddressChange({
        name: receiverInfo.name,
        phone: receiverInfo.phone,
        address: addressData.address,
        detailAddress: addressData.detailAddress,
        postalCode: addressData.postalCode,
        isDefault: false,
      });
    }
  }, [
    isDefaultAddress,
    addressData,
    receiverInfo,
    user,
    onAddressChange,
    hasUserAddress,
    addressLine2,
  ]);

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

      document.getElementById('addressLine2')?.focus();
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

  const handleReceiverNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReceiverInfo((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const handleReceiverPhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setReceiverInfo((prev) => ({
      ...prev,
      phone: e.target.value,
    }));
  };

  return (
    <fieldset className="mb-7.5 flex flex-col gap-2.5">
      <div className="flex flex-row items-center gap-2.5">
        <legend className="text-body-md">배송지 정보</legend>
        {hasUserAddress && (
          <div className="text-body-sm flex flex-row items-center gap-1">
            <Input
              id="isDefaultAddress"
              name="isDefaultAddress"
              type="checkbox"
              checked={isDefaultAddress}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setIsDefaultAddress(e.target.checked)
              }
            />
            <label htmlFor="isDefaultAddress">기본 배송지</label>
          </div>
        )}
      </div>
      {isDefaultAddress && hasUserAddress ? (
        <div key="default" className="flex flex-col gap-2.5">
          <div className="text-body-sm flex flex-row items-center gap-2.5">
            <label htmlFor="receiverName">수령인</label>
            <span>|</span>
            <Input
              id="receiverName"
              name="receiverName"
              type="text"
              autoComplete="name"
              wrapperClassName="flex-1"
              defaultValue={user.name}
              className="lg:w-82.5"
              readOnly
            />
          </div>
          <div className="text-body-sm flex flex-row items-center gap-2.5">
            <label htmlFor="receiverTel">연락처</label>
            <span>|</span>
            <Input
              id="receiverTel"
              name="receiverTel"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              defaultValue={user.phone}
              wrapperClassName="flex-1"
              className="lg:w-82.5"
              readOnly
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="text-body-sm flex flex-row items-center gap-2.5">
              <span id="addressLabel" className="shrink-0">
                주소
              </span>
              <span>|</span>
              <div
                role="group"
                aria-labelledby="addressLabel"
                className="flex w-full items-center gap-2.5"
              >
                <Button
                  disabled
                  type="button"
                  className="text-primary border-primary shrink-0 border bg-white focus:text-white"
                >
                  우편번호 찾기
                </Button>
                <label htmlFor="postalCode" className="sr-only">
                  우편번호
                </label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  defaultValue={user.address.postalCode}
                  readOnly
                  className="text-center lg:w-36.25"
                  wrapperClassName="min-w-0 flex-1"
                />
              </div>
            </div>
            <div>
              <label htmlFor="addressLine1" className="sr-only">
                기본 주소
              </label>
              <Input
                id="addressLine1"
                name="addressLine1"
                type="text"
                autoComplete="address-line1"
                defaultValue={addressLine1}
                className="text-body-sm"
                readOnly
              />
            </div>
            <div>
              <label htmlFor="addressLine2" className="sr-only">
                상세 주소
              </label>
              <Input
                id="addressLine2"
                name="addressLine2"
                type="text"
                autoComplete="address-line2"
                defaultValue={addressLine2}
                className="text-body-sm"
                readOnly
              />
            </div>
          </div>
        </div>
      ) : (
        <div key="custom" className="flex flex-col gap-2.5">
          <div className="text-body-sm flex flex-row items-center gap-2.5">
            <label htmlFor="receiverName">수령인</label>
            <span>|</span>
            <Input
              id="receiverName"
              name="receiverName"
              type="text"
              value={receiverInfo.name}
              onChange={handleReceiverNameChange}
              autoComplete="name"
              wrapperClassName="flex-1"
              className="lg:w-82.5"
            />
          </div>
          <div className="text-body-sm flex flex-row items-center gap-2.5">
            <label htmlFor="receiverTel">연락처</label>
            <span>|</span>
            <Input
              id="receiverTel"
              name="receiverTel"
              type="tel"
              inputMode="tel"
              value={receiverInfo.phone}
              onChange={handleReceiverPhoneChange}
              autoComplete="tel"
              wrapperClassName="flex-1"
              className="lg:w-82.5"
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="text-body-sm flex flex-row items-center gap-2.5">
              <span id="addressLabel" className="shrink-0">
                주소
              </span>
              <span>|</span>
              <div
                role="group"
                aria-labelledby="addressLabel"
                className="flex w-full items-center gap-2.5"
              >
                <Button
                  type="button"
                  onClick={handleSearchAddress}
                  className="text-primary border-primary focus:bg-primary shrink-0 border bg-white focus:border focus:border-gray-900 focus:text-white focus:outline-0"
                >
                  우편번호 찾기
                </Button>
                <label htmlFor="postalCode" className="sr-only">
                  우편번호
                </label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  value={addressData.postalCode}
                  inputMode="numeric"
                  autoComplete="postal-code"
                  className="text-center lg:w-36.25"
                  wrapperClassName="min-w-0 flex-1"
                  readOnly
                />
              </div>
            </div>
            <div>
              <label htmlFor="addressLine1" className="sr-only">
                기본 주소
              </label>
              <Input
                id="addressLine1"
                name="addressLine1"
                type="text"
                value={addressData.address}
                autoComplete="address-line1"
                className="text-body-sm"
                readOnly
              />
            </div>
            <div>
              <label htmlFor="addressLine2" className="sr-only">
                상세 주소
              </label>
              <Input
                id="addressLine2"
                name="addressLine2"
                type="text"
                value={addressData.detailAddress}
                onChange={handleDetailAddressChange}
                autoComplete="address-line2"
                className="text-body-sm"
              />
            </div>
          </div>
        </div>
      )}
    </fieldset>
  );
}
