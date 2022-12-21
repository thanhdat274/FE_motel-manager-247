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
type Props = {};



const NavbarTennants = (props: Props) => {
 
  const { logoutResetData } = useUserContext();
  const [open, setOpen] = useState(false);
  const { reset, setReset } = useUserContext()
  const { cookies, setLoading } = useUserContext();
  const [report, setReport] = useState<any>();
  const userData = cookies?.user;

  const router = useRouter();
  const { id } = router.query;
  function closeModal() {
    setOpen(false);
  }
  

 
  return (
    <div>
      <nav className="left-0 w-full z-50 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="flex w-full mx-auto items-center justify-between md:flex-nowrap flex-wrap md:px-10 px-4">

          <div className="md:flex hidden flex-row items-center w-full justify-end mr-3">
           

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
            <button className="btn close-modal border rounded-md px-2 mb-2 bg-gray-300">Close</button>
          </div>
        </div>
        <ReactCalculator key="Calculator" />
      </Modal>
     
    </div>
  );
};

export default NavbarTennants;
