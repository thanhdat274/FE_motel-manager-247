import { useUserContext } from '@/context/UserContext';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useReactToPrint } from 'react-to-print';
type Props = {};
export type IMember = {
  id: number;
  full_name: string;
  cccd: string;
  role: string;
  phone: string;
  address: string;
};
const TenantContract = (props: Props) => {
  const router = useRouter();
  const [house, setHouse] = useState([]);
  const [houses, setHouses] = useState([]);

  const { setLoading } = useUserContext();
  const param = router.query;
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  // console.log(param);

  useEffect(() => {
    const getHome = async () => {
      try {
        const res = await axios.get(
          `https://633505ceea0de5318a0bacba.mockapi.io/api/house/${param.id}/room/` + `${param.id_room}`,
        );
        if (res.data) {
          setHouse(res.data as any);
          console.log('data', res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getHome();
  }, []);
  useEffect(() => {
    const getHouse = async () => {
      try {
        const res = await axios.get(`https://633505ceea0de5318a0bacba.mockapi.io/api/house/` + `${param.id}`);
        if (res.data) {
          setHouses(res.data as any);
          console.log('data', res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getHouse();
  }, []);
  return (
    <div>
      <button onClick={handlePrint}>Dowload hợp đồng</button>
      <div className="">
        <div ref={componentRef} className="w-10/12 m-auto  ">
          <div className="text-center">
            <h1 className="font-bold">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h1>
            <p className="font-bold">Độc Lập - Tự Do - Hạnh Phúc</p>
            <p>- - - o0o - - -</p>
            <h1 className="font-bold pt-5">
              HỢP ĐỒNG <br /> CHO THUÊ PHÒNG TRỌ
            </h1>
          </div>
          <div className="text-xs italic leading-5">
            <p>- Căn cứ Bộ luật Dân sự số 91/2015/QH13 ngày 24/11/2015 và các văn bản hướng dẫn thi hành;</p>
            <p>- Căn cứ Luật Nhà ở, Luật Đất đai và các văn bản hướng dẫn thi hành;</p>
            <p>- Căn cứ nhu cầu thuê phòng trọ của Ông (Bà) abc abc;</p>
            <p>- Căn cứ vào năng lực và nhu cầu của các bên chủ thể giao kết hợp đồng. </p>
          </div>
          <div>
            <p className="text-xs  pt-5  leading-5">
              Hôm nay, ngày …… tháng …… năm ………., tại địa chỉ ……………………………...............................................{' '}
              <br />
              Chúng tôi gồm có:
            </p>
          </div>
          <div className="pt-5  ">
            <h1 className="font-bold text-sm  leading-5">BÊN CHO THUÊ: </h1>
            <p className="text-xs  leading-5">
              <strong>Ông/bà: </strong> Năm Sinh:
            </p>
            <p className="text-xs  leading-5">CMND số: , Ngày cấp: ……....…………. Nơi cấp: ………………..……</p>
            <p className="text-xs  leading-5">Địa chỉ: </p>
            <p className="text-xs  leading-5">Điện thoại: </p>
            <p className="text-xs italic  leading-5">(Sau đây được gọi tắt là Bên a)</p>
          </div>
          <div>
            <h1 className="font-bold text-sm  leading-5">BÊN THUÊ: </h1>
            <p className="text-xs  leading-5">
              <strong>Ông/bà:</strong> Năm Sinh:
            </p>
            <p className="text-xs  leading-5">CMND số: , Ngày cấp: ……....…………. Nơi cấp: ………………..……</p>
            <p className="text-xs  leading-5">Địa chỉ: </p>
            <p className="text-xs  leading-5">Điện thoại: </p>
            <p className="text-xs italic  leading-5">(Sau đây được gọi tắt là Bên B)</p>
          </div>
          <div className="text-xs  leading-5">
            <strong className="italic  leading-5">
              Sau khi cùng bàn bạc và thoả thuận trên tinh thần hợp tác, thiện chí và bình đẳng, Hai Bên nhất trí ký kết
              Hợp đồng cho thuê phòng trọ (gọi tắt là Hợp đồng) với các điều khoản sau đây:
            </strong>
            <p className="font-bold text-base  leading-5">Điều I: Đối tượng của Hợp đồng</p>
            <p>
              Hợp đồng này là sự thoả thuận giữa Bên A và Bên B, theo đó Bên A cho Bên B thuê phòng trọ thuộc quyền quản
              lý, sử dụng hợp pháp của mình, còn Bên B trả tiền thuê cho Bên A theo giá trị, phương thức thỏa thuận
              trong hợp đồng. Cụ thể như sau :
            </p>
          </div>
          <div className="text-xs  leading-5">
            <h2 className="font-bold text-sm  leading-5">1. Phòng trọ cho thuê</h2>
            <p>Phòng trọ cho thuê có các đặc điểm như sau:</p>
            <p>Phòng số: . Tổng diện tích sử dụng: 29 m2</p>
            <p>Địa chỉ: </p>
            <p>
              Bên A đảm bảo rằng phòng trọ nói trên thuộc quyền quản lý và sử dụng hợp pháp của mình, toàn bộ phòng trọ
              cho thuê không có tranh chấp, khiếu kiện về quyền sở hữu và quyền sử dụng; Không bị ràng buộc dưới bất kỳ
              hình thức nào bởi các việc: mua, bán, trao đổi, tặng, cho, cho thuê, cho mượn, bị kê biên bởi cơ quan có
              thẩm quyền.
            </p>
            <p className="font-bold text-sm  leading-5">2. Mục đích thuê phòng trọ:</p>
            <p>
              Bên B thuê, đưa vào sử dụng phòng trọ tại địa chỉ: để ở theo nhu cầu của Bên B và theo đúng quy định của
              pháp luật.
            </p>
            <h1 className="font-bold text-base  leading-5">
              Điều II: Thời hạn cho thuê, giá cho thuê và điều kiện thanh toán
            </h1>
            <p className="font-bold text-sm  leading-5">1. Thời hạn cho thuê:</p>
            <p>Từ ngày 5 tháng 9 năm 2022 đến hết ngày 4 tháng 3 năm 2023</p>
            <p className="font-bold text-sm  leading-5">2. Giá cho thuê: đồng/01/tháng.</p>
            <p className="font-bold text-sm  leading-5">3. Điều kiện thanh toán:</p>
            <p>- Đồng tiền thanh toán: tiền VNĐ</p>
            <p>- Phương thức thanh toán: chuyển khoản hoặc tiền mặt.</p>
            <p>
              - Kỳ thanh toán: trả 1 tháng/lần, lần đầu trả ngay sau khi ký Hợp đồng. Nộp tiền thanh toán sử dụng phòng
              của tháng sau vào thời điểm không quá ngày …. của tháng trước liền kề.
            </p>
            <h1 className="font-bold text-base  leading-5">Điều III: Quyền và nghĩa vụ của Bên A</h1>
            <p>
              <strong className="font-bold text-sm  leading-5">1. Bên A có các quyền sau đây:</strong>
            </p>
            <p>- Nhận tiền cho thuê phòng trọ theo đúng kỳ hạn đã thỏa thuận với Bên B;</p>
            <p>
              - Cùng Bên B thỏa thuận sửa đổi, bổ sung các điều khoản trong Hợp đồng hoặc lập Phụ lục Hợp đồng cho phù
              hợp với điều kiện của thực tế và nhu cầu của Các Bên. Việc thỏa thuận sửa đổi, bổ sung các điều khoản
              trong Hợp đồng hoặc lập Phụ lục Hợp đồng phải được lập thành văn bản có chữ ký xác nhận hợp lệ của Hai Bên
              mới có giá trị thực hiện;
            </p>
            <p>- Được nhận lại phòng trọ cho thuê khi hết hạn Hợp đồng;</p>
            <p>
              - Đơn phương chấm dứt Hợp đồng với Bên B, di chuyển tài sản của Bên B ra ngoài và khóa cửa phòng trọ,
              không hoàn lại tiền cho thuê phòng trọ đã nhận, phạt vi phạm Hợp đồng và yêu cầu bồi thường thiệt hại khi
              Bên B có một trong các hành vi sau đây:
            </p>
            <p className="italic">+ Không thanh toán đủ tiền thuê phòng trọ cho Bên A đúng thời hạn;</p>
            <p className="italic">
              + Không sửa chữa hoặc thay thế thiết bị của Bên A bị hư hỏng trong quá trình sử dụng;
            </p>
            <p className="italic">+ Sử dụng phòng trọ không đúng mục đích đã thuê tại Điều I của Hợp đồng;</p>
            <p className="italic">
              + Vi phạm pháp luật, gây mất an ninh trật tự công cộng, gây cháy, nổ, làm mất vệ sinh môi trường và ảnh
              hưởng nghiêm trọng đến hoạt động bình thường của khu vực xung quanh;
            </p>
            <p>
              <strong className="font-bold text-sm">2. Bên A có các nghĩa vụ sau đây:</strong>
            </p>
            <p>- Bàn giao phòng trọ cho Bên B đúng thời gian đã thoả thuận;</p>
            <p>- Cấp nguồn điện, nước riêng có công tơ đo đếm cho Bên B sử dụng;</p>
            <p>
              - Tạo điều kiện đảm bảo cho Bên B sử dụng phòng trọ đã thuê ổn định, trọn vẹn, độc lập trong thời hạn Bên
              B thuê;
            </p>
            <p className="font-bold text-base">Điều IV: Quyền và nghĩa vụ của Bên B</p>
            <p>
              <strong className="font-bold text-sm">1. Bên B có các quyền sau đây:</strong>
            </p>
            <p>- Nhận bàn giao phòng trọ thuê theo đúng thỏa thuận với Bên A;</p>
            <p>
              - Được bố trí, lắp đặt thêm các trang, thiết bị phù hợp với nhu cầu sử dụng tại phòng trọ nhưng không ảnh
              hưởng đến độ an toàn của kết cấu, kiến trúc, thiết kế chung của phòng. Chi phí mua sắm và lắp đặt các
              trang thiết bị trên Bên B tự đầu tư và phải tự tháo dỡ trả lại nguyên trạng phòng ban đầu cho Bên A khi
              trả phòng.
            </p>
            <p>
              - Cùng Bên B thỏa thuận sửa đổi, bổ sung các điều khoản trong Hợp đồng hoặc lập Phụ lục Hợp đồng cho phù
              hợp với điều kiện của thực tế và nhu cầu của Các Bên. Việc thỏa thuận sửa đổi, bổ sung các điều khoản
              trong Hợp đồng hoặc lập Phụ lục Hợp đồng phải được lập thành văn bản có chữ ký xác nhận hợp lệ của Các Bên
              mới có giá trị thực hiện;
            </p>
            <p>
              <strong className="font-bold text-sm">2. Bên B có các nghĩa vụ sau đây:</strong>
            </p>
            <p>- Sử dụng phòng trọ theo đúng mục đích để ở đã thỏa thuận với Bên A tại Hợp đồng;</p>
            <p>- Trả đủ và đúng kỳ hạn tiền thuê phòng trọ như đã thỏa thuận với Bên A ;</p>
            <p>
              - Trả tiền điện, nước, vệ sinh và các chi phí phát sinh khác (nếu có) trong thời gian thuê phòng căn cứ
              theo chỉ số thực tế sử dụng;
            </p>
            <p>
              - Bảo quản và giữ gìn cho Bên A các tài sản, trang thiết bị trong phòng trọ Bên A đã bàn giao, nếu hư hỏng
              Bên B phải sửa chữa hoặc thay thế (trừ trường hợp hư hỏng do hao mòn tự nhiên);
            </p>
            <p>
              - Chấp hành các quy định của Nhà nước, chính quyền địa phương và tự chịu trách nhiệm về bảo vệ an ninh
              trật tự, vệ sinh, an toàn về người và tài sản của mình, tự khai báo đăng ký tạm trú, tạm vắng theo quy
              định của pháp luật;
            </p>
            <p>- Bồi thường thiệt hại cho Bên A nếu để xảy ra cháy, nổ hoặc gây hư hỏng đối với tài sản của Bên A;</p>
            <p>- Bàn giao lại phòng trọ cho Bên A khi hết hạn hợp đồng thuê phòng trọ.</p>
            <p>
              - Khi Bên B đơn phương chấm dứt thực hiện Hợp đồng không đúng quy định của pháp luật hoặc không đúng thỏa
              thuận trong Hợp đồng này, Bên B phải có nghĩa vụ nộp phạt vi phạm cho Bên A số tiền là ………………….. đồng
              (………………….. đồng Việt Nam).
            </p>
            <p>
              <strong className="font-bold text-base"> Điều V: Điều khoản chung</strong>
            </p>
            <p>
              1. Hai Bên cam kết thực hiện đúng và đầy đủ các điều khoản đã ghi trong bản Hợp đồng, nếu Bên nào vi phạm
              phải chịu phạt vi phạm và phải bồi thường thiệt hại cho Bên kia hoặc Bên thứ ba (nếu có)tương ứng với mức
              độ lỗi vi phạm và thiệt hại thực tế xảy ra.
            </p>
            <p>
              2. Trong quá trình thực hiện Hợp đồng nếu phát sinh tranh chấp, Hai Bên sẽ cùng nhau thương lượng và hòa
              giải trên tinh thần thiện chí, hợp tác, tôn trọng lẫn nhau. Trong trường hợp không thương lượng được,
              tranh chấp sẽ được giải quyết bằng con đường Tòa án theo quy định của hệ thống pháp luật Việt Nam.
            </p>
          </div>
          <div className='text-xs mt-7 mb-[100px] font-bold '>
            <p className='text-right pr-[100px]'> Ngày.... Tháng.... Năm  </p>
            <div className='grid grid-cols-2 text-center pt-5'>
            <p> BÊN A</p>
            <p className=''>BÊN B</p>
            </div>
                  
          </div>
        </div>
      </div> 
    </div>
  );
};

export default TenantContract;
