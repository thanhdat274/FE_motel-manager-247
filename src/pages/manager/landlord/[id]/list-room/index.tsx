import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {};

const data = [
  { name: 'phong so 1', status: 'phong trong' },
  { name: 'phong so 2', status: 'phong trong' },
  { name: 'phong so 3', status: 'phong trong' },
  { name: 'phong so 4', status: 'phong trong' },
  { name: 'phong so 5', status: 'phong trong' },
  { name: 'phong so 6', status: 'phong trong' },
  { name: 'phong so 7', status: 'phong trong' },
];

const ListRoom = (props: Props) => {
  const router = useRouter();

  const { id } = router.query;
  return (
    <div className="container flex flex-col ">
      <div className="flex flex-col items-end">
        <Link href={`/manager/landlord/${id}/list-room/add`}>
          <a className="text-end p-1 border ">them phong</a>
        </Link>
      </div>
      <div className="title text-center">Danh sach phong tro</div>

      <div className="list flex flex-col flex-1 gap-4">
        {data &&
          data.map((item: any) => (
            <div className="" key={item.name}>
              <div className="name-room">{item.name}</div>
              <div className="status-room">{item.status}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListRoom;
