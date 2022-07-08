import React from 'react';

import { StyleSheet } from 'react-native';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import NotReadyTab from "../screens/NotReadyTab"
import MenopauseTab from "../screens/MenopauseTab"
import SurgeryTab from "../screens/SurgeryTab"
import OvarianCancerTab from "../screens/OvarianCancerTab"
import FertilityTab from "../screens/FertilityTab"
import AnatomyTab from "../screens/AnatomyTab"


import CustomTabBarIcon from '../components/CustomTabBarIcon';
import WhereYouAreTab from '../screens/WhereYouAreTab';

function TabNavigator({ answers }) {
    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator
            initialRouteName='WhereYouAreTab'
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBarStyle,
            }}

        >
            <Tab.Screen
                initialParams={{ answers }}
                name={"IAmNotReady"}
                component={NotReadyTab}
                options={{
                    tabBarLabelStyle: styles.tabBarLabelStyle,
                    tabBarLabel: "I'm not ready!",
                    tabBarIcon: () =>
                        <CustomTabBarIcon
                            imgSource={require("../assets/images/stop.png")}
                        />
                }}
            />
            <Tab.Screen
                name={"MenopuaseTab"}
                component={MenopauseTab}
                options={{
                    tabBarLabelStyle: styles.tabBarLabelStyle,
                    tabBarLabel: "Menopuase",
                    tabBarIcon: () =>
                        <CustomTabBarIcon
                            imgSource={require("../assets/images/menopause.png")}
                        />
                }}
            />
            <Tab.Screen
                name={"SurgeryTab"}
                component={SurgeryTab}
                options={{
                    tabBarLabelStyle: styles.tabBarLabelStyle,
                    tabBarLabel: "Surgery",
                    tabBarIcon: () =>
                        <CustomTabBarIcon
                            imgSource={require("../assets/images/surgery.png")}
                        />
                }}
            />
            <Tab.Screen
                name={"OvarianCancerTab"}
                component={OvarianCancerTab}
                options={{
                    tabBarLabelStyle: styles.tabBarLabelStyle,
                    tabBarLabel: "Ovarian Cancer",
                    tabBarIcon: () =>
                        <CustomTabBarIcon
                            imgSource={require("../assets/images/ovarianCancer.png")}
                        />
                }}
            />
            <Tab.Screen
                name={"FertilityTab"}
                component={FertilityTab}
                options={{
                    tabBarLabelStyle: styles.tabBarLabelStyle,
                    tabBarLabel: "Fertility",
                    tabBarIcon: () =>
                        <CustomTabBarIcon
                            imgSource={require("../assets/images/fertility.png")}
                        />
                }}
            />
            <Tab.Screen
                name={"AnatomyTab"}
                component={AnatomyTab}
                options={{
                    tabBarLabelStyle: styles.tabBarLabelStyle,
                    tabBarLabel: "Anatomy",
                    tabBarIcon: () =>
                        <CustomTabBarIcon
                            imgSource={require("../assets/images/anatomy.png")}
                        />
                }}
            />
            <Tab.Screen
                name='WhereYouAreTab'
                component={WhereYouAreTab}
                options={{
                    tabBarItemStyle: {
                        display: "none",
                    }
                }}
            />
        </Tab.Navigator>
    );
}


const styles = StyleSheet.create({
    tabBarLabelStyle: {
        fontSize: 8
    },
    tabBarStyle: {
        paddingVertical: 20,
    },
})

export default TabNavigator;