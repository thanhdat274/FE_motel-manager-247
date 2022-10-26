import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { supabase } from 'src/apis/supabase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faFileExcel, faSave, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useUserContext } from '@/context/UserContext';
import { listRoom } from 'src/pages/api/room';
import { MonthPicker, Row, Col } from 'uiw';
// import 'react-month-picker/css/'

type Props = {};

const LisElectric = (props: Props) => {

  const [formatDate, setFormatDate] = useState('2019/04');
  const onChange = (date, formatDate) => {
    setFormatDate(formatDate);
    console.log(formatDate);
  };

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
  console.log(rooms);

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
                  <MonthPicker size="large" onChange={onChange} placeholder="Select month" />
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
          <div className="max-w-full mx-2 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full ">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Nhà
                          </th>

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
                            Khách thuê
                          </th>
                          <th
                            scope="col"
                            className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Số điện cũ
                          </th>
                          <th
                            scope="col"
                            className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Số điện mới
                          </th>
                          <th
                            scope="col"
                            className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Sử dụng
                          </th>
                          <th
                            scope="col"
                            className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Lưu
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {rooms?.map((room, index) => {
                          return (
                            <tr key={index}>
                              <td className="px-9 py-4 whitespace text-sm text-gray-500">
                                <div className="text-center">Nhà</div>
                              </td>
                              <td className="px-6 py-4 whitespace">
                                <div className="text-center">{room.name}</div>
                              </td>
                              <td className="px-6 py-4 whitespace">
                                <div className="text-center">Nguyễn Đắc Phương</div>
                              </td>
                              <td className="px-6 py-4 whitespace">
                                <div className="text-center">
                                  <span className="font-bold w-full flex border-0 px-3 py-3 placeholder-blueGray-300 text-green-700 bg-gray-200  rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150">
                                    {room.elictric_number}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace">
                                <div className="text-center">
                                  <input
                                    placeholder={room.update_elictric_number}
                                    name="update_elictric_number"
                                    className="font-bold w-full flex border-0 px-3 py-3 placeholder-blueGray-300 text-red-900 bg-gray-200  rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                                    type="number"
                                  />
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace">
                                <div className="text-center">{room.update_elictric_number - room.elictric_number}</div>
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap text-center">
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
        </div>
      </div>
    </div>
  );
};

export default LisElectric;
