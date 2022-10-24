import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel, faSave, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useUserContext } from '@/context/UserContext';
import { listRoom } from 'src/pages/api/room';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { DatePicker, Space } from 'antd';
import type { DatePickerProps } from 'antd';
import 'antd/dist/antd.css';
import { createAllBillForHouse, getListService } from 'src/pages/api/billService';
import { Toast } from 'src/hooks/toast';
import toLowerCaseNonAccentVietnamese from 'src/util/CONVERTTEXT';
import moment from 'moment';

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

const ListWaterUsed = () => {
  // const str = toLowerCaseNonAccentVietnamese('Việt Nam');

  const { cookies, setLoading } = useUserContext();
  const [rooms, setRooms] = useState<any>([]);
  const [bills, setBills] = useState<any>([]);
  const [monthCheck, setMonth] = useState(0);
  const [yearCheck, setYear] = useState(0);
  const a = cookies?.user;
  const router = useRouter();
  const param = router.query;
  const { id } = router.query;
  const NameBuild = 'nuoc';

  const today = new Date();
  const monthNow = today.getMonth();
  const yearNow = today.getFullYear();

  console.log('monthCheck', monthCheck, yearCheck);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
    watch,
    unregister,
  } = useForm<FormInputs>();

  // const inputVal = useWatch({
  //   control,
  //   name: `data.${0}.inputValue`,
  // });

  // const outPutVal = useWatch({
  //   control,
  //   name: `data.${0}.outputValue`,
  // });
  // const allUseElictric = outPutVal - inputVal;

  useEffect(() => {
    const getRoom = async () => {
      setLoading(true);
      try {
        const { data } = await listRoom(id, a as string);
        if (data.data) {
          setRooms(data.data as any);
          setLoading(false);
        }
      } catch (error) {
        console.log('error', error);
        setLoading(false);
      }
    };
    getRoom();
  }, [a, id, reset, setLoading]);

  useEffect(() => {
    const getListBill = async () => {
      if (monthCheck && yearCheck) {
        setLoading(true);
        try {
          const { data } = await getListService(
            id as string,
            a as any,
            NameBuild as string,
            monthCheck as any,
            yearCheck as any,
          );
          if (data) {
            setBills(data as any);
            reset(data as any);
            setLoading(false);
          }
        } catch (error) {
          console.log('error', error);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    getListBill();
  }, [a, id, monthCheck, NameBuild, reset, setLoading, yearCheck]);

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    setMonth(parseInt(dateString.slice(5, 7)));
    setYear(parseInt(dateString.slice(0, 4)));
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    if (monthCheck && yearCheck) {
      const newData = { ...data, month: monthCheck, year: yearCheck, idHouse: id, name: NameBuild };
      setLoading(true);
      await createAllBillForHouse(newData)
        .then((data: any) => {
          setLoading(false);
          Toast('success', 'Thêm số diện các phòng thành công');
        })
        .catch((error) => {
          Toast('error', 'Thêm số diện các phòng không thành công');
          setLoading(false);
        });
    } else {
      Toast('error', 'Vui lòng chọn tháng năm!');
    }
  };

  return (
    <div className="h-screen">
      <header className="bg-white shadow">
        <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate uppercase">
                Chỉ số nước
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
              <div className="relative w-full mb-3 flex items-center">
                <label
                  className="w-[30%] block uppercase text-blueGray-600 text-sm font-bold lg:mr-2"
                  htmlFor="grid-password"
                >
                  Tháng/năm
                </label>
                <div>
                  <Space direction="vertical">
                    <DatePicker
                      style={{ width: '200px' }}
                      onChange={onChange}
                      defaultValue={moment(`${yearNow}-${monthNow}`, 'YYYY-MM')}
                      picker="month"
                    />
                  </Space>
                </div>
              </div>
            </div>
          </div>
          <hr className="mt-6 border-1 borderlueGray-300" />
          <nav className="my-4 mx-4 pb-4">
            <h3 className="text-xl">Lưu ý</h3>
            <span className="block">
              - Bạn phải gán dịch vụ thuộc loại nước cho khách thuê trước thì phần chỉ số này mới được tính cho phòng đó
              khi tính tiền.
            </span>
            <span className="block">
              - Đối với lần đầu tiên sử dụng phần mềm bạn sẽ phải nhập chỉ số cũ và mới cho tháng sử dụng đầu tiên, các
              tháng tiếp theo phần mềm sẽ tự động lấy chỉ số mới tháng trước làm chỉ số cũ tháng sau.
            </span>
            <span className="block">- Bạn phải nhập chỉ số nước mới phải lớn hơn chỉ số nước cũ.</span>
          </nav>
        </div>
      </header>
      <main>
        <div className="max-w-full mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="table min-w-full divide-y divide-gray-200">
                      <div className="bg-gray-50 table-header-group">
                        <div className="table-row divide-y divide-x">
                          <div className="table-cell px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Phòng
                          </div>
                          <div className="table-cell px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tên dịch vụ
                          </div>
                          <div className="table-cell px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Số nước cũ
                          </div>
                          <div className="table-cell px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Số nước mới
                          </div>
                          <div className="table-cell px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Số nước sử dụng
                          </div>
                          <div className="table-cell px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <button
                              type="submit"
                              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Lưu
                            </button>
                          </div>
                        </div>
                      </div>
                      {yearCheck && monthCheck ? (
                        <div className="bg-white divide-y divide-gray-200 table-footer-group">
                          {rooms &&
                            rooms.map((item: any, index: any) => {
                              return (
                                <div className="table-row divide-y divide-x" key={rooms._id}>
                                  <div className="table-cell border-t px-4 py-4 whitespace">
                                    <p className="text-center">{item.name}</p>
                                  </div>
                                  <div className="table-cell px-4 py-4 whitespace">
                                    <p className="text-center">{NameBuild}</p>
                                  </div>
                                  <div className="hidden ml-2 text-center w-[90%]">
                                    <input
                                      {...register(`data.${index}.idRoom`, {
                                        required: true,
                                      })}
                                      defaultValue={item._id}
                                      className="font-bold w-full flex border-0 px-2 py-2 placeholder-blueGray-300 text-red-900 bg-gray-200  rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                                      type="text"
                                    />
                                  </div>
                                  <div className="table-cell px-4 py-4 whitespace">
                                    <input
                                      type="number"
                                      defaultValue={0}
                                      className="font-bold w-full flex border-0 px-2 py-2 placeholder-blueGray-300 bg-gray-200  rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                                      {...register(`data.${index}.inputValue`, {
                                        required: true,
                                        valueAsNumber: true,
                                      })}
                                    />
                                  </div>
                                  <div className="table-cell px-4 py-4 whitespace">
                                    <input
                                      type="number"
                                      defaultValue={0}
                                      className="font-bold w-full flex border-0 px-2 py-2 placeholder-blueGray-300 bg-gray-200  rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                                      {...register(`data.${index}.outputValue`, {
                                        required: true,
                                        valueAsNumber: true,
                                      })}
                                    />
                                  </div>
                                  <div className="table-cell px-4 py-4 whitespace">
                                    <div className="text-center">{} Khối</div>
                                  </div>
                                  <div className="table-cell px-4 py-4 whitespace">
                                    <div className="text-center"></div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      ) : (
                        <div className="bg-white divide-y divide-gray-200 table-footer-group">
                          {rooms &&
                            rooms.map((item: any, index: any) => {
                              return (
                                <div className="table-row divide-y divide-x" key={rooms._id}>
                                  <div className="table-cell border-t px-4 py-4 whitespace">
                                    <p className="text-center">{item.name}</p>
                                  </div>
                                  <div className="table-cell px-4 py-4 whitespace">
                                    <p className="text-center">{NameBuild}</p>
                                  </div>
                                  <div className="hidden ml-2 text-center w-[90%]">
                                    <input
                                      {...register(`data.${index}.idRoom`, {
                                        required: true,
                                      })}
                                      defaultValue={item._id}
                                      className="font-bold w-full flex border-0 px-2 py-2 placeholder-blueGray-300 text-red-900 bg-gray-200  rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                                      type="text"
                                    />
                                  </div>
                                  <div className="table-cell px-4 py-4 whitespace">
                                    <input
                                      type="number"
                                      defaultValue={0}
                                      className="font-bold w-full flex border-0 px-2 py-2 placeholder-blueGray-300 bg-gray-200  rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                                      {...register(`data.${index}.inputValue`, {
                                        required: true,
                                        valueAsNumber: true,
                                      })}
                                    />
                                  </div>
                                  <div className="table-cell px-4 py-4 whitespace">
                                    <input
                                      type="number"
                                      defaultValue={0}
                                      className="font-bold w-full flex border-0 px-2 py-2 placeholder-blueGray-300 bg-gray-200  rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                                      {...register(`data.${index}.outputValue`, {
                                        required: true,
                                        valueAsNumber: true,
                                      })}
                                    />
                                  </div>
                                  <div className="table-cell px-4 py-4 whitespace">
                                    <div className="text-center">{} Khối</div>
                                  </div>
                                  <div className="table-cell px-4 py-4 whitespace">
                                    <div className="text-center"></div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      )}
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

export default ListWaterUsed;
