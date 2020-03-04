/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const Button = props => {
  return (
    <button
      css={css`
        border-color: ${props.bg || '#dd4b39'};
        display: inline-block;
        border-radius: ${props.radius || '0.25rem'};
        padding: 1rem 1.5rem;
        font-size: 0.75rem;
        transition: all 0.1s;
        color: ${props.color || 'white'};
        background-color: ${props.bg || '#dd4b39'};
        text-decoration: none;
        cursor: ${props.cursor || 'pointer'};

        &.primary {
          background-color: black;
        }

        &:hover {
          color: ${props.bg || '#dd4b39'};
          background-color: ${props.color || 'white'};
        }
      `}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
