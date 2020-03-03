# 08 React 프로젝트 내에서 validates 사용

이 프로젝트에서는 React 프로젝트로 개발을 진행할 때 사용할 수 있는 validates check 기법에 대해서 소개하고자 합니다.

### yup 소개

React 에서 회원가입 / 로그인 등의 과정을 진행한다고 생각하면, 각 입력 항목들에 대해 정상적으로 입력을 했는지에 대해 validates check 를 할 필요가 있습니다. 또한, 이러한 사용자의 입력에 따라 적절한 오류 메시지를 출력하는 것도 사용자 경험에서는 중요합니다.
사용자가 Form 을 Submit 하려고 할 때 아래와 같이 각 입력 항목에 대해 세부적으로 점검을 하는 것도 방법입니다.

```javascript
if (password !== password_confirmation) {
  alert('비밀번호와 비밀번호 확인이 일치하지 않습니다');
  return;
}

if (username.length === 0) {
  alert('사용자명을 입력해 주세요');
  return
}

...
```

위와 같이 코드를 작성하게 되면 상당히 많은 항목에 대해 validate check 를 수행해야 하며, 또한 하나의 항목에 대해서도 다양한 validate check 가 필요할 경우 그 경우의 수는 갑작스럽게 증가하게 됩니다. 예를 들어, 사용자명에 대한 입력 규칙을 정한다고 생각해 봅시다. 사용자명에 대한 규칙은 다음과 같이 다양할 수 있습니다.

```
1. 사용자명은 반드시 입력되어야 한다.
2. 사용자명은 반드시 영문자 또는 숫자로만 이루어져야 한다.
3. 사용자명은 최소 3자 이상 최대 16자 이하로 이루어져야 한다.
...
```

사용자명만 해도 위와 같은 rule 들이 존재할 수 있으며, 위의 rule 보다 훨씬 복잡한 케이스가 등장할 수도 있습니다. 이런 다양한 경우의 validates 를 check 하기 위한 용도로 [yup](https://github.com/jquense/yup), [joi](https://hapi.dev/family/joi/), [validates.js](https://github.com/ansman/validate.js) 등이 있을 수 있습니다만, 아래의 이미지에서 보는 바와 같이 Client Side 기술에서는 [yup](https://github.com/jquense/yup) 이 많이 사용되고 있습니다.

![](https://st-kr-tutor.s3-ap-northeast-2.amazonaws.com/got/fb60ff497b10934fee0589108d271da7/validates.png)

따라서 여기에서는 [yup](https://github.com/jquense/yup) 을 react 에서 어떻게 사용할 것인가? 에 대해 알아보고자 합니다.

### Form 구문 생성

회원가입을 위해 다음과 같이 RegisterForm Component 를 만들었다고 가정합니다.

```javascript
import React, { useState } from 'react';

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

    onRegister(form);
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
```

위의 코드에서 `onSubmit` 함수에서 사용자의 입력 항목에 대해 정상적인 입력 여부를 확인하고자, `yup` 을 적용한다면 우선 입력 폼에 대한 `schema` 부터 정의할 필요가 있습니다. 적당한 곳에 `schema` 정의를 위한 파일을 만들어 봅니다. 여기에서는 `src/validators/register-form-validator.js` 로 파일을 생성했습니다.

```javascript
import * as yup from 'yup';

export const invalidUsername = 'username 은 최소 3자 이상 최대 32자 이하여야 합니다';
export const invalidEmail = 'email 형식이 정상적이지 않습니다';
export const invalidPassword = '비밀번호는 최소 4자 이상 32자 이하여야 합니다';
export const invalidPasswordConfirmation = '비밀번호와 비밀번호 확인이 일치하지 않습니다';

export const RegisterFormValidator = yup.object().shape({
  username: yup
    .string()
    .min(3, invalidUsername)
    .max(32, invalidUsername)
    .required(),
  email: yup
    .string()
    .email(invalidEmail)
    .required(),
  password: yup
    .string()
    .min(4, invalidPassword)
    .max(32, invalidPassword)
    .required(),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], invalidPasswordConfirmation)
    .required(),
});
```

`yup` 의 구문이 너무나 간결하여 따로 설명을 할 필요가 없을 정도입니다. 자세한 구문 설정은 [yup 공식 페이지](https://github.com/jquense/yup) 에서 확인해 보세요.

이제 `validate check` 를 위한 `schema` 를 만들었으니, `RegisterForm Component` 에서 `schema` 를 이용한 구문 점검을 해 보겠습니다. 아까 위에서 보았던 `onSubmit` 구문을 다음과 같이 변경합니다.

```javascript
import { RegisterFormValidator } from '../validators/register-form-validator';

...

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

    RegisterFormValidator.validate(form)
      .then(form => {
        onRegister(form);
      })
      .catch(err => {
        console.log(err);
      });
  };
```

위와 같이 `Promise` 형태의 구문으로 `form` 에 대한 `validate check` 를 진행할 수 있습니다. 예제보다 더 좋은 사용자 경험을 만들고 싶다면 `catch` 구문을 풍성하게 만들어 `UI / UX` 적인 부분을 더 강화할 수 있을 것입니다.
