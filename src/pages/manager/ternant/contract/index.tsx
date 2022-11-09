import React, { useState, useEffect } from 'react';

type Props = {};

const ContractTernant = (props: Props) => {
  const [codeRoom, setCodeRoom] = useState<any>();
  console.log(codeRoom);
  useEffect(() => {
    const codeRoom = JSON.parse(localStorage.getItem('code_room') as string);
    setCodeRoom(codeRoom as any);
  }, []);
  return (
    <div>
      <div className="border p-5 ">
        <p className="mb-5">Các thông tin nhập ở đây sẽ được sử dụng cho việc xuất/ in hợp đồng thuê phòng</p>
        <form>
          <div className="md:grid grid-cols-2 md:gap-10 sm:gap-6 gap-4">
            <div className="md:grid grid-cols-4 mb-4">
              <p className="">Nơi kí hợp đồng</p>
              <input
                type="string"
                className="p-2 max-h-10 w-full md:col-span-3"
                value={codeRoom?.contract?.addressCT}
                disabled
              />
            </div>
            <div className="md:grid grid-cols-4 mb-4">
              <p className="">Thời gian kí HĐ</p>
              <input
                type="date"
                className="p-2 max-h-10 w-full  md:col-span-3"
                value={codeRoom?.contract?.timeCT}
                disabled
              />
            </div>
          </div>

          <div className="md:grid grid-cols-2 md:gap-10 sm:gap-6 gap-4 mb-6">
            <div className="md:grid grid-cols-4 ">
              <p className="">Thời gian HĐ</p>
              <input
                type="string"
                placeholder="3 tháng"
                className="p-2 max-h-10 w-full md:col-span-3"
                value={codeRoom?.contract?.timeContract}
                disabled
              />
            </div>
          </div>

          <div className="md:grid grid-cols-2 md:gap-10 sm:gap-6 gap-4 mb-6">
            <div className="md:grid grid-cols-4 mb-4">
              <p className="">Ngày bắt đầu HĐ</p>
              <input
                type="date"
                className="p-2 max-h-10 w-full  md:col-span-3"
                value={codeRoom?.contract?.startTime}
                disabled
              />
            </div>
            <div className="md:grid grid-cols-4 mb-4">
              <p className="">Ngày kết thúc HĐ</p>

              <input
                type="date"
                className="p-2 max-h-10 w-full  md:col-span-3"
                value={codeRoom?.contract?.endTime}
                disabled
              />
            </div>
          </div>

          <div className="md:grid grid-cols-2 md:gap-10 sm:gap-6 gap-4 ">
            <div className="md:grid grid-cols-4 mb-4">
              <p className="">Họ và tên chủ trọ</p>
              <input
                type="string"
                placeholder="Nguyễn Văn A"
                className="p-2 max-h-10 w-full md:col-span-3"
                value={codeRoom?.contract?.infoLandlord?.name}
                disabled
              />
            </div>

            <div className="md:grid grid-cols-4 mb-4">
              <p className="">Số CMND/CCCD</p>
              <input
                type="string"
                className="p-2 max-h-10 w-full md:col-span-3"
                value={codeRoom?.contract?.infoLandlord?.cardNumber}
                disabled
              />
            </div>
          </div>

          <div className="md:grid grid-cols-2 md:gap-10 sm:gap-6 gap-4">
            <div className="md:grid grid-cols-4 mb-4">
              <p className="">Ngày cấp</p>
              <input
                type="date"
                className="p-2 max-h-10 w-full md:col-span-3"
                value={codeRoom?.contract?.infoLandlord?.dateRange}
                disabled
              />
            </div>

            <div className="md:grid grid-cols-4 mb-4">
              <p className="">Nơi cấp </p>
              <input
                className="p-2 max-h-10 w-full md:col-span-3"
                value={codeRoom?.contract?.infoLandlord?.issuedBy}
                disabled
              />
            </div>
          </div>

          <div className="md:grid grid-cols-2 md:gap-10 sm:gap-6 gap-4 md:pb-10 pb-8">
            <div className="md:grid grid-cols-4 mb-4">
              <p className="">Số điện thoại liên lạc</p>
              <input
                type="string"
                className="p-2 max-h-10 w-full md:col-span-3"
                value={codeRoom?.contract?.infoLandlord?.phoneNumber}
                disabled
              />
            </div>
          </div>

          <div className="md:grid grid-cols-2 md:gap-10 sm:gap-6 gap-4">
            <div className="md:grid grid-cols-4 mb-4">
              <p className="">Người đại diện</p>
              <input
                type="string"
                placeholder="Nguyễn Văn A"
                className="p-2 max-h-10 w-full md:col-span-3"
                value={codeRoom?.contract?.infoTenant?.name}
                disabled
              />
            </div>

            <div className="md:grid grid-cols-4 mb-4">
              <p className="">Số CMND/CCCD</p>
              <input
                type="string"
                className="p-2 max-h-10 w-full md:col-span-3"
                value={codeRoom?.contract?.infoTenant?.cardNumber}
                disabled
              />
            </div>
          </div>

          <div className="md:grid grid-cols-2 md:gap-10 sm:gap-6 gap-4">
            <div className="md:grid grid-cols-4 mb-4">
              <p className="">Ngày cấp</p>
              <input
                type="date"
                className="p-2 max-h-10 w-full md:col-span-3"
                value={codeRoom?.contract?.infoTenant?.dateRange}
                disabled
              />
            </div>

            <div className="md:grid grid-cols-4 mb-4">
              <p className="">Nơi cấp </p>
              <input
                className="p-2 max-h-10 w-full md:col-span-3"
                value={codeRoom?.contract?.infoTenant?.issuedBy}
                disabled
              />
            </div>
          </div>

          <div className="md:grid grid-cols-2 md:gap-10 sm:gap-6 gap-4">
            <div className="md:grid grid-cols-4 mb-4">
              <p className="">Số điện thoại liên lạc</p>
              <input
                type="string"
                className="p-2 max-h-10 w-full md:col-span-3"
                value={codeRoom?.contract?.infoTenant?.phoneNumber}
                disabled
              />
            </div>
          </div>
          <div className="md:grid grid-cols-2 md:gap-10 sm:gap-6 gap-4">
            <div className="mb-4">
              <div className="md:grid grid-cols-4 mb-4">
                <p className="">Tiền phạt</p>
                <input
                  type="string"
                  className="p-2 max-h-10 w-full  md:col-span-3"
                  value={codeRoom?.contract?.fine}
                  disabled
                />
              </div>
            </div>
            <div className=""></div>
          </div>
          <div className="md:grid grid-cols-8 mb-4">
            <p className="">Quy định bổ sung</p>
            <textarea id="" className="p-2 w-full md:col-span-7 " value={codeRoom?.contract?.additional} disabled />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContractTernant;