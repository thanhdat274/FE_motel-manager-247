import { useUserContext } from '@/context/UserContext';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Toast } from 'src/hooks/toast';
import { paymentStatus } from 'src/pages/api/bill';
import Modal from 'react-responsive-modal';
import { NumericFormat } from 'react-number-format';

type Props = {
    open: boolean;
    onCloseModal: () => void;
    setOpen: (data: boolean) => void;
    readBills: any;
    changeValue: () => void;
};

type FormInputs = {
    _id: string;
    idRoom: string;
    month: number;
    year: number;
    paidAmount: string;
    invoiceService: any;
    debt: number
};

const ModalDetailBill = ({ open, onCloseModal, setOpen, readBills, changeValue }: Props) => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        reset,
        watch,
        formState: { errors },
    } = useForm<FormInputs>();
    const { cookies } = useUserContext();
    const [numberInput, setNumberInput] = useState(0)

    const userData = cookies?.user;
    const sumWithInitial =
        readBills &&
        readBills?.debt +
        readBills?.invoiceService.reduce(
            (previousValue: number, currentValue: any) => previousValue + currentValue.amount,
            0,
        );
    const watchAllFields = watch();

    useEffect(() => {
        setValue("_id", readBills?._id);
        setValue("idRoom", readBills?.idRoom);
        setValue("month", readBills?.month);
        setValue("year", readBills?.year)
        setValue("invoiceService", readBills?.invoiceService);
        setValue("debt", readBills?.debt)
        setValue('paidAmount', readBills?.paidAmount)
    }, [readBills, setValue])

    const remainingAmount = useMemo(() => {
        return sumWithInitial - (numberInput || 0);
    }, [watchAllFields]);
console.log("số tiền đã tính", remainingAmount);

    const submitHandle = async (data1: any) => {
        
        const newData = { ...data1, paymentStatus: data1?.SumValue - data1?.paidAmount > 0 ? false : true }
        console.log("số tiền lưu vào databasse", newData);
        // await paymentStatus(newData, readBills._id, userData).then((result) => {
        //     Toast('success', result.data.message);
        //     setOpen(false);

        // }).catch((err) => {
        //     Toast('error', err?.response?.data?.message);

        // }).finally(() => {
        //     console.log('2323fsdf');
        //     changeValue;
        // });
    };

    const changeValueKeyUp = (e: any) => {
        console.log("số tiền nhập vào", Number(e.target.value.replace(/[^0-9\.]+/g, "")));
        console.log("số tiền nhập vào length", e.target.value.length);

        setNumberInput(Number(e.target.value.replace(/[^0-9\.]+/g, "")));
        // if (Number(e.target.value.replace(/[^0-9\.]+/g, "")) > sumWithInitial) {
        //     setValue('paidAmount', numberInput)
        // } else if (e.target.value.length && Number(e.target.value.replace(/[^0-9\.]+/g, "")) <= 0) {
        //     setNumberInput(0);
        //     setValue('paidAmount', numberInput)
        // }
    }

    return (
        <div className="">
            <Modal open={open} onClose={onCloseModal} center>
                <form action="" onSubmit={handleSubmit(submitHandle)}>
                    <div className="text-slate-600">
                        <header className="bg-white ">
                            <div className="max-w-full mx-auto  py-2 border-b-2 border-black mb-2">
                                <div className="lg:flex lg:items-center lg:justify-between">
                                    <div className="flex-1 min-w-0">
                                        <h2 className="  text-gray-900 sm:text-2xl sm:truncate uppercase">hóa đơn</h2>
                                    </div>
                                </div>
                            </div>
                        </header>
                        <div className="modal-body" id="contentPDF">
                            <div className="h-[27px]">
                                <span>
                                    <strong>{readBills && readBills.houseName}</strong>
                                </span>
                                <span className="float-right" />
                            </div>
                            <div className="h-[27px]">
                                <span>
                                    <strong>Địa chỉ: {readBills && readBills.address} </strong>
                                </span>
                            </div>
                            <div>
                                <h4 className="text-center">
                                    <strong>HÓA ĐƠN TIỀN NHÀ</strong>
                                </h4>
                            </div>
                            <div>
                                <p className="text-center">
                                    <strong>
                                        Tháng {readBills && readBills.month}/{readBills && readBills.year}{' '}
                                    </strong>
                                </p>
                            </div>

                            <div>
                                <p>
                                    <strong>{readBills && readBills.roomName}</strong>
                                </p>
                            </div>
                            <div className="border-b-2 border-t-2 border-black">
                                <div className="py-2">
                                    <table cellSpacing={0} cellPadding={0} width="100%">
                                        <tbody>
                                            {readBills &&
                                                readBills.invoiceService.map((name: any, index: number) => {
                                                    return (
                                                        <>
                                                            <tr>
                                                                <td className="w-[2%]">{index + 1}.</td>
                                                                <td className="w-[70%]">{name.serviceName} </td>
                                                                <td className="w-[25%] text-right">
                                                                    {name.amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                                </td>
                                                            </tr>
                                                        </>
                                                    );
                                                })}

                                            {readBills && (
                                                <>
                                                    <tr>
                                                        <td className="w-[2%]"></td>
                                                        <td className="w-[70%]">
                                                            <strong>Tiền nợ </strong>
                                                        </td>
                                                        <td className="w-[25%] text-right">
                                                            {readBills?.debt.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                        </td>
                                                    </tr>
                                                </>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="border-t-2 border-t-black ">
                                <div className="py-2">
                                    <strong className="">TỔNG CỘNG</strong>
                                    <strong className="float-right">
                                        {sumWithInitial && sumWithInitial.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                    </strong>
                                </div>
                            </div>
                            <div>-</div>
                            <div
                                className={
                                    errors.paidAmount?.type == 'max'
                                        ? 'border-b-2 border-b-black min-h-[100px] h-auto'
                                        : 'border-b-2 border-b-black min-h-[60px] h-auto'
                                }
                            >
                                <div className="py-2">
                                    <strong className="">Đã thanh toán</strong>
                                    <div className="float-right flex flex-col w-1/2 md:w-1/4 ">
                                        {/* <input
                                            className="value-right icon-vnd px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                            {...register('paidAmount', { max: sumWithInitial })}
                                            type="number"
                                            max={sumWithInitial}
                                            min={0}

                                            onKeyUp={(e) => changeValueKeyUp(e)}
                                        />
                                        {errors.paidAmount?.type == 'max' && (
                                            <p className="text-red-500">Giá trị không được vượt quá tổng tiền</p>
                                        )} */}

                                        <NumericFormat thousandSeparator="," type='text' className="value-right icon-vnd px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                            {...register('paidAmount', { max: sumWithInitial })}

                                            max={sumWithInitial}
                                            min={0}

                                            onKeyUp={(e: any) => changeValueKeyUp(e)} />
                                        {errors.paidAmount?.type == 'max' && (
                                            <p className="text-red-500">Giá trị không được vượt quá tổng tiền</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="border-b-2 border-black mb-4">
                                <div className="py-2">
                                    <strong className="">Còn lại</strong>
                                    <strong className="float-right">
                                        {readBills && remainingAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                    </strong>
                                </div>
                            </div>
                            <div className="pb-5">
                                <button
                                    type="submit"
                                    className=" float-right text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                >
                                    Cập nhật
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ModalDetailBill;
