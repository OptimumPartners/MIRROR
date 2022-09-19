import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../assets/colors/colors'
import { getContentfulData } from '../client'
import Button from '../components/shared/Button'
import Container from '../components/shared/Container'
import { FINAL_SCREEN_ENTRY_ID } from '../env/env.json'
import Icon from 'react-native-vector-icons/Ionicons';

const FinalScreen = ({ navigation }) => {
    const [data, setData] = useState({})

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        const data = await getContentfulData(FINAL_SCREEN_ENTRY_ID);
        setData(data)
    }

    return (
        <Container>
            <View style={styles.container}>
                <Image style={styles.logo} source={require('../assets/images/logo.png')} />
                <Image source={require('../assets/images/nameLogo.png')} />

                <Text style={styles.title}>{data.title}</Text>
                <Text style={styles.subtitle}>{data.subtitle}</Text>

                <Button style={styles.button} text="I'm Ready" />

                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={styles.prevScreenContainer}>
                        <Icon name='arrow-back' size={22} color={colors.primaryText} />
                        <Text style={styles.prevText}>Make an Edit</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </Container>
    )
}
export default FinalScreen
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '61.3%'
    },
    logo: {
        height: 100,
        marginBottom: 16,
        marginTop: 56,
        width: 81,
    },
    title: {
        color: colors.primaryText,
        fontSize: 40,
        fontWeight: '500',
        marginTop: 47,
        marginBottom: 16,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'center'
    },
    button: {
        marginTop: 48,
        marginBottom: 32
    },
    prevScreenContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 112,
    },
    prevText: {
        color: colors.primaryText,
        fontSize: 14,
        fontWeight: '700'
    }
})