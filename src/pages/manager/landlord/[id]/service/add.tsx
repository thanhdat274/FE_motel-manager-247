import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import swal from 'sweetalert';
type Props = {};
interface IFormInputs {
  name: string;
  price: number;
  desc: string;
}
const AddServiceRoom = (props: Props) => {
  const router = useRouter();
  const {id}=router.query;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInputs>();
  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    try {
      await axios.post('http://localhost:3001/api/service/', data);
      swal('Bạn đã thêm mới thành công!', 'success');
      router.push(`/manager/landlord/${id}/service`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full ">
      <div className="grid grid-flow-col px-4 py-2 text-white bg-cyan-500 ">
        <div className="">
          <h2 className="pt-2 text-xl">Thêm dịch vụ </h2>
        </div>
      </div>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Tên dịch vụ
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Nhập tên dịch vụ..."
            {...register('name', { required: true })}
          />
          {errors.name?.type === 'required' && <span className="text-rose-600">Không được bỏ trống</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Giá dịch vụ
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="text"
            placeholder="Nhập giá dịch vụ..."
            {...register('price', { required: true, min: 1000 })}
          />
          {errors.price?.type === 'required' && <span className="text-rose-600">Không được bỏ trống</span>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Ghi chú
          </label>
          <textarea
            rows={5}
            id="desc"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            defaultValue={''}
            {...register('desc', { required: true })}
          />
          <span className="text-red-500">{errors.price && 'Không được bỏ trống!'}</span>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Thêm dịch vụ
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddServiceRoom;
