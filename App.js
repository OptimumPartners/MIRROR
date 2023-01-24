import React, { useState } from 'react';
import { Dimensions, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from "./navigators/StackNavigator"
import { Questions } from './contexts/QuestionContext';
import { Blur } from './contexts/BlurContext';
import { colors } from './assets/colors/colors';

function App() {
  const [value, setValue] = useState([])

  const [blur, setBlur] = useState(false)

  return (
    <View style={styles.container}>
      <Questions.Provider value={{ value, setValue }}>
        <Blur.Provider value={{ blur, setBlur }}>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </Blur.Provider>
      </Questions.Provider>

      {blur && <TouchableWithoutFeedback onPress={() => setBlur(!blur)} >
        <View style={styles.blur}></View>
      </TouchableWithoutFeedback>}
    </View>
  );
}

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blur: {
    // backgroundColor: colors.lightGray,
    flex:1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 2
}
})