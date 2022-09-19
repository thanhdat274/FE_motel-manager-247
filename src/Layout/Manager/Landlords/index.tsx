import Modal from 'react-modal';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';
import { ReactCalculator } from 'simple-react-calculator';
import SideBar from '@/components/Sidebar';
import Navbar from '@/components/AdminNavbar';
import AdminFooter from '@/components/AdminFooter';

export interface ILayoutAdminProps {
  children: ReactNode;
}

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

const LayoutLandlords = ({ children }: ILayoutAdminProps) => {
  const [toggle, setToggle] = useState(false);
  const changeToggle = () => {
    setToggle(!toggle);
  };
  const router = useRouter();

  const [modalIsOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <SideBar />
      <Navbar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div className='bg-gray-100'>{children}</div>
          <AdminFooter />
        </div>
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
        <div className="w-full text-end">
          <div className="close-modal" onClick={() => closeModal()}>
            Close
          </div>
        </div>
        <ReactCalculator key="Calculator" />
      </Modal>
    </div>
  );
};

export default LayoutLandlords;
