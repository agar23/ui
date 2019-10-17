import React, { useState, useContext } from 'react';

import storage from '../../utils/storage';
import { getRegistryURL } from '../../utils/url';
import { makeLogin } from '../../utils/login';
import Button from '../../muiComponents/Button';
import AppContext from '../../App/AppContext';
import LoginModal from '../Login';
import Search from '../Search';

import { NavBar, InnerNavBar, MobileNavBar, InnerMobileNavBar } from './styles';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';
import HeaderInfoDialog from './HeaderInfoDialog';

interface Props {
  withoutSearch?: boolean;
}

/* eslint-disable react/jsx-max-depth */
/* eslint-disable react/jsx-no-bind*/
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const Header: React.FC<Props> = ({ withoutSearch }) => {
  const appContext = useContext(AppContext);
  const [isInfoDialogOpen, setOpenInfoDialog] = useState();
  const [showMobileNavBar, setShowMobileNavBar] = useState();
  const [showLoginModal, setShowLoginModal] = useState(false);

  if (!appContext) {
    throw Error('The app Context was not correct used');
  }

  const { user, scope, error, setUser, setError } = appContext;
  const logo = window.VERDACCIO_LOGO;

  /**
   * handles login
   * Required by: <Header />
   */
  const handleDoLogin = async (usernameValue: string, passwordValue: string) => {
    const { username, token, error } = await makeLogin(usernameValue, passwordValue);

    if (username && token) {
      storage.setItem('username', username);
      storage.setItem('token', token);
      setUser({ username });
      setShowLoginModal(false);
    }

    if (error) {
      setUser(undefined);
      setError(error);
    }
  };

  /**
   * Logouts user
   * Required by: <Header />
   */
  const handleLogout = () => {
    storage.removeItem('username');
    storage.removeItem('token');
    setUser(undefined);
  };

  return (
    <>
      <NavBar position="static">
        <InnerNavBar>
          <HeaderLeft logo={logo} />
          <HeaderRight
            onLogout={handleLogout}
            onOpenRegistryInfoDialog={() => setOpenInfoDialog(true)}
            onToggleLogin={() => setShowLoginModal(!showLoginModal)}
            onToggleMobileNav={() => setShowMobileNavBar(!showMobileNavBar)}
            username={user && user.username}
            withoutSearch={withoutSearch}
          />
        </InnerNavBar>
        {scope && <HeaderInfoDialog isOpen={isInfoDialogOpen} onCloseDialog={() => setOpenInfoDialog(false)} registryUrl={getRegistryURL()} scope={scope} />}
      </NavBar>
      {showMobileNavBar && !withoutSearch && (
        <MobileNavBar>
          <InnerMobileNavBar>
            <Search />
          </InnerMobileNavBar>
          <Button color="inherit">{'Cancel'}</Button>
        </MobileNavBar>
      )}
      <LoginModal error={error} onCancel={() => setShowLoginModal(false)} onSubmit={handleDoLogin} visibility={showLoginModal} />
    </>
  );
};

export default Header;
