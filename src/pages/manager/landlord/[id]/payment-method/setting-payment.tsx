import { useUserContext } from '@/context/UserContext';
import { useRouter } from 'next/router';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { Toast } from 'src/hooks/toast';
import { updateInfoPaymentForHouse } from 'src/pages/api/house';

type Props = {}

type FormInputs = {
  TmnCode: string;
  HashSecret: string;

};

const SettingPayment = (props: Props) => {
  const { cookies, setLoading } = useUserContext();
  const userData = cookies?.user;
  const router = useRouter();
  const { id: idHouse } = router.query;

  console.log('userData', userData);



  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    setLoading(true);

    console.log('data', data);
    await updateInfoPaymentForHouse(idHouse, userData, data).then((result) => {
      setLoading(false);
      Toast('success', result.data.message);
    }).catch((err) => {
      setLoading(false);
      Toast('error', err?.response?.data?.message);
    });
  }

  return (
    <div className='container'>
      <h2>Setting Payment</h2>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

        <div className="mt-4">
          <label className="block" htmlFor="full_name">
            TMN Code <span className="text-[red]">*</span>
          </label>
          <input
            type="string"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            placeholder="TMN Code"
            {...register('TmnCode', { required: true })}
          />

        </div>
        <div className="mt-4">
          <label className="block" htmlFor="full_name">
            Hash Secret <span className="text-[red]">*</span>
          </label>
          <input
            type="string"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            placeholder="Hash Secret"
            {...register('HashSecret', { required: true, })}
          />

          <div className="flex mt-[20px]">
            <button
              type="submit"
              className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-600"
            >
              Cập nhật
            </button>
          </div>

        </div>
      </form>

    </div>
  )
}

export default SettingPayment