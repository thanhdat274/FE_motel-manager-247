import React from 'react'
type Props = {
  data: any
}
const DetailDeposit = ({ data }: Props) => {
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
                      Số tiền cọc
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-9 py-4 whitespace text-sm text-gray-500">
                      <div className="text-center">{data?.payment?.deposit?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</div>
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

export default DetailDeposit