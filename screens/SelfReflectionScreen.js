import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, Linking, TouchableOpacity } from 'react-native';
import { SELF_REFLECTION_ENTRY_ID } from '../env/env.json'

import IconO from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/Ionicons';
import { getContentfulData } from '../client';
import Footer from '../components/shared/Footer';
import routes from '../navigators/routes';
import Container from '../components/shared/Container';
import { colors } from '../assets/colors/colors';
import Button from '../components/shared/Button';
import VerticalLine from '../components/shared/VerticalLine';

function SelfReflectionScreen({navigation }) {
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
                <Image source={require("../assets/images/selfReflectionLogo.png")} />

                <View style={styles.screenData}>
                    <Text style={styles.title}>{data.title}</Text>

                    <Text style={styles.subTitle}>{data.subtitle}</Text>

                    <View style={styles.content}>
                        <Text style={styles.contentTitle}>{data.content.title} </Text>

                        {data.content.questions.map((item, index) =>
                            <View key={index} style={styles.questionBox}>
                                <IconO name={"dot-fill"} style={styles.blackDot} size={9} />
                                <Text style={styles.question}>{item}</Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.footer}>
                        <VerticalLine style={styles.verticalLine} />
                        <Text style={styles.footerTitle}>{data.footer}</Text>
                        <Button onPress={() => {} } style={styles.footerBtn} text='Read Their Stories' />
                    </View>

                </View>
                <TouchableOpacity onPress={() => navigation.navigate(routes.SURGICAL_OPTIONS)}>
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
    questionBox: {
        flexDirection: "row",
        marginTop: 17
    },
    blackDot: {
        alignSelf: "flex-start",
        marginHorizontal: 5,
        top: 3,
    },
    question: {
        color: colors.primaryText,
        fontSize: 14,
        fontWeight: '500'
    },
    verticalLine: {
        marginVertical: 32
    },
    footerBtn: {
        width: 194
    },
    footerTitle: {
        color: colors.primaryText,
        fontSize: 14,
        fontWeight: "700",
        marginBottom: 16
    }
})

export default SelfReflectionScreen;