import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../assets/colors/colors';
import { Dimensions } from 'react-native';
import NumberInput from './NumberInput';

const DropDown = ({ placeHolder = '', label = '', options, onSelect, dropDownHeader, value, placeholderStyle = {}, arrowSize = 26, isInput = false }) => {
    const [openDropDown, setOpenDropDown] = useState(false);
    const [blur, setBlur] = useState(false)

    const toggleDropDown = () => {
        setBlur(!openDropDown)
        setOpenDropDown(!openDropDown)
    };

    return (<>
        <View style={[styles.container, blur ? styles.containerOnBlur : {}]}>

            {label && <Text style={styles.label}>{label}</Text>}

            <TouchableWithoutFeedback onPress={toggleDropDown}>
                <View style={styles.dropDown}>
                    <Text style={[styles.placeHolder, placeholderStyle]}>{value || placeHolder}</Text>
                    <Icon name='chevron-down' color={colors.lightBlue} size={arrowSize} />
                </View>
            </TouchableWithoutFeedback>

            <View style={styles.dashedLine}></View>

            {openDropDown && <View style={styles.options}>
                {dropDownHeader &&
                    <View style={styles.option}>
                        <Text style={styles.headerOption}>{dropDownHeader}</Text>
                        <Icon name='chevron-up' color={colors.darkGray} size={arrowSize} />
                    </View>
                }

                {options && options.map(option => {
                    const selected = value === option
                    return (
                        <TouchableOpacity
                            key={option}
                            onPress={() => {
                                toggleDropDown();
                                onSelect(option);
                            }}
                        >
                            <View style={[styles.option, selected && styles.optionSelected]}>
                                <Text style={[styles.optionValue, selected && styles.optionValueSelected]}>{option}</Text>
                                {selected && <Text style={styles.selected}>SELECTED</Text>}
                            </View>
                        </TouchableOpacity>
                    )
                })}
                {isInput && <NumberInput style={styles.numberInput} onChange={onSelect} value={value} />}
            </View>}
        </View>
        {blur && <TouchableWithoutFeedback onPress={toggleDropDown}>
            <View style={styles.blur}></View>
        </TouchableWithoutFeedback>}
    </>
    )
}
export default DropDown
const styles = StyleSheet.create({
    container: {
        zIndex: -1,
    },
    containerOnBlur: {
        zIndex: 1,
    },
    dropDown: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        backgroundColor: colors.white,
        paddingBottom: 8
    },
    label: {
        color: colors.darkGray,
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 8,
    },
    placeHolder: {
        color: colors.primaryText,
        fontSize: 24,
        fontWeight: '500',
        marginRight: 11,
    },
    options: {
        position: 'absolute',
        width: 323,
        borderRadius: 4,
        backgroundColor: colors.white,
        marginTop: 24,
        paddingBottom: 14,
        paddingTop: 5
    },
    headerOption: {
        color: colors.darkGray,
        fontSize: 10,
        fontWeight: '600'
    },
    option: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
        paddingRight: 18,
        paddingLeft: 16,
    },
    optionSelected: {
        backgroundColor: colors.lightBlue
    },
    selected: {
        color: colors.white,
        fontSize: 10,
        fontWeight: '600'
    },
    optionValue: {
        color: colors.primaryText,
        fontSize: 14,
        fontWeight: '500',
    },
    optionValueSelected: {
        color: colors.white,
        fontWeight: '700'
    },
    blur: {
        backgroundColor: colors.blur,
        height: Dimensions.get('window').height * 2,
        width: Dimensions.get('window').width * 2,
        position: 'absolute',
        top: -100,
        right: -500
    },
    numberInput: {
        alignSelf:'center',
        borderColor: colors.lightBlue,

    },
    dashedLine: {
        borderColor: colors.lightBlue,
        borderWidth: 2,
        marginTop: -2,
        borderStyle: 'dashed',
        width: '100%',
        zIndex: -1
    }
})