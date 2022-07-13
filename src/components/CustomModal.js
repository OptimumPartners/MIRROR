import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { colors } from "../../assets/colors/colors";

function CustomModal({ article }) {
    return (
        <View style={styles.container}>
            <Text style={styles.modalContent}>
                {article}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "center",
        backgroundColor: colors.lightGray,
        borderRadius: 15,
        padding: 20,
        position: "absolute",
        zIndex: 100,
    },
    modalContent: {
        color: colors.black,
    },
});

export default CustomModal;
