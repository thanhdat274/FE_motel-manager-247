import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { supabase } from 'src/apis/supabase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faFileExcel, faSave, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useUserContext } from '@/context/UserContext';
import { listRoom } from 'src/pages/api/room';
// import 'react-month-picker/css/'

type Props = {};

const LisElectric = (props: Props) => {
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

  useEffect(() => {
    const getRoom = async () => {
      try {
        const { data } = await listRoom(id);
        if (data.data) {
          setRooms(data.data as any);
        }
      } catch (error) {
        console.log('error', error);
      }
    };
    getRoom();
  }, [id]);

  const submitHandleElectric = async (id: any) => {};

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
              - Bạn phải gán dịch vụ thuộc loại điện cho khách thuê trước thì phần chỉ số này mới được tính cho phòng đó
              khi tính tiền.
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
          </div>
          <div className="flex-auto px-0 pt-0 pb-2  overflow-x-scroll overflow-y-scroll">
            <div className="p-0">
              <table className="items-center w-full m-2 align-top border-gray-200 text-slate-500">
                <thead className="align-bottom">
                  <tr>
                    <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border border-gray-200 shadow-none text-xxs border-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                      Nhà
                    </th>
                    <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border border-gray-200 shadow-none text-xxs border-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                      Phòng
                    </th>
                    <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border border-gray-200 shadow-none text-xxs border-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                      Khách thuê
                    </th>
                    <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border border-gray-200 shadow-none text-xxs border-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                      Chỉ số điện Cũ
                    </th>
                    <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border border-gray-200 shadow-none text-xxs border-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                      Chỉ số điện Mới
                    </th>
                    <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border border-gray-200 shadow-none text-xxs border-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                      Sử dụng
                    </th>
                    <th className="px-6 py-3 font-semibold capitalize align-middle bg-transparent border border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-400 opacity-70" />
                  </tr>
                </thead>
                <tbody>
                  {rooms?.map((room, index) => {
                    return (
                      <tr key={index} className="border">
                        <td className="p-2 align-middle bg-transparent border whitespace-nowrap shadow-transparent">
                          <div className="flex px-2 py-1">
                            <div className="flex flex-col justify-center">
                              <h6 className="mb-0 leading-normal text-sm">Nhà 1</h6>
                            </div>
                          </div>
                        </td>

                        <td className="p-2 align-middle bg-transparent border whitespace-nowrap shadow-transparent">
                          <p className="mb-0 font-semibold leading-tight text-sm">{room.name}</p>
                        </td>

                        <td className="p-2 leading-normal text-center align-middle bg-transparent border text-sm whitespace-nowrap shadow-transparent">
                          <span className=" from-emerald-500 to-teal-400 px-3.6 text-sm rounded-1.8 py-2.2 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-black">
                            Nguyễn Đắc Phương
                          </span>
                        </td>

                        <td className="p-2 text-center align-middle bg-transparent border whitespace-nowrap shadow-transparent">
                          <span className="font-bold w-full flex border-0 px-3 py-3 placeholder-blueGray-300 text-green-700 bg-gray-200  rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150">
                            {room.elictric_number}
                          </span>
                        </td>

                        <td className="p-2 text-center align-middle bg-transparent border whitespace-nowrap shadow-transparent">
                          <input
                            placeholder={room.update_elictric_number}
                            name="update_elictric_number"
                            className="font-bold w-full flex border-0 px-3 py-3 placeholder-blueGray-300 text-red-900 bg-gray-200  rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                            type="number"
                          />
                        </td>

                        <td className="p-2 text-center align-middle bg-transparent border whitespace-nowrap shadow-transparent">
                          <span className="font-semibold leading-tight text-sm text-slate-400">
                            {room.update_elictric_number - room.elictric_number}
                          </span>
                        </td>

                        <td className="p-2 bg-transparent shadow-transparent">
                          <button
                            onClick={() => submitHandleElectric(room.id)}
                            className="border flex rounded px-3 py-1 items-center bg-sky-400"
                            type="button"
                          >
                            <FontAwesomeIcon className="w-[16px] text-black" icon={faSave} />
                            <span className="ml-1">Lưu</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LisElectric;
