import React, { useEffect, useState } from "react";
import {
    View, 
    StyleSheet, 
    Text, 
    Image, 
    Linking, 
    ScrollView,
} from "react-native";
import IconO from "react-native-vector-icons/Octicons";
import { colors } from "../../assets/colors/colors";

import { client } from "../API/client";

function OvarianCancerTab({ }) {
    const [points, setPoints] = useState([]);

    useEffect(() => {
        client.getEntries()
            .then((response) => setPoints(response.items.find((item) => item.fields.ovarianCancer).fields.ovarianCancer))
            .catch((err) => console.log(err));
    }, []);

    const handleUrlPress = (url) => {
        if (Linking.canOpenURL(url)) {
            Linking.openURL(url);
        }
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        source={require("../../assets/images/ovarianCancerLogo.png")}
                    />
                    <Text style={styles.headerTitle}>
            Ovarian Cancer: The Basics
                    </Text>
                </View>
                <View>
                    {points.map((point, index) => (
                        <View
                            key={index}
                            style={styles.pointsContainer}
                        >
                            <IconO
                                name="dot-fill"
                                style={styles.blackDot}
                            />
                            <Text style={styles.point}>
                                {point.point}
                                {point.urlName
                                    && (
                                        <Text
                                            style={styles.link}
                                            onPress={() => handleUrlPress(point.url)}
                                        >
                                            {point.urlName}
                                        </Text>
                                    )}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1,
        padding: 20,
    },
    header: {
        alignItems: "center",
        flexDirection: "row",
    },
    headerTitle: {
        flex: 0.8,
        fontSize: 26,
        paddingLeft: 20,
    },
    pointsContainer: {
        flexDirection: "row",
        paddingVertical: 5,
    },
    point: {
        fontSize: 16,
        paddingLeft: 10,
    },
    blackDot: {
        alignSelf: "flex-start",
        padding: 2,
        top: 2,
    },
    link: {
        color: colors.hyperLinkBlue,
        fontSize: 16,
        textDecorationLine: "underline",
    },
});

export default OvarianCancerTab;
