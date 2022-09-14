import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { WELCOMING_ENTRY_ID } from '../env/env.json'
import { colors } from '../assets/colors/colors';
import { getContentfulData } from '../client';

import HyperLinkBox from '../components/HyperLinkBox';
import Button from '../components/shared/Button';
import Container from '../components/shared/Container';
import VerticalLine from '../components/shared/VerticalLine';
import routes from '../navigators/routes';
import LearnMore from '../components/shared/LearnMore';
import { ScrollView } from 'react-native-gesture-handler';

function IntroScreen({ navigation }) {
    const [data, setData] = useState({})
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        setData(await getContentfulData(WELCOMING_ENTRY_ID))
    }

    return (
        <Container>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>

                    <View>
                        <Text style={styles.articleTitle}>
                            {data.welcomeTitle}
                        </Text>
                    </View>
                    <View>
                        <Text style={[styles.section, styles.introGraph]}>
                            {data.welcomeGraph}
                        </Text>
                        <Text style={styles.section}>
                            If you have not yet had genetic counseling,
                            you can find a genetic counselor at:
                            <HyperLinkBox
                                title={" nsgc.org"}
                                url={"https://www.nsgc.org/"}
                            />
                            .
                        </Text>
                        <Text style={styles.section}>
                            Recommendations are based on the guidelines of the
                            <HyperLinkBox
                                title={" NCCN "}
                                url={"https://www.nccn.org/login?ReturnURL=https://www.nccn.org/professionals/physician_gls/pdf/genetics_bop.pdf"}
                            />
                            and personalized based on your preferences.
                        </Text>
                    </View>
                    <VerticalLine style={styles.verticalLine} />
                    <Button
                        text="Let's Get Started"
                        style={styles.button}
                        textStyle={styles.buttonText}
                        onPress={() => navigation.navigate(routes.QUESTIONS_SCREEN)}
                    />
                </View>
            </ScrollView>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 56,
        width: 492
    },
    scrollView: {
       flex:1
    },
    articleTitle: {
        color: colors.primaryText,
        fontSize: 40,
    },
    introGraph: {
        fontSize: 24,
    },
    section: {
        color: colors.primaryText,
        fontSize: 14,
        fontWeight: '500',
        paddingTop: 32,
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