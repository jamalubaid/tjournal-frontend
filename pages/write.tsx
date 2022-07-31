import { Button, TextField } from '@material-ui/core';
import { NextPage } from 'next';
import React from 'react';
import { WriteForm } from '../components/WriteForm';
import { MainLayout } from '../layouts/MainLayout';

const WritePage: NextPage = () => {
  return (
    <MainLayout hideComments hideMenu className="main-layout-white">
      <WriteForm title="Заголовок" />
    </MainLayout>
  );
};

export default WritePage;
