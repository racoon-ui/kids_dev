/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const H1 = props => (
  <h1
    css={css`
      font-size: 3rem;
      font-weight: ${props.wegith || '800'};
      text-align: ${props.align || 'left'};
      margin: 2rem 0;
    `}
    {...props}
  >
    {props.children}
  </h1>
);

const H2 = props => (
  <h2
    css={css`
      font-size: 2rem;
      font-weight: ${props.wegith || '600'};
      text-align: ${props.align || 'left'};
      margin: 1.6rem 0;
    `}
    {...props}
  >
    {props.children}
  </h2>
);

const H3 = props => (
  <h2
    css={css`
      font-size: 1.6rem;
      font-weight: ${props.wegith || '400'};
      text-align: ${props.align || 'left'};
      margin: 1.4rem 0;
    `}
    {...props}
  >
    {props.children}
  </h2>
);

const H4 = props => (
  <h2
    css={css`
      font-size: 1.4rem;
      font-weight: ${props.wegith || '400'};
      text-align: ${props.align || 'left'};
      margin: 1.2rem 0;
    `}
    {...props}
  >
    {props.children}
  </h2>
);

const P = props => (
  <p
    css={css`
      color: ${props.color || '#2d2d2d'};
      font-weight: ${props.wegith || '100'};
      text-align: ${props.align || 'left'};
      margin-bottom: 1.2rem;
    `}
    {...props}
  >
    {props.children}
  </p>
);

const Mute = props => (
  <p
    css={css`
      color: ${props.color || '#333'};
      font-weight: ${props.wegith || '100'};
      text-align: ${props.align || 'left'};
    `}
    {...props}
  >
    {props.children}
  </p>
);

export { H1, H2, H3, H4, P, Mute };
