import React from 'react';
import { } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from "./navigators/StackNavigator"

function App({ }) {

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default App;