import React, { useEffect, useState } from 'react';
import { getDetailBillServiceByMonthYear } from 'src/pages/api/statistical';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import { getDetailBillServiceByMonthYear } from 'src/pages/api/statistical';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';

type Props = {};

const ListElectricity = (props: Props) => {
  const today = new Date();

  const [monthCheck, setMonth] = useState(today.getMonth() + 1);
  const [yearCheck, setYear] = useState(today.getFullYear());
  const [listBillData, setListBillData] = useState<any>([]);

  var NameBuild = 'dien';

  const YearStatistical = new Date().getFullYear();
  const datePickerShow = React.useMemo(() => {
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
      setMonth(parseInt(dateString.slice(5, 7)));
      setYear(parseInt(dateString.slice(0, 4)));
    };
    return (
      <DatePicker
        style={{ width: '200px' }}
        onChange={onChange}
        defaultValue={moment(`${yearCheck}-${monthCheck}`, 'YYYY-MM')}
        picker="month"
      />
    );
  }, [monthCheck, yearCheck]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const codeRooms = JSON.parse(localStorage.getItem('code_room') as string);
      const getListBillData = async () => {
        const { data } = await getDetailBillServiceByMonthYear(codeRooms._id, NameBuild, monthCheck, yearCheck)
        setListBillData(data.data)
      };
      getListBillData();
    }
  }, [monthCheck, yearCheck]);


  return (
    <div className="h-screen">
      <header className="bg-white shadow">
        <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate uppercase">
                Số lượng điện tiêu thụ hàng tháng
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
        <div className="block p-2">
          <h3>Chọn tháng năm</h3>
          <Space direction="vertical">{datePickerShow}</Space>
        </div>
        <div className="max-w-full mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className='p-4'>
              </div>
              <div className="py-2 align-middle inline-block min-w-full ">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Tháng
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
                          Số điện tiêu thu
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-9 py-4 whitespace text-sm text-gray-500">
                          <div className="text-center">{monthCheck}</div>
                        </td>
                        <td className="px-6 py-4 whitespace">
                          <div className="text-center">{listBillData.inputValue} Kwh</div>
                        </td>

                        <td className="px-6 py-4 whitespace">
                          <div className="text-center">{listBillData.outputValue} Kwh</div>
                        </td>
                        <td className="px-6 py-4 whitespace text-yellow-500 font-bold">
                          <div className="text-center">{listBillData.outputValue - listBillData.inputValue} Kwh</div>
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
  );
};

export default ListElectricity;