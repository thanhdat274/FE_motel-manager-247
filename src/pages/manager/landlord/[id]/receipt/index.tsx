import React, { useState } from 'react';
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
import { listBill, readBill } from 'src/pages/api/bill';
import AddBill from './addBill';
import { getAllBillForHouse } from 'src/pages/api/billService';
type Props = {};
type FormInputs = {
  idRoom: string;
  month: number;
  year: number;
  name: string;
};

const Receipt = (props: Props) => {
  const today = new Date();
  const { setLoading, cookies } = useUserContext();
  const userData = cookies?.user;

  const [open, setOpen] = useState(false);
  const [readBills, setReadBills] = useState<any>();
  console.log(readBills && readBills.invoiceService);
  const onOpenModal = async (_id: any) => {
    setOpen(true);
    const { data } = await readBill(_id, userData as any);
    setReadBills(data);
  };

  const initialValue = 0;
  const sumWithInitial =
    readBills &&
    readBills?.invoiceService.reduce(
      (previousValue: number, currentValue: any) => previousValue + currentValue.amount,
      initialValue,
    );

  const onCloseModal = () => setOpen(false);

  const [open1, setOpen1] = useState(false);
  const onOpenModal1 = () => setOpen1(true);
  const onCloseModal1 = () => setOpen1(false);

  const [monthCheckk, setMonthh] = useState(today.getMonth() + 1);
  const [yearCheckk, setYearr] = useState(today.getFullYear());

  const { register, handleSubmit, setValue, getValues, reset } = useForm<FormInputs>();

  const [bill, setBill] = useState<any>();

  const onSubmitForm: SubmitHandler<FormInputs> = async (dataa: any) => {
    if (monthCheckk && yearCheckk) {
      const newData = { ...dataa, month: monthCheckk, year: yearCheckk, userData: userData };
      const { data } = await listBill(newData);
      setBill(data.data);
    } else {
      Toast('error', 'Vui lòng chọn tháng năm!');
    }
  };

  const datePickerShow = React.useMemo(() => {
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
      setMonthh(parseInt(dateString.slice(5, 7)));
      setYearr(parseInt(dateString.slice(0, 4)));
      reset();
    };
    return (
      <DatePicker
        style={{ width: '200px' }}
        onChange={onChange}
        defaultValue={moment(`${yearCheckk}-${monthCheckk}`, 'YYYY-MM')}
        picker="month"
      />
    );
  }, [monthCheckk, reset, yearCheckk]);

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
            <div>
              <form className="flex mr-5" onSubmit={handleSubmit(onSubmitForm)}>
                <div className="mt-5">
                  <Space direction="vertical">{datePickerShow} </Space>
                  <button
                    type="submit"
                    className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-3 py-1 ml-2 text-center mr-2 mb-2"
                  >
                    Tìm Kiếm
                  </button>
                </div>
              </form>
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
                          Tiền nhà
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
                    <>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {bill?.map((item: any, index: number) => {
                          const initialValue = 0;
                          const sumWithInitial = item?.invoiceService.reduce(
                            (previousValue: number, currentValue: any) => previousValue + currentValue.amount,
                            initialValue,
                          );

                          const priceRoom = item.invoiceService.find((item: any) => item.serviceName === 'Tiền nhà');

                          return (
                            <>
                              <tr key={index}>
                                <td className="px-9 py-4 whitespace text-sm text-gray-500">
                                  <div className="text-center">{item.roomName} </div>
                                </td>

                                <td className="px-6 py-4 whitespace">
                                  <div className="text-center">
                                    {priceRoom.amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                  </div>
                                </td>

                                <td className="px-6 py-4 whitespace">
                                  <div className="text-center">
                                    {sumWithInitial.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                  </div>
                                </td>

                                <td className="px-6 py-4 whitespace">
                                  <div className="text-center">
                                    <button onClick={() => onOpenModal(item?._id)}>
                                      <FontAwesomeIcon className="w-[16px] text-black" icon={faEye} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </>
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
                  <strong>{readBills && readBills.houseName}</strong>
                </span>
                <span className="float-right" />
              </div>
              <div className="h-[27px]">
                <span>
                  <strong>Địa chỉ: {readBills && readBills.address} </strong>
                </span>
              </div>
              <div>
                <h4 className="text-center">
                  <strong>HÓA ĐƠN TIỀN NHÀ</strong>
                </h4>
              </div>
              <div>
                <p className="text-center">
                  <strong>
                    Tháng {readBills && readBills.month}/{readBills && readBills.year}{' '}
                  </strong>
                </p>
              </div>

              <div>
                <p>
                  <strong>{readBills && readBills.roomName}</strong>
                </p>
              </div>
              <div className="border-b-2 border-t-2 border-black">
                <table cellSpacing={0} cellPadding={0} width="100%">
                  <tbody>
                    {readBills &&
                      readBills.invoiceService.map((name: any, index: number) => {
                        return (
                          <>
                            <tr>
                              <td className="w-[2%]">{index + 1})</td>
                              <td className="w-[70%]">{name.serviceName} </td>
                              <td className="w-[25%] text-right">
                                {name.amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                              </td>
                            </tr>
                          </>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <div className="border-b-2 border-black">
                <strong>TỔNG CỘNG</strong>
                <strong className="float-right">
                  {sumWithInitial && sumWithInitial.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </strong>
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
            <AddBill></AddBill>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Receipt;
