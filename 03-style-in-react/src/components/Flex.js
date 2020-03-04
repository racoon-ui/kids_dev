/** @jsx jsx */

import { css } from '@emotion/core';

export const container = css`
  display: flex;
`;

export const center = css`
  justify-content: center;
  align-items: center;
`;

export const row = css`
  flex-direction: row;
`;

export const column = css`
  flex-direction: column;
`;

export const between = css`
  justify-content: space-between;
`;

export const around = css`
  justify-content: space-around;
`;

export const start = css`
  justify-content: flex-start;
`;

export const end = css`
  justify-content: flex-end;
`;

export const baseline = css`
  justify-content: baseline;
`;
