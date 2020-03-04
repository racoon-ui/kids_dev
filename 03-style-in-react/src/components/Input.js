/** @jsx jsx */
import { jsx } from '@emotion/core';

const Input = props => (
  <input
    css={{
      padding: '0.75rem 1rem',
      width: props.width || '100%',
    }}
    {...props}
  />
);

export default Input;
