import { MotionValue } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from 'src/apis/supabase';
import { addHouse } from 'src/pages/api/house';
import swal from 'sweetalert';
type Props = {};

type FormInput = {
  name: string;

  address: string;
};

const AddHome = (props: Props) => {
  const [houses, setHouse] = useState([]);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (dataForm: any) => {
    console.log('data', dataForm);
    try {
      const { data, error } = await supabase.from('houses').insert([{ dataForm }]);

      router.push('/manager/landlord/list-home');
      swal('Thêm nhà  thành công!', {
        icon: 'success',
      });
    } catch (error) {
      swal('Đã xảy ra lỗi!', {
        icon: 'error',
      });
    }
  };

  return (
    <div className="w-full ">
      <div className="grid grid-flow-col px-4 py-2 text-white bg-cyan-500 ">
        <div className="">
          <h2 className="pt-2 text-xl">Thêm nhà </h2>
        </div>
      </div>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Tên nhà
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Xin mời nhập tên nhà"
            {...register('name', { required: true, minLength: 6 })}
          />
          {errors.name?.type === 'required' && <span className="text-rose-600">Mời bạn nhập tên nhà</span>}
          {errors.name?.type === 'minLength' && <span className="text-rose-600">Tối thiểu 6 ký tự</span>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Địa chỉ
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            type="text"
            placeholder="Xin mời nhập địa chỉ"
            {...register('address', { required: true, minLength: 6 })}
          />
          {errors.address?.type === 'required' && <span className="text-rose-600">Mời bạn nhập tên nhà</span>}
          {errors.address?.type === 'minLength' && <span className="text-rose-600">Tối thiểu 6 ký tự</span>}
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Thêm nhà
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHome;
