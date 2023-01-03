import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useUserContext } from '@/context/UserContext';
import { Toast } from 'src/hooks/toast';
import { ListService, removeService } from 'src/pages/api/service';
type Props = {};

const ListServiceRoom = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const [listServices, setListServices] = useState([]);
  const { cookies, setLoading } = useUserContext();
  const userData = cookies?.user;
  const [fillter, setfillter] = useState('');
  const handleSearch = (event: any) => {
    const value = event.target.value;
    setfillter(value);
  };

  useEffect(() => {
    if (id) {
      const getService = async () => {
        setLoading(true);
        try {
          const { data } = await ListService(id as string, userData as any);
          setListServices(data.data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      };
      getService();
    }
  }, [id, setLoading, userData]);

  const remove = async (_id: any, id: any, userData: any) => {
    const confirm = window.confirm('Bạn có muốn xóa không?');
    if (confirm) {
      if (_id && id && userData) {
        setLoading(true);
        await removeService({ idService: _id, idHouse: id, userData: userData }).then(() => {
          Toast('success', 'Xóa dịch vụ thành công');
          setListServices(listServices.filter((item: any) => item._id !== _id));
          setLoading(false);
        }).catch((error) => {
          Toast('error', error?.response?.data?.message);
          setLoading(false);
        });
      }
    }
  };

  return (
    <div className="h-screen">
      <header className="bg-white shadow">
        <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate uppercase">
                Quản lý dịch vụ
              </h2>
            </div>
            <div className="mt-5 flex lg:mt-0 lg:ml-4 items-center">
              <div className="mr-[20px]">
                <form>
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
              <Link href={`/manager/landlord/${id}/service/add`}>
                <a className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full ">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          STT
                        </th>
                        <th
                          scope="col"
                          className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Tên
                        </th>
                        <th
                          scope="col"
                          className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Giá
                        </th>
                        <th
                          scope="col"
                          className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Đơn vị
                        </th>

                        <th
                          scope="col"
                          className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        ></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {listServices &&
                        listServices
                          .filter((val: any) => {
                            if (fillter == '') {
                              return val;
                            } else if (val.label.toLocaleLowerCase().includes(fillter.toLowerCase())) {
                              return val;
                            }
                          })
                          .map((item: any, index) => {
                            console.log('item', item.doNotDelete);

                            return (
                              <tr key={index}>
                                <td className="px-9 py-4 whitespace text-sm text-gray-500">
                                  <div className="text-center">{index + 1}</div>
                                </td>
                                <td className="px-6 py-4 whitespace">
                                  <div className="text-center">{item.label}</div>
                                </td>
                                <td className="px-6 py-4 whitespace">
                                  <div className="text-center">{item.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</div>
                                </td>
                                <td className="px-6 py-4 whitespace">
                                  <div className="text-center">{item.unit}</div>
                                </td>
                                {/* <td className="px-6 py-4 whitespace">
                                <div className="text-center">{item.type ? 'Theo tháng' : 'không theo tháng'}</div>
                              </td> */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-center flex">
                                    <Link href={`/manager/landlord/${id}/service/${item._id}/edit`}>
                                      <a className="text-amber-500 hover:text-amber-600 mx-[10px]">
                                        <FontAwesomeIcon
                                          className="w-[20px] cursor-pointer"
                                          icon={faPenToSquare}
                                        ></FontAwesomeIcon>
                                      </a>
                                    </Link>
                                    {!item.doNotDelete && < button
                                      className="text-red-500 hover:text-red-500 mx-[10px]"
                                      onClick={() => remove(item._id, id, userData)}
                                    >
                                      <FontAwesomeIcon className="w-[20px]" icon={faTrash}></FontAwesomeIcon>
                                    </button>}

                                  </div>
                                </td>
                              </tr>
                            )
                          })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main >
    </div >
  );
};

export default ListServiceRoom;
