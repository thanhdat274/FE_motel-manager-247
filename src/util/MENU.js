import { faBox, faCoins, faHospital, faPlug, faShower, faFileContract } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const MENU_LANDLORD = [
  {
    url: 'list-room',
    gap: true,
    title: 'Phòng',
    icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faHospital} />,
  },
  { url: 'service', title: 'Dịch vụ', icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faBox} /> },
  {
    url: 'electric-used',
    title: 'Số điện',
    icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faPlug} />,
  },
  { url: 'water-used', title: 'Số nước', icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faShower} /> },
  // {
  //   url: '',
  //   title: 'Tính tiền',
  //   gap: true,
  //   icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faCalculator} />,
  // },
  { url: '', title: 'Phiếu chi', icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faCoins} /> },
  { url: 'contract-form', title: 'Mẫu hợp  đồng', icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faFileContract} /> },
];
