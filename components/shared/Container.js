import React from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from '../../assets/colors/colors'

const Container = ({ children, style }) => {
    return (
        <View style={[styles.container, style]}>
            {children}
        </View>
    )
}
export default Container

const styles = StyleSheet.create({
    container: {
        backgroundColor:colors.white,
        flex: 1,
        alignItems: 'center'
    }
})