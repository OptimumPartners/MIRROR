import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import IntroScreen from "../screens/IntroScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import QuestionsScreen from "../screens/QuestionsScreen";
import StatisticsScreen from "../screens/StatisticsScreen";
import AnatomyIntroScreen from "../screens/AnatomyIntroScreen";
import AnatomyReviewScreen from "../screens/AnatomyReviewScreen";
import AdditionalQuestionsScreen from "../screens/AdditionalQuestionsScreen";
import DashboardScreen from "../screens/DashboardScreen";
import SelfReflectionScreen from "../components/SelfReflectionScreen";

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