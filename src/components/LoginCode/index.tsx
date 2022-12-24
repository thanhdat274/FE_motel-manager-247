import { useUserContext } from '@/context/UserContext';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { loginCode } from 'src/pages/api/room';
import { Toast } from 'src/hooks/toast';

type Props = {
  data: any;
  handleResetPage: () => void

};

const LoginCode = ({ data, handleResetPage }: Props) => {
  console.log('data', data.subName);
  const codeRoomProp = data?.subName
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();
  const { cookies, setLoading, user } = useUserContext();
  const userData = cookies?.user;
  const router = useRouter();
  const param = router.query;
  const idRoom = param?.id_room;

  const onSubmit = async (data: any) => {
    console.log('data submit', data);
    if (data?.codeRoom == codeRoomProp) {
      Toast('error', 'Bạn cần thay đổi mã trước khi gửi đi!');

    } else {
      setLoading(true)
      try {
        const newData = { ...data, idRoom: idRoom, userData: userData };
        await loginCode(newData).finally(() => {
          handleResetPage()
        });
        Toast('success', 'Cập nhật mã đăng nhập thành công');
        setLoading(false)
      } catch (error: any) {
        Toast('error', error?.response?.data?.message);
        setLoading(false)
      }
    }
  };
  return (
    <div>
      <div>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <h1>Mã đăng nhập</h1>
          <div className="flex">
            <div className="mb-6 w-[30%]">
              <input
                type="text"
                defaultValue={data.subName}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none focus:shadow-outline"
                placeholder="Mã đăng nhập"
                {...register('codeRoom', {
                  required: true,
                  minLength: 4,
                  pattern: /^[a-zA-Z0-9&@.$%\-_,():;`]+$/,
                })}
              />
              <div className="mt-2 text-red-500">
                {errors.codeRoom?.type === 'required' && (
                  <span className="text-[red] mt-1 block">Vui lòng nhập mã đăng nhập!</span>
                )}
                {errors.codeRoom?.type === 'minLength' && (
                  <span className="text-[red] mt-1 block">Mã đăng nhập tối thiểu 4 ký tự!</span>
                )}
                {errors.codeRoom?.type === 'pattern' && (
                  <span className="text-[red] mt-1 block">Mã đăng nhập không chứa dấu cách và chữ có dấu!</span>
                )}
              </div>
              <p>VD: abc_12345</p>
            </div>
            <div className="ml-5">
              <button
                type="submit"
                className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginCode;
