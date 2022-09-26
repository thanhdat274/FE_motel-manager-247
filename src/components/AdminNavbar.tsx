import { faSearch } from '@fortawesome/free-solid-svg-icons';
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
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
            <div className="w-full text-end">
              <div className="close-modal" onClick={() => closeModal()}>
                Close
              </div>
            </div>
            <ReactCalculator key="Calculator" />
          </Modal>
          <form className="md:flex md:ml-[30%] hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
            <div className="relative flex w-full flex-wrap items-stretch">
              <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <FontAwesomeIcon className="w-[16px] text-black" icon={faSearch} />
              </span>
              <input
                type="text"
                placeholder="Tìm kiếm ngay..."
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
              />
            </div>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
