import { faBox, faCoins, faHospital, faPalette, faPlug, faShower } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const MENU_TENANTS = [
  {
    url: '',
    gap: true,
    title: 'Thống kê',
    icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faPalette} />,
  },
  {
    url: 'room',
    gap: true,
    title: 'Phòng',
    icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faHospital} />,
  },
  { url: 'service', title: 'Dịch vụ', icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faBox} /> },
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
  { url: 'receipt', title: 'Hóa đơn', icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faCoins} /> },
  { url: 'contract', title: 'Hợp đồng', icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faCoins} /> },
  { url: 'report', title: 'Thông báo', icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faCoins} /> },
];
