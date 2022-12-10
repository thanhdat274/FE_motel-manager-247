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
        <div className='min-h-80vh container mx-auto flex flex-col'>
            <div className='uppercase text-center text-3xl pt-6 md:pt-10'>Nâng cấp tài khoản</div>
            <div className='container mx-auto pt-6 md:pt-10'>
                <div className="optional flex flex-col-reverse gap-2 mx-4 md:flex-row md:gap-10 md:mx-10 xl:gap-10 xl:mx-60">
                    <div className="box-non border border-gray-500 min-h-max flex justify-center   w-[95%] py-4 md:w-1/2 items-center flex-col m-2 gap-2 px-4">
                        <div className="title-non uppercase text-2xl">
                            Tài khoản cơ bản
                        </div>
                        <div className="count-house-non flex text-lg">
                            Giới hạn nhà: <div className="text-red-600 "> 3 nhà</div>
                        </div>
                        <div className="count-room-non flex text-lg">
                            Giới hạn phòng trong 1 nhà: <div className="text-red-600"> 5 phòng</div>
                        </div>
                    </div>

                    <div className="box-non border border-gray-500 min-h-max flex justify-center  w-full md:w-1/2 py-4 items-center flex-col gap-2 px-4">
                        <div className="title-non uppercase text-2xl">
                            Tài khoản Nâng cấp
                        </div>
                        <div className="count-house-non text-lg">
                            Giới hạn nhà : không giới hạn
                        </div>
                        <div className="count-room-non text-lg">
                            Giới hạn phòng trong 1 nhà: không giới hạn
                        </div>
                        <div className="price-upgrade text-xl">
                            Chỉ với giá 100,000 vnđ cho 1 tài khoản vĩnh viễn
                        </div>
                        <div className='mt-4 py-3 bg-[#e65c7b] rounded-full text-white uppercase px-5 flex cursor-pointer' onClick={() => submitCreateOrder()}>
                            Nâng cấp
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default OptionalPayment