import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import routes from "./routes";

import IntroScreen from "../screens/IntroScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import QuestionsScreen from "../screens/QuestionsScreen";
import StatisticsScreen from "../screens/StatisticsScreen";
import AnatomyReviewScreen from "../screens/AnatomyReviewScreen";
import AdditionalQuestionsScreen from "../screens/AdditionalQuestionsScreen";
import SelfReflectionScreen from "../screens/SelfReflectionScreen";
import SurgicalOptions from "../screens/SurgicalOptions";
import MenopauseTab from "../screens/MenopauseTab";
import SurgeryTab from "../screens/SurgeryTab";
import OvarianCancerTab from "../screens/OvarianCancerTab";
import FertilityTab from "../screens/FertilityTab";
import AnatomyTab from "../screens/AnatomyTab";
import HelpTab from "../screens/HelpTab";
import FinalScreen from "../screens/FinalScreen";
import LynchStatistics from "../screens/LynchStatistics";

function StackNavigator() {

    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'none'
            }}
        >
            <Stack.Group>
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
                    name={routes.SELF_REFLECTION_SCREEN}
                    component={SelfReflectionScreen}
                />
                <Stack.Screen
                    name={routes.FINAL_SCREEN}
                    component={FinalScreen}
                />
                <Stack.Screen
                    name={routes.LYNCH_STATISTICS}
                    component={LynchStatistics}
                />
            </Stack.Group>

            <Stack.Group screenOptions={{ presentation: 'card' }}>
                <Stack.Screen
                    name={routes.MENOPAUSE_TAB}
                    component={MenopauseTab}
                />
                <Stack.Screen
                    name={routes.SURGERY_TAB}
                    component={SurgeryTab}
                />
                <Stack.Screen
                    name={routes.OVARIAN_CANCER_TAB}
                    component={OvarianCancerTab}
                />
                <Stack.Screen
                    name={routes.FERTILITY_TAB}
                    component={FertilityTab}
                />
                <Stack.Screen
                    name={routes.ANATOMY_TAB}
                    component={AnatomyTab}
                />
                <Stack.Screen
                    name={routes.HELP_TAB}
                    component={HelpTab}
                />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default StackNavigator;