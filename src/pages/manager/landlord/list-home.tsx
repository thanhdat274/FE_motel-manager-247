import { useRouter } from 'next/router';
import React from 'react';

type Props = {};

export const listHome = [
  {
    title: 'nha so 1',
    description: 'description nha so 1',
  },
  {
    title: 'nha so 2',
    description: 'description nha so 2',
  },
  {
    title: 'nha so 3',
    description: 'description nha so 3',
  },
  {
    title: 'nha so 4',
    description: 'description nha so 4',
  },
  {
    title: 'nha so 5',
    description: 'description nha so 5',
  },
  {
    title: 'nha so 6',
    description: 'description nha so 6',
  },
  {
    title: 'nha so 7',
    description: 'description nha so 7',
  },
  {
    title: 'nha so 8',
    description: 'description nha so 8',
  },
  {
    title: 'nha so 9',
    description: 'description nha so 9',
  },
];

const ListHome = (props: Props) => {
  const router = useRouter();

  console.log('landlord', router.pathname.search('/manager/landlord'));

  console.log('ternant', router.pathname.search('/manager/ternant'));

  const renderList = (listHome: any) => {
    return listHome.map((item: any, index: number) => (
      <div className="flex flex-row" key={index}>
        <div className="title">{item.title}</div>
        <div className="description">{item.description}</div>
      </div>
    ));
  };
  return <div className="flex flex-col">{renderList(listHome)}</div>;
};

export default ListHome;
