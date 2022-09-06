import React, { createContext, useState } from 'react';
import { } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from "./navigators/StackNavigator"
import { Questions } from './contexts/QuestionContext';

function App({ }) {

  const [value, setValue] = useState([])
  return (
    <Questions.Provider value={{value, setValue}}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </Questions.Provider>
  );
}

export default App;