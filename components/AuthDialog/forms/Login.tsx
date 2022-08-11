import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoginFormSchema } from '../../../utils/validations';

import styles from '../AuthDialog.module.scss';
import { FormField } from '../../FormField';
import { UserApi } from '../../../utils/api';
import { LoginUserDto } from '../../../utils/api/types';
import { setCookie } from 'nookies';

interface LoginFormProps {
  onLogin: () => void;
}

const Login: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [errorMessage, setErrorMessage] = useState(false);
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(LoginFormSchema),
  });

  const onSubmit = async (dto: LoginUserDto) => {
    try {
      const data = await UserApi.login(dto);
      setCookie(null, 'authToken', data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
    } catch (error) {
      console.warn('Register error', error);
      if (error.response) {
        console.log(error.response.data);
        setErrorMessage(error.response.data.message);
      }
    }
  };

  console.log(form.formState.errors);

  return (
    <FormProvider {...form}>
      <FormField name="email" label="Почта" />
      <FormField name="password" label="Пароль" />
      {errorMessage && <div>{errorMessage}</div>}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="d-flex justify-between">
          <Button
            disabled={!form.formState.isValid || form.formState.isSubmitting}
            type="submit"
            className="mt-20"
            color={form.formState.isSubmitted ? 'secondary' : 'primary'}
            variant="contained"
            fullWidth
          >
            Войти
          </Button>
          <Button onClick={onLogin} className="mt-20" color="primary" variant="text" fullWidth>
            Регистрация
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default Login;
