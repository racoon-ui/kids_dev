import * as React from 'react';

type PharmacyProfileInfoProps = {
  name: string;
  addr: string;
  remain_stat: string;
  type: string;
  created_at: Date;
  stock_at: Date;
};

const Store = ({ addr, name, remain_stat, created_at, stock_at, type }: PharmacyProfileInfoProps) => {
  return (
    <React.Fragment>
      <div>{name}</div>
      <div>{addr}</div>
      <div>{remain_stat}</div>
      <div>{created_at}</div>
      <div>{stock_at}</div>
    </React.Fragment>
  );
};

export default Store;
