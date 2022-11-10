import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { useUserContext } from '@/context/UserContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import { DatePicker, Space } from 'antd';
import type { DatePickerProps } from 'antd';
import 'antd/dist/antd.css';
import { createAllBillForHouse, getAllBillForHouse } from 'src/pages/api/billService';
import { listRoom } from 'src/pages/api/room';
import { Toast } from 'src/hooks/toast';
import moment from 'moment';
import { getInfoService } from 'src/pages/api/service';

type FormInputs = {
  name: string;
  idHouse: string;
  month: number;
  year: number;
  data: {
    idRoom: string;
    inputValue: number;
    outputValue: number;
  }[];
};

type ServiceI = {
  idHouse: string;
  label: string;
  name: string;
  price: number;
  type: boolean;
  unit: string;
  _id: string;
};

const LisElectric = () => {
  const today = new Date();
  const [listRoomData, setListRoomData] = useState<any>([]);
  const { cookies, setLoading } = useUserContext();
  const [listBillData, setListBillData] = useState<any>([]);

  const [monthCheck, setMonth] = useState(today.getMonth() + 1);
  const [yearCheck, setYear] = useState(today.getFullYear());
  const [serviceData, setServiceData] = useState<ServiceI>();

  const [inputVs, setInputVs] = useState(0);
  const [outputVs, setOutputVs] = useState(0);

  const userData = cookies?.user;
  const router = useRouter();
  const { id } = router.query;
  const NameBuild = 'dien';
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormInputs>();

  useEffect(() => {
    const getServiceData = async () => {
      setLoading(true);
      if (id) {
        await getInfoService(id, NameBuild)
          .then((result) => {
            setLoading(false);
            setServiceData(result.data.data);
          })
          .catch((err) => {
            setLoading(false);
          });
      }
    };
    getServiceData();
  }, [id, setLoading]);

  useEffect(() => {
    const getListBillData = async () => {
      setLoading(true);
      if (id) {
        await getAllBillForHouse(NameBuild, monthCheck, yearCheck, id)
          .then((result) => {
            setListBillData(result.data.docs as any);
            setLoading(false);
            if (result.data.docs) {
            }
          })
          .catch((err) => {
            setLoading(false);
          });
      }
    };
    getListBillData();
  }, [id, monthCheck, setLoading, yearCheck]);

  const useWater = outputVs - inputVs;

  useEffect(() => {
    const getListRoom = async () => {
      setLoading(true);
      if (id) {
        await listRoom(id, userData)
          .then((result) => {
            const newListRoomData = result?.data?.data.map((item: any) => {
              return {
                amount: 0,
                idHouse: item.idHouse,
                idRoom: item._id,
                month: monthCheck,
                year: yearCheck,
                name: NameBuild,
                price: serviceData?.price,
                unit: serviceData?.unit,
                inputValue: 0,
                outputValue: 0,
                nameRoom: item.name,
              };
            });
            setListRoomData(newListRoomData);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
          });
      }
    };
    getListRoom();
  }, [id, monthCheck, serviceData?.price, serviceData?.unit, setLoading, userData, yearCheck]);

  useEffect(() => {
    if (listBillData.length) {
      setValue('data', listBillData);
    } else {
      setValue('data', listRoomData);
    }
  }, [listBillData, listRoomData, setValue]);

  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    if (monthCheck && yearCheck) {
      const confirm = window.confirm(
        'Vui lòng kiểm tra lại số điện mới của các phòng trong tháng này đã nhập đúng chưa. Nếu chưa đúng vui lòng bấm vào cancel và sửa lại trước khi lưu. Nếu đúng rồi mời bạn bấm ok để lưu số điện tháng này.',
      );
      if (confirm) {
        const newData = { ...data, month: monthCheck, year: yearCheck, idHouse: id, name: NameBuild };
        setLoading(true);
        await createAllBillForHouse(newData)
          .then((data: any) => {
            setLoading(false);
            Toast('success', 'Thêm số điện các phòng thành công');
          })
          .catch((error) => {
            Toast('error', 'Thêm số điện các phòng không thành công');
            setLoading(false);
          });
      }
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
                Chỉ số điện
              </h2>
            </div>
            <div className="flex ml-auto">
              <button className="border flex bg-sky-500 items-center rounded-md p-1.5 mx-2">
                <FontAwesomeIcon className="w-[16px] text-white" icon={faFileExcel} />
                <span className="font-semibold mx-1">Xuất file excel</span>
              </button>
            </div>
          </div>
        </div>
        <div className="relative max-w-full">
          <div className="flex mt-3 flex-wrap">
            <div className="w-full md:w-3/12 px-4">
              <div className="relative w-full mb-3 flex flex-wrap items-center gap-3">
                <div className="w-[30%] block uppercase text-blueGray-600 text-sm font-bold">Tháng/năm</div>
                <div className="block">
                  <Space direction="vertical">{datePickerShow}</Space>
                </div>
              </div>
            </div>
          </div>
          <hr className="mt-6 border-1 borderlueGray-300" />
          <nav className="my-4 mx-4 pb-4">
            <h2 className="text-center">Số điện tháng: {monthCheck}</h2>
            <h3 className="text-xl">Lưu ý:</h3>
            <span className="block">
              - Bạn phải gán dịch vụ thuộc loại điện cho khách thuê trước thì phần chỉ số này mới được tính cho phòng đó
              khi tính tiền.
            </span>
            <span className="block">
              - Đối với lần đầu tiên sử dụng phần mềm bạn sẽ phải nhập chỉ số cũ và mới cho tháng sử dụng đầu tiên, các
              tháng tiếp theo phần mềm sẽ tự động lấy chỉ số mới tháng trước làm chỉ số cũ tháng sau.
            </span>
            <span className="block">- Bạn phải nhập chỉ số điện mới phải lớn hơn chỉ số điện cũ.</span>
          </nav>
        </div>
      </header>
      <main>
        <div className="max-w-full mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <form onSubmit={handleSubmit(onSubmit)} className="">
                    <div className="table min-w-full divide-y divide-gray-200">
                      <div className="bg-gray-50 table-header-group">
                        <div className="table-row divide-y divide-x">
                          <div className="table-cell px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Phòng
                          </div>
                          <div className="table-cell px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Số điện cũ
                          </div>
                          <div className="table-cell px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Số điện mới
                          </div>
                          <div className="table-cell px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Số điện sử dụng
                          </div>
                        </div>
                      </div>
                      {listBillData?.length >= 1 && (
                        <div className="bg-white divide-y divide-gray-200 table-footer-group">
                          {listBillData &&
                            listBillData.map((item: any, index: any) => {
                              return (
                                <div className="table-row divide-y divide-x" key={listBillData._id}>
                                  <div className="table-cell border-t px-4 py-4 whitespace">
                                    <p className="text-center">{item.nameRoom}</p>
                                  </div>
                                  <div className="hidden ml-2 text-center w-[90%]">
                                    <input
                                      {...register(`data.${index}.idRoom`, {
                                        required: true,
                                      })}
                                      className="font-bold w-full flex border-0 px-2 py-2 placeholder-blueGray-300 text-red-900 bg-gray-200  rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                                      type="text"
                                    />
                                  </div>
                                  <div className="table-cell px-4 py-4 whitespace">
                                    <input
                                      type="number"
                                      defaultValue={0}
                                      id="inputValue"
                                      className="font-bold w-full flex border-0 px-2 py-2 placeholder-blueGray-300 bg-gray-200  rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                                      {...register(`data.${index}.inputValue`, {
                                        required: true,
                                        min: 0,
                                        valueAsNumber: true,
                                        minLength: 0,
                                        onChange(e) {
                                          setInputVs(parseInt(e.target.value));
                                        },
                                      })}
                                    />
                                    {getValues(`data.${index}.inputValue`) < 0 && (
                                      <div className="text-rose-600">
                                        <p role="alert">Số điện mới phải lớn hơn 0</p>
                                      </div>
                                    )}
                                  </div>
                                  <div className="table-cell px-4 py-4 whitespace">
                                    <input
                                      defaultValue={0}
                                      type="number"
                                      className="font-bold w-full flex border-0 px-2 py-2 placeholder-blueGray-300 bg-gray-200  rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                                      {...register(`data.${index}.outputValue`, {
                                        required: true,
                                        min: getValues(`data.${index}.inputValue`),
                                        valueAsNumber: true,
                                        onChange(e) {
                                          setOutputVs(parseInt(e.target.value));
                                        },
                                      })}
                                    />
                                    {getValues(`data.${index}.outputValue`) < 0 && (
                                      <p className="text-rose-600" role="alert">
                                        Số điện cũ phải lớn hơn 0
                                      </p>
                                    )}
                                    {getValues(`data.${index}.outputValue`) < getValues(`data.${index}.inputValue`) ? (
                                      <div className="text-rose-600">Số điện mới phải lớn hơn hoặc bằng số điện cũ</div>
                                    ) : (
                                      ''
                                    )}
                                  </div>
                                  <div className="table-cell px-4 py-4 whitespace">
                                    <div className="text-center">
                                      {getValues(`data.${index}.outputValue`) - getValues(`data.${index}.inputValue`)}{' '}
                                      KWH
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      )}

                      {listBillData?.length == 0 && listRoomData && (
                        <div className="bg-white divide-y divide-gray-200 table-footer-group">
                          {listRoomData &&
                            listRoomData.map((item: any, index: any) => {
                              return (
                                <div className="table-row divide-y divide-x" key={listBillData._id}>
                                  <div className="table-cell border-t px-4 py-4 whitespace">
                                    <p className="text-center">{item.nameRoom}</p>
                                  </div>
                                  <div className="hidden ml-2 text-center w-[90%]">
                                    <input
                                      {...register(`data.${index}.idRoom`, {
                                        required: true,
                                      })}
                                      className="font-bold w-full flex border-0 px-2 py-2 placeholder-blueGray-300 text-red-900 bg-gray-200  rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                                      type="text"
                                    />
                                  </div>
                                  <div className="table-cell px-4 py-4 whitespace">
                                    <input
                                      type="number"
                                      defaultValue={0}
                                      id="inputValue"
                                      className="font-bold w-full flex border-0 px-2 py-2 placeholder-blueGray-300 bg-gray-200  rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                                      {...register(`data.${index}.inputValue`, {
                                        required: true,
                                        min: 0,
                                        valueAsNumber: true,
                                        onChange(e) {
                                          setInputVs(parseInt(e.target.value));
                                        },
                                      })}
                                    />
                                    {getValues(`data.${index}.inputValue`) < 0 && (
                                      <p role="alert">Số điện mới phải lớn hơn 0</p>
                                    )}
                                  </div>
                                  <div className="table-cell px-4 py-4 whitespace">
                                    <input
                                      type="number"
                                      defaultValue={0}
                                      className="font-bold w-full flex border-0 px-2 py-2 placeholder-blueGray-300 bg-gray-200  rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                                      {...register(`data.${index}.outputValue`, {
                                        required: true,
                                        min: getValues(`data.${index}.inputValue`),
                                        valueAsNumber: true,
                                        onChange(e) {
                                          setOutputVs(parseInt(e.target.value));
                                        },
                                      })}
                                    />
                                    {getValues(`data.${index}.outputValue`) < 0 && (
                                      <p role="alert">Số điện cũ phải lớn hơn 0</p>
                                    )}
                                    {getValues(`data.${index}.outputValue`) < getValues(`data.${index}.inputValue`) ? (
                                      <div className="text-rose-600">Số điện mới phải lớn hơn hoặc bằng số điện cũ</div>
                                    ) : (
                                      ''
                                    )}
                                  </div>
                                  <div className="table-cell px-4 py-4 whitespace">
                                    <div className="text-center">
                                      {getValues(`data.${index}.outputValue`) - getValues(`data.${index}.inputValue`)}{' '}
                                      KWH
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      )}
                    </div>
                    <div className="w-full flex items-center min-h-[80px] justify-end bg-white border">
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 mr-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Lưu
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LisElectric;
