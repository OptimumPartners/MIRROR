import React, { useState, useEffect } from "react";
import {
    View, 
    StyleSheet, 
    Text, 
    TouchableWithoutFeedback, 
    Image,
} from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';

import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";

import IconAD from "react-native-vector-icons/AntDesign";
import IconO from "react-native-vector-icons/Octicons";
import { colors } from "../../assets/colors/colors";
import { client } from "../API/client";

IconAD.loadFont();
IconO.loadFont();

function StatisticsScreen() {
    const navigation = useNavigation();
    const route = useRoute();

    const [riskList, setRiskList] = useState([]);
    const data = route.params;

    useEffect(() => {
        client.getEntries()
            .then((res) => setRiskList(res.items.find((item) => item.fields.risks).fields.risks))
            .catch((err) => console.log(err));
    }, []);

    const reasons = [
        "As you age, your risk for ovarian cancer increases.",
        "Recommended age for risk-reducing surgery is based on the age when your risk (based on your mutation) is higher than the risk of the general population.",
        data.answerTwo === "Yes" && "The age of recommended surgery may also be changed based on the age of your family member(s) with ovarian cancer.",
    ];

    const images = {
        lynch: require("../../assets/images/statistics2.png"),
        other: require("../../assets/images/statistics.png"),
    };

    return (
        <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.outerContainer}
        >
            <TouchableWithoutFeedback
                onPress={() => navigation.navigate(
                    "AnatomyIntroScreen",
                    {
                        data,
                    },
                )}
            >
                <View style={styles.container}>
                    <View style={styles.banner}>
                        <Text style={styles.bannerRiskDescription}>
              Removal of your ovaries and tubes
              will substantially reduce your risk of ovarian cancer.
                        </Text>
                        <Text style={styles.bannerUnderLinedTitle}>
              Understanding Your Risk
                        </Text>
                        <View>
                            {riskList.map((risk, index) => {
                                if (risk) {
                                    return (
                                        <View
                                            key={index}
                                            style={styles.textFragmentContainer}
                                        >
                                            <IconO
                                                name="dot-fill"
                                                color={colors.black}
                                                style={styles.blackDot}
                                            />
                                            <Text style={styles.fragment}>
                                                {risk}
                                            </Text>
                                        </View>
                                    );
                                }
                            })}
                        </View>
                    </View>
                    <View style={styles.statisticsImageContainer}>
                        <Image
                            source={
                                data.geneticResult === "Lynch"
                                    ? images.lynch
                                    : images.other
                            }
                        />
                    </View>
                    {data.geneticResult !== "Lynch"
                        && (
                            <View style={styles.doesAgeMatter}>
                                <Text style={styles.bannerUnderLinedTitle}>
                            Does Age Matter?
                                </Text>
                                <View>
                                    {reasons.map((reason, index) => {
                                        if (reason) {
                                            return (
                                                <View
                                                    key={index}
                                                    style={styles.textFragmentContainer}
                                                >
                                                    <IconO
                                                        name="dot-fill"
                                                        color={colors.black}
                                                        style={styles.blackDot}
                                                    />
                                                    <Text style={styles.fragment}>
                                                        {reason}
                                                    </Text>
                                                </View>
                                            );
                                        }
                                    })}
                                </View>
                            </View>
                        )}
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
    },
    container: {
        backgroundColor: colors.white,
        flex: 1,
        paddingVertical: 20,
    },
    baseLine: {
        backgroundColor: colors.white,
        borderColor: colors.black,
        borderStyle: "solid",
        borderWidth: 2,
        marginHorizontal: 20,
        width: 200,
    },
    iconMore: {
        alignSelf: "center",
        borderBottomWidth: 2,
        borderRightWidth: 2,
        padding: 5,
    },
    baseLineHeader: {
        flexDirection: "row",
    },
    baseLineHeaderTitle: {
        color: colors.black,
        flex: 1,
        fontSize: 20,
        fontWeight: "500",
        textAlign: "center",
    },
    baseLineContent: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    dataOption: {
        color: colors.gray,
        fontSize: 20,
        fontWeight: "500",
        marginRight: 7,
        textDecorationLine: "underline",
    },
    dataOptionInfo: {
        color: colors.black,
        fontSize: 20,
        fontWeight: "500",
    },
    banner: {
        paddingHorizontal: 20,
    },
    bannerRiskDescription: {
        color: colors.black,
        fontSize: 22,
        fontWeight: "500",
        paddingVertical: 5,
    },
    bannerUnderLinedTitle: {
        color: colors.black,
        fontSize: 24,
        fontWeight: "500",
        paddingBottom: 5,
        textDecorationLine: "underline",
    },
    doesAgeMatter: {
        paddingHorizontal: 20,
    },
    textFragmentContainer: {
        flexDirection: "row",
    },
    blackDot: {
        top: 5,
    },
    fragment: {
        color: colors.black,
        fontSize: 18,
        paddingLeft: 10,
    },
    statisticsImageContainer: {
        alignItems: "center",
    },
});

export default StatisticsScreen;
