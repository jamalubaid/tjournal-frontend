import { NextPage } from 'next';

import { WriteForm } from '../../components/WriteForm';
import { MainLayout } from '../../layouts/MainLayout';

const WritePage: NextPage = () => {
  return (
    <MainLayout hideComments hideMenu className="main-layout-white">
      <WriteForm />
    </MainLayout>
  );
};

export default WritePage;
