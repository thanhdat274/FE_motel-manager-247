import React, { useState } from 'react';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
type Props = {};

const Receipt = (props: Props) => {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
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
                          Người đại diện
                        </th>
                        <th
                          scope="col"
                          className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Số tiền phải trả
                        </th>

                        <th
                          scope="col"
                          className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Tiền dịch vụ
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
                          Chi tiết
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-9 py-4 whitespace text-sm text-gray-500">
                          <div className="text-center">Nhà bỏ Hoang 10 năm có ma đấy nhé :)) </div>
                        </td>
                        <td className="px-6 py-4 whitespace">
                          <div className="text-center">Phòng bỏ trống 10 năm :))</div>
                        </td>

                        <td className="px-6 py-4 whitespace">
                          <div className="text-center">Đã bảo trống 10 năm rồi làm gì có khách nào :))</div>
                        </td>
                        <td className="px-6 py-4 whitespace">
                          <div className="text-center">1000vnd</div>
                        </td>
                        <td className="px-6 py-4 whitespace">
                          <div className="text-center">1000vnd</div>
                        </td>

                        <td className="px-6 py-4 whitespace">
                          <div className="text-center">
                            <button onClick={onOpenModal}>
                              <FontAwesomeIcon className="w-[16px] text-black" icon={faEye} />
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-9 py-4 whitespace text-sm text-gray-500">
                          <div className="text-center">Nhà bỏ Hoang 10 năm có ma đấy nhé :)) </div>
                        </td>
                        <td className="px-6 py-4 whitespace">
                          <div className="text-center">Phòng bỏ trống 10 năm :))</div>
                        </td>

                        <td className="px-6 py-4 whitespace">
                          <div className="text-center">Đã bảo trống 10 năm rồi làm gì có khách nào :))</div>
                        </td>
                        <td className="px-6 py-4 whitespace">
                          <div className="text-center">1000vnd</div>
                        </td>
                        <td className="px-6 py-4 whitespace">
                          <div className="text-center">1000vnd</div>
                        </td>
                        <td className="px-6 py-4 whitespace">
                          <div className="text-center">
                            <button onClick={onOpenModal}>
                              <FontAwesomeIcon className="w-[16px] text-black" icon={faEye} />
                            </button>
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
      <div className="">
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
            <div className="modal-body" id="contentPDF">
              <div className="h-[27px]">
                <span>
                  <strong>Nhà Tầng 1</strong>
                </span>
                <span className="float-right" />
              </div>
              <div className="h-[27px]">
                <span>
                  <strong>Địa chỉ: Hà Nội </strong>
                </span>
                <span className="float-right">24/10/2022</span>
              </div>
              <div>
                <h4 className="text-center">
                  <strong>HÓA ĐƠN TIỀN NHÀ</strong>
                </h4>
              </div>
              <div>
                <p className="text-center">
                  <strong>Tháng 10/2022 - Kỳ 30</strong>
                </p>
              </div>
              <div>
                <p className="text-center">(Từ ngày 01/10/2022 đến 31/10/2022)</p>
              </div>
              <div>
                <p>
                  Họ tên: <strong>Nguyễn Văn Duy </strong>
                </p>
              </div>
              <div>
                <p>
                  <strong>Phòng: 1</strong>
                </p>
              </div>
              <div className="border-b-2 border-t-2 border-black">
                <table cellSpacing={0} cellPadding={0} width="100%">
                  <tbody>
                    <tr>
                      <td className="w-[2%]">1)</td>
                      <td className="w-[70%]">Tiền nhà (từ ngày 01/10/2022 đến ngày 31/10/2022)</td>
                      <td className="w-[25%] text-right">3,000,000</td>
                    </tr>
                    <tr>
                      <td className="w-[2%]">2)</td>
                      <td className="w-[70%]">Điện(CS cũ:22.0, CS mới:33.0, SD:11.0)</td>
                      <td className="w-[25%] text-right">33,000</td>
                    </tr>
                    <tr>
                      <td className="w-[2%]">3)</td>
                      <td className="w-[70%]">Nước(CS cũ:100.0, CS mới:200.0, SD:100.0)</td>
                      <td className="w-[25%] text-right">2,000,000</td>
                    </tr>
                    <tr>
                      <td className="w-[2%]">4)</td>
                      <td className="w-[70%]">Gửi xe máy</td>
                      <td className="w-[25%] text-right">80,000</td>
                    </tr>
                    <tr>
                      <td className="w-[2%]">5)</td>
                      <td className="w-[70%]">Rác</td>
                      <td className="w-[25%] text-right">50,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="border-b-2 border-black">
                <strong>TỔNG CỘNG</strong>
                <strong className="float-right">5,163,000</strong>
              </div>
              <div>
                <span className="left-[45%] relative float-left">
                  <strong>Người thanh toán</strong>
                </span>
                <span className="float-right">
                  <strong>Người nhận TT</strong>
                </span>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Receipt;
