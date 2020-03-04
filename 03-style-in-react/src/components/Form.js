/** @jsx jsx */
import { jsx } from '@emotion/core';

const Form = props => (
  <form
    css={{
      width: props.width || '100%',
      margin: props.center ? '0 auto' : '0',
    }}
    {...props}
  >
    {props.children}
  </form>
);

const FormGroup = props => (
  <div
    css={{
      marginBottom: '1rem',
    }}
  >
    {props.children}
  </div>
);

export { Form, FormGroup };
