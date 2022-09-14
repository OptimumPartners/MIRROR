import React from 'react';
import { StyleSheet, Text, Linking, TouchableOpacity, } from 'react-native';

import { colors } from '../assets/colors/colors';

function HyperLinkBox({ title, url }) {
    return (

        <Text onPress={() => Linking.openURL(url)} style={styles.title}>
            {title}
        </Text>

    );
}

const styles = StyleSheet.create({
    title: {
        color: colors.lightBlue,
    },
})

export default HyperLinkBox;