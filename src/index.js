import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import './config/ReactotronConfig';
import Routes from './routes';
import NavigationService from './services/navigation';

import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" />
      <Routes
        ref={navigationRef => NavigationService.setNavigator(navigationRef)}
      />
    </Provider>
  );
};

export default App;
