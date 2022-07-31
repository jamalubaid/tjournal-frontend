import { Button, TextField } from '@material-ui/core';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoginFormSchema } from '../../../utils/validations';

import styles from '../AuthDialog.module.scss';
import { FormField } from '../../FormField';

interface LoginFormProps {
  onLogin: () => void;
}

const Login: React.FC<LoginFormProps> = ({ onLogin }) => {
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(LoginFormSchema),
  });

  const onSubmit = (data) => console.log(data);

  console.log(form.formState.errors);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField name="email" label="Почта" />
        <FormField name="password" label="Пароль" />
        <div className="d-flex justify-between">
          <Button
            disabled={!form.formState.isValid}
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
