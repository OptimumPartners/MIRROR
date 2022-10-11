import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { WELCOMING_ENTRY_ID } from '../env/env.json'
import { colors } from '../assets/colors/colors';
import { getContentfulData } from '../client';

import Button from '../components/shared/Button';
import Container from '../components/shared/Container';
import VerticalLine from '../components/shared/VerticalLine';
import routes from '../navigators/routes';
import CustomizedText from '../components/shared/CustomizedText';
import LearnMore from '../components/shared/LearnMore';

function IntroScreen({ navigation }) {
    const [data, setData] = useState({})
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        setData(await getContentfulData(WELCOMING_ENTRY_ID))
    }

    return data.content && (
        <Container>
                <View style={styles.container}>
                    <Text style={styles.articleTitle}>{data.welcomeTitle}</Text>

                    <Text style={[styles.section, styles.introGraph]}>{data.welcomeGraph}</Text>

                    {data.content.map((element, index) => (
                        <CustomizedText key={index} textStyle={styles.section}>{element}</CustomizedText>
                    ))}

                    <VerticalLine style={styles.verticalLine} />

                    <Button
                        text="Let's Get Started"
                        style={styles.button}
                        textStyle={styles.buttonText}
                        onPress={() => navigation.navigate(routes.QUESTIONS_SCREEN)}
                    />
                </View>
            <LearnMore navigate={navigation.navigate} />

        </Container >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 56,
        width: 492
    },
    articleTitle: {
        color: colors.primaryText,
        fontSize: 40,
    },
    introGraph: {
        color: colors.primaryText,
        fontSize: 24,
        fontWeight: '500',
    },
    section: {
        marginTop: 32,
    },
    button: {
        alignSelf: 'flex-end',
        height: 48,
        width: 184,
    },
    buttonText: {
        color: colors.white,
        fontWeight: '700',
        fontSize: 14
    },
    verticalLine: {
        marginVertical: 40
    }

})

export default IntroScreen;