import { useUserContext } from '@/context/UserContext';
import React, { useEffect, useState } from 'react';
import { addReport, listReport, removeReport } from 'src/pages/api/notification';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Modal from 'react-responsive-modal';
import { Toast } from 'src/hooks/toast';
import moment from 'moment';
import { removePeople } from 'src/pages/api/room';
import { Button, Popconfirm, Space, Table, Tag } from 'antd';
import 'antd/dist/antd.css';
const { Column, ColumnGroup } = Table;

type Props = {};

const ListReport = (props: Props) => {
  const [repost, setReport] = useState<any>();

  const [codeRoom, setCodeRoom] = useState<any>();
  const [open, setOpen] = useState(false);
  const onCloseModal = () => setOpen(false);
  const onOpenModal = () => setOpen(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>();
  const idd = codeRoom && codeRoom._id;
  const { cookies, setLoading } = useUserContext();
  useEffect(() => {
    const data = cookies?.code_room;
    setCodeRoom(data as any);
  }, [cookies?.code_room]);

  useEffect(() => {
    if (codeRoom && codeRoom.idHouse) {
      const getReport = async () => {
        await listReport(idd)
          .then((result) => {
            setReport(result.data.data);
          }).catch((err) => {

          });
        setLoading(false);
      };
      getReport();
    }
  }, [idd]);

  // -------------------Add  repost------------------
  const onSubmit = async (data2: any) => {

    setLoading(true);
    await addReport(data2)
      .then((result: any) => {
        setLoading(false);
        setReport([...repost, result.data.data]);
        setOpen(false);
        Toast('success', result?.data?.message);
      })
      .catch((err) => {
        Toast('error', err?.data?.message);
        setLoading(false);
      });
  };
  // -------------------End   repost------------------

  const handleRemove = async (id: any) => {

    await removeReport(id)
      .then((result) => {
        setReport(repost.filter((item: { _id: any; }) => item._id !== id))
        Toast('success', result?.data?.message);
      }).catch((err) => {
        Toast('error', err?.data?.message);
      });




  }

  return (
    <>
      {' '}
      <div className="flex flex-col">

        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <button
              onClick={onOpenModal}
              className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
            >
              Gửi thông báo
            </button>
            <div className="text-right">
              <Modal open={open} onClose={onCloseModal} center>
                <div className="w-full">
                  <div className="  ">
                    <h2 className="pt-2 text-xl">Thông báo </h2>
                  </div>{' '}
                  <div className="border  p-2 ">
                    <form className="w-full " onSubmit={handleSubmit(onSubmit)}>
                      <div className="   md:flex md:items-center mb-6 mt-3  ">
                        <div className=" hidden md:w-1/5">
                          <label
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                            htmlFor="inline-full-name"
                          >
                            Phòng
                          </label>
                        </div>
                        <div className=" hidden md:w-4/5">
                          <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-full-name"
                            type="text"
                            placeholder="Xin mời nhập tên phòng"
                            defaultValue={codeRoom && codeRoom.name}
                            {...register('roomName', { required: true, minLength: 3 })}
                          />
                          <p className="text-red-500 text-sm">
                            {errors.fullName?.type === 'required' && <span>Không được để trống </span>}
                          </p>
                          <p className="text-red-500 text-sm">
                            {errors.fullName?.type === 'minLength' && <span>Tối thiểu 3 ký tự </span>}
                          </p>
                        </div>
                      </div>
                      <div className="md:flex mb-6 w-full justify-center">
                        <div className="md:w-1/5">
                          <label
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                            htmlFor="inline-full-name"
                          >
                            Nội dung
                          </label>
                        </div>
                        <div className="md:w-[70%]">
                          <textarea
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 pl-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-full-name"
                            rows={6}
                            placeholder="Xin mời nhập nội dung"
                            {...register('content', { required: true, minLength: 3 })}
                          />
                          <p className="text-red-500 text-sm">
                            {errors.fullName?.type === 'required' && <span>Không được để trống </span>}
                          </p>
                          <p className="text-red-500 text-sm">
                            {errors.fullName?.type === 'minLength' && <span>Tối thiểu 3 ký tự </span>}
                          </p>
                        </div>
                      </div>

                      <div className="md:flex md:items-center mb-6 ">
                        <div className="hidden">
                          <div className="md:w-2/3">
                            <input
                              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                              id="inline-password"
                              type="text"
                              value={codeRoom && codeRoom.idHouse}
                              {...register('idHouse', { required: true })}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="md:flex md:items-center  ">
                        <div className="hidden">
                          <div className="md:w-2/3">
                            <input
                              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                              id="inline-password"
                              type="text"
                              value={codeRoom && codeRoom._id}
                              {...register('idRoom', { required: true })}
                            />
                          </div>
                        </div>
                      </div>

                      <div className=" text-center">
                        <button
                          className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                          type="submit"
                        >
                          Thêm thông báo
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Modal>
            </div>
            <div className="overflow-hidden ">
              <Table
                dataSource={repost && repost.map((item: { _id: any; roomName: any; content: any; createdAt: moment.MomentInput; status: any; }, index: number) => ({
                  index: index + 1,
                  key: item._id,
                  name: item.roomName,
                  content: item.content,
                  date: moment(item.createdAt).format('DD/MM/YYYY'),
                  status: item.status
                }))}
                pagination={{ pageSize: 5 }}
              >
                <Column title="STT" dataIndex="index" key="name" />

                <Column title="Phòng" dataIndex="name" key="name" />
                <Column title="Nội dung" dataIndex="content" key="content" width={500} />
                <Column title="Ngày thông báo" dataIndex="date" key="date" />
                <Column title="Trạng thái" dataIndex="status" key="date" render={(status) => {
                  return (
                    <>
                      {status == false ? <div
                        className=" p-2 mb-4 text-center text-sm text-red-700 bg-red-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                        role="alert"
                      >

                        <div>
                          <span className="font-medium">Chưa xử lý</span>
                        </div>
                      </div> : <div
                        className=" p-2 mb-4 text-center text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                        role="alert"
                      >

                        <div>
                          <span className="font-medium">Đã xử lý</span>
                        </div>
                      </div>}
                    </>
                  );
                }} />
                <Column title="" key="action" render={(action) => {
                  return (
                    <>
                      <Popconfirm
                        placement="top"
                        title="Bạn có muốn xóa không?"
                        onConfirm={() => handleRemove(action.key)}
                        okText="Có"
                        cancelText="Không"
                      >
                        <button
                          className="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                          type="submit"
                        >
                          Xóa
                        </button>

                      </Popconfirm>
                    </>
                  );
                }} />
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListReport;
