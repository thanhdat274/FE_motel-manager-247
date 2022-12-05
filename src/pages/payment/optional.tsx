import { useUserContext } from '@/context/UserContext'
import React from 'react'
import { createOrder } from '../api/payment'


const OptionalPayment = () => {

    const { setLoading, cookies } = useUserContext()
    // const navigate = useNavigate();

    const dataPayment = {
        "amount": 100000,
        "orderDescription": cookies?.user?.user?._id,
        "orderType": "billpayment",
        "language": "vn",
        "bankCode": ""
    }
    const submitCreateOrder = async () => {

        if (cookies.user.user._id) {
            setLoading(true)
            await createOrder(dataPayment).then((result) => {
                setLoading(false);
                window.location.href = result.data.redirect
            }).catch((err) => {
                setLoading(false);
            })
        } else {
        }
    }

    return (
        <div className='min-h-80vh container mx-auto'>
            <div> Optional - Payment</div>
            <button onClick={() => submitCreateOrder()}>checkout</button>
        </div>
    )
}

export default OptionalPayment