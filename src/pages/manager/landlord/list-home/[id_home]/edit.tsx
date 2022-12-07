import { useUserContext } from '@/context/UserContext';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Toast } from 'src/hooks/toast';
import { readHouse, updateHouse } from 'src/pages/api/house';

type Props = {};

const EditHouse = (props: Props) => {
  const router = useRouter();
  const { cookies, setLoading } = useUserContext();
  const userData = cookies?.user;

  const param = router.query;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const getHome = async () => {
      try {
        const res = await readHouse(`${param.id_home}`, userData as any);
        if (res.data) {
          reset(res.data as any);
        }
      } catch (error) { }
    };
    getHome();
  }, [param.id_home, reset, userData]);

  const onSubmit = async (dataForm: any) => {
    const newData = { ...dataForm, userData: userData };
    setLoading(true);
    await updateHouse(newData)
      .then(() => {
        setLoading(false);
        Toast('success', 'Sửa nhà  thành công!');
        router.push('/manager/landlord/list-home');
      })
      .catch((error) => {
        Toast('error', error?.response?.data?.message);
        setLoading(false);
      });
  };

  return (
    <div className="w-full ">
      <div className="grid grid-flow-col px-4 py-2 text-white bg-cyan-500 mt-4 ">
        <div className="">
          <h2 className="pt-2 text-xl">Sửa nhà </h2>
        </div>
      </div>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Tên nhà <span className="text-[red]">*</span>
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Xin mời nhập tên nhà"
            {...register('name', { required: true, minLength: 6 })}
          />
          {errors.name?.type === 'required' && (
            <span className="text-[red] mt-1 block">Vui lòng nhập tên nhà của bạn!</span>
          )}
          {errors.name?.type === 'minLength' && (
            <span className="text-[red] mt-1 block">Tên nhà của bạn phải tối thiểu 6 ký tự!</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Địa chỉ <span className="text-[red]">*</span>
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            type="text"
            placeholder="Xin mời nhập địa chỉ"
            {...register('address', { required: true, minLength: 6 })}
          />
          {errors.address?.type === 'required' && (
            <span className="text-[red] mt-1 block">Vui lòng nhập địa chỉ nhà của bạn!</span>
          )}
          {errors.address?.type === 'minLength' && (
            <span className="text-[red] mt-1 block">Địa chỉ nhà của bạn phải tối thiểu 6 ký tự!</span>
          )}
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
