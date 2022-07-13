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

const nccnUrl = "https://www.nccn.org/login?ReturnURL=https://www.nccn.org/professionals/physician_gls/pdf/genetics_bop.pdf";

function NotReadyTab({ }) {
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        client.getEntries()
            .then((response) => setRecommendations(response.items.find((item) => item.fields.recommendations).fields.recommendations))
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
                        source={require("../../assets/images/stop.png")}
                    />

                    <Text style={styles.headerTitle}>
            I’m not ready for surgery, where do I fit?
                    </Text>
                </View>
                <View style={styles.banner}>
                    <View style={styles.paragraph}>
                        <Text style={styles.bannerTitle}>
              Recommendations in this tool are evidence-based
              and based on the guidelines of the
                            <Text
                                style={styles.link}
                                onPress={() => handleUrlPress(nccnUrl)}
                            >
                                {" "}
                National Comprehensive Cancer Network.
                            </Text>
                        </Text>
                    </View>
                    <View>
                        {recommendations.map((recommendation, index) => (
                            <View
                                key={index}
                                style={styles.recommendationsContainer}
                            >
                                <IconO
                                    name="dot-fill"
                                    style={styles.blackDot}
                                />
                                <Text style={styles.recommendation}>
                                    {recommendation.recommendation}
                                    {recommendation.urlName
                                        && (
                                            <Text
                                                style={styles.link}
                                                onPress={() => handleUrlPress(recommendation.url)}
                                            >
                                                {recommendation.urlName}
                                            </Text>
                                        )}
                                </Text>
                            </View>
                        ))}
                    </View>
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
        paddingBottom: 10,
    },
    headerTitle: {
        fontSize: 26,
        paddingLeft: 15,
    },
    bannerTitle: {
        fontSize: 18,
    },
    paragraph: {
        flexDirection: "row",
    },
    recommendationsContainer: {
        flexDirection: "row",
        paddingTop: 10,
    },
    recommendation: {
        fontSize: 17,
        paddingLeft: 5,
    },
    blackDot: {
        alignSelf: "flex-start",
        padding: 2,
        top: 3,
    },
    link: {
        color: colors.hyperLinkBlue,
        textDecorationLine: "underline",
    },
});

export default NotReadyTab;
