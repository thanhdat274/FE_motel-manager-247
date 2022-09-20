import React from 'react';

type Props = {};

const Add = (props: Props) => {
  return (
    <div>
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate uppercase">
                  thêm mới phòng
                </h2>
              </div>
            </div>
          </div>
        </header>
        <main>
          <div className="max-w-full mx-auto py-6 ">
            <div className="md:grid md:grid-cols-3 md:gap-6 ">
              <div className="mt-5 md:mt-0 md:col-span-3 border">
                <form id="formAdd">
                  <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                      <div className="col-span-6">
                        <label className="block text-sm font-medium text-gray-700">
                          Danh sách nhà <span className="text-[red]">*</span>
                        </label>
                        <select
                          name=''
                          id="cateId"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm h-[30px] border border-gray-300 rounded-md pl-[10px]"
                        >
                          <option value="${post.id}">11</option>
                        </select>
                      </div>
                      <div className="col-span-6">
                        <label className="block text-sm font-medium text-gray-700">
                          Phòng số <span className="text-[red]">*</span>
                        </label>
                        <input
                          type="text"
                          id="name-product"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm h-[30px] border border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6">
                        <label className="block text-sm font-medium text-gray-700">
                          Giá <span className="text-[red]">*</span>
                        </label>
                        <input
                          type="number"
                          id="price-product"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm h-[30px] border border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6">
                        <label className="block text-sm font-medium text-gray-700">
                          Diện tích phòng (m2) <span className="text-[red]">*</span>
                        </label>
                        <input
                          type="number"
                          id="quantity-product"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm h-[30px] border border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6">
                        <label className="block text-sm font-medium text-gray-700">
                          Số lượng người thuê tối đa<span className="text-[red]">*</span>
                        </label>
                        <input
                          type="number"
                          id="quantity-product"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm h-[30px] border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Mô tả <span className="text-[red]">*</span>
                        </label>
                        <div className="mt-1">
                          <textarea
                            rows={5}
                            id="desc-product"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                            defaultValue={''}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 flex gap-[20px] bg-gray-50 text-right sm:px-6 ">
                      <a
                        href="/manager/landlord/room-list"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Quay lại
                      </a>
                      <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Lưu
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Add;
