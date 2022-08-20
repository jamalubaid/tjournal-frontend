import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormField } from '../../FormField';
import { yupResolver } from '@hookform/resolvers/yup';
import { setCookie } from 'nookies';

import { RegisterFormSchema } from '../../../utils/validations';
import { RegisterUserDto } from '../../../utils/api/types';
import { Api } from '../../../utils/api';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../../../redux/hooks';
import { setUserData } from '../../../redux/slices/user';

interface RegisterFormProps {
  onOpenRegister: () => void;
  onOpenLogin: () => void;
  setAuthVisible: (data: boolean) => void;
}

const Register: React.FC<RegisterFormProps> = ({ onOpenRegister, setAuthVisible, onOpenLogin }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(RegisterFormSchema),
  });
  const dispatch = useAppDispatch();

  const onSubmit = async (dto: RegisterUserDto) => {
    try {
      const data = await Api().user.register(dto);
      setCookie(null, 'rtoken', data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      setErrorMessage('');
      dispatch(setUserData(data));
      setAuthVisible(false);
    } catch (error) {
      console.warn('Register error', error);
      if (error.response) {
        setErrorMessage(error.response.data?.message);
      }
    }
  };

  return (
    <div>
      <FormProvider {...form}>
        <FormField name="fullName" label="Имя и Фамилия" />
        <FormField name="email" label="Эл. почта" />
        <FormField name="password" label="Пароль" />
        {errorMessage && <div>{errorMessage}</div>}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="d-flex justify-between">
            <Button
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              type="submit"
              onClick={onOpenRegister}
              className="mt-20"
              color="primary"
              variant="contained"
              fullWidth
            >
              Зарегистрироваться
            </Button>
            <Button onClick={onOpenLogin} className="mt-20" color="primary" variant="text" fullWidth>
              Войти
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Register;
