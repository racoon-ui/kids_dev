import React from 'react';
import Result from './Result';

export const NotFound = () => {
  return (
    <Result
      status="404"
      title="요청하신 리소스를 찾을 수 없습니다."
      subTitle="죄송합니다. 요청하신 페이지를 찾을 수 없습니다."
      extra={<a href="/">Back Home</a>}
    />
  );
};

export const InternalServerError = () => {
  return (
    <Result
      status="500"
      title="서버에서 오류가 발생되었습니다."
      subTitle="죄송합니다. 예상치 못한 문제가 발생되었습니다. 빠른 시간에 개선하도록 하겠습니다."
      extra={<a href="/">Back Home</a>}
    />
  );
};
