import { Button, Divider, Paper, TextField, Typography } from '@material-ui/core';
import { GetServerSideProps } from 'next';
import { MainLayout } from '../../layouts/MainLayout';
import { Api } from '../../utils/api';

export default function Settings() {
  return (
    <MainLayout hideComments>
      <Paper className="p-20" elevation={0}>
        <Typography variant="h6">Основные настройки</Typography>
        <Divider className="mt-20 mb-30" />
        <form>
          <TextField className="mb-20" size="small" label="Никнейм" variant="outlined" fullWidth required />
          <TextField className="mb-20" size="small" label="Эл. почта" variant="outlined" fullWidth required />
          <TextField size="small" label="Пароль" variant="outlined" fullWidth required />
          <Divider className="mt-30 mb-20" />
          <Button color="primary" variant="contained">
            Сохранить изменения
          </Button>
        </form>
      </Paper>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const user = await Api(ctx).user.getMe();

    if (!user[0].id) {
      return {
        props: {},
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    return {
      props: {},
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
