import React, { useEffect, useState } from 'react';
import { faEye, faKeyboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import 'antd/dist/antd.css';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import moment from 'moment';
import { useUserContext } from '@/context/UserContext';
import { Toast } from 'src/hooks/toast';
import { CreateBill } from 'src/pages/api/bill';
import { listRoom } from 'src/pages/api/room';
import { useRouter } from 'next/router';
type Props = {};
type FormInputs = {
  idRoom: string;
  month: number;
  year: number;
};

const Receipt = (props: Props) => {
  const today = new Date();
  const [rooms, setRooms] = useState([]);
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [open1, setOpen1] = useState(false);
  const onOpenModal1 = () => setOpen1(true);
  const onCloseModal1 = () => setOpen1(false);
  const [monthCheck, setMonth] = useState(today.getMonth());
  const [yearCheck, setYear] = useState(today.getFullYear());
  const { setLoading, cookies } = useUserContext();
  const userData = cookies?.user;
  const router = useRouter();
  const { id } = router.query;

  const { register, handleSubmit, setValue, getValues, reset } = useForm<FormInputs>();
  useEffect(() => {
    const getRoom = async () => {
      try {
        const { data } = await listRoom(id, userData as any);

        if (data.data) {
          setRooms(data.data as any);
        }
      } catch (error) {
        console.log('error', error);
      }
    };
    getRoom();
  }, [userData, id]);
  const onSubmit: SubmitHandler<FormInputs> = async (data: any) => {
    if (monthCheck && yearCheck) {
      const newData = { ...data, month: monthCheck, year: yearCheck, userData: userData };
      console.log(newData.idRoom);

      setLoading(true);
      await CreateBill(newData)
        .then((data: any) => {
          console.log('hóa đơn', data);
          setLoading(false);
          Toast('success', 'Tạo hóa đơn thành công!');
        })
        .catch((error: any) => {
          setLoading(false);
        });
    } else {
      Toast('error', 'Vui lòng chọn tháng năm!');
    }
  };
  const datePickerShow = React.useMemo(() => {
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
      setMonth(parseInt(dateString.slice(5, 7)));
      setYear(parseInt(dateString.slice(0, 4)));
      reset();
    };
    return (
      <DatePicker
        style={{ width: '200px' }}
        onChange={onChange}
        defaultValue={moment(`${yearCheck}-${monthCheck}`, 'YYYY-MM')}
        picker="month"
      />
    );
  }, [monthCheck, reset, yearCheck]);

  return (
    <div className="h-screen">
      <header className="bg-white shadow">
        <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate uppercase">
                Quản lý hóa đơn
              </h2>
            </div>
            <div className="">
              {' '}
              <button onClick={onOpenModal1}>
                <FontAwesomeIcon className="w-[16px] text-black" icon={faKeyboard} />
              </button>
            </div>
            <div className="mt-5 flex lg:mt-0 lg:ml-4">
              <form>
                <input
                  type="text"
                  name="keyword"
                  className="text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Tìm kiếm..."
                />
              </form>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-full mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full ">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Phòng
                        </th>

                        <th
                          scope="col"
                          className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Người đại diện
                        </th>
                        <th
                          scope="col"
                          className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Số tiền phải trả
                        </th>

                        <th
                          scope="col"
                          className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Tiền dịch vụ
                        </th>
                        <th
                          scope="col"
                          className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Tổng tiền
                        </th>
                        <th
                          scope="col"
                          className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Chi tiết
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-9 py-4 whitespace text-sm text-gray-500">
                          <div className="text-center">Nhà bỏ Hoang 10 năm có ma đấy nhé :)) </div>
                        </td>
                        <td className="px-6 py-4 whitespace">
                          <div className="text-center">Phòng bỏ trống 10 năm :))</div>
                        </td>

                        <td className="px-6 py-4 whitespace">
                          <div className="text-center">Đã bảo trống 10 năm rồi làm gì có khách nào :))</div>
                        </td>
                        <td className="px-6 py-4 whitespace">
                          <div className="text-center">1000vnd</div>
                        </td>
                        <td className="px-6 py-4 whitespace">
                          <div className="text-center">1000vnd</div>
                        </td>

                        <td className="px-6 py-4 whitespace">
                          <div className="text-center">
                            <button onClick={onOpenModal}>
                              <FontAwesomeIcon className="w-[16px] text-black" icon={faEye} />
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-9 py-4 whitespace text-sm text-gray-500">
                          <div className="text-center">Nhà bỏ Hoang 10 năm có ma đấy nhé :)) </div>
                        </td>
                        <td className="px-6 py-4 whitespace">
                          <div className="text-center">Phòng bỏ trống 10 năm :))</div>
                        </td>

                        <td className="px-6 py-4 whitespace">
                          <div className="text-center">Đã bảo trống 10 năm rồi làm gì có khách nào :))</div>
                        </td>
                        <td className="px-6 py-4 whitespace">
                          <div className="text-center">1000vnd</div>
                        </td>
                        <td className="px-6 py-4 whitespace">
                          <div className="text-center">1000vnd</div>
                        </td>
                        <td className="px-6 py-4 whitespace">
                          <div className="text-center">
                            <button onClick={onOpenModal}>
                              <FontAwesomeIcon className="w-[16px] text-black" icon={faEye} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="">
        <Modal open={open} onClose={onCloseModal} center>
          <div>
            <header className="bg-white shadow">
              <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="lg:flex lg:items-center lg:justify-between">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate uppercase">
                      Chi tiết hóa đơn
                    </h2>
                  </div>
                </div>
              </div>
            </header>
            <div className="modal-body" id="contentPDF">
              <div className="h-[27px]">
                <span>
                  <strong>Nhà Tầng 1</strong>
                </span>
                <span className="float-right" />
              </div>
              <div className="h-[27px]">
                <span>
                  <strong>Địa chỉ: Hà Nội </strong>
                </span>
                <span className="float-right">24/10/2022</span>
              </div>
              <div>
                <h4 className="text-center">
                  <strong>HÓA ĐƠN TIỀN NHÀ</strong>
                </h4>
              </div>
              <div>
                <p className="text-center">
                  <strong>Tháng 10/2022 - Kỳ 30</strong>
                </p>
              </div>
              <div>
                <p className="text-center">(Từ ngày 01/10/2022 đến 31/10/2022)</p>
              </div>
              <div>
                <p>
                  Họ tên: <strong>Nguyễn Văn Duy </strong>
                </p>
              </div>
              <div>
                <p>
                  <strong>Phòng: 1</strong>
                </p>
              </div>
              <div className="border-b-2 border-t-2 border-black">
                <table cellSpacing={0} cellPadding={0} width="100%">
                  <tbody>
                    <tr>
                      <td className="w-[2%]">1)</td>
                      <td className="w-[70%]">Tiền nhà (từ ngày 01/10/2022 đến ngày 31/10/2022)</td>
                      <td className="w-[25%] text-right">3,000,000</td>
                    </tr>
                    <tr>
                      <td className="w-[2%]">2)</td>
                      <td className="w-[70%]">Điện(CS cũ:22.0, CS mới:33.0, SD:11.0)</td>
                      <td className="w-[25%] text-right">33,000</td>
                    </tr>
                    <tr>
                      <td className="w-[2%]">3)</td>
                      <td className="w-[70%]">Nước(CS cũ:100.0, CS mới:200.0, SD:100.0)</td>
                      <td className="w-[25%] text-right">2,000,000</td>
                    </tr>
                    <tr>
                      <td className="w-[2%]">4)</td>
                      <td className="w-[70%]">Gửi xe máy</td>
                      <td className="w-[25%] text-right">80,000</td>
                    </tr>
                    <tr>
                      <td className="w-[2%]">5)</td>
                      <td className="w-[70%]">Rác</td>
                      <td className="w-[25%] text-right">50,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="border-b-2 border-black">
                <strong>TỔNG CỘNG</strong>
                <strong className="float-right">5,163,000</strong>
              </div>
              <div>
                <span className="left-[45%] relative float-left">
                  <strong>Người thanh toán</strong>
                </span>
                <span className="float-right">
                  <strong>Người nhận TT</strong>
                </span>
              </div>
            </div>
          </div>
        </Modal>
      </div>
      <div>
        <Modal open={open1} onClose={onCloseModal1} center>
          <div className="w-full">
            <h1 className="pt-2 text-white">
              -----------------------------------------------------------------------------------------------------------------------
            </h1>
            <hr />
            <div className="grid grid-flow-col px-4 py-2 text-white bg-cyan-500">
              <div className="">
                <h2 className="pt-2 text-xl">Tính tiền </h2>
              </div>
            </div>{' '}
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-5">
                <Space direction="vertical">{datePickerShow}</Space>
              </div>
              <div className="mt-5">
                <select
                  className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  {...register('idRoom', { required: true })}
                >
                  {rooms?.map((room: any, index: number) => {
                    return (
                      <option value={room._id} key={index}>
                        {room.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex items-center mt-5">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Tính tiền
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Receipt;
