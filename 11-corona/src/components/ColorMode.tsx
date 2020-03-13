/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Link } from 'react-router-dom';
import { Button, useColorMode, Box, Icon, Stack } from '@chakra-ui/core';

export default function ColorMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  const icon = colorMode === 'light' ? 'sun' : 'moon';

  return (
    <Box p={2}>
      <Stack isInline>
        <Link to="/about">
          <Button leftIcon="email" variant="solid" mr={4}>
            제작자
          </Button>
        </Link>
        <Button onClick={toggleColorMode}>
          <Icon name={icon} />
        </Button>
      </Stack>
    </Box>
  );
}
