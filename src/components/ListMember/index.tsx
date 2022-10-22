import React, { useEffect, useState } from 'react';
import { faEye, faEyeSlash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUserContext } from '@/context/UserContext';
import { Toast } from 'src/hooks/toast';
import axios from 'axios';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { useForm } from 'react-hook-form';

export type IMember = {
  status: boolean;
  _id: string;
  memberName: string;
  cardNumber: string;
  phoneNumber: string;
};
export type IMember2 = {
  _id:string;
  name: string;
  status: boolean;
  maxMember: number;
  price: number;
  area: number;
  listMember: Object;
};

const ListMember = (props: IMember) => {
  const { _id, memberName, cardNumber, phoneNumber } = props;
  const [hiddenPhone, setHiddenphone] = useState<boolean>(true);
  const [hiddenCardNumber, setHiddenCardNumber] = useState<boolean>(true);
  const [peopleData, setPeopleData] = useState([]);
  const [open, setOpen] = useState(false);

  const { setLoading } = useUserContext();
  const router = useRouter();
  const param = router.query;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const removeRoom = async (id: string) => {
    console.log('id phòng', id);

    const confirm = window.confirm('Bạn có muốn xóa không?');
    if (confirm) {
      setLoading(true);
      try {
        await axios
          .delete(
            `https://633505ceea0de5318a0bacba.mockapi.io/api/house/${param.id}/room/${param.id_room}/people/` + id,
          )
          .then(() => {
            Toast('success', 'Xóa phòng thành công');
            setPeopleData(peopleData.filter((item: any) => item.id !== id));
            setLoading(false);
          });
      } catch (error) {
        Toast('error', 'Xóa phòng không thành công');
        setLoading(false);
      }
    }
  };
  // useEffect(() => {
  //   const getRoom = async () => {
  //     try {
  //       const res = await axios.get(
  //         `https://633505ceea0de5318a0bacba.mockapi.io/api/house/${param.id}/room/${param.id_room}/people/` + id,
  //       );
  //       if (res.data) {
  //         reset(res.data as any);
  //         console.log('data', res.data);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getRoom();
  // }, [param.id, param.id_room, id]);

  const onSubmit = async (data: any) => {
    console.log('data từ form', data);
    setLoading(true);
    try {
      await axios
        .put(
          `https://633505ceea0de5318a0bacba.mockapi.io/api/house/${param.id}/room/${param.id_room}/people/` + _id,
          data,
        )
        .then((data: any) => {
          setLoading(false);
          router.push(`/manager/landlord/${param.id}/list-room`);
          Toast('success', 'Cập nhật thành viên thành công ');
        });
    } catch (error) {
      setLoading(false);
      Toast('error', 'Cập nhật thành viên không thành công');
    }
  };

  const showData = (data: string, status: boolean) => {
    if (data) {
      return status ? data : '************';
    }
    return 'Không có';
  };

  return (
    <div>
      <div className="card-member bg-white w-full border border-solid border-gray-600 p-4 flex flex-col rounded">
        <div className="name-member">
          <strong>Họ và tên:</strong>
          {memberName}
        </div>
        <div className="flex flex-row justify-between">
          <div className="phone-number">
            <strong>SĐT:</strong> {showData(phoneNumber, !hiddenPhone)}{' '}
          </div>
          <FontAwesomeIcon
            className="w-[20px] text-[10px] pt-[2px]"
            onClick={() => setHiddenphone(!hiddenPhone)}
            icon={hiddenPhone ? faEyeSlash : faEye}
            size={'lg'}
          />
        </div>
        <div className="flex flex-row justify-between">
          <div className="cart-number">
            <strong>CMT/CCCD:</strong> {showData(cardNumber, !hiddenCardNumber)}
          </div>
          <FontAwesomeIcon
            className="w-[20px] text-[10px] pt-[2px]"
            onClick={() => setHiddenCardNumber(!hiddenCardNumber)}
            icon={hiddenCardNumber ? faEyeSlash : faEye}
            size={'lg'}
          />
        </div>
        {/* <div className="name-member">{role == '1' ? <div>Chủ Phòng</div> : <div>Khách thuê</div>}</div> */}

        <div className="control-member flex flex-row gap-2">
          <div
            onClick={onOpenModal}
            className="rounded edit-member flex flex-row gap-2 p-2 bg-indigo-600 text-white border border-solid border-indigo-600 base-1/2 cursor-pointer"
          >
            <FontAwesomeIcon className="w-[10px] text-[10px] pt-[2px]" icon={faPenToSquare} height={20} />
            <span>Sửa</span>
          </div>
          <div className="rounded edit-member flex flex-row gap-2 p-2 bg-red-600 hover:bg-red-400 text-white border border-solid border-red-600 hover:border-red-400 base-1/2 cursor-pointer">
            <FontAwesomeIcon className="w-[10px] text-[10px] pt-[2px]" icon={faPenToSquare} height={20} />
            <span
              onClick={() => {
                removeRoom(_id);
              }}
            >
              Xóa
            </span>
          </div>
        </div>

        <Modal open={open} onClose={onCloseModal} center>
          <h1 className="pt-2">
            -----------------------------------------------------------------------------------------------------------------------
          </h1>
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
                {errors.full_name?.type === 'required' && (
                  <span className="text-rose-600">Mời bạn nhập tên thành viên</span>
                )}
                {errors.full_name?.type === 'minLength' && <span className="text-rose-600">Tối thiểu 6 ký tự</span>}
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
                  <option value="1">Chủ phòng</option>
                  <option value="0">Thành viên</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  CMT/CCCD
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="cccd"
                  type="text"
                  placeholder="Xin mời nhập  CMT/CCCD"
                  {...register('cccd', { required: true, minLength: 6 })}
                />
                {errors.cccd?.type === 'required' && <span className="text-rose-600">Mời bạn nhập CMT/CCCD</span>}
                {errors.cccd?.type === 'minLength' && <span className="text-rose-600">Tối thiểu 6 ký tự</span>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Số điện thoại
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="phone"
                  type="text"
                  placeholder="Xin mời nhập  sô điện thoại"
                  {...register('phone', { required: true, minLength: 6, maxLength: 11 })}
                />
                {errors.phone?.type === 'required' && <span className="text-rose-600">Mời bạn nhập CMT/CCCD</span>}
                {errors.phone?.type === 'minLength' && <span className="text-rose-600">Tối thiểu 6 ký tự</span>}
                {errors.phone?.type === 'maxLength' && <span className="text-rose-600">Tối thiểu 11 ký tự</span>}
              </div>

              <div className="flex items-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Sửa
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ListMember;
