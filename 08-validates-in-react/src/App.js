import React from 'react';
// import RegisterForm from './containers/css';
// import RegisterForm from './containers/scss';
// import RegisterForm from './containers/module';
// import RegisterForm from './containers/emotion';
import RegisterForm from './containers/hooks';

function App() {
  const registerHandler = form => {
    /**
     * 회원가입 form 에서 가입하기 버튼을 클릭할 경우 발생됩니다.
     * form: {
     *  username: 사용자명,
     *  email: 이메일,
     *  password: 비밀번호
     * }
     *
     * API 호출을 통해 서버에 정보를 넘겨야 합니다.
     * 이 부분은 4장에서 진행합니다.
     */

    /**
     * 민감한 정보를 마스킹 하기 위한 조치
     * production 에서는 필요없는 코드일 수 있습니다.
     */
    const newForm = {
      ...form,
      password: '****',
      password_confirmation: '****',
    };

    console.log(newForm);
  };

  return <RegisterForm onRegister={registerHandler} />;
}

export default App;
