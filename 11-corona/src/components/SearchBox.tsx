import * as React from 'react';
import { useForm } from 'react-hook-form';
import {
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  Text,
  Box,
} from '@chakra-ui/core';

type SearchFormData = {
  search: string;
};

type SearchProps = {
  onSearch: (search: string) => void;
};

export default function SearchBox({ onSearch }: SearchProps) {
  const { register, handleSubmit, errors } = useForm<SearchFormData>();

  const onSubmit = handleSubmit(({ search }) => {
    onSearch(search);
  });

  return (
    <Box w="100%" p={2} overflow="hidden">
      <form onSubmit={onSubmit}>
        <InputGroup>
          <InputLeftElement
            children={<Icon name="search" color="gray.300" />}
          />
          <Input
            type="text"
            name="search"
            ref={register({ required: '검색어를 반드시 입력해야 합니다.' })}
            placeholder="서울특별시 강남구"
          />
        </InputGroup>
        {errors.search && (
          <Text color="tomato" as="sub" fontSize="sm">
            {errors.search.message}
          </Text>
        )}
      </form>
    </Box>
  );
}
