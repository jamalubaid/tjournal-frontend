import { Button, TextField } from '@material-ui/core';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormField } from '../../FormField';
import { yupResolver } from '@hookform/resolvers/yup';

import styles from '../AuthDialog.module.scss';
import { RegisterFormSchema } from '../../../utils/validations';

interface RegisterFormProps {
  onRegister: () => void;
  onLoginRegister: () => void;
}

const Register: React.FC<RegisterFormProps> = ({ onRegister, onLoginRegister }) => {
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(RegisterFormSchema),
  });

  const onSubmit = (data) => console.log(data);

  console.log(form.formState.errors);
  return (
    <div>
      <FormProvider {...form}>
        <FormField name="fullname" label="Имя и Фамилия" />
        <FormField name="email" label="Эл. почта" />
        <FormField name="password" label="Пароль" />
        {/* 
      <TextField className="mb-20" size="small" label="Имя и Фамилия" variant="outlined" fullWidth required />
      <TextField className="mb-20" size="small" label="Эл. почта" variant="outlined" fullWidth required />
      <TextField className="mb-20" size="small" label="Пароль" variant="outlined" fullWidth required /> */}
        <div className="d-flex justify-between">
          <Button
            disabled={!form.formState.isValid}
            onClick={onRegister}
            className="mt-20"
            color="primary"
            variant="contained"
            fullWidth
          >
            Зарегистрация
          </Button>
          <Button onClick={onLoginRegister} className="mt-20" color="primary" variant="text" fullWidth>
            Войти
          </Button>
        </div>
      </FormProvider>
    </div>
  );
};

export default Register;
