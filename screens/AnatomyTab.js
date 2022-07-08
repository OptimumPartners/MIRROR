import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { colors } from '../assets/colors/colors';

import IconAD from "react-native-vector-icons/AntDesign";

import { client } from "../client"

function AnatomyTab({ }) {

    const [data, setData] = useState([])

    useEffect(() => {
        client.getEntries()
            .then((response) => setData(response.items.find((item) => item.fields.anatomy).fields.anatomy))
            .catch((err) => console.log(err))
    }, [])

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        source={require("../assets/images/anatomy.png")}
                    />
                    <Text style={styles.headerTitle}>
                        Anatomy Review
                    </Text>

                </View>
                <View>
                    <Image
                        source={require("../assets/images/uterus.png")}
                        style={styles.uterus}
                        resizeMode={"cover"}
                    />
                </View>
                <View style={styles.banner}>
                    <View style={styles.section}>
                        <Text style={styles.boldTitle}>
                            Uterus:
                        </Text>
                        {data?.uterus?.map((uterusPoint, index) =>
                            <View key={index} style={styles.uterusPointsContainer}>
                                <IconAD
                                    name='minus'
                                    color={colors.black}
                                    style={styles.iconMore}
                                />
                                <Text style={styles.uterusPoint}>
                                    {uterusPoint}
                                </Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.boldTitle}>
                            Fallopian Tube:
                            <Text style={styles.defaultText}>
                                {data.fallopianTube}
                            </Text>
                        </Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.boldTitle}>
                            Ovary:
                            <Text style={styles.defaultText}>
                                {data.ovary}
                            </Text>
                        </Text>
                    </View>
                    <View>
                        <Image
                            source={require("../assets/images/anatomy2.png")}
                            style={styles.uterus}
                            resizeMode={"cover"}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        zIndex: 1,
        paddingHorizontal: 20,
        top: 40,
    },
    headerTitle: {
        fontSize: 26,
        paddingLeft: 20,
    },
    boldTitle: {
        fontWeight: "700",
    },
    defaultText: {
        fontWeight: "400",
    },
    uterusPointsContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    banner: {
        paddingLeft: 10,
    },
    uterus: {
        alignSelf: "center",
        // height: 250,
        width: 250
    },
    uterusPoint: {
        fontSize: 16,
        paddingLeft: 10,
    },
    section: {
        paddingVertical: 10,
        paddingHorizontal: 10,
    }
})

export default AnatomyTab;