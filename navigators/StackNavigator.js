import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AdditionalQuestionsScreen from "../src/screens/AdditionalQuestionsScreen";
import AnatomyIntroScreen from "../src/screens/AnatomyIntroScreen";
import AnatomyReviewScreen from "../src/screens/AnatomyReviewScreen";
import DashboardScreen from "../src/screens/DashboardScreen";
import IntroScreen from "../src/screens/IntroScreen";
import QuestionsScreen from "../src/screens/QuestionsScreen";
import SelfReflectionScreen from "../src/screens/SelfReflectionScreen";
import StatisticsScreen from "../src/screens/StatisticsScreen";
import WelcomeScreen from "../src/screens/WelcomeScreen";

function StackNavigator() {
    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="WelcomeScreen"
                component={WelcomeScreen}
            />
            <Stack.Screen
                name="IntroScreen"
                component={IntroScreen}
            />
            <Stack.Screen
                name="QuestionsScreen"
                component={QuestionsScreen}
            />
            <Stack.Screen
                name="StatisticsScreen"
                component={StatisticsScreen}
            />
            <Stack.Screen
                name="AnatomyIntroScreen"
                component={AnatomyIntroScreen}
            />
            <Stack.Screen
                name="AnatomyReviewScreen"
                component={AnatomyReviewScreen}
            />
            <Stack.Screen
                name="AdditionalQuestionsScreen"
                component={AdditionalQuestionsScreen}
            />
            <Stack.Screen
                name="DashboardScreen"
                component={DashboardScreen}
            />
            <Stack.Screen
                name="SelfRelectionScreen"
                component={SelfReflectionScreen}
            />
        </Stack.Navigator>
    )
}

export default StackNavigator;