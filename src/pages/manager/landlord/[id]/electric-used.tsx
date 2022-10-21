import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { supabase } from 'src/apis/supabase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faFileExcel, faSave, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useUserContext } from '@/context/UserContext';
import { listRoom } from 'src/pages/api/room';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
// import { MonthPicker, Row, Col } from 'uiw';
// import 'react-month-picker/css/'


type Props = {};

type FormInputs = {
  room: {
    _id: string;
    area: number;
    idAuth: string;
    idHouse: string;
    listMember: object;
    name: string;
    price: number;
    status: boolean;
  }[];
};

const LisElectric = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    getValues,
    setFocus,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      room: [{ _id: 'adsdsa', area: 33, idAuth: '221dsadsadas', listMember: {}, name: 'test', price: 23 }],
    },
  });
  // const [formatDate, setFormatDate] = useState('2019/04');
  // const onChange = (date, formatDate) => {
  //   setFormatDate(formatDate);
  //   console.log(formatDate);
  // };

  const { setLoading } = useUserContext();
  const router = useRouter();
  const param = router.query;
  const { id } = router.query;

  const [countries, setCountries] = useState();
  const [rooms, setRooms] = useState([]);
  // const watchElictricNew = watch('newElictric');
  // const watchElictric = watch('elictric');
  // const pTram = watchElictricNew/watchElictric;
  // console.log(pTram);

  useEffect(() => {
    const getRoom = async () => {
      try {
        const { data } = await listRoom(id);
        if (data.data) {
          // setRooms(data.data as any);
          reset(data.data as any);
        }
      } catch (error) {
        console.log('error', error);
      }
    };
    getRoom();
  }, [id]);
  // console.log(rooms[0]._id);
  // const {fields : rooms} = useFieldArray({})

  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    console.log(data);

    // const multipleValues = getValues('elictric');
    // const multipleValues = 2;
    // const multipleValues2 = getValues('newElictric');
    // const useElictric = multipleValues2 / multipleValues;
    // console.log(useElictric);
  };

  return (
    <div>
      <div className="h-screen items-center">
        <div className="flex">
          <h3 className="text-4xl font-bold">Chỉ số điện</h3>
          <div className="flex ml-auto">
            <button className="border items-center flex bg-orange-400 rounded-md p-1.5 mx-2">
              <FontAwesomeIcon className="w-[16px] text-white" icon={faSearch} />
              <span className="font-semibold mx-1">Xem</span>
            </button>
            <button className="border items-center flex bg-emerald-500 rounded-md p-1.5 mx-2">
              <FontAwesomeIcon className="w-[16px] text-white " icon={faSave} />
              <span className="font-semibold mx-1">Lưu</span>
            </button>
            <button className="border flex bg-sky-500 items-center rounded-md p-1.5 mx-2">
              <FontAwesomeIcon className="w-[16px] text-white" icon={faFileExcel} />
              <span className="font-semibold mx-1">Xuất file excel</span>
            </button>
          </div>
        </div>
        <div className="relative max-w-full">
          <form>
            <div className="flex mt-3 flex-wrap">
              <div className="w-full md:w-3/12 px-4">
                <div className="relative w-full mb-3 flex items-center">
                  <label
                    className="w-[30%] block uppercase text-blueGray-600 text-sm font-bold lg:mr-2"
                    htmlFor="grid-password"
                  >
                    Tháng/năm
                  </label>
                  {/* <MonthPicker size="large" onChange={onChange} placeholder="Select month" /> */}
                </div>
              </div>
            </div>
            <hr className="mt-6 border-1 borderlueGray-300" />
          </form>
          <nav className="my-4">
            <h3 className="text-xl">Lưu ý</h3>
            <span className="block">
              - Bạn phải gán dịch vụ thuộc loại điện cho khách phương ngu thuê trước thì phần chỉ số này mới được tính
              cho phòng đó khi tính tiền.
            </span>
            <span className="block">
              - Đối với lần đầu tiên sử dụng phần mềm bạn sẽ phải nhập chỉ số cũ và mới cho tháng sử dụng đầu tiên, các
              tháng tiếp theo phần mềm sẽ tự động lấy chỉ số mới tháng trước làm chỉ số cũ tháng sau.
            </span>
          </nav>
        </div>
        <div className="relative flex flex-col w-full min-w-0 mb-0 break-words bg-white border-0 border-transparent border-solid shadow-xl bg-clip-border">
          <div className="p-6 pb-0 mb-0 bg-white rounded-t-2xl">
            <h6 className="py-3 font-bold text-left uppercase align-middle bg-transparent border shadow-none text-xl border-0 tracking-none whitespace-nowrap text-slate-900">
              Thống kê số điện
            </h6>
            {/* <h6>{pTram}</h6> */}
          </div>
          <div className="max-w-full mx-2 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full ">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <div className="table w-full divide-gray-200">
                      <div className="table-header-group bg-gray-100">
                        <div className="table-row divide-y divide-x">
                          <div className="border-b table-cell text-left px-9 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nhà
                          </div>
                          <div className="table-cell text-left px-9 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Phòng
                          </div>
                          <div className="table-cell text-left px-9 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Khách Thuê
                          </div>
                          <div className="table-cell text-left px-9 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Số điện cũ
                          </div>
                          <div className="table-cell text-left px-9 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Số điện mới
                          </div>
                          <div className="table-cell text-left px-9 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Sử dụng
                          </div>
                          <div className="table-cell text-left px-9 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Lưu
                          </div>
                        </div>
                      </div>
                      <div className="table-row-group bg-gray-50 divide-gray-200">
                        {rooms?.map((room, index) => {
                          return (
                            <form
                              key={index}
                              action=""
                              onSubmit={handleSubmit(onSubmit)}
                              className="table-row divide-y divide-x"
                            >
                              <div className="table-cell whitespace">
                                <div className="border-t text-center py-4 text-sm text-gray-500">
                                  <input
                                    {...register(`room.${index}.idHouse`, {
                                      required: true,
                                    })}
                                    // {...register('idHouse', { required: false })}
                                    className="font-bold w-full flex border-0 px-2 py-2 placeholder-blueGray-300 bg-gray-200  rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                                    type="text"
                                  />
                                  {/* <span>{room.idHouse}</span> */}
                                </div>
                              </div>
                              <div className="table-cell whitespace">
                                {/* <input {...register('name', { required: false })} className="font-bold w-full flex border-0 px-2 py-2 placeholder-blueGray-300 bg-gray-200  rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150" type="text"  /> */}
                                <span className="ml-2">{room._id}</span>
                              </div>
                              <div className="table-cell whitespace">
                                <span className="ml-2 ">Nguyễn Đắc Phương</span>
                              </div>
                              <div className="table-cell whitespace">
                                <div className="ml-2 text-center w-[90%]">
                                  <input
                                    // placeholder={`${newelicTric}`}
                                    name="area"
                                    value={4}
                                    className="font-bold w-full flex border-0 px-2 py-2 placeholder-blueGray-300 bg-gray-200  rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                                    type="number"
                                    disabled
                                  />
                                </div>
                              </div>
                              <div className="table-cell whitespace">
                                <div className="ml-2 text-center w-[90%]">
                                  <input
                                    min={0}
                                    defaultValue={0}
                                    name="price"
                                    className="font-bold w-full flex border-0 px-2 py-2 placeholder-blueGray-300 text-red-900 bg-gray-200  rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                                    type="number"
                                  />
                                  {/* {errors.elictric && errors.elictric.type === 'required' && (
                                    <span>Số điện mới không được nhỏ hơn số điện cũ!</span>
                                  )} */}
                                </div>
                              </div>
                              <div className="table-cell whitespace">
                                <div className="text-right w-[90%]">
                                  <span>{}</span>
                                </div>
                              </div>
                              <div className="table-cell whitespace">
                                <div className="w-[90%] m-auto">
                                  <button
                                    className="border flex rounded px-3 py-1 items-center bg-sky-400"
                                    type="submit"
                                  >
                                    <FontAwesomeIcon className="w-[16px] text-black" icon={faSave} />
                                    <span className="ml-1">Lưu</span>
                                  </button>
                                </div>
                              </div>
                            </form>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LisElectric;
