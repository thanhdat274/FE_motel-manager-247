import instance from './instance';

export const createBillUpdateAccount = (infoPayment: any) => {
    const url = `/user/update-account`;
    return instance.post(url, infoPayment);
};
export const checkBillUpdateAccount = (infoOrder: any) => {
    const url = `/user/payment-return`;
    return instance.post(url, infoOrder);
}

export const createBillPayment = (infoPayment: any) => {
    const url = `/payment/create-payment`;
    return instance.post(url, infoPayment);
}

export const checkPaymentBill = (infoOrder: any) => {
    const url = `/payment/payment-return`;
    return instance.post(url, infoOrder);
}

export const createPaymentInTenant = (idHouse: any, data: any) => {
    const url = `/payment/${idHouse}/create-payment`;
    return instance.post(url, data);
}