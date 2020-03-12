/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Button, useColorMode, Box, Icon } from '@chakra-ui/core';

export default function ColorMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  const icon = colorMode === 'light' ? 'sun' : 'moon';

  return (
    <Box p={2}>
      <Button onClick={toggleColorMode}>
        <Icon name={icon} />
      </Button>
    </Box>
  );
}
