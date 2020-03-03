# 03 React 프로젝트 내에서 stylesheet 사용

이 프로젝트에서는 React 프로젝트로 개발을 진행할 때 사용할 수 있는 stylesheet 기법에 대해서 알아보고자 합니다.

### 공통 컴포넌트 생성

동일한 화면에 대해서 `css`, `scss`, `css module`, `CSS-in-JS` 기법을 알아보기 위해 회원가입 컴포넌트를 `components` 폴더 하위에 만듭니다.
그리고, `containers` 폴더 내에서는 `css`, `scss`, `css module`, `emotion` 별로 폴더를 만든 위 각 기법에 대한 코드를 작성합니다.

- [x] 회원가입 컴포넌트 생성
  - [x] `components` 폴더 내에 `RegisterForm.js` 파일을 생성하고 회원가입 화면 제작

### CSS 컨테이너 생성

제작된 화면가입 컴포넌트를 `css` 기법으로 스타일을 적용하기 위해 `containers` 폴더 내에 `css` 폴더를 제작하고 `index.js`, `style.css` 파일을 생성하여 각각 내용을 작성합니다.

```javascript
// index.js

import React from 'react';
import RegisterForm from '../../components/RegisterForm';
import './style.css';

export default ({ onRegister }) => {
  return <RegisterForm onRegister={onRegister} />;
};
```

```css
.form-container {
  margin: 0 auto;
  width: 400px;
  padding-top: 4rem;
}

.form-container h1 {
  text-align: center;
}

.form-container input {
  font-size: small;
  padding: 12px 16px;
  text-shadow: 0 1px 1px #fff;
}

.form-container .control-label {
  display: inline-block;
  font-weight: bold;
  margin-bottom: 6px;
}

.form-container .form-group {
  margin-bottom: 1.4rem;
}

.form-container .form-control {
  width: 100%;
}

.form-container .btn {
  display: inline-block;
  border-radius: 2px;
  padding: 15px 24px;
  transition: all 0.1s;
  text-decoration: none;
  cursor: pointer;
}

.form-container .btn:hover {
  color: white;
  background-color: #dd4b39;
}
```

### SCSS 컨테이너 생성

`scss` 를 적용하기 위해 `containers` 폴더 내에 `scss` 폴더를 만든 뒤 `index.js` 와 `style.scss` 파일을 만듭니다. `scss` 를 이용하기 위해서는 `node-sass` 패키지가 설치되어야 합니다.

- [ ] `$ yarn add node-sass`

```javascript
//index.js

import React from 'react';
import RegisterForm from '../../components/RegisterForm';
import './style.scss';

export default ({ onRegister }) => {
  return <RegisterForm onRegister={onRegister} />;
};
```

```scss
$white: #fff;
$primary-color: #dd4b39;

.form-container {
  margin: 0 auto;
  width: 400px;
  padding-top: 4rem;

  h1 {
    text-align: center;
  }

  input {
    font-size: small;
    padding: 12px 16px;
    text-shadow: 0 1px 1px $white;
  }

  .control-label {
    display: inline-block;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .form-group {
    margin-bottom: 1.4rem;
  }

  .form-control {
    width: 100%;
  }

  .btn {
    display: inline-block;
    border-radius: 2px;
    padding: 15px 24px;
    transition: all 0.1s;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: white;
      background-color: $primary-color;
    }
  }
}
```

### CSS Module 컨테이너 생성

`css module` 을 적용해 보기 위해 `containers` 폴더 내에 `module` 폴더를 만들고 `index.js`, `style.module.css` 파일을 만듭니다. `css module` 을 이용하기 위해서는 반드시 `[파일명].module.css` 형태로 파일명이 작성되어야 합니다.

또한, `css module` 은 `className` 에 문자열의 style 을 적용하는 것이 아니라, `className={styles.wrapper}` 형태로 스타일을 지정하기 때문에 기존 회원가입 컴포넌트를 그대로 복사하되 `className` 내부를 모두 `styles.[style 명]` 형태로 재지정을 합니다.

