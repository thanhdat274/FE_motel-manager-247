import React, { useEffect, useMemo, useState } from 'react';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import 'antd/dist/antd.css';
import { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { useUserContext } from '@/context/UserContext';
import { Toast } from 'src/hooks/toast';
import { listBill, paymentStatus, readBill } from 'src/pages/api/bill';
import AddBill from './addBill';
type FormInputs = {
  _id: string;
  idRoom: string;
  month: number;
  year: number;
  name: string;
  paymentStatus: boolean;
  paidAmount: number;
};

const Receipt = () => {
  const today = new Date();
  const { setLoading, cookies } = useUserContext();
  const userData = cookies?.user;

  const [changedValue, setChangedValue] = useState(0);

  const [open, setOpen] = useState(false);
  const [readBills, setReadBills] = useState<any>();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();

  const onOpenModal = async (_id: any) => {
    setOpen(true);
    const { data } = await readBill(_id, userData as any);
    setReadBills(data);
    reset(data);
  };

  const initialValue = 0;
  const sumWithInitial =
    readBills &&
    readBills?.debt +
      readBills?.invoiceService.reduce(
        (previousValue: number, currentValue: any) => previousValue + currentValue.amount,
        initialValue,
      );

  // const

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
      const { data } = await listBill(userData, yearCheckk, monthCheckk);
      setBill(data.data);
      setLoading(false);
    } else {
      Toast('error', 'Vui lòng chọn tháng năm!');
      setLoading(false);
    }
  }
  useEffect(() => {
    getBill();
  }, [monthCheckk, userData, yearCheckk, changedValue]);

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

  const submitHandle = async (data1: any) => {
    try {
      const { data } = await paymentStatus(data1, userData);
      const data2 = data.data;
      Toast('success', 'Cập nhật trạng thái thành công');
      setBill(bill.map((item: { _id: any }) => (item._id === data2._id ? data1 : item)));
      setOpen(false);
    } catch (error: any) {
      Toast('error', error?.response?.data?.message);
    }
  };

  const watchAllFields = watch();

  const remainingAmount = useMemo(() => {
    return sumWithInitial - getValues('paidAmount');
  }, [watchAllFields]);

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
            <div className="flex gap-2 flex-col md:flex-row md:gap-4">
              <div>
                <Space direction="vertical">{datePickerShow} </Space>
              </div>

              <div className="">
                <button
                  onClick={onOpenModal1}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full "
                >
                  Tính hóa đơn
                </button>
              </div>
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
                        {bill?.map((item: any, index: number) => {
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
                                  <td>
                                    <div className="">
                                      <p>
                                        {status && (
                                          <div className=" text-green-600 flex ">
                                            <p className="w-full pt-4 text-right"> Đã thanh toán</p>
                                            <span className="w-full pt-5 pl-3 ">
                                              {' '}
                                              <FontAwesomeIcon className="w-[16px] " icon={faCheck} />
                                            </span>
                                          </div>
                                        )}
                                      </p>
                                      <p>
                                        {!status && (
                                          <div className=" text-red-500 flex ">
                                            <p className="w-full pt-3 text-right"> Chưa thanh toán</p>
                                            <span className="w-full pt-3 pl-3 ">
                                              {' '}
                                              <FontAwesomeIcon className="w-[12px] " icon={faXmark} />
                                            </span>
                                          </div>
                                        )}
                                      </p>
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

                        {}
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
      <div className="">
        <Modal open={open} onClose={onCloseModal} center>
          <form action="" onSubmit={handleSubmit(submitHandle)}>
            <div className="text-slate-600">
              <header className="bg-white ">
                <div className="max-w-full mx-auto  py-2 border-b-2 border-black mb-2">
                  <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="flex-1 min-w-0">
                      <h2 className="  text-gray-900 sm:text-2xl sm:truncate uppercase">hóa đơn</h2>
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
                  <div className="py-2">
                    <table cellSpacing={0} cellPadding={0} width="100%">
                      <tbody>
                        {readBills &&
                          readBills.invoiceService.map((name: any, index: number) => {
                            return (
                              <>
                                <tr>
                                  <td className="w-[2%]">{index + 1}.</td>
                                  <td className="w-[70%]">{name.serviceName} </td>
                                  <td className="w-[25%] text-right">
                                    {name.amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                  </td>
                                </tr>
                              </>
                            );
                          })}

                        {readBills && (
                          <>
                            <tr>
                              <td className="w-[2%]"></td>
                              <td className="w-[70%]">
                                <strong>Tiền nợ </strong>
                              </td>
                              <td className="w-[25%] text-right">
                                {readBills?.debt.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                              </td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="border-t-2 border-t-black ">
                  <div className="py-2">
                    <strong className="">TỔNG CỘNG</strong>
                    <strong className="float-right">
                      {sumWithInitial && sumWithInitial.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </strong>
                  </div>
                </div>
                <div>-</div>
                <div
                  className={
                    errors.paidAmount?.type == 'max'
                      ? 'border-b-2 border-b-black min-h-[100px] h-auto'
                      : '"border-b-2 border-b-black min-h-[60px] h-auto"'
                  }
                >
                  <div className="py-2">
                    <strong className="">Đã thanh toán</strong>
                    <div className="float-right flex flex-col w-1/2 md:w-1/4 ">
                      <input
                        className="value-right icon-vnd px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        {...register('paidAmount', { max: sumWithInitial })}
                        type="number"
                      />
                      {errors.paidAmount?.type == 'max' && (
                        <p className="text-red-500">Giá trị không được vượt quá tổng tiền</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="border-b-2 border-black mb-4">
                  <div className="py-2">
                    <strong className="">Còn lại</strong>
                    <strong className="float-right">
                      {readBills && remainingAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </strong>
                  </div>
                </div>
                <div className="pb-5">
                  {/* <div className=" relative float-left pr-5 pt-2 ">
                    <strong>Trạng thái:</strong>
                  </div>
                  <div className="mt-5 " >
                    <input type="text" value={readBills && readBills._id} {...register("_id")} className="hidden" />
                    <select  {...register("paymentStatus")} className="border-2  form-select appearance-none block px-3 py-1.5 text-base  font-normal text-gray-700  bg-clip-padding bg-no-repeatborder border-solid border-gray-300 rounded transition ease-in-out m-0  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ">
                      <option value="false" className=''>Chưa thanh toán</option>
                      <option value="true" >Đã thanh toán</option>

                    </select>



                  </div> */}
                  <button
                    type="submit"
                    className=" float-right text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    Cập nhật
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Modal>
      </div>

      <div>
        <Modal open={open1} onClose={onCloseModal1} center>
          <div className="w-full">
            <hr />
            <div className="grid grid-flow-col px-4 py-2 text-white bg-cyan-500">
              <div className="">
                <h2 className="pt-2 text-xl">Tính tiền </h2>
              </div>
            </div>{' '}
            <AddBill
              onclose={onCloseModal1}
              data={getBill}
              setChangeValueBill={() => setChangedValue(changedValue + 1)}
            ></AddBill>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Receipt;
