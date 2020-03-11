import * as React from 'react';

type StoreProps = {
  addr: string;
  code: string;
  created_at: string;
  lat: number;
  lng: number;
  name: string;
  remain_state: string;
  stock_at: string;
  type: string;
};

type StoreListProps = {
  stores: StoreProps[];
};

function StoreList({ stores }: StoreListProps) {
  if (stores.length < 1) return <div>찾을 수 없습니다.</div>;
  stores.map((store: StoreProps, index) => {
    return <div key={index}>{store.name}</div>;
  });
}

export default StoreList;
