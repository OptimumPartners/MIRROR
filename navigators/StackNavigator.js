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

import { screenNames } from "./screenNames";

function StackNavigator() {
    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name={screenNames.WELCOME_SCREEN}
                component={WelcomeScreen}
            />
            <Stack.Screen
                name={screenNames.INTRO_SCREEN}
                component={IntroScreen}
            />
            <Stack.Screen
                name={screenNames.QUESTIONS_SCREEN}
                component={QuestionsScreen}
            />
            <Stack.Screen
                name={screenNames.STATISTICS_SCREEN}
                component={StatisticsScreen}
            />
            <Stack.Screen
                name={screenNames.ANATOMY_INTRO_SCREEN}
                component={AnatomyIntroScreen}
            />
            <Stack.Screen
                name={screenNames.ANATOMY_REVIEW_SCREEN}
                component={AnatomyReviewScreen}
            />
            <Stack.Screen
                name={screenNames.ADDITIONAL_QUESTIONS_SCREEN}
                component={AdditionalQuestionsScreen}
            />
            <Stack.Screen
                name={screenNames.DASHBOARD_SCREEN}
                component={DashboardScreen}
            />
            <Stack.Screen
                name={screenNames.SELF_REFLECTION_SCREEN}
                component={SelfReflectionScreen}
            />
        </Stack.Navigator>
    )
}

export default StackNavigator;