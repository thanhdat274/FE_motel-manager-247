import { faCalculator, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  const [modalIsOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <nav className="left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="flex w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          <div className="md:flex hidden flex-row items-center w-full justify-end mr-3">
            <div onClick={() => setIsOpen(true)} className="cursor-pointer px-4">
              <FontAwesomeIcon className="w-[16px] text-black" icon={faCalculator} />
            </div>
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
