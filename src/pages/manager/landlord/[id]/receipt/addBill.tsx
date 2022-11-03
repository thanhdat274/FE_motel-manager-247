import React, { useEffect, useState } from 'react';

import 'react-responsive-modal/styles.css';
import 'antd/dist/antd.css';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import moment from 'moment';
import { useUserContext } from '@/context/UserContext';
import { Toast } from 'src/hooks/toast';
import { CreateBill } from 'src/pages/api/bill';
import { listRoom } from 'src/pages/api/room';
import { useRouter } from 'next/router';
type FormInputs = {
  idRoom: string;
  month: number;
  year: number;
  name: string;
};

type Props = {}

const AddBill = (props: Props) => {
    const today = new Date();
    const [rooms, setRooms] = useState([]);   
    const { setLoading, cookies } = useUserContext();
    const userData = cookies?.user; 
    const [monthCheck, setMonth] = useState(today.getMonth() + 1);
    const [yearCheck, setYear] = useState(today.getFullYear());
   
  
    const router = useRouter();
    const { id } = router.query;
    const { register, handleSubmit, setValue, getValues, reset } = useForm<FormInputs>();
    useEffect(() => {
        const getRoom = async () => {
          try {
            const { data } = await listRoom(id, userData as any);
    
            if (data.data) {
              setRooms(data.data as any);
            }
          } catch (error) {
            console.log('error', error);
          }
        };
        getRoom();
      }, [userData, id]);
      const onSubmit: SubmitHandler<FormInputs> = async (data: any) => {
        if (monthCheck && yearCheck) {
          const newData = { ...data, month: monthCheck, year: yearCheck, userData: userData };
    
          setLoading(true);
          await CreateBill(newData)
            .then((data: any) => {
    
              setLoading(false);
            })
            .catch((error: any) => {
              setLoading(false);
            });
        } else {
          Toast('error', 'Vui lòng chọn tháng năm!');
        }
      };

    const datePickerShow = React.useMemo(() => {
        const onChange: DatePickerProps['onChange'] = (date, dateString) => {
          setMonth(parseInt(dateString.slice(5, 7)));
          setYear(parseInt(dateString.slice(0, 4)));
          reset();
        };
        return (
          <DatePicker
            style={{ width: '200px' }}
            onChange={onChange}
            defaultValue={moment(`${yearCheck}-${monthCheck}`, 'YYYY-MM')}
            picker="month"
          />
        );
      }, [monthCheck, reset, yearCheck]);
  
  return (
    <div>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-5">
                <Space direction="vertical">{datePickerShow}</Space>
              </div>
              <div className="mt-5">
                <select
                  className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  {...register('idRoom', { required: true })}
                >
                  {rooms?.map((room: any, index: number) => {
                    return (
                      <option value={room._id} key={index}>
                        {room.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex items-center mt-5">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Tính tiền
                </button>
              </div>
            </form>
    </div>
  )
}

export default AddBill