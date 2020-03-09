import React, { useState } from 'react';
import { RegisterFormValidator } from '../validators/register-form-validator';
import { LoginFormValidator } from '../validators/login-form-validator';

function RegisterForm({ onRegister }) {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const { username, email, password, password_confirmation } = form;

  const onChange = e => {
    const next = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(next);
  };

  const onSubmit = e => {
    // const onSubmit = async e => {
    e.preventDefault();

    /**
     * 각종 validates 체크를 진행한 뒤 문제가 없다면 onRegister 이벤트를 호출합니다.
     * validates 체크에는 다음과 같은 것들이 있을 수 있습니다.
     * 1. username 규칙
     * 2. email validates 확인
     * 3. password 규칙
     * 4. password & password_confirmation 과의 일치 확인
     * 5. 동기 / 비동기 호출의 차이 확인
     */

    // LoginFormValidator.validate(form)
    //   .then(form => {
    //     onLogin(form)
    //   })
    //   .catch(err => {
    //     console.log(error)
    //   })

    RegisterFormValidator.validate(form)
      .then(form => {
        onRegister(form);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        <h1>회원가입</h1>
        <div className="form-group">
          <label htmlFor="username" className="control-label">
            이름
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={username}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="control-label">
            이메일
          </label>
          <input type="email" className="form-control" id="email" name="email" value={email} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="control-label">
            비밀번호
          </label>
          <input
            type="password"
            className="form-control"
            id="passwrod"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password_confirmation" className="control-label">
            비밀번호 확인
          </label>
          <input
            type="password"
            className="form-control"
            id="passwrod_confirmation"
            name="password_confirmation"
            value={password_confirmation}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-submit">
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
