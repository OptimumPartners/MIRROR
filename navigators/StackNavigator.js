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
import SelfReflectionScreen from "../screens/SelfReflectionScreen";
import SurgicalOptions from "../screens/SurgicalOptions";
import routes from "./routes";

function StackNavigator() {

    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name={routes.WELCOME_SCREEN}
                component={WelcomeScreen}
            />
            <Stack.Screen
                name={routes.INTRO_SCREEN}
                component={IntroScreen}
            />
            <Stack.Screen
                name={routes.QUESTIONS_SCREEN}
                component={QuestionsScreen}
            />
            <Stack.Screen
                name={routes.STATISTICS_SCREEN}
                component={StatisticsScreen}
            />
            <Stack.Screen
                name={routes.ANATOMY_INTRO_SCREEN}
                component={AnatomyIntroScreen}
            />
            <Stack.Screen
                name={routes.ANATOMY_REVIEW_SCREEN}
                component={AnatomyReviewScreen}
            />
            <Stack.Screen
                name={routes.ADDITIONAL_QUESTION_SCREEN}
                component={AdditionalQuestionsScreen}
            />
            <Stack.Screen
                name={routes.SURGICAL_OPTIONS}
                component={SurgicalOptions}
            />
            <Stack.Screen
                name={routes.SELF_REFlECTION_SCREEN}
                component={SelfReflectionScreen}
            />
        </Stack.Navigator>
    )
}

export default StackNavigator;