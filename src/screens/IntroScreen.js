import React from "react";
import {
    View,
    StyleSheet, 
    Text, 
    TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../assets/colors/colors";

import HyperLinkBox from "../components/HyperLinkBox";

function IntroScreen() {

    const navigation = useNavigation();

    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate("QuestionsScreen")}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.articleTitle}>
            Welcome to MIRROR
                    </Text>
                </View>
                <View style={styles.sections}>
                    <Text style={styles.section}>
            This tool is intended for patients
            who have had genetic counseling and
            are coming to see a gynecologic surgeon.
                    </Text>
                    <Text style={styles.section}>
            If you have not yet had genetic counseling,
            you can find a genetic counselor at:
                        <HyperLinkBox
                            title=" nsgc.org"
                            url="https://www.nsgc.org/"
                        />
            .
                    </Text>
                    <Text style={styles.section}>
            Recommendations are based on the guidelines of the
                        <HyperLinkBox
                            title=" NCCN "
                            url="https://www.nccn.org/login?ReturnURL=https://www.nccn.org/professionals/physician_gls/pdf/genetics_bop.pdf"
                        />
            and personalized based on your preferences.
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    articleTitle: {
        color: colors.black,
        fontSize: 48,
        paddingBottom: 40,
    },
    section: {
        color: colors.black,
        fontSize: 23,
        paddingVertical: 10,
    },
});

export default IntroScreen;
