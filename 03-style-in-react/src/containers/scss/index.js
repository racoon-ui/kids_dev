import React from 'react';
import RegisterForm from '../../components/RegisterForm';
import './style.scss';

export default ({ onRegister }) => {
  return <RegisterForm onRegister={onRegister} />;
};
