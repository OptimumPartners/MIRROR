import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../assets/colors/colors';
import Button from './Button';
import VerticalLine from './VerticalLine';

const Footer = ({ goBack, disabled = true, style = {}, footerElementStyle = {}, buttonStyle = {}, goTo, buttonText = 'Continue' }) => {
    return (
        <View style={[styles.footer, style]} >
            <VerticalLine />
            <View style={[styles.container, footerElementStyle]}>
                <TouchableOpacity onPress={goBack}>
                    {goBack && <View style={styles.prevScreenContainer}>
                        <Icon name='arrow-back' size={22} color={colors.primaryText} />
                        <Text>Go Back</Text>
                    </View>}
                </TouchableOpacity>

                <Button
                    onPress={goTo}
                    text={buttonText}
                    style={[buttonStyle, disabled ? {} : styles.continueBtnDisabled]}
                    textStyle={disabled ? {} : styles.continueBtnTextDisabled}
                    disabled={!disabled}
                />
            </View>
        </View>

    )
}
export default Footer
const styles = StyleSheet.create({
    footer: {
        width: '100%',
        marginTop: 40,
        paddingBottom: 68
    },
    container: {
        marginTop: 32,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    prevScreenContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    continueBtnDisabled: {
        backgroundColor: colors.lightGray,
    },
    continueBtnTextDisabled: {
        color: colors.white
    }

})