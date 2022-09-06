import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { colors } from '../../assets/colors/colors'

const Button = ({ onPress, text, style = {}, textStyle = {}, disabled = false }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]} disabled={disabled}>
            <Text style={[styles.text, textStyle]}>{text || 'Button'}</Text>
        </TouchableOpacity>
    )
}
export default Button
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: colors.lightBlue,
        borderRadius: 100,
        justifyContent: 'center',
        height: 40,
        width: 100,
    },
    text: {
        color: colors.white,
        fontSize:14,
        fontWeight:'700'
    }
})