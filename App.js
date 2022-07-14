import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./navigators/StackNavigator";

import IconO from "react-native-vector-icons/Octicons"
import IconFA from "react-native-vector-icons/FontAwesome"
import IconAD from "react-native-vector-icons/AntDesign"

IconAD.loadFont();
IconO.loadFont();
IconFA.loadFont();

function App() {
    return (
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
    );
}

export default App;
