import { useUserContext } from '@/context/UserContext';
import { faCalculator, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { ReactCalculator } from 'simple-react-calculator';

type Props = {};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Navbar = (props: Props) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { logoutResetData } = useUserContext();
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <nav className="left-0 w-full z-50 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="flex w-full mx-auto items-center justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          <div className="md:flex hidden flex-row items-center w-full justify-end mr-3">
            <div onClick={() => setIsOpen(true)} className="cursor-pointer px-4">
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
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
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

export default Navbar;
