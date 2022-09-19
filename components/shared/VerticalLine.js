import React from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from '../../assets/colors/colors'
const VerticalLine = ({style}) => {
    return (
        <View style={[styles.line, style]}></View>
    )
}
export default VerticalLine
const styles = StyleSheet.create({
    line: {
        borderColor: colors.lightGray,
        borderBottomWidth: 1,
        width: '100%',
    }
})