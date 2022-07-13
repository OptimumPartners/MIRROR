import React from "react";
import { useState } from "react";

import { 
    StyleSheet,
    View,
    Text
} from "react-native";

import { colors } from "../../assets/colors/colors";

import InfoCirlcle from "../components/InfoCirlcle";

function TitledContainer({
    title, pro, con, showInfo, setShowInfo,
}) {
    const [info, setInfo] = useState("");

    const handleInfoPress = (article) => {
        setShowInfo(!showInfo);
        setInfo(article);
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    {title}
                </Text>
            </View>
            <View style={styles.content}>
                <View style={styles.contentLeft}>
                    <Text style={styles.underLinedTitle}>
            PRO
                    </Text>
                    <View>
                        {pro.map((item, index) => (
                            <View
                                key={index}
                                style={styles.riskBox}
                            >
                                <Text style={styles.risks}>
                                    {item.risk}
                                </Text>
                                {item.info
                                    && (
                                        <View style={styles.infoCircle}>
                                            <InfoCirlcle
                                                size={8}
                                                key={index}
                                                onPress={() => handleInfoPress(item.info)}
                                            />
                                        </View>
                                    )}
                            </View>
                        ))}
                    </View>
                </View>
                <View style={styles.contentRight}>
                    <Text style={styles.underLinedTitle}>
            CON
                    </Text>
                    <View>
                        {con.map((item, index) => (
                            <Text
                                key={index}
                                style={styles.risks}
                            >
                                {item.risk}
                            </Text>
                        ))}
                    </View>
                </View>
                {showInfo
                    && (
                        <CustomModal
                            key={Math.random()}
                            article={info}
                        />
                    )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderColor: colors.black,
        borderStyle: "solid",
        borderWidth: 3,
        marginVertical: 10,
        flex: 0.5,
    },
    titleContainer: {
        backgroundColor: colors.lightBlue,
        padding: 10,
    },
    title: {
        fontSize: 13,
        fontWeight: "700",
    },
    content: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        flex: 1,
    },
    contentLeft: {
        flex: 0.5,
        paddingHorizontal: 5,
    },
    contentRight: {
        flex: 0.4,
    },
    underLinedTitle: {
        textDecorationLine: "underline",
    },
    riskBox: {
        flexDirection: "row",
        alignItems: "center",
    },
    risks: {
        fontSize: 8,
        fontWeight: "600",
        paddingVertical: 10,
    },
    infoCircle: {
        paddingLeft: 5,
    },

});

export default TitledContainer;
