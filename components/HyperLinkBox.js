import React from 'react';
import { View, StyleSheet, Text, Linking } from 'react-native';

import { colors } from '../assets/colors/colors';

function HyperLinkBox({ title, url }) {
    return (
        <Text
            style={styles.title}
            onPress={() => Linking.openURL(url)}
        >
            {title}
        </Text>
    );
}

const styles = StyleSheet.create({
    title: {
        color: colors.hyperLinkBlue,
        textDecorationLine: "underline",
    },
})

export default HyperLinkBox;