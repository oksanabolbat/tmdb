import MainNavigation from '../components/MainNavigation';
import { useNavigation } from 'react-router-dom';
import Loader from '../components/UI/Loader';

import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const RootLayout = () => {
  const navigation = useNavigation();
  return (
    <>
      <MainNavigation />
      <main>
        {navigation.state === 'loading' && <Loader />}
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
