/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useForm } from 'react-hook-form';

import '../css/reset.css';
import '../scss/style_form_naver.scss';

function FormNaver({ onRegister }) {
  const { register, errors, watch, handleSubmit } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = data => {
    onRegister(data);
  };

  const Error = ({ message }) => <div className="error-container">{message}</div>;

  return (
    <div className="join_membership-wrap">
      <div className="join_membership_logo">
        <h1>
          <a href="http://www.naver.com" class="h_logo">
            <span class="blind">NAVER</span>
          </a>
        </h1>
      </div>

      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <div className="row_group">
          <div className="join_row">
            <label htmlFor="userid" className="control-label">
              아이디
            </label>
            <input
              type="text"
              className={`form-control ${errors.userid && 'error'}`}
              id="userid"
              name="userid"
              ref={register({ required: true, minLength: 3, maxLength: 12 })}
            />
          </div>

          <div className="join_row">
            <label htmlFor="password" className="control-label">
              비밀번호
            </label>
            <input
              type="password"
              className={`form-control ${errors.password && 'error'}`}
              id="passwrod"
              name="password"
              ref={register({ required: true, minLength: 3, maxLength: 12 })}
            />
          </div>

          <div className="join_row">
            <label htmlFor="password_confirmation" className="control-label">
              비밀번호 확인
            </label>
            <input
              type="password"
              className={`form-control ${errors.password_confirmation && 'error'}`}
              id="passwrod_confirmation"
              name="password_confirmation"
              ref={register({
                required: true,
                validate: value => {
                  return value === watch('password');
                },
              })}
            />
            {errors.password_confirmation && <Error message="비밀번호와 비밀번호 확인이 일치하지 않습니다" />}
          </div>
        </div>

        <div className="row_group">
          <div className="join_row">
            <label htmlFor="username" className="control-label">
              이름
            </label>
            <input
              type="text"
              className={`form-control ${errors.username && 'error'}`}
              id="username"
              name="username"
              ref={register({
                required: '사용자명은 반드시 포함되어야 합니다.',
                maxLength: {
                  value: 32,
                  message: '사용자명은 최대 32자 이하여야 합니다',
                },
              })}
            />
            {errors.username && <Error message={errors.username.message} />}
          </div>

          <div className="join_row">
            <label htmlFor="email" className="control-label">
              본인 확인 이메일(선택)
            </label>
            <input
              type="email"
              className={`form-control ${errors.email && 'error'}`}
              id="email"
              name="email"
              ref={register({
                required: true,
                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
            {errors.email && <Error message="이메일은 양식에 맞게 반드시 포함하세요 " />}
          </div>
        </div>

        <div className="row_group">
          <button type="submit" className="btn btn-submit">
            가입하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormNaver;
