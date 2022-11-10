import { useUserContext } from '@/context/UserContext';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useReactToPrint } from 'react-to-print';
import { updateRoom } from 'src/pages/api/room';
import storage from '@/util/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Toast } from 'src/hooks/toast';
import { Image } from 'antd';
import 'antd/dist/antd.css';

export type IContractData = {
  addressCT: string;
  timeCT: string;
  startTime: string;
  endTime: string;
  additional: any;
  fine: number;
  timeContract: string;
  infoTenant: Info;
  infoLandlord: Info;
  imageContract: string;
};

type Info = {
  name: String;
  cardNumber: String;
  dateRange: String;
  phoneNumber: String;
  issuedBy: String;
};

type Props = {
  dataContract: IContractData;
  leadMember: any;
  dataLandlord: any;
  roomArea: number;
  roomPrice: number;
};

const TenantContract = ({ dataContract, leadMember, roomPrice, dataLandlord, roomArea }: Props) => {
  const router = useRouter();
  const { setLoading, cookies } = useUserContext();
  const param = router.query;
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [contractData, setContractData] = useState<IContractData>();
  const [file, setFile] = useState<any>();

  const userData = cookies?.user;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  useEffect(() => {
    if (dataContract) {
      setContractData(dataContract);
    }
  }, [dataContract]);

  useEffect(() => {
    if (contractData) {
      const { infoTenant, infoLandlord } = contractData;

      setValue('addressCT', contractData.addressCT);
      setValue('timeCT', contractData.timeCT);
      setValue('startTime', contractData.startTime);
      setValue('endTime', contractData.endTime);
      setValue('additional', contractData.additional.join('\n'));
      setValue('timeContract', contractData.timeContract);
      setValue('fine', contractData.fine);

      //tenant
      setValue('TNname', infoTenant?.name ? infoTenant?.name : leadMember?.memberName);
      setValue('TNcardNumber', infoTenant?.cardNumber ? infoTenant?.cardNumber : leadMember?.cardNumber);
      setValue('TNphoneNumber', infoTenant?.phoneNumber ? infoTenant?.phoneNumber : leadMember?.phoneNumber);
      setValue('TNdateRange', infoTenant?.dateRange);
      setValue('TNIssuedBy', infoTenant?.issuedBy);

      //lanlord
      setValue('LLname', infoLandlord?.name ? infoLandlord?.name : dataLandlord?.name);
      setValue('LLcardNumber', infoLandlord?.cardNumber ? infoLandlord?.cardNumber : dataLandlord?.cardNumber);
      setValue('LLphoneNumber', infoLandlord?.phoneNumber ? infoLandlord?.phoneNumber : dataLandlord?.phoneNumber);
      setValue('LLdateRange', infoLandlord?.dateRange ? infoLandlord?.dateRange : dataLandlord?.dateRange);
      setValue('LLIssuedBy', infoLandlord?.issuedBy ? infoLandlord?.issuedBy : dataLandlord?.issuedBy);
    }
  }, [contractData, leadMember]);

  const handleChange = (event: any) => {
    setFile(event.target.files[0] as any);
  };

  const onSubmit = async (data: any) => {
    const newAdditional = data.additional.split('\n');
    if (!file) {
      Toast('error', 'Chưa thêm hợp đồng');
    } else {
      const storageRef = ref(storage, `/files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          setLoading(true);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            // console.log(url);
            Toast('success', 'Thêm ảnh hợp đồng thành công');
            setLoading(false);
            setFile('');
            const newValue = {
              contract: {
                startTime: data.startTime,
                endTime: data.endTime,
                additional: newAdditional,
                timeContract: data.timeContract,
                fine: data.fine,
                timeCT: data.timeCT,
                addressCT: data.addressCT,
                imageContract: url,
                infoTenant: {
                  name: data.TNname,
                  cardNumber: data.TNcardNumber,
                  phoneNumber: data.TNphoneNumber,
                  issuedBy: data.TNIssuedBy,
                  dateRange: data.TNdateRange,
                },
                infoLandlord: {
                  name: data.LLname,
                  cardNumber: data.LLcardNumber,
                  phoneNumber: data.LLphoneNumber,
                  issuedBy: data.LLIssuedBy,
                  dateRange: data.LLdateRange,
                },
              }, idRoom: param?.id_room, token: userData?.token
            };
            setLoading(true);
            updateRoom(newValue)
              .then((result) => {
                setLoading(false);
                Toast('success', 'Thêm hợp đồng thành công');
              })
              .catch((err) => {
                setLoading(false);
              });
          });
        },
      );
    }
  };

  return (
    <div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-5">Hình ảnh hợp đồng</label>
        {contractData?.imageContract && <Image style={{ width: '200px' }} src={contractData?.imageContract} />}
        <div className="mt-5 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md bg-white">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="text-sm text-gray-600 py-3">
              <label className="relative cursor-pointer  rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                <input type="file" accept="Image" id="imageFile" onChange={handleChange} />
              </label>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>

      <div className="border p-5 ">
        <p className="mb-5">Các thông tin nhập ở đây sẽ được sử dụng cho việc xuất/ in hợp đồng thuê phòng</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="md:grid grid-cols-2 md:gap-10 sm:gap-6 gap-4">
            <div className="md:grid grid-cols-4 mb-4">
              <p className="">Nơi kí hợp đồng</p>
              <input
                type="string"
                className="p-2 max-h-10 w-full md:col-span-3"
                {...register('addressCT', { maxLength: 80 })}
              />
            </div>
            <div className="md:grid grid-cols-4 mb-4">
              <p className="">Thời gian kí HĐ</p>
              <input
                type="date"
                className="p-2 max-h-10 w-full  md:col-span-3"
                {...register('timeCT', { required: true, maxLength: 80 })}
              />
            </div>
          </div>

          <div className="md:grid grid-cols-2 md:gap-10 sm:gap-6 gap-4 mb-6">
            <div className="md:grid grid-cols-4 ">
              <p className="">Thời gian HĐ</p>
              <input
                type="string"
                placeholder="3 tháng"
                className="p-2 max-h-10 w-full md:col-span-3"
                {...register('timeContract', { required: true, maxLength: 80 })}
              />
            </div>
          </div>

          <div className="md:grid grid-cols-2 md:gap-10 sm:gap-6 gap-4 mb-6">
            <div className="md:grid grid-cols-4 mb-4">
              <p className="">Ngày bắt đầu HĐ</p>
              <input
                type="date"
                className="p-2 max-h-10 w-full  md:col-span-3"
                {...register('startTime', { required: true, maxLength: 80 })}
              />
            </div>
            <div className="md:grid grid-cols-4 mb-4">
              <p className="">Ngày kết thúc HĐ</p>

              <input
                type="date"
                className="p-2 max-h-10 w-full  md:col-span-3"
                {...register('endTime', { required: true, maxLength: 80 })}
              />
            </div>
          </div>

          <div className="md:grid grid-cols-2 md:gap-10 sm:gap-6 gap-4 ">
            <div className="md:grid grid-cols-4 mb-4">
              <p className="">Họ và tên chủ trọ</p>
              <input
                type="string"
                placeholder="Nguyễn Văn A"
                className="p-2 max-h-10 w-full md:col-span-3"
                {...register('LLname', { required: true, maxLength: 80 })}
              />
            </div>

            <div className="md:grid grid-cols-4 mb-4">
              <p className="">Số CMND/CCCD</p>
              <input
                type="string"
                className="p-2 max-h-10 w-full md:col-span-3"
                {...register('LLcardNumber', { required: true, maxLength: 80 })}
              />
            </div>
          </div>

          <div className="md:grid grid-cols-2 md:gap-10 sm:gap-6 gap-4">
            <div className="md:grid grid-cols-4 mb-4">
              <p className="">Ngày cấp</p>
              <input
                type="date"
                className="p-2 max-h-10 w-full md:col-span-3"
                {...register('LLdateRange', { required: true, maxLength: 80 })}
              />
            </div>

            <div className="md:grid grid-cols-4 mb-4">
              <p className="">Nơi cấp </p>
              <input
                className="p-2 max-h-10 w-full md:col-span-3"
                {...register('LLIssuedBy', { required: true, maxLength: 80 })}
              />
            </div>
          </div>

          <div className="md:grid grid-cols-2 md:gap-10 sm:gap-6 gap-4 md:pb-10 pb-8">
            <div className="md:grid grid-cols-4 mb-4">
              <p className="">Số điện thoại liên lạc</p>
              <input
                type="string"
                className="p-2 max-h-10 w-full md:col-span-3"
                {...register('LLphoneNumber', { required: true, maxLength: 80 })}
              />
            </div>
          </div>

          <div className="md:grid grid-cols-2 md:gap-10 sm:gap-6 gap-4">
            <div className="md:grid grid-cols-4 mb-4">
              <p className="">Người đại diện</p>
              <input
                type="string"
                placeholder="Nguyễn Văn A"
                className="p-2 max-h-10 w-full md:col-span-3"
                {...register('TNname', { required: true, maxLength: 80 })}
              />
            </div>

            <div className="md:grid grid-cols-4 mb-4">
              <p className="">Số CMND/CCCD</p>
              <input
                type="string"
                className="p-2 max-h-10 w-full md:col-span-3"
                {...register('TNcardNumber', { required: true, maxLength: 80 })}
              />
            </div>
          </div>

          <div className="md:grid grid-cols-2 md:gap-10 sm:gap-6 gap-4">
            <div className="md:grid grid-cols-4 mb-4">
              <p className="">Ngày cấp</p>
              <input
                type="date"
                className="p-2 max-h-10 w-full md:col-span-3"
                {...register('TNdateRange', { required: true, maxLength: 80 })}
              />
            </div>

            <div className="md:grid grid-cols-4 mb-4">
              <p className="">Nơi cấp </p>
              <input
                className="p-2 max-h-10 w-full md:col-span-3"
                {...register('TNIssuedBy', { required: true, maxLength: 80 })}
              />
            </div>
          </div>

          <div className="md:grid grid-cols-2 md:gap-10 sm:gap-6 gap-4">
            <div className="md:grid grid-cols-4 mb-4">
              <p className="">Số điện thoại liên lạc</p>
              <input
                type="string"
                className="p-2 max-h-10 w-full md:col-span-3"
                {...register('TNphoneNumber', { required: true, maxLength: 80 })}
              />
            </div>
          </div>
          <div className="md:grid grid-cols-2 md:gap-10 sm:gap-6 gap-4">
            <div className="mb-4">
              <div className="md:grid grid-cols-4 mb-4">
                <p className="">Tiền phạt</p>
                <input
                  type="string"
                  className="p-2 max-h-10 w-full  md:col-span-3"
                  {...register('fine', { required: true, maxLength: 80 })}
                />
              </div>
            </div>
            <div className=""></div>
          </div>
          <div className="md:grid grid-cols-8 mb-4">
            <p className="">Quy định bổ sung</p>
            <textarea id="" className="p-2 w-full md:col-span-7 " {...register('additional', { maxLength: 80 })} />
          </div>
          <button
            type="submit"
            className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-4"
          >
            Lưu
          </button>
        </form>
        <button
          onClick={handlePrint}
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-4"
        >
          In hợp đồng
        </button>
      </div>

      <div className=" hidden">
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
              Hôm nay, ngày {getValues('timeCT') ? getValues('timeCT').slice(8, 10) : '……'} tháng
              {getValues('timeCT') ? getValues('timeCT').slice(5, 7) : '……'} năm{' '}
              {getValues('timeCT') ? getValues('timeCT').slice(0, 4) : '……'}., tại địa chỉ :
              {getValues('addressCT')
                ? getValues('addressCT')
                : '……………………………...............................................'}
              <br />
              Chúng tôi gồm có:
            </p>
          </div>
          <div className="pt-5  ">
            <h1 className="font-bold text-sm  leading-5">BÊN CHO THUÊ: </h1>
            <p className="text-xs  leading-5">
              <strong>Ông/bà: {getValues('LLname') ? getValues('LLname') : '………………'} </strong> Năm Sinh:
            </p>
            <p className="text-xs  leading-5">
              CMND số: {getValues('LLcardNumber') ? getValues('LLcardNumber') : '………………'}, Ngày cấp:{' '}
              {getValues('LLdateRange') ? moment(getValues('LLdateRange')).format('DD/MM/YYYY') : '………………'}. Nơi cấp:{' '}
              {getValues('LLIssuedBy') ? getValues('LLIssuedBy') : '………………'}
            </p>
            <p className="text-xs  leading-5">Địa chỉ: </p>
            <p className="text-xs  leading-5">
              Điện thoại: {getValues('LLphoneNumber') ? getValues('LLphoneNumber') : '………………'}
            </p>
            <p className="text-xs italic  leading-5">(Sau đây được gọi tắt là Bên a)</p>
          </div>
          <div>
            <h1 className="font-bold text-sm  leading-5">BÊN THUÊ: </h1>
            <p className="text-xs  leading-5">
              <strong>Ông/bà: {getValues('TNname') ? getValues('TNname') : '………………'}</strong> Năm Sinh:
            </p>
            <p className="text-xs  leading-5">
              CMND số: {getValues('TNcardNumber') ? getValues('TNcardNumber') : '………………'}, Ngày cấp:{' '}
              {getValues('TNdateRange') ? moment(getValues('TNdateRange')).format('DD/MM/YYYY') : '………………'}. Nơi cấp:
              {getValues('TNIssuedBy') ? getValues('TNIssuedBy') : '………………'}
            </p>
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
            <p>Phòng số: . Tổng diện tích sử dụng: {roomArea} m2</p>
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
            <p>
              Từ ngày {getValues('startTime') ? getValues('startTime').slice(8, 10) : '……'} tháng Từ ngày{' '}
              {getValues('startTime') ? getValues('startTime').slice(5, 7) : '……'} năm Từ ngày{' '}
              {getValues('startTime') ? getValues('startTime').slice(0, 4) : '……'} đến hết ngày Từ ngày{' '}
              {getValues('endTime') ? getValues('endTime').slice(8, 10) : '……'} tháng{' '}
              {getValues('endTime') ? getValues('endTime').slice(5, 7) : '……'} năm{' '}
              {getValues('endTime') ? getValues('endTime').slice(0, 4) : '……'}
            </p>
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
              thuận trong Hợp đồng này, Bên B phải có nghĩa vụ nộp phạt vi phạm cho Bên A số tiền là{' '}
              {roomPrice ? roomPrice : '…………………'} đồng ({roomPrice ? roomPrice : '…………………'} đồng Việt Nam).
            </p>
            {getValues('additional')
              ? getValues('additional')
                .split('\n')
                .map((item: any) => <p key={item}>{item}</p>)
              : '…………………'}
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
          <div className="text-xs mt-16 mb-[100px] font-bold ">
            <p className="text-right pr-[100px]"> Ngày.... Tháng.... Năm </p>
            <div className="grid grid-cols-2 text-center pt-5">
              <div className="grid grid-cols-1">
                <p> BÊN A</p>
                <p className="pt-14">{getValues('LLname')}</p>
              </div>

              <div>
                <p className="">BÊN B</p>
                <p className="pt-14">{getValues('TNname')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantContract;
