import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { colors } from '../../assets/colors/colors'

const NumberInput = ({ value, placeholder = '', onChange, placeholderTextColor, style }) => {

    const handleChange = (value) => {
        const validValue = value.replace(/[^0-9]/g, '')
        Number(validValue) <= 100  && onChange(validValue)
    }

    return (
        <TextInput  
            style={[styles.input, style]}
            onChangeText={handleChange}
            value={value}
            keyboardType='numeric'
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
        />

    )
}
export default NumberInput
const styles = StyleSheet.create({
    input: {
        backgroundColor: colors.white,
        borderColor: colors.gray,
        borderRadius: 4,
        borderWidth: 1,
        height: 48,
        paddingHorizontal: 20,
        width: '93.5%',
    },
})