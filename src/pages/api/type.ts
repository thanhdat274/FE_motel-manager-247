export interface IChangeOneMember {
  idOldRoom: string | undefined | string[];
  dataMember: {
    _id: string;
    cardNumber: string;
    memberName: string;
    phoneNumber: string;
  };
  idNewRoom: string;
  userData?: { token?: string };
}
export interface IChangeAllMember {
  idOldRoom: string | undefined | string[];
  dataMember: {
    _id: string;
    cardNumber: string;
    memberName: string;
    phoneNumber: string;
  }[];
  idNewRoom: string;
  userData?: { token?: string };
}
