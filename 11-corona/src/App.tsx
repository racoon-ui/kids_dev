import React, { useState } from 'react';
import { Box, Stack } from '@chakra-ui/core';
import axios from 'axios';

import SearchBox from './components/SearchBox';
import ColorMode from './components/ColorMode';
import StoreList from './components/StoreList';

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

function App() {
  const [stores, setStores] = useState([]);
  const onSearch = (search: string) => {
    axios(
      'https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByAddr/json'
    )
      .then((res) => {
        setStores(res.data.stores);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box w="100%" p={4} overflow="hidden">
      <Stack isInline spacing={4}>
        <ColorMode />
        <SearchBox onSearch={onSearch} />
      </Stack>
      {stores.map((store: StoreProps, index) => {
        return <div key={index}>{store.name}</div>;
      })}
    </Box>
  );
}

export default App;
