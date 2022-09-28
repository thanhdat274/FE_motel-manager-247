import Link from 'next/link';
import React, { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import swal from 'sweetalert';
type Props = {};
interface IFormInputs {
  name: string;
  price: number;
  desc: string;
}
const EditService = (props: Props) => {
  const router = useRouter();
  const { idService } = router.query;
  console.log(idService);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<IFormInputs>();

  useEffect(() => {
    const getServiceId = async () => {
      const data = await axios.get('http://localhost:3001/api/service/' + idService);
      console.log(data);

      reset(data.data);
    };
    getServiceId();
  }, []);
  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    try {
      await axios.put('http://localhost:3001/api/service/'+idService, data);
      swal('Bạn đã chỉnh sửa thành công!', 'success');
      router.push(`/manager/landlord/${idService}/service`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="w-full ">
        <header className="bg-white shadow border rounded-md">
          <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate uppercase">
                  Thêm dịch vụ
                </h2>
              </div>
            </div>
          </div>
        </header>

        <main>
          <div className="max-w-full mx-auto py-6 ">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="mt-5 md:mt-0 md:col-span-3 border rounded-md">
                <form id="formAdd" onSubmit={handleSubmit(onSubmit)}>
                  <div className="shadow rounded-md overflow-hidden">
                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                      <div className="col-span-6">
                        <label className="block text-sm font-bold text-gray-700" htmlFor="username">
                          Tên dịch vụ <span className="text-[red]">*</span>
                        </label>
                        <input
                          className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="name"
                          type="text"
                          placeholder="Nhập tên dịch vụ..."
                          {...register('name', { required: true })}
                        />
                        {errors.name?.type === 'required' && <span className="text-rose-600">Không được bỏ trống</span>}
                      </div>

                      <div className="col-span-6">
                        <label className="block text-gray-700 text-sm font-bold" htmlFor="username">
                          Giá dịch vụ <span className="text-[red]">*</span>
                        </label>
                        <input
                          className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="price"
                          type="text"
                          placeholder="Nhập giá dịch vụ..."
                          {...register('price', { required: true })}
                        />
                        {errors.price && errors.price.type === 'required' && (
                          <span className="text-rose-600">Không được bỏ trống</span>
                        )}
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-bold" htmlFor="username">
                          Ghi chú <span className="text-[red]">*</span>
                        </label>
                        <div className="mt-1">
                          <textarea
                            rows={5}
                            id="desc-product"
                            className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            {...register('desc', { required: true })}
                          ></textarea>
                           {errors.desc && errors.desc.type === 'required' && (
                          <span className="text-rose-600">Không được bỏ trống</span>
                        )}
                        </div>
                      </div>
                    </div>

                    <div className="px-4 py-3 flex gap-[20px] bg-gray-50 text-right sm:px-6 ">
                      <Link
                        href={`/manager/landlord/${idService}/service`}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <a className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          Quay lại
                        </a>
                      </Link>

                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
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

export default EditService;
