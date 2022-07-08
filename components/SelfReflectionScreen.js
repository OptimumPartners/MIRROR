import React from 'react';
import { View, StyleSheet, Text, Image, Linking } from 'react-native';

import IconO from 'react-native-vector-icons/Octicons';

const url = "https://www.google.com/";
function SelfReflectionScreen({ }) {

    const questions = [
        "How worried are you about receiving a cancer diagnosis?",
        "How important is fertility to you?",
        "How do you feel about going into menopause?",
        "Are you comfortable taking medication to manage menopause?",
        "How concerned are you about undergoing surgery and anesthesia?",
    ]

    const handleUrlPress = () => {
        if (Linking.canOpenURL(url)) {
            Linking.openURL(url);
        }
        return;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require("../assets/images/selfReflectionLogo.png")}
                />
                <Text style={styles.title}>
                    Self-Reflection
                </Text>
            </View>
            <Text style={styles.subTitle}>
                How do I choose which option is right for me?
            </Text>
            <View style={styles.content}>
                <Text style={styles.contentTitle}>
                    Take a moment to consider your risk profile and
                    values by asking yourself the following questions:
                </Text>
                {questions.map((item, index) =>
                    <View
                        key={index}
                        style={styles.questionBox}
                    >
                        <IconO
                            name={"dot-fill"}
                            style={styles.blackDot}
                        />
                        <Text style={styles.question}>
                            {item}
                        </Text>
                    </View>
                )}
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerTitle}>
                    If you are interested in hearing
                    about the experiences of others in your position,
                    <Text
                        style={styles.link}
                        onPress={() => handleUrlPress()}
                    >
                        click here
                    </Text>
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
        padding: 20,
    },
    header: {
        alignItems: "center",
        flexDirection: "row",
    },
    title: {
        fontSize: 30,
    },
    subTitle: {
        fontSize: 24,
        fontStyle: "italic",
        fontWeight: "500",
        paddingVertical: 20,
        textAlign: "center",
    },
    contentTitle: {
        fontSize: 22,
        fontWeight: "500",
        textAlign: "left",
    },
    questionBox: {
        flexDirection: "row",
    },
    blackDot: {
        alignSelf: "flex-start",
        paddingHorizontal: 5,
        top: 5,
    },
    question: {
        fontSize: 18,
    },
    footer: {
        paddingVertical: 30,
    },
    footerTitle: {
        fontSize: 22,
        fontWeight: "500",
    },
    link: {
        textDecorationLine: "underline",
    },
})

export default SelfReflectionScreen;