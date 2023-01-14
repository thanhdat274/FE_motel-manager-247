import React, { useEffect, useMemo, useState } from 'react';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import 'antd/dist/antd.css';
import { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import { useUserContext } from '@/context/UserContext';
import { Toast } from 'src/hooks/toast';
import { listBill, readBill } from 'src/pages/api/bill';
import AddBill from './addBill';
import { useRouter } from 'next/router';
import ModalDetailBill from './ModalDetailBill';

const Receipt = () => {
  const today = new Date();
  const { setLoading, cookies } = useUserContext();
  const userData = cookies?.user;
  const router = useRouter();
  const { id: idHouse } = router.query;
  const [open, setOpen] = useState(false);
  const [readBills, setReadBills] = useState<any>();

  const onOpenModal = async (_id: any) => {
    setOpen(true);
    const { data } = await readBill(_id, userData as any);
    setReadBills(data);
  };
  const onCloseModal = () => setOpen(false);
  const [open1, setOpen1] = useState(false);
  const onOpenModal1 = () => setOpen1(true);
  const onCloseModal1 = () => setOpen1(false);

  const [monthCheckk, setMonthh] = useState(today.getMonth() + 1);
  const [yearCheckk, setYearr] = useState(today.getFullYear());

  const [bill, setBill] = useState<any>();

  async function getBill() {
    setLoading(true);
    if (monthCheckk && yearCheckk) {
      const { data } = await listBill(userData, idHouse, yearCheckk, monthCheckk);
      setBill(data.data);
      setLoading(false);
    } else {
      Toast('error', 'Vui lòng chọn tháng năm!');
      setLoading(false);
    }
  }
  useEffect(() => {
    if (idHouse) {
      getBill();
    }
  }, [monthCheckk, userData, yearCheckk, idHouse, open]);

  const datePickerShow = React.useMemo(() => {
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
      setMonthh(parseInt(dateString.slice(5, 7)));
      setYearr(parseInt(dateString.slice(0, 4)));
    };
    return (
      <DatePicker
        style={{ width: '200px' }}
        onChange={onChange}
        defaultValue={moment(`${yearCheckk}-${monthCheckk}`, 'YYYY-MM')}
        picker="month"
      />
    );
  }, [monthCheckk, yearCheckk]);

  const [filterBill, setFilterBill] = useState("all")

  const filterBillLisst = bill?.filter((bil: any) => {

    if (filterBill === "conno") {
      return bil.paymentStatus === 1;
    } else if (filterBill == "chuatt") {
      return bil.paymentStatus === 0;
    } else if (filterBill === "datt") {
      return bil.paymentStatus === 2;
    } else {
      return bil;
    }
  })
  const onFilterBill = (event: any) => {
    setFilterBill(event.target.value);

  }

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
              <select onChange={onFilterBill} id="countries" className="border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none focus:shadow-outline">
                <option value="all">Tất cả</option>
                <option value="conno">Còn nợ</option>
                <option value="chuatt">Chưa thanh toán</option>
                <option value="datt">Đã thanh toán</option>
              </select>
            </div>
            <div className="mt-5 flex gap-2 lg:mt-0 lg:ml-4 md:gap-4 items-center">
              {datePickerShow}
              <button
                onClick={onOpenModal1}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Tính hóa đơn
              </button>
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
                  {bill ? (
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
                            Trạng thái
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
                        {filterBillLisst?.map((item: any, index: number) => {
                          const initialValue = 0;
                          const sumWithInitial =
                            item?.invoiceService.reduce(
                              (previousValue: number, currentValue: any) => previousValue + currentValue.amount,
                              initialValue,
                            ) + item?.debt;

                          const priceRoom = item.invoiceService.find((item: any) => item.serviceName === 'Tiền Nhà');
                          const status = item.paymentStatus;
                          return (
                            <>
                              <tbody className="bg-white divide-y divide-gray-200">
                                <tr key={index}>
                                  <td className="px-9 py-4 whitespace text-sm text-gray-500">
                                    <div className="text-center">{item.roomName} </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace">
                                    <div className="text-center">
                                      {priceRoom &&
                                        priceRoom.amount.toLocaleString('vi-VN', {
                                          style: 'currency',
                                          currency: 'VND',
                                        })}
                                    </div>
                                  </td>

                                  <td className="px-6 py-4 whitespace">
                                    <div className="text-center">
                                      {sumWithInitial.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                    </div>
                                  </td>
                                  <td className='px-6 py-4 whitespace'>
                                    <div className="">
                                      {status === 2 ? (
                                        <div className="text-green-600 text-center py-4">
                                          Đã thanh toán
                                        </div>
                                      ) : (<div></div>)}
                                      {status === 1 ? (
                                        <div className="text-yellow-500 text-center py-4">
                                          Còn nợ
                                        </div>
                                      ) : (
                                        <div></div>
                                      )}
                                      {status === 0 ? (
                                        <div className="text-red-500 text-center py-4">
                                          Chưa thanh toán
                                        </div>
                                      ) : (
                                        <div></div>
                                      )}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace">
                                    <div className="text-center underline decoration-indigo-500 cursor-pointer">
                                      <div onClick={() => onOpenModal(item?._id)}>Xem và chỉnh sửa</div>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </>
                          );
                        })}

                        { }
                      </>
                    </table>
                  ) : (
                    <div className="text-center p-2">
                      <p className="text-red-500">Chưa có hóa đơn tháng này!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ModalDetailBill open={open} onCloseModal={onCloseModal} setOpen={setOpen} readBills={readBills} />

      <div>
        <Modal open={open1} onClose={onCloseModal1} center>
          <div className="w-full pt-3">
            <div className="grid grid-flow-col px-4 py-2 text-white bg-cyan-500 mt-4">
              <div className="">
                <h2 className="pt-2 text-xl">Tính tiền </h2>
              </div>
            </div>
            <AddBill onclose={onCloseModal1} data={getBill} />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Receipt;
