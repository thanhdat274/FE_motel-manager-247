import React from 'react'

export type IContractData = {
  addressCT: string;
  timeCT: string;
  startTime: string;
  endTime: string;
  additional: any;
  fine: number;
  infoTenant: Info;
  infoLandlord: Info;
  imageContract: any;
};

type Info = {
  name: String;
  cardNumber: String;
  dateRange: String;
  phoneNumber: String;
  issuedBy: String;
  deposit: number
};

type Props = {
  data: any;
  dataContract: IContractData;
  handleResetPage: () => void
};
const LiquidationBill = ({ data, dataContract }: Props) => {
  const sumWithInitial =
    data &&
    data.reduce(
      (previousValue: number, currentValue: any) => previousValue + currentValue.amount,
      0,
    );
  return (
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
                      Loại hóa đơn
                    </th>
                    <th
                      scope="col"
                      className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Số tiền thanh toán
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data &&
                    data
                      .map((item: any, index: any) => {
                        return (
                          <tr key={index}>
                            <td className="px-9 py-4 whitespace text-sm text-gray-500">
                              <div className="text-center">{index + 1}</div>
                            </td>
                            <td className="px-6 py-4 whitespace">
                              <div className="text-center">{item.serviceName}</div>
                            </td>
                            <td className="px-6 py-4 whitespace">
                              <div className="text-center">{item.amount.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</div>
                            </td>
                          </tr>
                        )
                      })}
                  <tr>

                    <td className="px-6 py-4 whitespace">
                      <div className="text-center">Tổng tiền</div>
                    </td>
                    <td className="px-6 py-4 whitespace">

                    </td>
                    <td className="px-6 py-4 whitespace">
                      <div className="text-center">{sumWithInitial.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LiquidationBill