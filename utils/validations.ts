import * as yup from 'yup';

export const LoginFormSchema = yup
  .object({
    email: yup.string().email('Неверная почта').required('Почта обязательна'),
    password: yup.string().min(6, 'Минимум 6 символов').required('Пароль обязателен'),
  })
  .required();

export const RegisterFormSchema = yup
  .object({
    fullname: yup.string().min(5, 'Введите имя и фамилию').required('Имя и фамилия обязателено'),
  })
  .concat(LoginFormSchema)
  .required();
