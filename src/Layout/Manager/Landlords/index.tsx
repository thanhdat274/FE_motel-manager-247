import Modal from 'react-modal';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';
import { ReactCalculator } from 'simple-react-calculator';

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
    <div className=" ">
      <div className="md:fixed md:w-full md:top-0 md:z-20 flex flex-row flex-wrap items-center bg-white p-6 border-b border-gray-300">
        <div className="flex-none w-56 flex flex-row items-center">image</div>

        <div className="flex flex-row-reverse items-end gap-4">
          <div className="icon">Icon</div>
          <div className="caculator-on" onClick={() => setIsOpen(true)}>
            Caculator
          </div>
        </div>
      </div>

      <div>
        <div className="flex-1 p-6 md:mt-16 grid grid-cols-8">{children}</div>
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
