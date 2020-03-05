/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import PropTypes from 'prop-types';

const container = css`
  margin: 0 auto;
  padding-top: 4rem;
  text-align: center;
`;

const code = css`
  margin: 2rem 0;
  font-size: 3rem;
  font-weight: 600;
`;

const heading = css`
  margin: 1rem 0;
  font-size: 2rem;
  font-weight: 600;
`;

const sub = css`
  margin-bottom: 3rem;
  font-size: 0.875rem;
  font-weight: 100;
  color: #2c2c2c;
`;

function Result({ status, title, subTitle, extra }) {
  return (
    <div css={container}>
      <h1 css={code}>{status}</h1>
      <div css={heading}>{title}</div>
      <div css={sub}>{subTitle}</div>
      {extra}
    </div>
  );
}

Result.propTypes = {
  status: PropTypes.oneOf(['404', '401', '422', '500']),
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  extra: PropTypes.element,
};

export default Result;
