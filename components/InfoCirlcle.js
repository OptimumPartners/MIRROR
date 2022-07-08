import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import IconAD from "react-native-vector-icons/AntDesign";

function InfoCirlcle({ onPress, size }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={onPress}
            >
                <IconAD
                    name='infocirlce'
                    style={styles.infoIcon}
                    size={size}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
})

export default InfoCirlcle;