import { useUserContext } from '@/context/UserContext';
import React, { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UpdateUserInfo, UserInfo } from 'src/pages/api/auth';
import { DatePicker, Space } from 'antd';
import type { DatePickerProps } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import { Toast } from 'src/hooks/toast';

type Props = {};

type FormInputs = {
  _id: string;
  name: string;
  cardNumber: string;
  dateRange: string;
  issuedBy: string;
  address: string;
  phoneNumber: string;
};

const AccountInformation = (props: Props) => {
  const today = new Date();
  const [dateRange, setDateRange] = useState('');
  const [day, setDay] = useState(today.getDate());
  const [month, setMonth] = useState(today.getMonth()+1);
  const [year, setYear] = useState(today.getFullYear());
  const { cookies, setLoading } = useUserContext();
  const userData = cookies?.user;
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();
  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const { data } = await UserInfo(userData as any);
        reset(data.data);
        if (data.data.dateRange != undefined) {
          setDay(data.data.dateRange.slice(8, 10));
          setMonth(data.data.dateRange.slice(5, 7));
          setYear(data.data.dateRange.slice(0, 4));
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getUsers();
  }, [reset, setLoading, userData]);

  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    if (day && year && month) {
      const newData = { ...data, dateRange: dateRange, userData: userData };
      setLoading(true);
      await UpdateUserInfo(newData)
        .then((newData: any) => {
          Toast('success', 'Cập nhật tài khoản thành công');
          setLoading(false);
        })
        .catch((error) => {
          Toast('error', error?.response?.data?.message);
          setLoading(false);
        });
    } else {
      Toast('error', 'Vui lòng chọn ngày cấp!');
    }
  };

  const datePickerShow = React.useMemo(() => {
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
      setDay(parseInt(dateString.slice(8, 10)));
      setMonth(parseInt(dateString.slice(5, 7)));
      setYear(parseInt(dateString.slice(0, 4)));
      setDateRange((moment(dateString).format('YYYY-MM-DD')))
    };
    return (
      <DatePicker
        style={{ width: '200px' }}
        onChange={onChange}
        value={moment(`${year}-${month}-${day}`, 'YYYY-MM-DD')}
      />
    );
  }, [day, month, year]);

  return (
    <div className="min-h-[700px] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="rounded bg-white max-w-md overflow-hidden shadow-xl p-5 space-y-8">
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 uppercase">Thông tin tài khoản</h2>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <label className="block" htmlFor="full_name">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Nhập họ và tên"
                {...register('name', { required: true })}
              />
              {errors.name?.type === 'required' && <span className="text-rose-600">Không được bỏ trống</span>}
            </div>
            <div className="mt-4">
              <label className="block">
                CCCD <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Nhập CCCD"
                {...register('cardNumber', { required: true })}
              />
              {errors.cardNumber?.type === 'required' && <span className="text-rose-600">Không được bỏ trống</span>}
            </div>
            <div className="mt-4">
              <label className="block">
                Ngày cấp <span className="text-red-500">*</span>
              </label>
              <div className="block mt-2">
                <Space direction="vertical">{datePickerShow}</Space>
              </div>
            </div>
            <div className="mt-4">
              <label className="block">
                Nơi cấp <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Nhập nơi cấp"
                {...register('issuedBy', { required: true })}
              />
              {errors.issuedBy?.type === 'required' && <span className="text-rose-600">Không được bỏ trống</span>}
            </div>
            <div className="mt-4">
              <label className="block">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Nhập số điện thoại"
                {...register('phoneNumber', { required: true })}
              />
              {errors.phoneNumber?.type === 'required' && <span className="text-rose-600">Không được bỏ trống</span>}
            </div>
            <div className="mt-4">
              <label className="block">
                Địa chỉ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Nhập địa chỉ"
                {...register('address', { required: true })}
              />
              {errors.address?.type === 'required' && <span className="text-rose-600">Không được bỏ trống</span>}
            </div>
            <div className="flex mt-[20px]">
              <button
                type="submit"
                className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-600"
              >
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountInformation;
