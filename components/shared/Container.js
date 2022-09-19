import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { colors } from '../../assets/colors/colors'

const Container = ({ children, style }) => {
    return (
        <ScrollView>
            <View style={[styles.container, style]}>
                {children}
            </View>
        </ScrollView>
    )
}
export default Container

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colors.white,
        flex: 1,
        minHeight: Dimensions.get('window').height,
        paddingBottom: 68,
        paddingTop: 64,
    }
})