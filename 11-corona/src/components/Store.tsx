import * as React from 'react';

type PharmacyProfileInfoProps = {
  name: string;
  addr: string;
  remain_state: string;
  type: string;
  created_at: Date;
  stock_at: Date;
};

const Store = ({ addr, name, remain_state, created_at, stock_at, type }: PharmacyProfileInfoProps) => {
  return <div>{name}</div>;
};

export default Store;
