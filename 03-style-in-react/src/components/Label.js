/** @jsx jsx */
import { jsx } from '@emotion/core';

const Label = props => (
  <label
    css={{
      display: 'block',
      fontWeight: '600',
      marginBottom: '0.5rem',
    }}
    {...props}
  >
    {props.children}
  </label>
);

export default Label;
