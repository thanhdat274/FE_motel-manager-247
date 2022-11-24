import { DatePicker, DatePickerProps, Space } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Modal from 'react-responsive-modal';
import 'antd/dist/antd.css';
import { getBillIdRoom } from 'src/pages/api/bill';
import { useUserContext } from '@/context/UserContext';
type Props = {};

const InfoReceipt = (props: Props) => {
  const [bills, setBills] = useState<any>([]);
  const today = new Date();
  const [monthCheckk, setMonthh] = useState(today.getMonth() + 1);
  const [yearCheckk, setYearr] = useState(today.getFullYear());

  const [codeRoom, setCodeRoom] = useState<any>();
  const { cookies } = useUserContext();

  useEffect(() => {
    const data = cookies?.code_room;
    setCodeRoom(data as any);
  }, [cookies?.code_room]);

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

  useEffect(() => {
    if (codeRoom?._id) {
      const getBillidRoom = async () => {
        const { data } = await getBillIdRoom(codeRoom?._id, yearCheckk, monthCheckk)
        setBills(data.data)
      }
      getBillidRoom();
    }
  }, [codeRoom?._id, yearCheckk, monthCheckk])
  if (bills) {
    for (var i = 0; i < bills.length; i++) {
      const initialValue = 0;
      var totalPrice =
        bills &&
        bills[i]?.invoiceService.reduce(
          (previousValue: number, currentValue: any) => previousValue + currentValue.amount,
          initialValue,
        );
    }
  }

  return (
    <div className="h-screen">

      <div className="h-screen">
        <header className="bg-white shadow">
          <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div>
                <Space direction="vertical">{datePickerShow} </Space>
              </div>
            </div>
          </div>
        </header>
        {bills ? (bills?.map((bill: any, index: number) => {
          return (
            <main key={index} >
              <div className='w-full'>
                <div className="flex-[100%] bg-gray-100">
                  <div className="bg-white shadow-lg">
                    <div className="md:flex justify-between p-4 items-center">
                      <div>
                        <h1 className="text-3xl italic font-extrabold tracking-widest text-indigo-500">Quản lý phòng trọ 24/7</h1>
                        <p className="text-base">Vui lòng thanh toán trong vòng 7 ngày tính từ thời gian nhận được hóa đơn.</p>
                        <p className="text-base">Mọi thắc mắc xin gửi phản hồi về cho website để được xử lý.</p>
                      </div>
                      <div className="p-2">
                        <ul className="md:flex">
                          <li className="flex flex-col items-center p-2 border-l-2 border-indigo-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                            <span className="text-sm">
                              www.quanlyphongtro247.com
                            </span>
                          </li>
                          <li className="flex flex-col p-2 border-l-2 border-indigo-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-sm">
                              {bill?.address}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="w-full bg-indigo-500 h-6" />
                    <div className="flex justify-between p-4">
                      <div>
                        <h6 className="font-bold">Ngày gửi hóa đơn : <span className="text-sm font-medium"> {bill.createdAt}</span></h6>
                      </div>
                      <div className="w-40">
                        <address className="text-sm">
                          <span className="font-bold"> Thanh toán cho : </span>
                          {bill.memberName}
                          {/* 795 Folsom Ave
                          San Francisco, CA 94107
                          P: (123) 456-7890 */}
                        </address>
                      </div>
                      <div />
                    </div>
                    <div className="flex r p-4 max-w-[100%] justify-center">
                      <div className="border-b border-gray-200 justify-between shadow w-full">
                        <table className="2xs:overflow-x-auto 2xs:overflow-y-auto w-full text-left">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-2 text-xs text-gray-500 ">
                                Loại hóa đơn
                              </th>
                              {/* <th className="px-4 py-2 text-xs text-gray-500 ">
                                Số lượng
                              </th>
                              <th className="px-4 py-2 text-xs text-gray-500 ">
                                Đơn giá
                              </th> */}
                              <th className="px-4 py-2 text-xs text-gray-500 ">
                                Thành tiền
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            {bill.invoiceService?.map((totalBill: any, index1: number) => {
                              const priceRoom = bill.invoiceService.find((bill: any) => bill.serviceName === 'Tiền nhà');
                              return (
                                <tr key={index1} className="whitespace-nowrap">
                                  <td className="px-6 py-4">
                                    <div className="text-sm text-gray-900">
                                      {totalBill?.serviceName}
                                    </div>
                                  </td>
                                  {/* <td className="2xs:hidden px-6 py-4">
                                  <div className="text-sm text-gray-500">4</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                  $20
                                </td> */}
                                  <td className="px-6 py-4">
                                    {totalBill?.amount.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                  </td>
                                </tr>
                              )
                            })}
                            <tr className="text-white bg-gray-800">
                              <td className="text-sm font-bold p-4"><b>Tổng tiền</b></td>
                              <td className="text-sm font-bold text-red-500"><b>
                                {totalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</b></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="flex justify-between p-4">
                      <div>
                        <h3 className="text-xl">Điều khoản và điều kiện :</h3>
                        <ul className="text-md list-disc list-inside">
                          <li>Tất cả các tài khoản sẽ được thanh toán trong vòng 7 ngày kể từ ngày nhận được hóa đơn.</li>
                          <li>Được thanh toán bằng séc hoặc thẻ tín dụng hoặc thanh toán trực tiếp trực tuyến.</li>
                          <li>Nếu tài khoản không được thanh toán trong vòng 7 ngày, các chi tiết tín dụng được cung cấp.</li>
                        </ul>
                      </div>
                      <div className="p-4">
                        <h3>Chữ ký</h3>
                        <div className="text-4xl italic text-indigo-500">Demo</div>
                      </div>
                    </div>
                    <div className="w-full h-0.5 bg-indigo-500" />
                    <div className="p-4">
                      <div className="flex items-center justify-center font-extrabold text-indigo-500">
                        Cảm ơn bạn rất nhiều vì đã sử dụng dịch vụ của chúng tôi.
                      </div>
                      <div className="flex items-end justify-end space-x-3">
                        {/* <button className="px-4 py-2 text-sm text-green-600 bg-green-100">Print</button>
                        <button className="px-4 py-2 text-sm text-blue-600 bg-blue-100">Save</button> */}
                        <button className="px-4 py-2 text-sm text-red-600 bg-red-100 font-extrabold tracking-widest">Phản hồi</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          )
        })) :
          <main className="bg-white relative overflow-hidden h-screen">
            <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32">
              <div className="container mx-auto px-6 flex flex-col justify-between items-center relative">
                <div className="flex w-full items-center justify-center space-x-12 flex-col md:flex-row mb-16 md:mb-8">
                  <h1 className="font-thin text-center text-6xl text-gray-800">Tháng này chưa có hóa đơn</h1>
                </div>

              </div>
            </div>
          </main>
        }
      </div>
    </div>
  );
};

export default InfoReceipt;
