import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StyleSheet, Text, View } from 'react-native'
import routes from './routes'
import MenopauseTab from '../screens/MenopauseTab'

const Stack = createNativeStackNavigator()

const ModalNavigator = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                presentation: 'modal'
            }}
        >
            <Stack.Screen
                name={routes.MENOPAUSE_TAB}
                component={MenopauseTab}
            />


        </Stack.Navigator>
    )
}
export default ModalNavigator
const styles = StyleSheet.create({})