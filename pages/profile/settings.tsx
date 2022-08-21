import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Divider, Paper, TextField, Typography } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { GetServerSideProps, NextApiHandler, NextPage } from 'next';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormField } from '../../components/FormField';
import { MainLayout } from '../../layouts/MainLayout';
import { useAppDispatch } from '../../redux/hooks';
import { setUserData } from '../../redux/slices/user';
import { Api } from '../../utils/api';
import { ResponseCreateUser, UpdateUserDto } from '../../utils/api/types';
import { UpdateFormSchema } from '../../utils/validations';

interface ISettingsProps {
  user: ResponseCreateUser[];
}

const Settings: NextPage<ISettingsProps> = ({ user }) => {
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(UpdateFormSchema),
  });
  const dispatch = useAppDispatch();

  const onSubmit = async (dto: UpdateUserDto) => {
    const obj = {
      fullName: dto.fullName,
      password: dto.password,
      id: user[0].id,
    };
    try {
      await Api().user.update(obj);
      dispatch(
        setUserData({
          ...obj,
          email: user[0].email,
        }),
      );
    } catch (error) {
      console.warn('Не удалось обновить данные', error);
    }
  };

  return (
    <MainLayout hideComments>
      <Paper className="p-20" elevation={0}>
        <Typography variant="h6">Основные настройки</Typography>
        <Divider className="mt-20 mb-30" />
        <FormProvider {...form}>
          <FormField name="fullName" label="Имя и Фамилия" />
          <FormField name="password" label="Пароль" />
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Divider className="mt-30 mb-20" />
            <Button
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              type="submit"
              color="primary"
              variant="contained"
            >
              Сохранить изменения
            </Button>
          </form>
        </FormProvider>
      </Paper>
    </MainLayout>
  );
};

export default Settings;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const user = await Api(ctx).user.getMe();
    if (!user[0]?.id) {
      return {
        props: {},
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    return {
      props: {
        user,
      },
    };
  } catch (error) {
    console.log('profileError', error);

    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};
