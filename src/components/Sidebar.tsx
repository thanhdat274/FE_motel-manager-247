import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-modal';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { ReactCalculator } from 'simple-react-calculator';
import {
    faBars
  } from '@fortawesome/free-solid-svg-icons';

type Props = {}


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

const SideBar = (props: Props) => {
    const [collapseShow, setCollapseShow] = useState(true);
    const [lis,setLis] = useState(false)
    const [mns,setMns] = useState(true)

    const Menus = [
        { url: '/', title: 'Home'},
        { url: '/manager/landlord/electric-number', title: 'Số điện' },
        { url: '', title: 'Services' },
        { url: '', title: 'Contact Us',gap : true },
    ]
    const [bgs, setBgs] = useState(false);
    const sideBar = () => {
        setBgs(!bgs);
    }
    const router = useRouter();
    const [modalIsOpen, setIsOpen] = useState(false);

    function closeModal() {
      setIsOpen(false);
    }
    return (
        <div>
            <div className={``}>
                <nav className='bg-light-blue-500 md:ml-64 py-6 px-3'>
                <div className='container max-w-full mx-auto flex items-center justify-between md:pr-8 md:pl-10'>
                    <div className=''>
                        <button className=''>
                            {/* <FontAwesomeIcon className="text-xl" icon={faBars} /> */}
                            <span onClick={() => setMns(!mns)}  className={`ml-2`}>Menu</span>
                        </button>
                    </div>
                </div>
            </nav>
            <div className={`${!mns && 'hidden'}  h-screen fixed top-0 md:left-0 -left-64 overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl w-64 z-10 py-4 px-6 transition-all duration-300`}>
                <div className='flex-col items-stretch min-h-full flex-nowrap px-0 relative'>
                    <a href="" className='mt-2 text-center w-full inline-block'>
                        <h1 className='text-gray-900 text-xl font-serif font-bold leading-normal mt-0 mb-2'>Motel Manager 247</h1>
                    </a>
                    <div className='flex flex-col'>
                        <hr  className='my-4 min-w-full'/>
                        <ul className='flex-col min-w-full flex list-none'>
                            {Menus.map((menu,index) => {
                              return (
                                <li key={index} className={`${menu.gap? 'mt-9' : 'mt-2'} rounded-lg mb-4 bg-gray-300 fw-500 cursor-pointer hover:bg-blue-500 round-md`}>
                                    <Link href={menu.url}>
                                        <a className=' flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md'>
                                            <span className={`${lis && 'hidden'} font-bold text-black`}>{menu.title}</span>
                                        </a>
                                    </Link>
                                </li>
                              )
                            })}
                        </ul>
                    </div>
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
            
        </div>
    )
}

export default SideBar