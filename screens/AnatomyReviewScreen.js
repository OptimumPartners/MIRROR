import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { colors } from '../assets/colors/colors';

import IconAD from "react-native-vector-icons/AntDesign";
import IconO from "react-native-vector-icons/Octicons";

import { client } from "../client"

function AnatomyReviewScreen({ navigation, route }) {

    const [symptomas, setSymptomas] = useState([])
    const [basics, setBasics] = useState([])


    useEffect(() => {
        client.getEntries()
            .then((response) => {
                setSymptomas(response.items.find((item) => item.fields.symptomas).fields.symptomas)
                setBasics(response.items.find((item) => item.fields.basics).fields.basics)
            })
            .catch((err) => console.log(err))
    }, [])


    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>
                        Anatomy Review
                    </Text>
                    <Image
                        source={require("../assets/images/uterus.png")}
                        style={styles.uterusImage}
                    />
                </View>
                <View style={styles.uterusContentContainer}>
                    <Text style={styles.boldTitle}>
                        Uterus:
                    </Text>
                    <View style={styles.symptomsContaier}>
                        {symptomas.map((symptom, index) =>
                            <View
                                style={styles.rowedBox}
                                key={index}
                            >
                                <IconAD
                                    name='minus'
                                    color={colors.black}
                                    style={styles.iconMore}
                                />
                                <Text style={styles.symptom}>
                                    {symptom}
                                </Text>
                            </View>
                        )}
                    </View>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.notBoldSubtitle}>
                            <Text style={styles.boldTitle}>
                                Fallopian tube:
                            </Text>  Transport of egg and sperm,
                            no hormonal function
                        </Text>
                    </View>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.notBoldSubtitle}>
                            <Text style={styles.boldTitle}>
                                Ovary:
                            </Text>  Egg and hormone production
                        </Text>
                    </View>
                </View>
                <View style={styles.cancerBasics}>
                    <Text style={styles.largeText}>
                        Ovarian Cancer: The Basics
                    </Text>
                    {basics.map((text, index) =>
                        <View
                            style={styles.rowedBox}
                            key={index}
                        >
                            <IconO
                                name={"dot-fill"}
                                color={colors.black}
                                style={styles.blackDot}
                            />
                            <Text style={styles.notBoldSubtitle}>
                                {text}
                            </Text>
                        </View>
                    )}
                </View>
                <View style={styles.backToYourStory}>
                    <Text style={styles.backToYourStoryText}>Now, back to your story   </Text>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate(
                                "AdditionalQuestionsScreen",
                                route.params,
                            )
                        }
                    >
                        <IconAD
                            name={"forward"}
                            size={20}
                            color={colors.black}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
    headerText: {
        color: colors.black,
        fontSize: 30,
        paddingVertical: 20,
        position: "absolute",
        zIndex: 20,
    },
    uterusImage: {
        alignSelf: "center",
    },
    uterusContentContainer: {
        top: -25,
    },
    boldTitle: {
        color: colors.black,
        fontSize: 17,
        fontWeight: "500",
    },
    rowedBox: {
        flexDirection: "row",
    },
    symptom: {
        fontSize: 15,
        lineHeight: 20,
        paddingLeft: 10,
    },
    sectionContainer: {
        paddingVertical: 10,
    },
    notBoldSubtitle: {
        color: colors.black,
        fontSize: 17,
    },
    largeText: {
        color: colors.black,
        fontSize: 25,
        paddingVertical: 20,
    },
    blackDot: {
        paddingRight: 10,
    },
    backToYourStory: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingVertical: 10,
    },
    backToYourStoryText: {
        fontSize: 20,
        fontWeight: "500",
    }
})

export default AnatomyReviewScreen;
