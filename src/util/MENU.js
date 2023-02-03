import {
  faBox,
  faCoins,
  faHospital,
  faPlug,
  faShower,
  faFileContract,
  faReceipt,
  faPalette,
  faMoneyBill,
  faBell,
  faClockRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const MENU_LANDLORD = [
  {
    url: '',
    gap: true,
    title: 'Thống kê',
    icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faPalette} />,
    checkMenu: 1,
  },
  {
    url: 'list-room',
    gap: true,
    title: 'Phòng',
    icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faHospital} />,
  },
  {
    url: 'booking',
    gap: true,
    title: 'Cọc phòng',
    icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faMoneyBill} />,
  },
  { url: 'service', title: 'Dịch vụ', icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faBox} /> },
  {
    url: 'elictric',
    title: 'Số điện',
    icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faPlug} />,
  },
  { url: 'water', title: 'Số nước', icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faShower} /> },
  {
    url: 'receipt',
    title: 'Hóa đơn hàng tháng',
    icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faReceipt} />,
  },
  {
    url: 'liquidation-bill',
    title: 'Hóa đơn thanh lý',
    icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faBell} />,
  },
  {
    url: 'history',
    title: 'Lịch sử',
    icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faClockRotateLeft} />,
  },
  {
    url: 'payment-method',
    title: 'Quản lý thanh toán',
    icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faClockRotateLeft} />,
  },
];

export const SUB_MENU_RECEIPT = [
  {
    url: 'monthly-bill',
    title: 'Hóa đơn hàng tháng',
    icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faClockRotateLeft} />,
  },
  {
    url: 'liquidation-bill',
    title: 'Hóa đơn thanh lý',
    icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faClockRotateLeft} />,
  },
];
