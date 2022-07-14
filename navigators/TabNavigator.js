import React from 'react';

import { StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AnatomyTab from '../src/screens/AnatomyTab';
import NotReadyTab from '../src/screens/NotReadyTab';
import MenopauseTab from '../src/screens/MenopauseTab';
import SurgeryTab from '../src/screens/SurgeryTab';
import OvarianCancerTab from '../src/screens/OvarianCancerTab';
import FertilityTab from '../src/screens/FertilityTab';

import CustomTabBarIcon from '../src/components/CustomTabBarIcon';
import WhereYouAreTab from '../src/screens/WhereYouAreTab';

import { tabNames } from './tabNames';

function TabNavigator({ answers }) {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName={tabNames.WHERE_ARE_YOU_TAB}
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
      }}
    >
      <Tab.Screen
        name={tabNames.I_AM_NOT_READY_TAB}
        component={NotReadyTab}
        options={{
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarLabel: "I'm not ready!",
          tabBarIcon: () => (
            <CustomTabBarIcon
              imgSource={require('../assets/images/stop.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name={tabNames.MENOPAUSE_TAB}
        component={MenopauseTab}
        options={{
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarLabel: 'Menopause',
          tabBarIcon: () => (
            <CustomTabBarIcon
              imgSource={require('../assets/images/menopause.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name={tabNames.SURGERY_TAB}
        component={SurgeryTab}
        options={{
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarLabel: 'Surgery',
          tabBarIcon: () => (
            <CustomTabBarIcon
              imgSource={require('../assets/images/surgery.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name={tabNames.OVARIAN_CANCER_TAB}
        component={OvarianCancerTab}
        options={{
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarLabel: 'Ovarian Cancer',
          tabBarIcon: () => (
            <CustomTabBarIcon
              imgSource={require('../assets/images/ovarianCancer.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name={tabNames.FERTILITY_TAB}
        component={FertilityTab}
        options={{
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarLabel: 'Fertility',
          tabBarIcon: () => (
            <CustomTabBarIcon
              imgSource={require('../assets/images/fertility.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name={tabNames.ANATOMY_TAB}
        component={AnatomyTab}
        options={{
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarLabel: 'Anatomy',
          tabBarIcon: () => (
            <CustomTabBarIcon
              imgSource={require('../assets/images/anatomy.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        initialParams={ answers}
        name={tabNames.WHERE_ARE_YOU_TAB}
        component={WhereYouAreTab}
        options={{
          tabBarItemStyle: {
            display: 'none',
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontSize: 8,
  },
  tabBarStyle: {
    paddingVertical: 20,
  },
});

export default TabNavigator;
