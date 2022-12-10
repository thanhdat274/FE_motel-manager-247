import instance from './instance';

export const createOrder = (infoPayment: any) => {
    const url = `/payment/create-payment`;
    return instance.post(url, infoPayment);
};
export const returnPayment = (infoOrder: any) => {
    const url = `/payment/payment-return`;
    return instance.post(url, infoOrder);
}