import React, { useEffect, useState } from 'react';
import { faEye, faEyeSlash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUserContext } from '@/context/UserContext';
import { Toast } from 'src/hooks/toast';
import axios from 'axios';

export type IMember = {
  id: number;
  full_name: string;
  cccd: string;
  role: string;
  address: string;

};

const ListMember = (props: IMember) => {
  const { id, full_name, cccd, role, address } = props;
  const [hiddenPhone, setHiddenphone] = useState<boolean>(true);
  const [hiddenCardNumber, setHiddenCardNumber] = useState<boolean>(true);
  const [peopleData, setPeopleData] = useState([]);

  const { setLoading } = useUserContext();
  const router = useRouter();
  const param = router.query;
  // console.log(param);

  const removeRoom = async (id: number) => {
    console.log('id phòng', id);
    setLoading(true);
    const confirm = window.confirm('Bạn có muốn xóa không?');
    if (confirm) {
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

  const showData = (data: string, status: boolean) => {
    if (data) {
      return status ? data : '************';
    }
    return 'Không có';
  };

  return (
    <div>
      <div className="card-member bg-white w-full border border-solid border-gray-600 p-4 flex flex-col">
        <div className="name-member">Họ và tên:{full_name}</div>
        <div className="flex flex-row justify-between">
          <div className="phone-number">SĐT: {showData(cccd, !hiddenPhone)} </div>
          <FontAwesomeIcon
            className="w-[20px] text-[10px] pt-[2px]"
            onClick={() => setHiddenphone(!hiddenPhone)}
            icon={hiddenPhone ? faEyeSlash : faEye}
            size={'lg'}
          />
        </div>
        <div className="flex flex-row justify-between">
          <div className="cart-number">CMT/CCCD: {showData(cccd, !hiddenCardNumber)}</div>
          <FontAwesomeIcon
            className="w-[20px] text-[10px] pt-[2px]"
            onClick={() => setHiddenCardNumber(!hiddenCardNumber)}
            icon={hiddenCardNumber ? faEyeSlash : faEye}
            size={'lg'}
          />
        </div>
        <div className="name-member">Chức vụ:{role}</div>

        <div className="control-member flex flex-row gap-2">
          <div className="edit-member flex flex-row gap-2 p-2 bg-indigo-600 text-white border border-solid border-indigo-600 base-1/2 cursor-pointer">
            <FontAwesomeIcon className="w-[10px] text-[10px] pt-[2px]" icon={faPenToSquare} height={20} />
            <span>Sửa</span>
          </div>
          <div className="edit-member flex flex-row gap-2 p-2 bg-red-600 hover:bg-red-400 text-white border border-solid border-red-600 hover:border-red-400 base-1/2 cursor-pointer">
            <FontAwesomeIcon className="w-[10px] text-[10px] pt-[2px]" icon={faPenToSquare} height={20} />
            <span
              onClick={() => {
                removeRoom(id);
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
