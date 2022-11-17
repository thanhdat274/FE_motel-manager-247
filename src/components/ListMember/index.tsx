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
import { removePeople } from 'src/pages/api/room';

export type IMember = {
  status: boolean;
  _id: string;
  memberName: string;
  cardNumber: string;
  phoneNumber: string;
};
export type IMember2 = {
  _id: string;
  name: string;
  status: boolean;
  maxMember: number;
  price: number;
  area: number;
  listMember: object;
};

const ListMember = (props: IMember) => {
  const { _id, memberName, cardNumber, phoneNumber, status } = props;

  const [hiddenPhone, setHiddenphone] = useState<boolean>(true);
  const [hiddenCardNumber, setHiddenCardNumber] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const { cookies, setLoading, user } = useUserContext();

  const userData = cookies?.user;
  const router = useRouter();
  const param = router.query;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


  const removeRoom = async (props: IMember) => {
    const confirm = window.confirm('Bạn có muốn xóa không?');
    if (confirm) {
      setLoading(true);
      const newData = { ...props, userData: userData };

      try {
        await removePeople(param.id_room, newData).then(() => {
          Toast('success', 'Xóa thành viên thành công');
          router.push(`/manager/landlord/${param.id}/list-room`);

          setLoading(false);
        });
      } catch (error) {
        Toast('error', 'Xóa thành viên không thành công');
        setLoading(false);
      }
    } else {
      setLoading(false);
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
        <div className="name-member">{status == true ? <div>Chủ Phòng</div> : <div>{null}</div>}</div>

        <div className="control-member flex flex-row gap-2">
          {/* <div
            onClick={onOpenModal}
            className="rounded edit-member flex flex-row gap-2 p-2 bg-indigo-600 text-white border border-solid border-indigo-600 base-1/2 cursor-pointer"
          >
            <FontAwesomeIcon className="w-[10px] text-[10px] pt-[2px]" icon={faPenToSquare} height={20} />
            <span>Sửa</span>
          </div> */}
          <div className="rounded edit-member flex flex-row gap-2 p-2 bg-red-600 hover:bg-red-400 text-white border border-solid border-red-600 hover:border-red-400 base-1/2 cursor-pointer">
            <FontAwesomeIcon className="w-[10px] text-[10px] pt-[2px]" icon={faPenToSquare} height={20} />
            <span
              onClick={() => {
                removeRoom(props);
              }}
            >
              Xóa
            </span>
          </div>
        </div>


      </div>
    </div>
  );
};

export default ListMember;
