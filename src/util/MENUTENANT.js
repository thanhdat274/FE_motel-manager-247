import { faBox, faCoins, faHospital, faPlug, faShower } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const MENU_TENANTS = [
  {
    url: 'room',
    gap: true,
    title: 'Phòng',
    icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faHospital} />,
  },
  { url: '', title: 'Dịch vụ', icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faBox} /> },
  {
    url: 'electricity',
    title: 'Số điện',
    icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faPlug} />,
  },
  { url: 'water', title: 'Số nước', icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faShower} /> },
  // {
  //   url: '',
  //   title: 'Tính tiền',
  //   gap: true,
  //   icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faCalculator} />,
  // },
  { url: '', title: 'Hóa đơn', icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faCoins} /> },
  { url: '', title: 'Hợp đồng', icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faCoins} /> },
];
