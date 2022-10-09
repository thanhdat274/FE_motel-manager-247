import React, { useEffect, useState } from 'react';
import { faEye, faEyeSlash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export type IMember = {
  name: string;
  phoneNumber: string;
  cardNumber: string;
};

const ListMember = (props: IMember) => {
  const { name, phoneNumber, cardNumber } = props;
  const [hiddenPhone, setHiddenphone] = useState<boolean>(true);
  const [hiddenCardNumber, setHiddenCardNumber] = useState<boolean>(true);

  const showData = (data: string, status: boolean) => {
    if (data) {
      return status ? data : '************';
    }
    return 'không có';
  };

  return (
    <div className="card-member bg-white w-full border border-solid border-gray-600 p-4 flex flex-col">
      <div className="name-member">Họ và tên:{name}</div>
      <div className="flex flex-row justify-between">
        <div className="phone-number">SĐT: {showData(phoneNumber, !hiddenPhone)} </div>
        <FontAwesomeIcon
          className="w-[20px] text-[10px] pt-[2px]"
          onClick={() => setHiddenphone(!hiddenPhone)}
          icon={hiddenPhone ? faEyeSlash : faEye}
          size={'lg'}
        />
      </div>
      <div className="flex flex-row justify-between">
        <div className="cart-number">CMT/CCCD: {showData(cardNumber, !hiddenCardNumber)}</div>
        <FontAwesomeIcon
          className="w-[20px] text-[10px] pt-[2px]"
          onClick={() => setHiddenCardNumber(!hiddenCardNumber)}
          icon={hiddenCardNumber ? faEyeSlash : faEye}
          size={'lg'}
        />
      </div>

      <div className="control-member flex flex-row gap-2">
        <div className="edit-member flex flex-row gap-2 p-2 bg-indigo-600 text-white border border-solid border-indigo-600 base-1/2 cursor-pointer">
          <FontAwesomeIcon className="w-[10px] text-[10px] pt-[2px]" icon={faPenToSquare} height={20} />
          <span>Chỉnh sửa</span>
        </div>
        <div className="edit-member flex flex-row gap-2 p-2 bg-red-600 hover:bg-red-400 text-white border border-solid border-red-600 hover:border-red-400 base-1/2 cursor-pointer">
          <FontAwesomeIcon className="w-[10px] text-[10px] pt-[2px]" icon={faPenToSquare} height={20} />
          <span>Xóa</span>
        </div>
      </div>
    </div>
  );
};

export default ListMember;
