import React, { useState } from 'react';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import styles from './style.module.css';
type Props = {};

const InfoReceipt = (props: Props) => {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  return (
    <div className="h-screen">
      <div className="h-screen">
        <header className="bg-white shadow">
          <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate uppercase">
                  quản lý hóa đơn
                </h2>
              </div>
              <div className="mt-5 flex lg:mt-0 lg:ml-4">
               <input type="date" className='border'/>
              </div>
              <div className="mt-5 flex lg:mt-0 lg:ml-4">
              <form>
                <input
                  type="text"
                  name="keyword"
                  className="text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Tìm kiếm..."
                />
              </form>
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
                            Tiền điện
                          </th>
                          <th
                            scope="col"
                            className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            tiền nước
                          </th>
                          <th
                            scope="col"
                            className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            tiền dịch vụ khác
                          </th>
                          <th
                            scope="col"
                            className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Tổng tiền thanh toán
                          </th>
                          <th
                            scope="col"
                            className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Thao tác
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace">
                            <div className="text-center">Phòng số 1 </div>
                          </td>
                          <td className="px-6 py-4 whitespace">
                            <div className="text-center">1.000.000 vnd</div>
                          </td>
                          <td className="px-6 py-4 whitespace">
                            <div className="text-center">2.000.000 vnd</div>
                          </td>
                          <td className="px-6 py-4 whitespace">
                            <div className="text-center">100.000 vnd</div>
                          </td>
                          <td className="px-6 py-4 whitespace">
                            <div className="text-center">500.000 vnd</div>
                          </td>
                          <td className="px-6 py-4 whitespace">
                            <div className="text-center">1.500.000 vnd</div>
                          </td>
                          <td className="px-6 py-4 whitespace">
                            <div className="text-center">
                              <button onClick={onOpenModal}>Chi tiết</button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>{' '}
      <Modal open={open} onClose={onCloseModal} center>
        <div>
          <header className="bg-white shadow">
            <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <div className="lg:flex lg:items-center lg:justify-between">
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate uppercase">
                    Chi tiết hóa đơn
                  </h2>
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
                              Đơn giá
                            </th>
                            <th
                              scope="col"
                              className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Chỉ số đầu
                            </th>
                            <th
                              scope="col"
                              className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Chỉ số cuối
                            </th>
                            <th
                              scope="col"
                              className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Chỉ số tiêu thụ
                            </th>
                            <th
                              scope="col"
                              className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Thành tiền
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-9 py-4 whitespace text-sm text-gray-500">
                              <div className="text-center">1</div>
                            </td>
                            <td className="px-9 py-4 whitespace text-sm text-gray-500">
                              <div className="text-center">Điện</div>
                            </td>
                            <td className="px-6 py-4 whitespace">
                              <div className="text-center">1000.000 vnd</div>
                            </td>

                            <td className="px-6 py-4 whitespace">
                              <div className="text-center">20 vnd</div>
                            </td>
                            <td className="px-6 py-4 whitespace">
                              <div className="text-center">20 vnd</div>
                            </td>
                            <td className="px-6 py-4 whitespace">
                              <div className="text-center">50 vnd</div>
                            </td>
                            <td className="px-6 py-4 whitespace">
                              <div className="text-center">500000 vnd</div>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={6} className="px-9 py-4 whitespace text-sm text-gray-500 font-bold">
                              <div>Tổng </div>
                            </td>
                            <td className="px-9 py-4 whitespace text-sm text-gray-500">
                              <div className="text-center">50000vnd </div>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={6} className="px-9 py-4 whitespace text-sm text-gray-500 font-bold">
                              <div>Trạng thái thanh toán :</div>
                            </td>
                            <td className="px-9 py-4 whitespace text-sm text-gray-500">
                              <div className="text-center">Chưa hoặc rồi </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </Modal>
    </div>
  );
};

export default InfoReceipt;
