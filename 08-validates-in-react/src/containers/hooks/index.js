/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';

const RegisterForm = styled('form')`
  margin: 0 auto;
  width: ${props => props.width || '400px'};
  padding-top: 4rem;

  h1 {
    text-align: center;
  }

  input {
    font-size: small;
    padding: 12px 16px;
    text-shadow: ${props => (props.shadow ? '0 1px 1px #fff' : 'none')};
  }

  .control-label {
    display: inline-block;
    font-weight: ${props => props.weight || 'bold'};
    margin-bottom: 6px;
  }

  .form-group {
    margin-bottom: ${props => props.mb || '1.4rem'};
  }

  .form-control {
    width: 100%;
    &.error {
      border: 2px solid #dd4b39;
    }
  }

  .error-container {
    margin-top: 0.75rem;
    font-weight: 600;
    font-size: 0.75rem;
    color: #ed4b39;
  }

  .btn {
    display: inline-block;
    font-size: small;
    border-radius: ${props => props.radius || '0px'};
    padding: 15px 24px;
    transition: all 0.1s;
    text-decoration: none;
    cursor: ${props => props.cursor || 'pointer'};

    &:hover {
      color: white;
      background-color: #dd4b39;
    }
  }
`;

export default ({ onRegister }) => {
  const { register, errors, watch, handleSubmit } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = data => {
    onRegister(data);
  };

  const Error = ({ message }) => <div className="error-container">{message}</div>;

  return (
    <RegisterForm onSubmit={handleSubmit(onSubmit)}>
      <h1>회원가입</h1>
      <div className="form-group">
        <label htmlFor="username" className="control-label">
          이름
        </label>
        <input
          type="text"
          className={`form-control ${errors.username && 'error'}`}
          id="username"
          name="username"
          ref={register({ required: true, maxLength: 80 })}
        />
        {errors.username && <Error message="이름은 필수로 입력해야 합니다" />}
      </div>
      <div className="form-group">
        <label htmlFor="email" className="control-label">
          이메일
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
        {errors.email && <Error message="이름은 형식에 맞게 반드시 기입해야 하는 항목입니다" />}
      </div>
      <div className="form-group">
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
        {errors.password && <Error message="비밀번호는 3자 이상 12자 이하로 반드시 입력해야 합니다" />}
      </div>
      <div className="form-group">
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
      <div className="form-group">
        <button type="submit" className="btn btn-submit">
          회원가입
        </button>
      </div>
    </RegisterForm>
  );
};
