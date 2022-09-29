import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { readHouse, updateHouse } from 'src/pages/api/house';
type Props = {};

const EditHouse = (props: Props) => {
  const [houses, setHouse] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    const getHouse = async () => {
      const { data } = await readHouse(id as string);
      reset(data);
    };
    getHouse();
  }, [id, reset]);

  const onSubmit = async (data: any) => {
    console.log(data);

    try {
      updateHouse(data);

      router.push('/manager/landlord/house');
    } catch (error) {}
  };

  return (
    <div className="w-full ">
      <div className="grid grid-flow-col px-4 py-2 text-white bg-cyan-500 ">
        <div className="">
          <h2 className="pt-2 text-xl">Sửa nhà </h2>
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
            {...register('name', { required: true })}
          />
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
            {...register('address', { required: true })}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sửa nhà
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditHouse;
