'use client';

import Input from '@/components/common/Input';
import { User } from '@/types/user.types';

export default function UserInfo({ user }: { user: User }) {
  return (
    <fieldset className="mb-7.5 flex flex-col gap-2.5">
      <legend className="text-body-sm mb-2.5">주문자 정보</legend>
      <div className="flex flex-row items-center gap-2.5 text-[12px]">
        <label htmlFor="ordererName">주문자</label>
        <span>|</span>
        <Input
          id="ordererName"
          name="ordererName"
          type="text"
          autoComplete="name"
          readOnly
          placeholder={user.name}
          defaultValue={user.name}
          wrapperClassName="flex-1"
          className="lg:w-82.5"
        />
      </div>

      <div className="flex flex-row items-center gap-2.5 text-[12px]">
        <label htmlFor="ordererTel">연락처</label>
        <span>|</span>
        <Input
          id="ordererTel"
          name="ordererTel"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder={user.phone || '연락처를 입력해주세요'}
          defaultValue={user.phone || ''}
          wrapperClassName="flex-1"
          className="lg:w-82.5"
          readOnly
        />
      </div>

      <div className="flex flex-row items-center gap-2.5 text-[12px]">
        <label htmlFor="ordererEmail">이메일</label>
        <span>|</span>
        <Input
          id="ordererEmail"
          name="ordererEmail"
          type="email"
          inputMode="email"
          autoComplete="email"
          className="lg:w-82.5"
          placeholder={user.email}
          defaultValue={user.email}
          wrapperClassName="flex-1"
          readOnly
        />
      </div>
    </fieldset>
  );
}
