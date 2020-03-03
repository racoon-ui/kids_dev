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
