/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Box, Heading, Text, Stack, Icon, Button } from '@chakra-ui/core';
import { RingLoader } from 'react-spinners';

type AgreementProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Agreement = ({ onClick }: AgreementProps) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
      `}
    >
      <RingLoader size={120} color={'#36D7B7'} />
      <Box p={10}>
        <Heading as="h1" fontSize="2xl">
          사용전 읽어주세요
        </Heading>
      </Box>
      <Box p={5} shadow="md" borderWidth="1px">
        <Stack spacing={1}>
          <Text>
            <Icon m={3} name="check" />
            제공되는 데이터는 실시간이 아니며, 5분 이상의 차이가 있을 수 있습니다.
          </Text>
        </Stack>
        <Stack spacing={1}>
          <Text>
            <Icon m={3} name="check" />
            정보 업데이트 시각을 기준으로 현명한 판단 바랍니다.
          </Text>
        </Stack>
        <Stack spacing={1}>
          <Text>
            <Icon m={3} name="check" />
            실제 재고와는 차이가 있기 때문에, 해당 데이터를 신뢰하지는 마시기 바랍니다.
          </Text>
        </Stack>
        <Stack spacing={1}>
          <Text>
            <Icon m={3} name="check" />
            해당 데이터로 인하여 생기는 피해는 책임지지 않습니다.
          </Text>
        </Stack>
      </Box>
      <Box p={5}>
        <Button variantColor="teal" variant="outline" size="lg" onClick={onClick}>
          위 내용을 확인하였습니다
        </Button>
      </Box>
    </div>
  );
};

export default Agreement;
