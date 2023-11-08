import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import { colors } from '../assets/colors/colors';
import Container from '../components/shared/Container';

function WelcomeScreen({ navigation }) {


    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("IntroScreen")
        }, 2000)
    }, [])

    return (
        <Container>
            <View style={styles.container}>
                <Image source={require("../assets/images/logo.png")} style={styles.logo} />
                <Image source={require('../assets/images/nameLogo.png')} style={styles.nameLogo} />

                <View>
                    <Text style={styles.introText}>
                        <Text style={styles.specialCharacter}>M</Text>y
                        <Text style={styles.specialCharacter}> I</Text>ndividualzed
                        <Text style={styles.specialCharacter}> R</Text>isk
                        <Text style={styles.specialCharacter}> R</Text>eduction for
                        <Text style={styles.specialCharacter}> O</Text>varian
                        Cance<Text style={styles.specialCharacter}>r</Text>
                    </Text>
                </View>
            </View>

        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '45.6%'
    },
    logo: {
        marginTop: 96,
        height: 200,
        width: 162,
    },
    nameLogo: {
        marginTop: 40,
        marginBottom: 17
    },
    introText: {
        color: colors.primaryText,
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center'
    },
    specialCharacter: {
        color: colors.lightBlue
    }
})

export default WelcomeScreen;