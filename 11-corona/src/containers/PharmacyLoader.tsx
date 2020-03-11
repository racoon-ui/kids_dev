import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Stack } from '@chakra-ui/core';
import { RootState } from '../modules';
import { getPharmacyProfileThunk } from '../modules/pharmacy';

import SearchBox from '../components/SearchBox';
import Store from '../components/Store';
import ColorMode from '../components/ColorMode';

function PharmacyLoader() {
  const { data, loading, error } = useSelector((state: RootState) => state.pharmacy);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPharmacyProfileThunk('서울특별시 강남구'));
  }, [dispatch]);

  const onSearch = (address: string) => {
    dispatch(getPharmacyProfileThunk(address));
  };

  return (
    <Box w="100%" p={4} overflow="hidden">
      <Stack isInline spacing={4}>
        <ColorMode />
        <SearchBox onSearch={onSearch} />
      </Stack>
      {loading && <p style={{ textAlign: 'center' }}>로딩중...</p>}
      {error && <p style={{ textAlign: 'center' }}>에러발생...</p>}
      {data && data.stores.map((store, index) => <Store {...store} key={index} />)}
    </Box>
  );
}

export default PharmacyLoader;
