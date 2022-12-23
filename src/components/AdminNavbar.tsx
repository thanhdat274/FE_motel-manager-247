import { useUserContext } from '@/context/UserContext';
import { faCalculator, faRightFromBracket, faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { ReactCalculator } from 'simple-react-calculator';
import { useRouter } from 'next/router';
import { listReports, listReportStatus } from 'src/pages/api/notification';
import moment from "moment"
type Props = {
  isShowIcon?: boolean
};

const Navbar = (props: Props) => {
  const { cookies, setLoading, logoutResetData, resetPage, setResetPage } = useUserContext();
  const [status, setStatus] = useState<any>({});
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [report, setReport] = useState<any>();
  const userData = cookies?.user;
  const router = useRouter();
  const { id } = router.query;
  function closeModal() {
    setOpen(false);
  }
  function closeModal1() {
    setOpen1(false);
  }
  useEffect(() => {
    if (id) {
      const getStatus = async () => {
        const { data } = await listReportStatus(id)
        setStatus(data)
      }
      getStatus()
    }
  }, [id, resetPage])
  // ------------------------------------
  useEffect(() => {
    if (id) {
      const newData1 = { id, userData };
      setLoading(true);
      const getReport = async () => {
        const { data } = await listReports(newData1);
        setReport(data.data);
        setLoading(false);
      };
      getReport();
      setLoading(false);
    }
  }, [id, resetPage]);

  return (
    <div>
      <nav className="left-0 w-full z-50 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="flex w-full mx-auto items-center justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          <div className="md:flex hidden flex-row items-center w-full justify-end mr-3">
            {props.isShowIcon === true ? (
              <div className="relative cursor-pointer" onClick={() => setOpen1(true)}>
                {status.count === 0 ? (<div></div>) : (
                  <div className="absolute left-0 top-0  bg-red-500 rounded-full">
                    <span className="text-sm text-white p-2">{status.count}</span>
                  </div>
                )}
                <div className="p-3">
                  <FontAwesomeIcon className="w-[20px] text-black" icon={faBell} />
                </div>
              </div>
            ) : (
              <div></div>
            )}
            <div onClick={() => setOpen(true)} className="cursor-pointer px-4">
              <FontAwesomeIcon className="w-[16px] text-black" icon={faCalculator} />
            </div>
            <button
              className="cursor-pointer gap-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => logoutResetData()}
            >
              <FontAwesomeIcon className="w-[16px] text-white" icon={faRightFromBracket} /> Đăng xuất
            </button>
          </div>
        </div>
      </nav>
      <Modal open={open} onClose={closeModal} center>
        <div className="w-full text-end">
          <div className="cursor-pointer" onClick={() => closeModal()}>
            <button className="btn close-modal border rounded-md px-2 mb-2 bg-gray-300"></button>
          </div>
        </div>
        <ReactCalculator key="Calculator" />
      </Modal>
      <Modal open={open1} onClose={closeModal1} center>
        <div className="w-full text-end">
          <div>
            <div className="">
              <div className="">
                <div className="flex items-center justify-between">
                  <p tabIndex={0} className="focus:outline-none text-2xl font-semibold leading-6 text-gray-800">Thông báo</p>
                </div>
                {status.count === 0 ? (
                  <div className='mt-5'>
                    <p className='text-center text-lg text-black p-5'>Không có thông báo</p>
                  </div>
                ) : (
                  <div className='mt-5'>
                    {report?.map((item: any, index: number) => {
                      var timeAgo = moment(item.createdAt).format('DD/MM/YYYY');
                      return (
                        <>
                          {item.status == true ? (<div></div>) : (
                            <>
                              <div className="text-left p-3 border border-blue-500 border-opacity-25">
                                <div className='font-bold mb-2 text-xl'>{item.roomName}</div>
                                <div className='flex mb-2'>
                                  <p className="w-full">
                                    <span className="text-indigo-700">{item.content}</span>
                                  </p>
                                  <p className='w-full text-right'>{timeAgo}</p>
                                </div>
                                <Link href={`/manager/landlord/${id}/report`} >
                                  <a>
                                    <div className='text-sm text-cyan-700 hover:text-cyan-500' onClick={() => setOpen1(false)}>Xem thêm</div>
                                  </a>
                                </Link>
                              </div>
                            </>
                          )}
                        </>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Navbar;