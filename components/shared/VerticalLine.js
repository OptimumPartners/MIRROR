import React from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from '../../assets/colors/colors'
const VerticalLine = () => {
    return (
        <View style={styles.line}></View>
    )
}
export default VerticalLine
const styles = StyleSheet.create({
    line: {
        borderColor: colors.lightGray,
        borderWidth: 1,
        marginVertical: 40,
        width: '100%',
    }
})