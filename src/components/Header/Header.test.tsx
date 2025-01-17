import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { render, fireEvent, waitForElement, waitForElementToBeRemoved } from '../../utils/test-react-testing-library';
import { AppContextProvider } from '../../App';

import Header from './Header';

const props = {
  user: {
    username: 'verddacio-user',
  },
  packages: [],
};

/* eslint-disable react/jsx-no-bind*/
describe('<Header /> component with logged in state', () => {
  test('should load the component in logged out state', () => {
    const { container, queryByTestId, getByText } = render(
      <Router>
        <AppContextProvider packages={props.packages}>
          <Header />
        </AppContextProvider>
      </Router>
    );

    expect(container.firstChild).toMatchSnapshot();
    expect(queryByTestId('header--menu-accountcircle')).toBeNull();
    expect(getByText('Login')).toBeTruthy();
  });

  test('should load the component in logged in state', () => {
    const { container, getByTestId, queryByText } = render(
      <Router>
        <AppContextProvider packages={props.packages} user={props.user}>
          <Header />
        </AppContextProvider>
      </Router>
    );

    expect(container.firstChild).toMatchSnapshot();
    expect(getByTestId('header--menu-accountcircle')).toBeTruthy();
    expect(queryByText('Login')).toBeNull();
  });

  test('should open login dialog', async () => {
    const { getByText } = render(
      <Router>
        <AppContextProvider packages={props.packages}>
          <Header />
        </AppContextProvider>
      </Router>
    );

    const loginBtn = getByText('Login');
    fireEvent.click(loginBtn);
    const loginDialog = await waitForElement(() => getByText('Sign in'));
    expect(loginDialog).toBeTruthy();
  });

  test('should logout the user', async () => {
    const { getByText, getByTestId } = render(
      <Router>
        <AppContextProvider packages={props.packages} user={props.user}>
          <Header />
        </AppContextProvider>
      </Router>
    );

    const headerMenuAccountCircle = getByTestId('header--menu-accountcircle');
    fireEvent.click(headerMenuAccountCircle);

    // wait for button Logout's appearance and return the element
    const logoutBtn = await waitForElement(() => getByText('Logout'));
    fireEvent.click(logoutBtn);
    expect(getByText('Login')).toBeTruthy();
  });

  test("The question icon should open a new tab of verdaccio's website - installation doc", () => {
    const { getByTestId } = render(
      <Router>
        <AppContextProvider packages={props.packages} user={props.user}>
          <Header />
        </AppContextProvider>
      </Router>
    );

    const documentationBtn = getByTestId('header--tooltip-documentation');
    expect(documentationBtn.getAttribute('href')).toBe('https://verdaccio.org/docs/en/installation');
  });

  test('should open the registrationInfo modal when clicking on the info icon', async () => {
    const { getByTestId } = render(
      <Router>
        <AppContextProvider packages={props.packages} user={props.user}>
          <Header />
        </AppContextProvider>
      </Router>
    );

    const infoBtn = getByTestId('header--tooltip-info');
    fireEvent.click(infoBtn);

    // wait for registrationInfo modal appearance and return the element
    const registrationInfoModal = await waitForElement(() => getByTestId('registryInfo--dialog'));
    expect(registrationInfoModal).toBeTruthy();
  });

  test('should close the registrationInfo modal when clicking on the button close', async () => {
    const { getByTestId, getByText, queryByTestId } = render(
      <Router>
        <AppContextProvider packages={props.packages} user={props.user}>
          <Header />
        </AppContextProvider>
      </Router>
    );

    const infoBtn = getByTestId('header--tooltip-info');
    fireEvent.click(infoBtn);

    // wait for Close's button of registrationInfo modal appearance and return the element
    const closeBtn = await waitForElement(() => getByText('CLOSE'));
    fireEvent.click(closeBtn);

    const hasRegistrationInfoModalBeenRemoved = await waitForElementToBeRemoved(() =>
      queryByTestId('registryInfo--dialog')
    );
    expect(hasRegistrationInfoModalBeenRemoved).toBeTruthy();
    test.todo('autocompletion should display suggestions according to the type value');
  });
});
