/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import { Box, Button, Stack, Avatar } from '@chakra-ui/core';

function About() {
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
      <Stack isInline mt={60}>
        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
        <Avatar name="Kola Tioluwani" src="https://bit.ly/tioluwani-kolawole" />
        <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
        <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
        <Avatar name="Prosper Otemuyiwa" src="https://bit.ly/prosper-baba" />
        <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
        <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
      </Stack>
      <Box p={10}>
        <Link to="/">
          <Button variantColor="teal" variant="outline" size="lg">
            메인 페이지로 이동
          </Button>
        </Link>
      </Box>
    </div>
  );
}

export default About;
