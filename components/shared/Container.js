import React, { useState } from 'react'
import { ActivityIndicator, Dimensions, SafeAreaView, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { colors } from '../../assets/colors/colors'

const Container = ({ children, style }) => {
    const [ShowLoading, setShowLoading] = useState(false)

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <ScrollView>
                {!ShowLoading ?
                    <View style={[styles.container, style]}>
                        {children}
                    </View>
                    :
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator color={colors.lightBlue} size='large' />
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    )
}
export default Container

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        paddingBottom: 68,
        paddingTop: 54,
    },
    safeAreaView: {
        backgroundColor: colors.white,
        minHeight: Dimensions.get('window').height,
    }
})