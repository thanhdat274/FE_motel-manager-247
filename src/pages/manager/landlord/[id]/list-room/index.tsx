import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMoneyBill, faPenToSquare, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Toast } from 'src/hooks/toast';
import { useUserContext } from '@/context/UserContext';
import { listRoom, removeRoom } from 'src/pages/api/room';

const ListRoom = () => {
  const { cookies, setLoading } = useUserContext();
  const [roomsAll, setRoomsAll] = useState([]);
  const [listRoomUsing, setListRoomUsing] = useState([]);
  const [listRoomNotReady, setListRoomNotReady] = useState([]);
  const [listRoomEmptyMember, setListRoomEmptyMember] = useState([]);
  const [changeValue, setChangeValue] = useState(0);
  const [selectValue, setSelectValue] = useState('0');

  const userData = cookies?.user;
  const router = useRouter();
  const { id } = router.query;

  const [fillter, setfillter] = useState('');
  const handleSearch = (event: any) => {
    const value = event.target.value;
    setfillter(value);
  };

  useEffect(() => {
    if (id) {
      const getRoom = async () => {
        setLoading(true);
        try {
          const { data } = await listRoom(id, userData as any);
          if (data.data) {
            setRoomsAll(data.data as any);
            setListRoomUsing(data.listRoomUsing as any);
            setListRoomNotReady(data.listRoomNotReady as any);
            setListRoomEmptyMember(data.listRoomEmptyMember as any);
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
        }
      };
      getRoom();
    }
  }, [userData, id, setLoading, changeValue]);

  const removeRooms = async (_id: number, userData: any) => {
    const confirm = window.confirm('Bạn có muốn xóa không?');
    if (confirm) {
      setLoading(true);
      await removeRoom({ _id: _id, userData: userData })
        .then(() => {
          Toast('success', 'Xóa phòng thành công');
          setLoading(false);
        })
        .catch((error) => {
          Toast('error', error?.response?.data?.message);
          setLoading(false);
        })
        .finally(() => {
          setChangeValue(changeValue + 1);
        });
    }
  };

  const genData = (data: any, color?: string) => {
    return (
      <div className="w-full grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
        {data.length > 0 ? (
          data
            .filter((val: any) => {
              if (fillter == '') {
                return val;
              } else if (val.name.toLocaleLowerCase().includes(fillter.toLowerCase())) {
                return val;
              }
            })
            .map((item: any, index: React.Key | null | undefined) => {
              return (
                <>
                  {item?.status == true ? (
                    <div
                      className={`w-full border-2 p-[20px] ${item?.listMember?.length == 0 ? 'border-yellow-400' : color
                        } bg-white rounded-[5px] flex flex-col justify-between`}
                      key={index}
                    >
                      <h2 className="text-xl flex items-center gap-2 mb-[20px]">
                        <FontAwesomeIcon className="h-[15px]" icon={faHouse} />
                        {item.name}
                      </h2>

                      <p className="flex items-center gap-2 mb-[20px]">
                        <FontAwesomeIcon className="h-[15px]" icon={faMoneyBill} />
                        <span className="text-red-500">
                          {item.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                        </span>
                      </p>

                      {item.listMember.length > 0 ? (
                        <>
                          <p className="flex items-center gap-2 mb-[20px]">
                            <FontAwesomeIcon className="h-[15px]" icon={faUser} />
                            <span className="">
                              {item.listMember.map((item1: any, index: number) => {
                                return (
                                  <div key={index}>
                                    {item1.status == true ? <div>{item1.memberName}</div> : <div>{null}</div>}
                                  </div>
                                );
                              })}
                            </span>
                          </p>
                          <p className="flex items-center gap-2 mb-[20px]">
                            <FontAwesomeIcon className="h-[15px]" icon={faUser} />
                            <span className="">{item.listMember.length}</span>
                          </p>{' '}
                        </>
                      ) : (
                        <>
                          <p className="flex items-center gap-2 mb-[20px]">
                            <span className="h-[15px]" ></span>
                            <span className="">
                              Phòng trống
                            </span>
                          </p>
                          <p className="flex items-center gap-2 mb-[20px]">
                            <span className="h-[15px]" ></span>
                            <span className="">
                            </span>
                          </p>
                        </>
                      )}

                      <div className="text-center flex gap-3 ">
                        <Link
                          href={`/manager/landlord/${id}/list-room/${item._id}/`}
                          className="text-amber-500 hover:text-amber-600"
                        >
                          <a className="text-amber-500 hover:text-amber-600 flex gap-1 items-center">
                            <FontAwesomeIcon className="h-[20px]" icon={faPenToSquare} /> Quản lý
                          </a>
                        </Link>

                        <button
                          onClick={() => {
                            removeRooms(item._id, userData);
                          }}
                          className="btn text-red-500 hover:text-red-600 flex gap-1 items-center"
                        >
                          <FontAwesomeIcon className="h-[20px]" icon={faTrash} /> Xóa
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="w-full border-2 p-[20px] border-y-red-400 border-x-red-400 bg-white rounded-[5px] flex flex-col justify-between"
                      key={index}
                    >
                      <h2 className="text-xl flex items-center gap-2 mb-[20px]">
                        <FontAwesomeIcon className="h-[15px]" icon={faHouse} />
                        {item.name}
                      </h2>

                      <p className="flex items-center gap-2 mb-[20px]">
                        <FontAwesomeIcon className="h-[15px]" icon={faMoneyBill} />
                        <span className="text-red-500">
                          {item.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                        </span>
                      </p>

                      <p className="flex items-center gap-2 mb-[20px]">
                        <span className="h-[15px]" ></span>
                        <span className="">
                          Phòng đang sửa chữa
                        </span>
                      </p>
                      <p className="flex items-center gap-2 mb-[20px]">
                        <span className="h-[15px]" ></span>
                        <span className="">
                        </span>
                      </p>
                      <div className="text-center flex gap-3">
                        <Link
                          href={`/manager/landlord/${id}/list-room/${item._id}/`}
                          className="text-amber-500 hover:text-amber-600"
                        >
                          <a className="text-amber-500 hover:text-amber-600 flex gap-1 items-center">
                            <FontAwesomeIcon className="h-[20px]" icon={faPenToSquare} /> Quản lý
                          </a>
                        </Link>

                        <button
                          onClick={() => {
                            removeRooms(item._id, userData);
                          }}
                          className="btn text-red-500 hover:text-red-600 flex gap-1 items-center"
                        >
                          <FontAwesomeIcon className="h-[20px]" icon={faTrash} /> Xóa
                        </button>
                      </div>
                    </div>
                  )}
                </>
              );
            })
        ) : (
          <div>
            <p className="text-blue-600/100 ">Không có dữ liệu</p>
          </div>
        )}
      </div>
    );
  };

  const returnData = (value: any) => {
    switch (value) {
      case '1':
        return (
          <div className="w-full border-solid  border-green-500 p-4">
            <div className="title text-xl font-bold mb-[20px]">Phòng đang sử dụng</div>
            <>{genData(listRoomUsing, 'border-green-500')}</>
          </div>
        );
      case '2':
        return (
          <div className="w-full border-solid  border-red-400 p-4">
            <div className="title text-xl font-bold mb-[20px]">Phòng đang sửa chữa</div>
            <>{genData(listRoomNotReady, 'border-red-400')}</>
          </div>
        );

      case '3':
        return (
          <div className="w-full border-solid  border-yellow-400 p-4">
            <div className="title text-xl font-bold mb-[20px]">Phòng còn trống</div>
            <>{genData(listRoomEmptyMember, 'border-yellow-400')}</>
          </div>
        );
      default:
        return (
          <>
            <div className="w-full p-4">
              <>{genData(roomsAll, 'border-green-400')}</>
            </div>
          </>
        );
    }
  };

  return (
    <div className="h-auto">
      <header className="bg-white shadow">
        <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate uppercase">
                Quản lý phòng
              </h2>
            </div>
            <div className="mt-5 flex flex-col gap-4 md:flex-row md:gap-0 lg:mt-0 lg:ml-4 items-center">
              <div className="mr-[20px]">
                <form className="flex flex-row gap-4">
                  <select onChange={(e) => setSelectValue(e.target.value)} name="" id="" className='border focus:outline-none focus:shadow-outline rounded'>
                    <option value="0">Toàn bộ</option>
                    <option value="1">Phòng đang sử dụng</option>
                    <option value="2">Phòng đang sửa chữa</option>
                    <option value="3">Phòng còn trống</option>
                  </select>
                  <input
                    type="text"
                    name="keyword"
                    className="text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Tìm kiếm..."
                    onChange={handleSearch}
                    value={fillter}
                  />
                </form>
              </div>
              <Link href={`/manager/landlord/${id}/list-room/add`}>
                <a className="inline-flex items-center px-4 py-2 min-w-fit w-fit border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Thêm mới
                </a>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-full mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col">
            <div className="sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-mparamle min-w-full flex flex-col gap-6 ">{returnData(selectValue)}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListRoom;
