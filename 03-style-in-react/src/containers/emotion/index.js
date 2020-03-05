/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState } from 'react';
import { Form, FormGroup } from '../../components/Form';
import Input from '../../components/Input';
import Label from '../../components/Label';
import Button from '../../components/Button';
import { H1, Mute } from '../../components/Typography';

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
    <Form width="418px" center>
      <H1 align="center">회원가입</H1>
      <FormGroup>
        <Label htmlFor="username">이름</Label>
        <Input type="text" id="username" name="username" value={username} onChange={onChange} />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="email">이메일</Label>
        <Input type="email" id="email" name="email" value={email} onChange={onChange} />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password">비밀번호</Label>
        <Input type="password" id="passwrod" name="password" value={password} onChange={onChange} />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password_confirmation">비밀번호 확인</Label>
        <Input
          type="password"
          id="passwrod_confirmation"
          name="password_confirmation"
          value={password_confirmation}
          onChange={onChange}
        />
        <Mute color="#ff0000" size="1rem">
          이것은 회색 처리된 글자입니다.
        </Mute>
      </FormGroup>
      <FormGroup>
        <Button primary type="submit" onClick={onSubmit}>
          회원가입
        </Button>
      </FormGroup>
    </Form>
  );
};