```javascript
// index.js

import React, { useState } from 'react';
import styles from './style.module.css';

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
    e.preventDefault();
    /**
     * 각종 validates 체크를 진행한 뒤 문제가 없다면 onRegister 이벤트를 호출합니다.
     * validates 체크에는 다음과 같은 것들이 있을 수 있습니다.
     * 1. username 규칙
     * 2. email validates 확인
     * 3. password 규칙
     * 4. password & password_confirmation 과의 일치 확인
     */

    if (password !== password_confirmation) {
      alert('비밀번호가 일치하지 않습니다. 비밀번호를 확인해 주세요');
      return;
    }

    onRegister(form);
  };

  return (
    <div className={styles.container}>
      <form>
        <h1>회원가입</h1>
        <div className={styles.group}>
          <label htmlFor="username" className={styles.label}>
            이름
          </label>
          <input
            type="text"
            className={styles.control}
            id="username"
            name="username"
            value={username}
            onChange={onChange}
          />
        </div>
        <div className={styles.group}>
          <label htmlFor="email" className={styles.label}>
            이메일
          </label>
          <input type="email" className={styles.control} id="email" name="email" value={email} onChange={onChange} />
        </div>
        <div className={styles.group}>
          <label htmlFor="password" className={styles.label}>
            비밀번호
          </label>
          <input
            type="password"
            className={styles.control}
            id="passwrod"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className={styles.group}>
          <label htmlFor="password_confirmation" className={styles.label}>
            비밀번호 확인
          </label>
          <input
            type="password"
            className={styles.control}
            id="passwrod_confirmation"
            name="password_confirmation"
            value={password_confirmation}
            onChange={onChange}
          />
        </div>
        <div className={styles.group}>
          <button type="submit" className={styles.btn} onClick={onSubmit}>
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
```

```css
.container {
  margin: 0 auto;
  width: 400px;
  padding-top: 4rem;
}

h1 {
  text-align: center;
}

input {
  font-size: small;
  padding: 12px 16px;
  text-shadow: 0 1px 1px #fff;
}

.label {
  display: inline-block;
  font-weight: bold;
  margin-bottom: 6px;
}

.group {
  margin-bottom: 1.4rem;
}

.control {
  width: 100%;
}

.btn {
  display: inline-block;
  border-radius: 2px;
  padding: 15px 24px;
  transition: all 0.1s;
  text-decoration: none;
  cursor: pointer;
}

.btn:hover {
  color: white;
  background-color: #dd4b39;
}
```

### emotion 컨테이너 생성

`css in js` 를 적용해 보기 위해 `emotion` 라이브러리를 이용할 것입니다. 대체제로는 `styled-component` 를 이용할 수도 있습니다. 우선, `emotion` 패키지를 사용하기 위해 필요한 라이브러리스 설치합니다. 그리고, [emotion styled component](https://emotion.sh/docs/styled) 를 참고하여 `styled component` 를 제작해 봅니다.

- [ ] `$ yarn add @emotion/core @emotion/styled`

```javascript
// index.js

/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { useState } from 'react';

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
    e.preventDefault();
    /**
     * 각종 validates 체크를 진행한 뒤 문제가 없다면 onRegister 이벤트를 호출합니다.
     * validates 체크에는 다음과 같은 것들이 있을 수 있습니다.
     * 1. username 규칙
     * 2. email validates 확인
     * 3. password 규칙
     * 4. password & password_confirmation 과의 일치 확인
     */

    if (password !== password_confirmation) {
      alert('비밀번호가 일치하지 않습니다. 비밀번호를 확인해 주세요');
      return;
    }

    onRegister(form);
  };

  return (
    <RegisterForm>
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
        <button type="submit" className="btn btn-submit" onClick={onSubmit}>
          회원가입
        </button>
      </div>
    </RegisterForm>
  );
};
```
