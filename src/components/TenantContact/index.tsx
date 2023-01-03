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
import ImageUploading from 'react-images-uploading';
import { NumericFormat } from 'react-number-format';

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
};

type IForm = {
  name: string;
  price: number;
  status: boolean;
  maxMember: number;
  emailOfAuth: string;
  area: number
};

type Props = {
  data: IForm | any;
  dataContract: IContractData;
  leadMember: any;
  dataLandlord: any;
  roomArea: number;
  roomPrice: number;
  setSetFirstTab: (number: number) => void;
};

const TenantContract = ({ data, dataContract, leadMember, roomPrice, dataLandlord, roomArea, setSetFirstTab }: Props) => {
  const router = useRouter();
  const { setLoading, cookies } = useUserContext();
  const param = router.query;
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [contractData, setContractData] = useState<IContractData>();
  const [progress, setProgress] = useState(0);
  const [selectedImages, setSelectedImages] = useState<any[]>();
  const [images, setImages] = useState<any>(dataContract.imageContract);
  const maxNumber = 69;
  const onChange = (imageList: any, addUpdateIndex: any) => {
    setImages(imageList);
  };
  const userData = cookies?.user;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<any>();

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
      setValue('fine', String(contractData.fine));

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
  }, [contractData, dataLandlord?.cardNumber, dataLandlord?.dateRange, dataLandlord?.issuedBy, dataLandlord?.name, dataLandlord?.phoneNumber, leadMember, setValue]);

  const uploadTask = (image: any) => {
    if (image.data_url == null) {
      return image;
    } else {
      return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `files/${image?.file?.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image.file);
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(prog);
          },
          (error) => console.log(error),
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
              resolve(downloadURLs);
            });
          },
        );
      });
    }
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    const newAdditional = data.additional.split('\n');
    Promise.all(images.map((image: any) => uploadTask(image)))
      .then(async (ListImgs) => {
        const newValue = {
          contract: {
            startTime: data.startTime,
            endTime: data.endTime,
            additional: newAdditional,
            fine: Number(data.fine),
            timeCT: data.timeCT,
            addressCT: data.addressCT,
            imageContract: ListImgs,
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
          },
          idRoom: param?.id_room,
          token: userData?.token,
        };
        await updateRoom(newValue)
          .then((result) => {
            setLoading(false);
            Toast('success', 'Thêm hợp đồng thành công');
          })
          .catch((err) => {
            setLoading(false);
          })
          .finally(() => {
            setSetFirstTab(3);
          });
      }).catch(async (err) => {
        Toast('error', 'Thêm ảnh thất bại!');
        const newValue = {
          contract: {
            startTime: data.startTime,
            endTime: data.endTime,
            additional: newAdditional,
            fine: Number(data.fine),
            timeCT: data.timeCT,
            addressCT: data.addressCT,
            imageContract: dataContract.imageContract,
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
          },
          idRoom: param?.id_room,
          token: userData?.token,
        };
        await updateRoom(newValue)
          .then((result) => {
            setLoading(false);
            Toast('success', 'Thêm hợp đồng thành công');
          })
          .catch((err) => {
            setLoading(false);
          })
          .finally(() => {
            setSetFirstTab(3);
          });
      })
      .then((err) => console.log(err));
  };

  return (
    <div className="max-w-full mx-auto ">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        {data?.listMember?.length == 0 ? (
          <div>
            Phòng chưa có thành viên
          </div>
        ) : (
          <div className="px-4 py-5 bg-white space-y-6 sm:p-6 mt-5 md:mt-0 md:col-span-3 border rounded-md">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-5">Hình ảnh hợp đồng sau khi đã ký</label>
              <div className="flex flex-col gap-2 md:flex-row md:gap-6">
                {contractData?.imageContract &&
                  contractData?.imageContract.map((item: any, index: number) => (
                    <Image key="img" style={{ width: '200px', height: '200px', objectFit: 'cover' }} src={item} alt="" />
                  ))}
              </div>
              <div className="mt-5 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md bg-white">
                <div className="space-y-1 text-center">
                  <ImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber} dataURLKey="data_url">
                    {({
                      imageList,
                      onImageUpload,
                      onImageRemoveAll,
                      onImageUpdate,
                      onImageRemove,
                      isDragging,
                      dragProps,
                    }) => {
                      return (
                        <div className="relative cursor-pointer  rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                          <button style={isDragging ? { color: 'red' } : undefined} onClick={onImageUpload} {...dragProps}>
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
                            Click or Drop here
                          </button>
                          &nbsp;
                          {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                          <div className="flex flex-col md:flex-row items-center gap-10">
                            {imageList.map((image: any, index) => {
                              const imageFormat = image?.data_url || image;
                              return (
                                <div key={index} className="image-item">
                                  <Image style={{ width: '100px', height: '100px' }} src={imageFormat} alt="" />
                                  <div className="image-item__btn-wrapper flex gap-3">
                                    <button onClick={() => onImageUpdate(index)}>Update</button>
                                    <button onClick={() => onImageRemove(index)}>Remove</button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }}
                  </ImageUploading>
                </div>
              </div>
            </div>
            <div className="border p-5">
              <p className="mb-5">Các thông tin nhập ở đây sẽ được sử dụng cho việc xuất/ in hợp đồng thuê phòng</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="md:grid grid-cols-2 md:gap-10 sm:gap-6 gap-4">
                  <div className="md:grid grid-cols-1 mb-4">
                    <label className="block text-gray-700 text-sm font-bold">
                      Nơi kí hợp đồng  <span className="text-[red]">*</span>
                    </label>
                    <input
                      type="string"
                      className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-h-10 md:col-span-3"
                      {...register('addressCT', { required: true })}
                    />
                    {errors.addressCT?.type === 'required' && (
                      <span className="text-[red] mt-1 block">Vui lòng nhập địa chỉ ký hợp đồng!</span>
                    )}
                  </div>
                  <div className="md:grid grid-cols-1 mb-4">
                    <label className="block text-gray-700 text-sm font-bold">
                      Thời gian kí HĐ  <span className="text-[red]">*</span>
                    </label>
                    <input
                      type="date"
                      className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-h-10 md:col-span-3"
                      {...register('timeCT', { required: true })}
                    />
                    {errors.timeCT?.type === 'required' && (
                      <span className="text-[red] mt-1 block">Vui lòng chọn thời gian ký hợp đồng!</span>
                    )}
                  </div>
                </div>

                <div className="md:grid grid-cols-2 md:gap-10 sm:gap-6 gap-4 mb-6">
                  <div className="md:grid grid-cols-1 mb-4">
                    <label className="block text-gray-700 text-sm font-bold">
                      Ngày bắt đầu HĐ <span className="text-[red]">*</span>
                    </label>
                    <input
                      type="date"
                      className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-h-10 md:col-span-3"
                      {...register('startTime', { required: true })}
                    />
                    {errors.startTime?.type === 'required' && (
                      <span className="text-[red] mt-1 block">Vui lòng chọn thời gian bắt đầu hợp đồng!</span>
                    )}
                  </div>
                  <div className="md:grid grid-cols-1 mb-4">
                    <label className="block text-gray-700 text-sm font-bold">
                      Ngày kết thúc HĐ <span className="text-[red]">*</span>
                    </label>
                    <input
                      type="date"
                      className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-h-10 md:col-span-3"
                      {...register('endTime', { required: true })}
                    />
                    {errors.endTime?.type === 'required' && (
                      <span className="text-[red] mt-1 block">Vui lòng chọn thời gian kết thúc hợp đồng!</span>
                    )}
                  </div>
                </div>
                <div className="md:grid grid-cols-2 md:gap-10 sm:gap-6 gap-4 ">
                  <div className="md:grid grid-cols-1 mb-4">
                    <label className="block text-gray-700 text-sm font-bold">
                      Họ và tên chủ trọ <span className="text-[red]">*</span>
                    </label>
                    <input
                      type="string"
                      placeholder="Nguyễn Văn A"
                      className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-h-10 md:col-span-3"
                      {...register('LLname', { required: true })}
                    />
                    {errors.LLname?.type === 'required' && (
                      <span className="text-[red] mt-1 block">Vui lòng nhập họ và tên của chủ trọ!</span>
                    )}
                  </div>
                  <div className="md:grid grid-cols-1 mb-4">
                    <label className="block text-gray-700 text-sm font-bold">
                      Số CMND/CCCD <span className="text-[red]">*</span>
                    </label>
                    <input
                      type="string"
                      className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-h-10 md:col-span-3"
                      {...register('LLcardNumber', {
                        required: true, minLength: 9, maxLength: 12, pattern: /^[0-9]+$/
                      })}
                    />
                    {errors.LLcardNumber?.type === 'required' && (
                      <span className="text-[red] mt-1 block">Vui lòng nhập số CMND/CCCD!</span>
                    )}
                    {errors.LLcardNumber?.type === 'minLength' && (
                      <span className="text-[red] mt-1 block">Số CMND/CCCD không đúng định dạng!</span>
                    )}
                    {errors.LLcardNumber?.type === 'maxLength' && (
                      <span className="text-[red] mt-1 block">Số CMND/CCCD không đúng dịnh dạng!</span>
                    )}
                    {errors.LLcardNumber?.type === 'pattern' && (
                      <span className="text-[red] mt-1 block">Số CMND/CCCD không đúng dịnh dạng!</span>
                    )}
                  </div>
                </div>
                <div className="md:grid grid-cols-2 md:gap-10 sm:gap-6 gap-4">
                  <div className="md:grid grid-cols-1 mb-4">
                    <label className="block text-gray-700 text-sm font-bold">
                      Ngày cấp  <span className="text-[red]">*</span>
                    </label>
                    <input
                      type="date"
                      className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-h-10 md:col-span-3"
                      {...register('LLdateRange', { required: true })}
                    />
                    {errors.LLdateRange?.type === 'required' && (
                      <span className="text-[red] mt-1 block">Vui lòng chọn ngày cấp CMND/CCCD!</span>
                    )}
                  </div>

                  <div className="md:grid grid-cols-1 mb-4">
                    <label className="block text-gray-700 text-sm font-bold">
                      Nơi cấp <span className="text-[red]">*</span>
                    </label>
                    <input
                      className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-h-10 md:col-span-3"
                      {...register('LLIssuedBy', { required: true })}
                    />
                    {errors.LLIssuedBy?.type === 'required' && (
                      <span className="text-[red] mt-1 block">Vui lòng nhập nơi cấp CMND/CCCD!</span>
                    )}
                  </div>
                </div>
                <div className="md:grid grid-cols-2 md:gap-10 sm:gap-6 gap-4 md:pb-10 pb-8">
                  <div className="md:grid grid-cols-1 mb-4">
                    <label className="block text-gray-700 text-sm font-bold">
                      Số điện thoại liên lạc <span className="text-[red]">*</span>
                    </label>
                    <input
                      type="string"
                      className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-h-10 md:col-span-3"
                      {...register('LLphoneNumber', {
                        required: true,
                        minLength: 10,
                        maxLength: 10,
                        pattern: /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
                      })}
                    />
                    {errors.LLphoneNumber?.type === 'required' && (
                      <span className="text-[red] mt-1 block">Vui lòng nhập số điện thoại!</span>
                    )}
                    {errors.LLphoneNumber?.type === 'minLength' && (
                      <span className="text-[red] mt-1 block">Số điện thoại không đúng định dạng!</span>
                    )}
                    {errors.LLphoneNumber?.type === 'maxLength' && (
                      <span className="text-[red] mt-1 block">Số điện thoại không đúng định dạng!</span>
                    )}
                    {errors.LLphoneNumber?.type === 'pattern' && (
                      <span className="text-[red] mt-1 block">Số điện thoại không đúng định dạng!</span>
                    )}
                  </div>
                </div>
                <div className="md:grid grid-cols-2 md:gap-10 sm:gap-6 gap-4">
                  <div className="md:grid grid-cols-1 mb-4">
                    <label className="block text-gray-700 text-sm font-bold">
                      Người đại diện <span className="text-[red]">*</span>
                    </label>
                    <input
                      type="string"
                      placeholder="Nguyễn Văn A"
                      className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-h-10 md:col-span-3"
                      {...register('TNname', { required: true })}
                    />
                    {errors.TNname?.type === 'required' && (
                      <span className="text-[red] mt-1 block">Vui lòng nhập họ và tên của người đại diện!</span>
                    )}
                  </div>
                  <div className="md:grid grid-cols-1 mb-4">
                    <label className="block text-gray-700 text-sm font-bold">
                      Số CMND/CCCD <span className="text-[red]">*</span>
                    </label>
                    <input
                      type="string"
                      className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-h-10 md:col-span-3"
                      {...register('TNcardNumber', {
                        required: true, minLength: 9, maxLength: 12, pattern: /^[0-9]+$/
                      })}
                    />
                    {errors.TNcardNumber?.type === 'required' && (
                      <span className="text-[red] mt-1 block">Vui lòng nhập số CMND/CCCD!</span>
                    )}
                    {errors.TNcardNumber?.type === 'minLength' && (
                      <span className="text-[red] mt-1 block">Số CMND/CCCD không đúng định dạng!</span>
                    )}
                    {errors.TNcardNumber?.type === 'maxLength' && (
                      <span className="text-[red] mt-1 block">Số CMND/CCCD không đúng dịnh dạng!</span>
                    )}
                    {errors.TNcardNumber?.type === 'pattern' && (
                      <span className="text-[red] mt-1 block">Số CMND/CCCD không đúng dịnh dạng!</span>
                    )}
                  </div>
                </div>
                <div className="md:grid grid-cols-2 md:gap-10 sm:gap-6 gap-4">
                  <div className="md:grid grid-cols-1 mb-4">
                    <label className="block text-gray-700 text-sm font-bold">
                      Ngày cấp <span className="text-[red]">*</span>
                    </label>
                    <input
                      type="date"
                      className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-h-10 md:col-span-3"
                      {...register('TNdateRange', { required: true })}
                    />
                    {errors.TNdateRange?.type === 'required' && (
                      <span className="text-[red] mt-1 block">Vui lòng chọn ngày cấp của CMND/CCCD!</span>
                    )}
                  </div>
                  <div className="md:grid grid-cols-1 mb-4">
                    <label className="block text-gray-700 text-sm font-bold">
                      Nơi cấp <span className="text-[red]">*</span>
                    </label>
                    <input
                      className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-h-10 md:col-span-3"
                      {...register('TNIssuedBy', { required: true })}
                    />
                    {errors.TNIssuedBy?.type === 'required' && (
                      <span className="text-[red] mt-1 block">Vui lòng nhập nơi cấp của CMND/CCCD!</span>
                    )}
                  </div>
                </div>
                <div className="md:grid grid-cols-2 md:gap-10 sm:gap-6 gap-4">
                  <div className="md:grid grid-cols-1 mb-4">
                    <label className="block text-gray-700 text-sm font-bold">
                      Số điện thoại liên lạc <span className="text-[red]">*</span>
                    </label>
                    <input
                      type="string"
                      className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-h-10 md:col-span-3"
                      {...register('TNphoneNumber', {
                        required: true,
                        minLength: 10,
                        maxLength: 10,
                        pattern: /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
                      })}
                    />
                    {errors.TNphoneNumber?.type === 'required' && (
                      <span className="text-[red] mt-1 block">Vui lòng nhập số điện thoại!</span>
                    )}
                    {errors.TNphoneNumber?.type === 'minLength' && (
                      <span className="text-[red] mt-1 block">Số điện thoại không đúng định dạng!</span>
                    )}
                    {errors.TNphoneNumber?.type === 'maxLength' && (
                      <span className="text-[red] mt-1 block">Số điện thoại không đúng định dạng!</span>
                    )}
                    {errors.TNphoneNumber?.type === 'pattern' && (
                      <span className="text-[red] mt-1 block">Số điện thoại không đúng định dạng!</span>
                    )}
                  </div>
                </div>
                <div className="md:grid grid-cols-2 md:gap-10 sm:gap-6 gap-4">
                  <div className="mb-4">
                    <div className="md:grid grid-cols-1 mb-4">
                      <label className="block text-gray-700 text-sm font-bold">
                        Tiền phạt nếu vi phạm <span className="text-[red]">*</span>
                      </label>
                      <NumericFormat
                        value={String(contractData?.fine)}
                        thousandSeparator="," className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-h-10 md:col-span-3" defaultValue="0" {...register('fine', {
                          required: false,
                          min: 1000
                        })}
                        onChange={(e) => {
                          setValue('fine', Number(e.target.value.split(',').join('')))
                        }}
                      />
                      {errors.fine?.type === 'required' && (
                        <span className="text-[red] mt-1 block">Nhập số tiền phạt!</span>
                      )}
                      {errors.fine?.type === 'min' && (
                        <span className="text-[red] mt-1 block">Tiền phạt tối thiểu và không được nhỏ hơn 1,000 VNĐ!</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="md:grid grid-cols-1 mb-4">
                  <label className="block text-gray-700 text-sm font-bold">
                    Quy định bổ sung <span className="text-[red]">*</span>
                  </label>
                  <textarea id="" className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:col-span-7" {...register('additional', { maxLength: 80 })} />
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

            <div className="hidden">
              <div ref={componentRef} className="w-10/12 m-auto">
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
        )}
      </div>
    </div>
  );
};

export default TenantContract;