import Button from '@/components/common/Button'
import Input from '@/components/common/Input'

export default function SignupPage() {
  return (
    <div className="flex w-full flex-col items-center bg-gray-50">
      <h1 className="text-title-lg mt-20">회원가입</h1>
      <form>
        <div className="mt-10 flex flex-col items-start">
          <label htmlFor="id" className="text-caption mb-2.5">
            아이디<span className="text-red-500">*</span>
          </label>
          <Input
            name="id"
            id="id"
            placeholder="아이디"
            className="w-70 lg:w-112.5"
            type="text"
          ></Input>
        </div>
        <div className="mt-2.5 flex flex-col items-start">
          <label htmlFor="password" className="text-caption mb-2.5">
            패스워드<span className="text-red-500">*</span>
          </label>
          <Input
            name="password"
            id="password"
            placeholder="패스워드"
            className="w-70 lg:w-112.5"
            type="password"
          ></Input>
        </div>
        <div className="mt-5 flex flex-col items-start">
          <label htmlFor="name" className="text-caption mb-2.5">
            이름<span className="text-red-500">*</span>
          </label>
          <Input
            name="name"
            id="name"
            placeholder="이름"
            className="w-70 lg:w-112.5"
            type="text"
          ></Input>
        </div>
        <div className="mt-2.5 flex flex-col items-start">
          <label htmlFor="email" className="text-caption mb-2.5">
            이메일<span className="text-red-500">*</span>
          </label>
          <Input
            name="email"
            id="email"
            placeholder="이메일"
            className="w-70 lg:w-112.5"
            type="email"
          ></Input>
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
              className="w-30 lg:w-60"
              type="text"
              readOnly
            ></Input>
            <Button className="address-search ml-2.5">주소 검색</Button>
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
            className="w-70 lg:w-112.5"
            type="text"
            readOnly
          ></Input>
        </div>
        <div className="mt-2.5 flex flex-col items-start">
          <label htmlFor="detail-address" className="text-caption mb-2.5">
            상세주소<span className="text-red-500">*</span>
          </label>
          <Input
            name="detail-address"
            id="detail-address"
            placeholder="상세주소"
            className="w-70 lg:w-112.5"
            type="text"
          ></Input>
        </div>
        <div className="mt-5 flex flex-col items-start">
          <label htmlFor="phone" className="text-caption mb-2.5">
            연락처<span className="text-red-500">*</span>
          </label>
          <Input
            name="phone"
            id="phone"
            placeholder="연락처"
            className="w-70 lg:w-112.5"
            type="tel"
          ></Input>
        </div>
        <Button type="submit" className="mt-10 mb-20 w-full">
          회원가입
        </Button>
      </form>
    </div>
  )
}
