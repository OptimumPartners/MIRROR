import React, { useState, useEffect } from "react";
import {
    View, 
    StyleSheet, 
    Text, 
    Image, 
    ScrollView,
} from "react-native";

import IconO from "react-native-vector-icons/Octicons";
import { colors } from "../../assets/colors/colors";

import { client } from "../API/client";

function FertilityTab({ }) {
    const [pathways, setPathways] = useState([]);

    useEffect(() => {
        client.getEntries()
            .then((response) => {
                setPathways(response.items.find((item) => item.fields.pathways).fields.pathways);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        source={require("../../assets/images/fertility.png")}
                    />
                    <Text style={styles.headerTitle}>
            Fertility Considerations
                    </Text>
                </View>

                <View style={styles.banner}>
                    <Text style={styles.bannerTitle}>
            There are many different pathways to parenthood.
                    </Text>
                    <View>
                        {pathways.map((pathway, index) => (
                            <View key={index}>
                                <View style={styles.pathwayBox}>
                                    <IconO
                                        name="dot-fill"
                                        style={styles.blackDot}
                                    />
                                    <Text style={styles.pathway}>
                                        {pathway.pathway}
                                    </Text>
                                </View>
                                {pathway.subPoints
                                    && pathway.subPoints.map((subpoint, index) => (
                                        <View key={index} style={styles.subPoints}>
                                            <IconO
                                                name="dot-fill"
                                                style={styles.blackDot}
                                            />
                                            <Text style={styles.subPoint}>
                                                {subpoint}
                                            </Text>
                                        </View>
                                    ))}
                            </View>
                        ))}
                    </View>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerTitle} />
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
        flex: 1,
        fontSize: 30,
        paddingLeft: 15,
    },
    bannerTitle: {
        fontSize: 19,
        fontWeight: "500",
        paddingVertical: 10,
    },
    pathwayBox: {
        alignItems: "center",
        flexDirection: "row",
        padding: 5,
    },
    pathway: {
        fontSize: 19,
        paddingLeft: 5,
    },
    subPoints: {
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 20,
    },
    subPoint: {
        fontSize: 19,
        paddingLeft: 5,
    },
    blackDot: {
        alignSelf: "flex-start",
        top: 2,
    },

});

export default FertilityTab;
