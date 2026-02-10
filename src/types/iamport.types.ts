interface IMP {
  init: (userCode: string) => void;
  request_pay: (
    params: RequestPayParams,
    callback?: RequestPayCallback,
  ) => void;
}

interface RequestPayParams {
  channelKey: string;
  pay_method: 'card' | 'trans' | 'vbank' | 'phone';
  merchant_uid: string;
  name: string;
  amount: number;
  buyer_email?: string;
  buyer_name?: string;
  buyer_tel?: string;
  buyer_addr?: string;
  buyer_postcode?: string;
}

interface RequestPayResponse {
  success: boolean;
  error_code?: string;
  error_msg?: string;
  imp_uid?: string;
  merchant_uid?: string;
  pay_method?: string;
  paid_amount?: number;
  status?: string;
}

type RequestPayCallback = (response: RequestPayResponse) => void;

interface Window {
  IMP?: IMP;
}
