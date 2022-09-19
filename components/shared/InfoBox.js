import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../assets/colors/colors';

const InfoBox = ({ data, style = {} }) => {
    const [openInfo, setOpenInfo] = useState(false)

    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity onPress={() => setOpenInfo(!openInfo)}>
                <Icon
                    style={styles.infoIcon}
                    name='information-circle-outline'
                    size={21}
                    color={openInfo ? colors.lightBlue : colors.primaryText}
                />
            </TouchableOpacity>

            {openInfo && <View style={styles.boxContainer}>
                <Icon
                    style={styles.triangle}
                    name='caret-back-sharp'
                    color={colors.lightBlue}
                    size={20}
                />

                <View style={styles.box} >
                    <Text style={styles.boxTitle}>{data.title}</Text>
                    {data.content.map((info, index) => (
                        <Text key={index} style={styles.boxContent}>{info}</Text>
                    ))}
                </View>
            </View>}
        </View>
    )
}
export default InfoBox
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    boxContainer: {
        flexDirection: 'row',
        marginLeft: 16,
        position: 'absolute',
    },
    infoIcon: {
    },
    triangle: {
        left: 6,
    },
    box: {
        backgroundColor: colors.lightestGray,
        borderLeftColor: colors.lightBlue,
        borderLeftWidth: 4,
        padding: 16,
        width: 238,
        marginLeft: 0,
        bottom: 16
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
        marginTop: 16
    }
})