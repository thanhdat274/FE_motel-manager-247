export interface IListRoomType {
  _id: string;
  area: number;
  contract: { additional: []; imageContract: [] };
  idAuth: string;
  idHouse: string;
  listMember: { cardNumber: string; memberName: string; phoneNumber: string; status: boolean; _id: string }[];
  maxMember: number;
  name: string;
  price: number;
  service: [];
  status: boolean;
  subName: string;
}
export interface ITypeChangeOneMember {
  idNewRoom: string;
}
