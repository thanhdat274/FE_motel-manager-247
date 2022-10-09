
import dynamic from 'next/dynamic';
import React from 'react';
import { IMember } from '../ListMember';
import Modal from 'react-modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useUserContext } from '@/context/UserContext';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Toast } from 'src/hooks/toast';

const ListMember = dynamic(() => import('@/components/ListMember'), { ssr: false });

type IProps = {
  data: IMember[];
};
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '800px',
    transform: 'translate(-50%, -50%)',
  },
};
const TenantMember = ({ data }: IProps) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const { setLoading } = useUserContext();
  const router = useRouter();
  const param = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log('data', data);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {

    setIsOpen(true);
  }

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await axios
        .post(`https://633505ceea0de5318a0bacba.mockapi.io/api/house/${param.id}/room/${param.id_room}/people`, data)
        .then((data: any) => {
          setLoading(false);
          setIsOpen(false);
          router.push(`/manager/landlord/${param.id}/list-room`);
          Toast('success', 'Thêm mới thành viên thành công');
        });
    } catch (error) {
      setLoading(false);
      Toast('error', 'Thêm mới phòng thành viên thành công');
    }
  };

  return (
    <div>
      <div>
        <button onClick={openModal} className="p-3 border mb-3 bg-cyan-400 text-white hover:bg-cyan-500">
          Thêm thành viên
        </button>
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}   style={customStyles} contentLabel="Example Modal">
          <div className="w-full ">
            <div className="grid grid-flow-col px-4 py-2 text-white bg-cyan-500 ">
              <div className="">
                <h2 className="pt-2 text-xl">Thêm thành viên </h2>
              </div>
            </div>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Tên thành viên
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Xin mời nhập tên thành viên"
                  {...register('full_name', { required: true, minLength: 6 })}
                />
                {errors.name?.type === 'required' && <span className="text-rose-600">Mời bạn nhập tên thành viên</span>}
                {errors.name?.type === 'minLength' && <span className="text-rose-600">Tối thiểu 6 ký tự</span>}
              </div>
             
              <div className="col-span-6">
                <label className="block text-gray-700 text-sm font-bold" htmlFor="username">
                  Trạng thái phòng
                </label>
                <select
                  className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  {...register('role', { required: true })}
                  id="role"
                >
                  <option value="true">Chủ phòng</option>
                  <option value="false">Thành viên</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  CMT/CCCD
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="address"
                  type="text"
                  placeholder="Xin mời nhập  CMT/CCCD"
                  {...register('cccd', { required: true, minLength: 6 })}
                />
                {errors.address?.type === 'required' && <span className="text-rose-600">Mời bạn nhập CMT/CCCD</span>}
                {errors.address?.type === 'minLength' && <span className="text-rose-600">Tối thiểu 6 ký tự</span>}
              </div>

              <div className="flex items-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Thêm thành viên
                </button>
                <button
                  className="ml-5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={closeModal}
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
      <div className="flex flex-row flex-wrap w-full gap-4">
        {data.length > 0 ? (
          data?.map((item: IMember) => (
            <div key={item.full_name} className=" basis-full md:basis-[30%] ">
              <ListMember {...item} />
            </div>
          ))
        ) : (
          <div>Chưa có thành viên nào</div>
        )}
      </div>
    </div>
  );
};

export default TenantMember;

