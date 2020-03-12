/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { RingLoader } from 'react-spinners';

const Loading = () => (
  <div
    css={css`
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    `}
  >
    <RingLoader size={60} color={'#36D7B7'} />
  </div>
);

export default Loading;
