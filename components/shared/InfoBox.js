import React, { useContext, useEffect, useRef, useState } from 'react'
import { Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../assets/colors/colors';
import { Blur } from '../../contexts/BlurContext';
import CustomizedText from './CustomizedText';

const InfoBox = ({ data, style = {}, boxStyle = {}, iconColor = colors.primaryText }) => {
    const [openInfo, setOpenInfo] = useState(false)
    const [pageX, setPageX] = useState(0)

    const { blur, setBlur } = useContext(Blur)
    const boxRef = useRef(null)

    useEffect(() => {
        if (!blur) setOpenInfo(blur)
    }, [blur])

    const onLayout = (e) => {
        boxRef.current.measure((x, y, width, height, pageX,) => {
            setPageX(pageX - Dimensions.get('window').width + 25)
        })
    }

    return (
        <View ref={boxRef} onLayout={onLayout} style={[styles.container, style]} >
            <TouchableOpacity onPress={() => { setBlur(!blur); setOpenInfo(!blur) }}>
                <Icon
                    name='information-circle-outline'
                    size={21}
                    color={openInfo && blur ? colors.lightBlue : iconColor}
                />
            </TouchableOpacity>

            <View style={[styles.holder, { right: pageX }]}>
                {openInfo && blur && <View style={[styles.boxContainer, boxStyle]}>
                    <Icon
                        style={styles.triangle}
                        name='caret-back-sharp'
                        color={colors.lightBlue}
                        size={20}
                    />

                    <View style={styles.box} >
                        {data.title && <Text style={styles.boxTitle}>{data.title}</Text>}
                        {data.content.map((info, index) => (
                            <CustomizedText key={index} style={styles.boxContent}>{info}</CustomizedText>
                        ))}
                    </View>
                </View>}
            </View>
        </View>
    )
}
export default InfoBox
const styles = StyleSheet.create({
    container: {
        marginLeft: 15,
    },
    holder: {
        position: 'absolute',
        zIndex: 1
    },
    boxContainer: {
        flexDirection: 'row',
    },
    triangle: {
        left: 6,
    },
    box: {
        backgroundColor: colors.lightestGray,
        borderLeftColor: colors.lightBlue,
        borderLeftWidth: 4,
        bottom: 16,
        padding: 16,
        width: 238,
    },
    boxTitle: {
        color: colors.primaryText,
        fontSize: 12,
        fontWeight: '700'
    },
    boxContent: {
        color: colors.primaryText,
        fontSize: 12,
        fontWeight: '500',
    }
})