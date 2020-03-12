import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Stack, Heading } from '@chakra-ui/core';
import store from 'store';
import { RootState } from '../modules';
import { getPharmacyProfileThunk } from '../modules/pharmacy';

import SearchBox from '../components/SearchBox';
import ColorMode from '../components/ColorMode';
import SimpleTable from '../components/SimpleTable';
import Loading from '../components/Loading';
import Agreement from '../components/Agreement';

function PharmacyLoader() {
  const [agree, setAgree] = useState<boolean>(false);
  const { data, loading, error } = useSelector((state: RootState) => state.pharmacy);
  const dispatch = useDispatch();

  const columns = React.useMemo(
    () => [
      {
        Header: '기본정보',
        columns: [
          {
            Header: '종류',
            accessor: 'type',
          },
          {
            Header: '이름',
            accessor: 'name',
          },
        ],
      },
      {
        Header: '상세정보',
        columns: [
          {
            Header: '주소',
            accessor: 'addr',
          },
          {
            Header: '잔여여부',
            accessor: 'remain_stat',
          },
          {
            Header: '입고일',
            accessor: 'stock_at',
          },
          {
            Header: '생성일',
            accessor: 'created_at',
          },
        ],
      },
    ],
    [],
  );

  useEffect(() => {
    setAgree(store.get('corona19_agree'));
    if (agree) {
      dispatch(getPharmacyProfileThunk('서울특별시 강남구'));
    }
  }, [agree, dispatch]);

  const onSearch = (address: string) => {
    dispatch(getPharmacyProfileThunk(address));
  };

  const onAgreement = (e: React.MouseEvent<HTMLButtonElement>) => {
    store.set('corona19_agree', true);
    setAgree(true);
  };

  if (!agree) {
    return (
      <Box w="100%" p={4} overflow="hidden">
        <ColorMode />
        <Agreement onClick={onAgreement} />
      </Box>
    );
  }

  return (
    <Box w="100%" p={4} overflow="hidden">
      <Stack isInline spacing={4}>
        <ColorMode />
        <SearchBox onSearch={onSearch} />
      </Stack>
      {loading && <Loading />}
      {error && <p style={{ textAlign: 'center' }}>에러발생...</p>}
      {data && (
        <Stack>
          <Heading as="h1" padding={2} size="sm" color="red.400">
            {`${data.address}: ${data.count} 건의 데이터가 검색되었습니다.`}
          </Heading>
          <SimpleTable columns={columns} data={data.stores} />
        </Stack>
      )}
    </Box>
  );
}

export default PharmacyLoader;
