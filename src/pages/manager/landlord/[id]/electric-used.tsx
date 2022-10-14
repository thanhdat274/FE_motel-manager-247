import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { supabase } from 'src/apis/supabase';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faFileExcel, faSave, faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useUserContext } from '@/context/UserContext';
import { Toast } from 'src/hooks/toast';

type Props = {};

type FromValues = {
  id: string;
  name: string;
  price: number;
  area: number;
  max: number;
  status: boolean;
  houseId: string;
};

const ElictricNumber = [
  { id: 1, idMember: 1, customName: 'Nguyễn Đắc Phương', elictricNumber: 123, updateElictricNumber: 213, idRoom: 3 },
];
const options1 = [
  { value: 'Kỳ 15 ngày', name: 1, id: 1 },
  { value: 'Kỳ 1 tháng', name: 2, id: 2 },
  { value: 'Kỳ 3 tháng', name: 3, id: 3 },
  { value: 'Kỳ 6 tháng', name: 4, id: 4 },
];

const options2 = [
  { value: 'Phòng trống', name: 1, id: 1 },
  { value: 'Đã đặt cọc', name: 2, id: 2 },
  { value: 'Đã thuê', name: 3, id: 3 },
];

const LisElectric = (props: Props) => {
  const { setLoading } = useUserContext();
  const router = useRouter();
  const param = router.query;

  const [countries, setCountries] = useState();
  const [status, setStatus] = useState(options2);
  const [periods, setPeriods] = useState(options1);
  const [inputValue, setInputValue] = useState('');
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [selected, setSelected] = useState('');
  const [selected1, setSelected1] = useState('');
  const [selected2, setSelected2] = useState('');
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [rooms, setRooms] = useState([]);
  const dataListHouse = {};
  useEffect(() => {
    const getHouse = async () => {
      try {
        const res = await axios.get('https://633505ceea0de5318a0bacba.mockapi.io/api/house/');
        if (res.data) {
          setCountries(res.data as any);
          console.log('data', res.data);
        }
      } catch (error) {
        console.log('error', error);
      }
    };
    getHouse();
  }, []);
  useEffect(() => {
    const id = param.id;
    const getRoom = async () => {
      try {
        const res = await axios.get(`https://633505ceea0de5318a0bacba.mockapi.io/api/house/${id}/room`);
        if (res.data) {
          setRooms(res.data as any);
          console.log('rôm', res.data);
        }
      } catch (error) {
        console.log('error', error);
      }
    };
    getRoom();
  }, [param.id]);

  useEffect(() => {
    const getRooms = async () => {
      try {
        const res = await axios.get('');
      } catch (error) {}
    };
  });
  const submitHandleElectric = async (id: any) => {
    // useEffect(() => {

    // },[])

    console.log('param id = ', param.id);
    console.log('Id phòng', id);

    try {
      await axios
        .put(`https://633505ceea0de5318a0bacba.mockapi.io/api/house/${param.id}/room/` + id)
        .then((data: any) => {
          setLoading(false);
      
          Toast('success', 'Cập nhật phòng thành công');
        });
    } catch (error) {
      Toast('error', 'Cập nhật phòng không thành công');
    }
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
                  <input
                    type="date"
                    className="w-[70%] border-0 px-3 py-2.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                  />
                </div>
              </div>
              {/* <div className="w-full md:w-3/12 px-4">
                <div className="relative w-full mb-3 flex items-center">
                  <label
                    className="w-[30%] block uppercase text-blueGray-600 text-sm font-bold lg:mr-2"
                    htmlFor="grid-password"
                  >
                    Kỳ hạn
                  </label>
                  <div className="w-[70%]">
                    <div
                      onClick={() => setOpen(!open)}
                      className={`w-full flex border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150 ${
                        !open ? ' z-50' : 'm-0'
                      }  ${!selected && 'text-gray-700'}`}
                    >
                      {selected ? (selected?.length > 25 ? selected?.substring(0, 25) + '...' : selected) : 'Lựa chọn'}
                      <FontAwesomeIcon className="w-[16px] text-black text-right ml-auto" icon={faChevronDown} />
                    </div>
                    <ul className={`bg-white overflow-y-auto ${open ? 'max-h-60 fixed z-50' : 'max-h-0'} `}>
                      <div className="flex items-center px-2 sticky top-0 bg-gray-200">
                        <input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value.toLowerCase())}
                          placeholder="Search"
                          className="placeholder:text-gray-700 p-2  bg-gray-200 w-full outline-none"
                        />
                      </div>
                      {periods?.map((period: any) => (
                        <li
                          key={period?.name}
                          className={`p-2 text-sm hover:bg-sky-600 hover:text-white
                      ${period?.value?.toLowerCase() === selected?.toLowerCase() && 'bg-sky-600 text-white'}
                      ${period?.value?.toLowerCase().startsWith(inputValue) ? 'block' : 'hidden'}`}
                          onClick={() => {
                            if (period?.value?.toLowerCase() !== selected.toLowerCase()) {
                              setSelected(period?.value);
                              setOpen(false);
                              setInputValue('');
                            }
                          }}
                        >
                          {period?.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-3/12 px-4">
                <div className="relative w-full mb-3 flex items-center">
                  <label
                    className="w-[30%] block uppercase text-blueGray-600 text-sm font-bold lg:mr-2"
                    htmlFor="grid-password"
                  >
                    Nhà
                  </label>
                  <div className="w-[70%]">
                    <div
                      onClick={() => setOpen1(!open1)}
                      className={`w-full flex border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150 ${
                        !open ? ' z-50' : 'm-0'
                      }  ${!selected1 && 'text-gray-700'}`}
                    >
                      {selected1
                        ? selected1?.length > 25
                          ? selected1?.substring(0, 25) + '...'
                          : selected1
                        : 'Lựa chọn'}
                      <FontAwesomeIcon className="w-[16px] text-black text-right ml-auto" icon={faChevronDown} />
                    </div>
                    <ul className={`bg-white overflow-y-auto ${open1 ? 'max-h-60 fixed z-50' : 'max-h-0'} `}>
                      <div className="flex items-center px-2 sticky top-0 bg-gray-200">
                        <input
                          type="text"
                          value={inputValue1}
                          onChange={(e) => setInputValue1(e.target.value.toLowerCase())}
                          placeholder="Search"
                          className="placeholder:text-gray-700 p-2  bg-gray-200 w-full outline-none"
                        />
                      </div>
                      {countries?.map((country: any) => (
                        <li
                          key={country?.id}
                          value={country?.id}
                          className={`p-2 text-sm hover:bg-sky-600 hover:text-white
                      ${country?.name?.toLowerCase() === selected1?.toLowerCase() && 'bg-sky-600 text-white'}
                      ${country?.name?.toLowerCase().startsWith(inputValue1) ? 'block' : 'hidden'}`}
                          onClick={() => {
                            if (country?.name?.toLowerCase() !== selected1.toLowerCase()) {
                              setSelected1(country?.name);
                              setOpen1(false);
                              setInputValue1('');
                            }
                          }}
                        >
                          {country?.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-3/12 px-4">
                <div className="relative w-full mb-3 flex items-center">
                  <label
                    className="w-[30%] block uppercase text-blueGray-600 text-sm font-bold lg:mr-2"
                    htmlFor="grid-password"
                  >
                    Trạng thái phòng
                  </label>
                  <div className="w-[70%]">
                    <div
                      onClick={() => setOpen2(!open2)}
                      className={`w-full flex border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150 ${
                        !open ? ' z-50' : 'm-0'
                      }  ${!selected && 'text-gray-700'}`}
                    >
                      {selected2
                        ? selected2?.length > 25
                          ? selected2?.substring(0, 25) + '...'
                          : selected2
                        : 'Lựa chọn'}
                      <FontAwesomeIcon className="w-[16px] text-black text-right ml-auto" icon={faChevronDown} />
                    </div>
                    <ul className={`bg-white overflow-y-auto ${open2 ? 'max-h-60 fixed z-50' : 'max-h-0'} `}>
                      <div className="flex items-center px-2 sticky top-0 bg-gray-200">
                        <input
                          type="text"
                          value={inputValue2}
                          onChange={(e) => setInputValue2(e.target.value.toLowerCase())}
                          placeholder="Search"
                          className="placeholder:text-gray-700 p-2  bg-gray-200 w-full outline-none"
                        />
                      </div>
                      {status?.map((status: any) => (
                        <li
                          key={status?.name}
                          className={`p-2 text-sm hover:bg-sky-600 hover:text-white
                      ${status?.value?.toLowerCase() === selected2?.toLowerCase() && 'bg-sky-600 text-white'}
                      ${status?.value?.toLowerCase().startsWith(inputValue2) ? 'block' : 'hidden'}`}
                          onClick={() => {
                            if (status?.value?.toLowerCase() !== selected2.toLowerCase()) {
                              setSelected2(status?.value);
                              setOpen2(false);
                              setInputValue2('');
                            }
                          }}
                        >
                          {status?.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div> */}
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
