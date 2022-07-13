import React from "react";
import { StyleSheet, View, Image } from "react-native";

function CustomTabBarIcon({ imgSource }) {
    return (
        <View style={styles.container}>
            <Image
                style={styles.img}
                source={imgSource}
                resizeMode="cover"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 10,
    },
    img: {
        width: 40,
        height: 40,
    },
});

export default CustomTabBarIcon;
