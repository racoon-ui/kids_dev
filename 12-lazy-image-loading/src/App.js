/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import _ from 'lodash';
import { LazyImage } from './components/LazyImage';

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  row-gap: 1rem;
  column-gap: 1rem;
  padding: 1rem;
  justify-items: center;
`;

export default function App() {
  return (
    <main>
      <Grid>
        {_.range(1000).map((index) => (
          <LazyImage
            key={index}
            src={`https://picsum.photos/100/100/?image=${index}`}
            alt=""
          />
        ))}
      </Grid>
    </main>
  );
}
