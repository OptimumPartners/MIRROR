import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SELF_REFLECTION_ENTRY_ID } from '../env/env.json'

import Icon from 'react-native-vector-icons/Ionicons';
import { getContentfulData } from '../client';
import routes from '../navigators/routes';
import Container from '../components/shared/Container';
import { colors } from '../assets/colors/colors';
import Button from '../components/shared/Button';
import VerticalLine from '../components/shared/VerticalLine';
import CustomizedText from '../components/shared/CustomizedText';

function SelfReflectionScreen({ navigation }) {
    const [data, setData] = useState({})

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        const data = await getContentfulData(SELF_REFLECTION_ENTRY_ID);
        setData(data)
    }

    return data.content && (
        <Container style={styles.container}>
            <View style={styles.rowContainer}>
                <View style={styles.iconHeader}></View>

                <View style={styles.screenData}>
                    <Text style={styles.title}>{data.title}</Text>

                    <Text style={styles.subTitle}>{data.subtitle}</Text>

                    <View style={styles.content}>
                        <Text style={styles.contentTitle}>{data.content.title} </Text>

                        {data.content.questions.map((element, index) =>
                            <View key={index}>
                                <CustomizedText ul>{element}</CustomizedText>
                                {element.subText && element.subText.map((text, index) => (
                                    <CustomizedText key={index} ul style={styles.subTextContainer}>{text}</CustomizedText>
                                ))}
                            </View>
                        )}
                    </View>

                    <View style={styles.footer}>
                        <VerticalLine style={styles.verticalLine} />

                        <Text style={styles.footerTitle}>{data.footer}</Text>

                        <View style={styles.buttonsContainer}>
                            <Button onPress={() => { }} style={styles.footerBtn} text='Read Their Stories' />
                        </View>

                        <View style={styles.buttonsContainer}>
                            <Button onPress={() => { navigation.navigate(routes.FINAL_SCREEN) }} style={styles.footerBtn} text="I'm ready to discuss with my doctor" />
                        </View>
                    </View>

                </View>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name='close-sharp' size={24} />
                </TouchableOpacity>
            </View>

        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    rowContainer: {
        alignItems: "flex-start",
        flexDirection: 'row',
        width: '61%'
    },
    iconHeader: {
        borderRadius: 70,
        backgroundColor: colors.lightGray,
        height: 124,
        width: 124
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
    contentTitle: {
        color: colors.primaryText,
        fontSize: 14,
        fontWeight: "700",
        marginBottom: 24
    },
    subTextContainer: {
        marginLeft: 22
    },
    verticalLine: {
        marginVertical: 32
    },
    footerTitle: {
        color: colors.primaryText,
        fontSize: 14,
        fontWeight: "700",
        marginBottom: 16
    },
    buttonsContainer: {
        marginBottom: 16,
        flexDirection: 'row',
    }
})

export default SelfReflectionScreen;