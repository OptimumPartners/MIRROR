import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import { colors } from '../assets/colors/colors';

function WelcomeScreen({ navigation }) {


    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("IntroScreen")
        }, 2000)
    }, [])

    return (
        <View style={styles.container}>
            <View>
                <Image
                    source={require("../assets/images/logo.png")}
                    style={styles.logo}
                />
                <Text
                    style={styles.appTitle}
                >
                    MIRROR
                </Text>
            </View>
            <View>
                <Text style={styles.introText}>
                    <Text style={styles.underLineLetter}>M</Text>y <Text style={styles.underLineLetter}>I</Text>ndividualzed <Text style={styles.underLineLetter}>R</Text>isk <Text style={styles.underLineLetter}>R</Text>eduction
                    <Text>for <Text style={styles.underLineLetter}>O</Text>varian Cance<Text style={styles.underLineLetter}>r</Text></Text>
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingVertical: 50,
        backgroundColor: colors.white,
    },
    logo: {
        width: 150,
        height: 150,
        position: "absolute",
    },
    appTitle: {
        color: colors.black,
        fontSize: 60,
        fontWeight: "500",
        textAlign: "center",
        paddingVertical: 45,
    },
    introText: {
        fontSize: 30,
        color: colors.black,
        textAlign: "center",
        paddingHorizontal: 50
    },
    underLineLetter: {
        textDecorationLine: "underline",
        fontWeight: "500",
    }
})

export default WelcomeScreen;