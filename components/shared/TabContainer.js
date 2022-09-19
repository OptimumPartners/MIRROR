import React, { useEffect, useState } from 'react'
import { Dimensions, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../../assets/colors/colors'
import Button from './Button'
import Container from './Container'
import VerticalLine from './VerticalLine'
import Icon from 'react-native-vector-icons/Ionicons';

const TabContainer = ({ children, data, navigation }) => {
    const [imageAspects, setImageAspects] = useState({})
    useEffect(() => {
        if (data.headerIcon) {
            Image.getSize(`https:${data.headerIcon.fields.file.url}`, (width, height) => { setImageAspects({ width, height }) });

        }
    }, [data])

    return (
        <Container style={styles.container}>
            <View style={styles.rowContainer}>
                <View style={styles.iconContainer}>
                    {data.headerIcon && <Image style={imageAspects} source={{ uri: `https:${data.headerIcon.fields.file.url}` }} />}
                </View>

                <View style={styles.screenData}>
                    <Text style={styles.title}>{data.title}</Text>

                    <Text style={styles.subTitle}>{data.subtitle}</Text>

                    {children}

                    {data.footer || data.footerText && <View style={styles.footer}>
                        <VerticalLine style={styles.verticalLine} />

                        <Text style={styles.footerTitle}>{data.footer || data.footerText}</Text>

                        <View style={styles.buttonsContainer}>
                            {data.buttons && data.buttons.map(button => (
                                <Button key={button.value} onPress={() => Linking.openURL(button.url)} style={styles.footerBtn} text={button.value} />
                            ))}
                        </View>
                    </View>}

                </View>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name='close-sharp' size={24} />
                </TouchableOpacity>
            </View>
        </Container>

    )
}
export default TabContainer
const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start'
    },
    rowContainer: {
        alignItems: "flex-start",
        flexDirection: 'row',
        marginLeft: '19.5%',
        width: '61%'
    },
    iconContainer: {
        alignItems: 'center',
        backgroundColor: colors.purple,
        borderRadius: 70,
        justifyContent: 'center',
        padding: 30,
        height: 124,
        width: 124,
    },
    screenData: {
        width: '61.9%',
        marginLeft: '7%',
        marginRight: '9.7%'
    },
    title: {
        color: colors.gray,
        fontSize: 10,
        fontWeight: '600',
        marginBottom: 16
    },
    subTitle: {
        color: colors.primaryText,
        fontSize: 24,
        fontWeight: "500",
        marginBottom: 24
    },
    verticalLine: {
        marginVertical: 32
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    footerTitle: {
        color: colors.primaryText,
        fontSize: 14,
        fontWeight: "700",
        marginBottom: 16
    },
    footerBtn: {
        marginRight: '5.9%'
    }
})