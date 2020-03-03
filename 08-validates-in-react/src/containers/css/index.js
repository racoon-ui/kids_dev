import React from 'react';
import RegisterForm from '../../components/RegisterForm';
import './style.css';

export default ({ onRegister }) => {
  return <RegisterForm onRegister={onRegister} />;
};
