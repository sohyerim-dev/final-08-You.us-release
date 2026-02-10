// types/daum.types.ts
declare global {
  interface Window {
    daum?: {
      Postcode: new (options: {
        oncomplete: (data: DaumPostcodeData) => void;
      }) => {
        open: () => void;
      };
    };
  }
}

export interface DaumPostcodeData {
  zonecode: string; // 우편번호
  address: string; // 주소
  addressEnglish: string; // 영문 주소
  addressType: 'R' | 'J'; // R: 도로명, J: 지번
  userSelectedType: 'R' | 'J'; // 사용자가 선택한 주소 타입
  roadAddress: string; // 도로명 주소
  jibunAddress: string; // 지번 주소
  bname: string; // 법정동/법정리 이름
  buildingName: string; // 건물명
  apartment: 'Y' | 'N'; // 공동주택 여부
  sido: string; // 시/도
  sigungu: string; // 시/군/구
}

export {};
