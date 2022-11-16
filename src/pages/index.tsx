import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMessage, faLocationDot, faEnvelope, faLink, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
type Props = {};

const Introduce = (props: Props) => {
  const router = useRouter();

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
                Đăng ký khách thuê; nhập chỉ số điện, nước, dịch vụ; tính tiền phòng <br />
                In được khổ 80, A5, A4 <br />
                Sử dụng được trên tất cả các thiết bị khác nhau như laptop, PC, tablet, mobile <br />
                Sử dụng được trên các hệ điều hành khác nhau như Window, linux, iOS, Android <br />
                Đăng ký tài khoản, tạo nhà, phòng, tính tiền dịch vụ trong vòng 1 phút.
              </p>
              <div className="text-rose-500">
                Phần mềm không cần phải cài đặt, bạn click vào{' '}
                <Link href="/">
                  <a className="text-emerald-600">ĐĂNG KÝ</a>
                </Link>{' '}
                để tạo tài khoản và sử dụng.
              </div>
              <div className="mt-10">
                <Link href="/auth/signup">
                  <a className="text-emerald-600 border border-black py-1 px-3 text-xl font-bold bg-slate-200 rounded">
                    ĐĂNG KÝ DÙNG THỬ
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-10 bg-white lg:mx-10 mx-5 p-5">
            <h2 className="text-2xl font-bold">CHỨC NĂNG</h2>
            <div className="text-center">
              <h2 className="font-bold text-xl pb-3">Màn hình làm việc chính</h2>
              <div className="lg:h-[431px] sm:h-[330px] h-[200px] relative">
                <Image src="/images/project-featured.png" alt="logo" layout="fill" />
              </div>
            </div>
            <p className="pt-3 pb-10">
              Tại màn hình chính bạn có thể xem nhanh được tình trạng các phòng. Đăng ký khách thuê mới, xem lại thông
              tin khách thuê, thực hiện thao tác trả phòng.
            </p>
            <hr />

            <div className="md:grid md:grid-cols-3 pt-10">
              <div className="pr-5">
                <div className=" md:h-[100px] sm:h-[200px] h-[100px] relative">
                  <Image src="/images/project-4.png" alt="logo" layout="fill" priority />
                </div>
              </div>
              <div className="col-span-2">
                <h2 className="font-bold text-xl"> Đăng ký khách mới</h2>
                <p>
                  Khách thuê mới, bạn chỉ cần nhập vài thông tin cơ bản như họ tên, điện thoại, địa chỉ,..., nhập đơn
                  giá phòng, chọn dịch vụ sử dụng, thế là xong. Hoặc nếu cần quản lý chi tiết, bạn có thể nhập đầy đủ
                  thông tin các thành viên thuê trong phòng để tiện kiểm tra về sau.
                </p>
              </div>
            </div>
            <div className="md:grid md:grid-cols-3 pt-10">
              <div className="pr-5">
                <div className=" md:h-[100px] sm:h-[200px] h-[100px] relative">
                  <Image src="/images/project-4.png" alt="logo" layout="fill" priority />
                </div>
              </div>
              <div className="col-span-2">
                <h2 className="font-bold text-xl"> Đăng ký khách mới</h2>
                <p>
                  Khách thuê mới, bạn chỉ cần nhập vài thông tin cơ bản như họ tên, điện thoại, địa chỉ,..., nhập đơn
                  giá phòng, chọn dịch vụ sử dụng, thế là xong. Hoặc nếu cần quản lý chi tiết, bạn có thể nhập đầy đủ
                  thông tin các thành viên thuê trong phòng để tiện kiểm tra về sau.
                </p>
              </div>
            </div>
            <div className="md:grid md:grid-cols-3 pt-10">
              <div className="pr-5">
                <div className=" md:h-[100px] sm:h-[200px] h-[100px] relative">
                  <Image src="/images/project-4.png" alt="logo" layout="fill" priority />
                </div>
              </div>
              <div className="col-span-2">
                <h2 className="font-bold text-xl"> Đăng ký khách mới</h2>
                <p>
                  Khách thuê mới, bạn chỉ cần nhập vài thông tin cơ bản như họ tên, điện thoại, địa chỉ,..., nhập đơn
                  giá phòng, chọn dịch vụ sử dụng, thế là xong. Hoặc nếu cần quản lý chi tiết, bạn có thể nhập đầy đủ
                  thông tin các thành viên thuê trong phòng để tiện kiểm tra về sau.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-10 bg-white lg:mx-10 mx-5 p-5">
            <h2 className="text-xl font-bold">ĐƠN GIÁ</h2>
            <div>
              <div className="Lg:h-[431px] sm:h-[330px] h-[120px] relative text-center">
                <Image src="/images/banggia.png" alt="logo" layout="fill" priority />
              </div>
              <div>
                <h2 className="text-xl font-bold text-rose-500">
                  Chúng tôi cam kết giá phần mềm thấp nhất trên thị trường.
                </h2>
                <p className="font-bold">Lưu ý :</p>
                <p>
                  <span className="text-rose-600">Thanh toán tối thiểu 12 tháng/ 1 lần.</span> <br />
                  <span className="text-blue-600">
                    Thanh toán từ 2 năm trở lên được giảm 10% cho năm tiếp theo
                  </span>{' '}
                  <br />
                  Sử dụng vĩnh viễn: Thanh toán 1 lần 5 năm sẽ được sử dụng phần mềm vĩnh viễn (không tính giảm 10% cho
                  mỗi năm) <br />
                  Trong quá trình sử dụng, nếu quý khách có nhu cầu nâng cấp gói, bên công ty chỉ thu thêm tiền chênh
                  lệch giữa 2 gói tính từ ngày nâng cấp đến cuối kỳ thanh toán của gói cũ. <br />
                  <span className="text-blue-600">
                    Đơn giá trên không bao gồm hướng dẫn và hỗ trợ sử dụng phần mềm trực tiếp tại khách hàng, chúng tôi
                    chỉ hỗ trợ sử dụng trực tuyến qua điện thoại, zalo, skype, ... Nếu quý khách có nhu cầu hỗ trợ, tư
                    vấn trực tiếp chúng tôi sẽ báo chi phí riêng.
                  </span>{' '}
                  <br />
                  Chính sách ưu đãi/ hoa hồng giới thiệu: Miễn phí 2 tháng sử dụng phần mềm hoặc được hưởng hoa hồng 2
                  tháng khi tiếp thị liên kết (Khách hàng A đang sử dụng phần mềm giới thiệu khách hàng B) Tích hợp gửi
                  tin nhắn SMS: Mua gói tin tối thiểu 3,000,000 VND. Mỗi tin nhắn gửi đi có đơn giá là 660 đồng (áp dụng
                  cho tất cả nhà mạng) được trừ dần vào gói tin cho đến khi hết số tiền đã nạp.
                </p>
                <p className="pt-5">
                  <span className="font-bold"> Thông tin thanh toán</span> <br />
                  Số tài khoản: 0071002267995 <br />
                  Chủ tài khoản: Trà Ngọc Anh Thi <br />
                  Mở tại ngân hàng VietCombank Chi nhánh Thành phồ Hồ Chí Minh <br />
                </p>
              </div>
            </div>
          </div>
          <div className="mt-10 bg-white lg:mx-10 mx-5 p-5 ">
            <h2 className="font-bold text-2xl">BẢO HÀNH VÀ NÂNG CẤP</h2>
            <div className="mt-5">
              <h2 className="font-bold">BẢO HÀNH</h2>
              <p>Phần mềm được bảo hành toàn bộ chức năng trọn đời.</p>
            </div>
            <div className="mt-5">
              <h2 className="font-bold">NÂNG CẤP</h2>
              <p>
                Chúng tôi luôn cố gắng phát triển các tính năng mới đáp ứng nhu cầu đa dạng của khách hàng, mọi nâng cấp
                chung chúng tôi sẽ cung cấp miễn phí đến khách hàng trong quá trình sử dụng.
              </p>
              <p className="pt-3">
                Trong quá trình sử dụng, nếu có bất kỳ đóng góp hoặc yêu cầu bổ sung tính năng, vui lòng gửi email đến
                info@maple.com.vn, chúng tôi sẽ xem xét và giải quyết.
              </p>
            </div>
          </div>
          <div className="mt-10 bg-white lg:mx-10 mx-5 p-5">
            <h2 className="font-bold text-2xl">QUY TRÌNH MUA PHẦN MỀM</h2>

            <p className="pt-5">
              1. Đăng ký tài khoản sử dụng miễn phí. Với tài khoản miễn phí, bạn được dùng vĩnh viễn, đầy đủ tính năng
              nhưng chỉ tạo được tối đa 5 phòng. Bạn sử dụng để xem xét chức năng phù hợp nhu cầu của bạn chưa ? Nếu
              chưa có thể góp ý cho chúng tôi qua email.
            </p>
            <p className="pt-3">
              2. Nếu bước một đã hoàn tất và bạn có nhu cầu mua sử dụng, vui lòng chuyển khoản phí tương ứng với gói phù
              hợp vào tài khoản nêu trên trong nội dung thanh toán ghi lại email đăng ký tài khoản.
            </p>
            <p className="pt-3">
              3. Sau khi nhận được thanh toán, chúng tôi sẽ nâng cấp gói tài khoản theo email đã cung cấp.
            </p>
            <p className="pt-3">4. Bàn giao và đưa vào sử dụng, áp dụng chế độ hỗ trợ xuyên suốt quá trình sử dụng.</p>
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
            <p className="pt-3">- Gửi tin nhắn sms, email, in hóa đơn khổ A4/A5/ Bill khổ 80mm</p>
            <p className="pt-3">- Quản lý nhân viên, phân quyền chức năng, dữ liệu theo từng khu vực</p>
            <p className="pt-3">- Quản lý công việc hàng ngày</p>
            <p className="pt-3">
              - Báo cáo doanh thu tổng; Doanh thu theo dịch vụ; Danh sách khách thuê; Báo cáo lời lỗ; Khách nợ tiền
              phòng; Hợp đồng sắp hết hạn; Danh sách khách thuê đặt cọc
            </p>
          </div>
        </div>

        <div>
          <div>
            <div className="bg-white lg:mr-10  mx-5 p-5 lg:ml-0 mt-10 lg:mt-0">
              <h2 className="text-2xl font-bold">Phòng trọ 24/7 và những con số</h2>
              <h2 className="text-2xl font-bold pt-6 pb-5">1,170+ chủ trọ đăng ký</h2>
              <h2 className="text-2xl font-bold">9,175+ phòng trọ</h2>
              <h2 className="text-2xl font-bold pt-6 pb-5">47+ tỉnh thành/ phố</h2>
            </div>
          </div>
          <div className="mt-10">
            <div className="bg-white lg:mr-10 mx-5 p-5 lg:ml-0 mt-10 lg:mt-0">
              <h2 className="text-2xl font-bold">LIÊN HỆ</h2>
              <div className="text-gray-500">
                <div className="flex pt-5">
                  <FontAwesomeIcon className="w-5" icon={faPhone}></FontAwesomeIcon>

                  <span className="pl-3">0963209332</span>
                </div>
                <div className="flex pt-5">
                  <FontAwesomeIcon className="w-5" icon={faMessage}></FontAwesomeIcon>
                  <span className="pl-3">0915 85 0918</span>
                </div>
                <div className="flex pt-5">
                  <FontAwesomeIcon className="w-5" icon={faLocationDot}></FontAwesomeIcon>
                  <span className="pl-3">Tòa nhà SBI, Trịnh Văn Bô, P. Nam Từ Niêm,Hà Nội</span>
                </div>
                <div className="flex pt-5">
                  <FontAwesomeIcon className="w-5" icon={faEnvelope}></FontAwesomeIcon>
                  <span className="pl-3">info@maple.com.vn</span>
                </div>
                <div className="flex pt-5">
                  <FontAwesomeIcon className="w-5" icon={faLink}></FontAwesomeIcon>
                  <Link href="/">
                    <a className="pl-3 text-green-500">http/www.nhatro247.com.vn</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <div className="bg-white lg:mr-10  mx-5 p-5 lg:ml-0 mt-10 lg:mt-0">
              <h2 className="text-2xl font-bold ">KHÁCH HÀNG</h2>
              <p className="pt-5">CCMN 958/3 ÂU CƠ - Tân Bình, TP.HCM: 123 phòng</p>
              <p className="pt-5">Chị Hiền - Khu nhà trọ Phú Hòa, Bình Dương: 24 phòng</p>
              <p className="pt-5">Chú 6 - Khu nhà trọ Trung Mỹ Tây, Quận 12: 18 phòng</p>
              <p className="pt-5">Chú Mậu - Khu nhà trọ Gò Vấp - TP.HCM: 20 phòng</p>
            </div>
          </div>
          <div className="mt-10">
            <div className="bg-white lg:mr-10  mx-5 p-5 lg:ml-0 mt-10 lg:mt-0">
              <h2 className="text-2xl font-bold ">ĐÁNH GIÁ</h2>
              <p className="pt-5 border-l-4 border-green-300 pl-2 flex">
                <FontAwesomeIcon className="w-5 pr-2 text-green-300" icon={faQuoteLeft}></FontAwesomeIcon>
                <span>Phần mềm thật đơn giản, ít thao tác, tôi đã sử dụng phần mềm cho 3 khu nhà trọ của mình</span>
              </p>
              <p className="pt-5">Chị Hiền - Khu nhà trọ Phú Hòa, Bình Dương: 24 phòng</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduce;
