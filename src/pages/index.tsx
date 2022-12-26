import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMessage, faLocationDot, faEnvelope, faLink, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { getValueCountStatis } from './api/statistical';
type Props = {};

type IDataCount = {
  countRoom: Number,
  countHouse: Number,
  countUser: Number,
}

const Introduce = (props: Props) => {

  const [count, setCount] = useState<IDataCount>();

  useEffect(() => {
    const getValueCount = async () => {
      await getValueCountStatis().then((result) => {
        setCount(result.data.data)
      }).catch(() => {
        setCount({
          countRoom: 0,
          countHouse: 0,
          countUser: 0,
        })
      });
    };

    getValueCount()
  }, [])

  return (
    <div className="bg-slate-200 clear-both min-h-screen">
      <div className="lg:grid lg:grid-cols-3 py-10">
        <div className="grid col-span-2">
          <div className="bg-white lg:mx-10 mx-5 p-5">
            <div>
              <h1 className="text-xl font-bold">GIỚI THIỆU</h1>
              <p>
                Được ra đời dựa vào nhu cầu thực tế của các cá nhân, tổ chức cho thuê nhà, phòng trọ, chung cư mini. Ứng
                dụng quản lý phòng trọ được phát triển giúp cho người quản lý tính toán chính xác tiền phòng, dịch vụ,
                tiết kiệm thời gian ghi chép, thống kê. <br />
                Phần mềm quản lý được nhà trọ có nhiều nhà/ khu vực, nhiều phòng. Thiết lập linh động đơn giá dịch vụ,
                linh động về kỳ thu tiền. <br /> Phần mềm được phát triển trên nền tảng web, sử dụng online, có thể truy
                cập bất kỳ nơi nào có internet, không phụ thuộc thiết bị, hệ điều hành.
              </p>
              <p className="font-bold">Các tính năng cơ bản:</p>
              <p>
                Nhập chỉ số điện, nước, dịch vụ; tính tiền phòng <br />
                Sử dụng được trên tất cả các thiết bị khác nhau như laptop, PC, tablet, mobile <br />
                Sử dụng được trên các hệ điều hành khác nhau như Window, linux, iOS, Android <br />
              </p>
            </div>
          </div>
          <div className="mt-10 bg-white lg:mx-10 mx-5 p-5">
            <h2 className="font-bold text-2xl">CHI TIẾT CHỨC NĂNG</h2>

            <p className="pt-5">- Quản lý phòng, khu vực</p>
            <p className="pt-3">
              - Quản lý dịch vụ, đơn giá, số lượng sử dụng (ví dụ điện, nước, internet, vệ sinh, tiền gửi xe.. linh động
              bổ sung tùy từng khách hàng)
            </p>
            <p className="pt-3">
              - Thêm khách, sửa thông tin khách, trả phòng, quản lý thông tin hợp đồng, xuất, in hợp đồng, tùy chỉnh mẫu
              hợp đồng theo từng nhu cầu khác nhau; quản lý thành viên trong phòng
            </p>
            <p className="pt-3">- Nhập chỉ số điện/ nước mới theo từng phòng, tháng</p>
            <p className="pt-3">- Nhập các phát sinh tăng giảm khác (các ngoại lệ)</p>
            <p className="pt-3">- Tính tiền thuê phòng, tiền dịch vụ, theo từng khu vực, phòng, theo kỳ</p>
            <p className="pt-3">- Quản lý các khoản phí liên quan đến nhà trọ</p>
            <p className="pt-3">
              - Báo cáo doanh thu tổng; Danh sách khách thuê; Báo cáo lời lỗ; Hợp đồng sắp hết hạn; Danh sách khách thuê đặt cọc
            </p>
          </div>
        </div>

        <div>
          {/* <div>
            <div className="bg-white lg:mr-10  mx-5 p-5 lg:ml-0 mt-10 lg:mt-0">
              <h2 className="text-2xl font-bold">Phòng trọ 24/7 và những con số</h2>
              <h2 className="text-2xl font-bold pt-6 pb-5">
                <>
                  Hơn {count?.countUser} chủ trọ đăng ký
                </>
              </h2>
              <h2 className="text-2xl font-bold pb-5">
                <>
                  Hơn {count?.countHouse} nhà trọ
                </>
              </h2>
              <h2 className="text-2xl font-bold ">
                <>
                  Hơn {count?.countRoom} phòng trọ
                </>
              </h2>
            </div>
          </div> */}
          <div className="">
            <div className="bg-white lg:mr-10 mx-5 p-5 lg:ml-0 mt-10 lg:mt-0">
              <h2 className="text-2xl font-bold">LIÊN HỆ</h2>
              <div className="text-gray-500">
                <div className="flex pt-5">
                  <FontAwesomeIcon className="w-5" icon={faPhone}></FontAwesomeIcon>

                  <a href={`tel:0824144695`} className="pl-3">0824144695</a>
                </div>
                <div className="flex pt-5">
                  <FontAwesomeIcon className="w-5" icon={faMessage}></FontAwesomeIcon>
                  <a href={`tel:0824144695`} className="pl-3">0824144695</a>
                </div>
                <div className="flex pt-5">
                  <FontAwesomeIcon className="w-5" icon={faLocationDot}></FontAwesomeIcon>
                  <span className="pl-3">Số 1, ngách 23, ngõ 39 Phố Lụa, TDP Bạch Đằng, Vạn Phúc, Hà Đông, Hà Nội</span>
                </div>
                <div className="flex pt-5">
                  <FontAwesomeIcon className="w-5" icon={faEnvelope}></FontAwesomeIcon>
                  <a href="mailto:motel-manager-247@gmail.com" className="pl-3">motel-manager-247@gmail.com</a>
                </div>
                <div className="flex pt-5">
                  <FontAwesomeIcon className="w-5" icon={faLink}></FontAwesomeIcon>
                  <Link href="/">
                    <a href='https://motel-manager-247.vercel.app/' className="pl-3 text-green-500">https://motel-manager-247.vercel.app/</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="mt-10">
            <div className="bg-white lg:mr-10  mx-5 p-5 lg:ml-0 mt-10 lg:mt-0">
              <h2 className="text-2xl font-bold ">KHÁCH HÀNG</h2>
              <p className="pt-5">CCMN 958/3 ÂU CƠ - Tân Bình, TP.HCM: 123 phòng</p>
              <p className="pt-5">Chị Hiền - Khu nhà trọ Phú Hòa, Bình Dương: 24 phòng</p>
              <p className="pt-5">Chú 6 - Khu nhà trọ Trung Mỹ Tây, Quận 12: 18 phòng</p>
              <p className="pt-5">Chú Mậu - Khu nhà trọ Gò Vấp - TP.HCM: 20 phòng</p>
            </div>
          </div> */}
          {/* <div className="mt-10">
            <div className="bg-white lg:mr-10  mx-5 p-5 lg:ml-0 mt-10 lg:mt-0">
              <h2 className="text-2xl font-bold ">ĐÁNH GIÁ</h2>
              <p className="pt-5 border-l-4 border-green-300 pl-2 flex">
                <FontAwesomeIcon className="w-5 pr-2 text-green-300" icon={faQuoteLeft}></FontAwesomeIcon>
                <span>Phần mềm thật đơn giản, ít thao tác, tôi đã sử dụng phần mềm cho 3 khu nhà trọ của mình</span>
              </p>
              <p className="pt-5">Chị Hiền - Khu nhà trọ Phú Hòa, Bình Dương: 24 phòng</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Introduce;
