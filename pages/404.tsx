import { NextPage } from 'next';
import Link from 'next/link';

import { MainLayout } from '../layouts/MainLayout';

const FourOhFour: NextPage = () => {
  return (
    <MainLayout>
      <h1>404 - Page Not Found</h1>
      <Link href="/">
        <a>Go back home</a>
      </Link>
    </MainLayout>
  );
};

export default FourOhFour;
