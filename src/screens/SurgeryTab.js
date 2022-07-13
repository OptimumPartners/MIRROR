import React, { useState, useEffect } from "react";
import {
    View, 
    StyleSheet, 
    Text, 
    Image, 
    ScrollView, 
    TouchableWithoutFeedback, 
    Linking, 
    TouchableOpacity,
} from "react-native";
import IconO from "react-native-vector-icons/Octicons";
import { colors } from "../../assets/colors/colors";

import { client } from "../API/client";

import InfoCirlcle from "../components/InfoCirlcle";
import CustomModal from "../components/CustomModal";

function SurgeryTab({ }) {
    const [surgeries, setSurgeries] = useState([]);
    const [details, setDetailes] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const url = "https://www.mskcc.org/cancer-care/patient-education/about-your-robotic-assisted-laparoscopic-hysterectomy";

    useEffect(() => {
        client.getEntries()
            .then((response) => {
                setSurgeries(response.items.find((item) => item.fields.surgeries).fields.surgeries);
                setDetailes(response.items.find((item) => item.fields.surgeryDetails).fields.surgeryDetails);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleHyperLinkPress = () => {
        if (Linking.canOpenURL(url)) {
            Linking.openURL(url);
        }
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableWithoutFeedback
                onPress={() => setShowModal(false)}
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Image
                            source={require("../../assets/images/surgery.png")}
                        />
                        <Text style={styles.headerTitle}>
              Gynecologic Surgery
                        </Text>
                    </View>

                    <View style={styles.banner}>
                        <Text style={styles.bannerTitle}>
              There are different types of surgeries
              to reduce your risk for ovarian cancer.
                        </Text>
                        {surgeries.map((item, index) => (
                            <View key={index}>
                                <View style={styles.surgeriesContainer}>
                                    <IconO
                                        name="dot-fill"
                                        style={styles.blackDot}
                                    />
                                    <Text style={styles.surgeryTypes}>
                                        {item.type}
                                        {item.info
                                            && (
                                                <InfoCirlcle
                                                    onPress={() => setShowModal(!showModal)}
                                                />
                                            )}
                                    </Text>
                                </View>
                                {showModal && item.info
                                    && (
                                        <View style={{ zIndex: 1000 }}>
                                            <CustomModal
                                                article={item.info}
                                            />
                                        </View>
                                    )}
                            </View>
                        ))}
                    </View>
                    <View style={styles.commonSurgeries}>
                        <Text style={styles.commonSurgeriesTitle}>
              These surgeries are most commonly performed laparoscopically
              (through small incisions)
                        </Text>
                        <Image
                            source={require("../../assets/images/laparoscopic.png")}
                            style={styles.laparoscopic}
                        />
                    </View>
                    <View>
                        {details.map((detail, index) => (
                            <View key={index} style={styles.commonSurgeryBox}>
                                <IconO
                                    name="dot-fill"
                                    style={styles.blackDot}
                                />
                                <Text style={styles.commonSurgery}>
                                    {detail}
                                </Text>
                            </View>
                        ))}
                    </View>
                    <View style={styles.footer}>
                        <Text style={styles.footerTitle}>
              Read More at
                        </Text>
                        <TouchableOpacity onPress={() => handleHyperLinkPress()}>
                            <Text style={styles.link}> mskcc.org </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    header: {
        alignItems: "center",
        flexDirection: "row",
    },
    headerTitle: {
        flex: 1,
        fontSize: 26,
        paddingLeft: 15,
    },
    bannerTitle: {
        fontSize: 16,
        fontWeight: "500",
        paddingVertical: 10,
    },
    surgeriesContainer: {
        alignItems: "center",
        flexDirection: "row",
    },
    surgeryTypes: {
        fontSize: 20,
    },
    blackDot: {
        alignSelf: "flex-start",
        padding: 2,
        top: 2,
    },
    commonSurgeries: {
        alignItems: "flex-start",
        flexDirection: "row",
        paddingVertical: 10,
    },
    commonSurgeriesTitle: {
        flex: 1,
        fontSize: 17,
        fontWeight: "500",
        paddingTop: 10,
    },
    commonSurgery: {
        fontSize: 18,
        paddingLeft: 20,
    },
    commonSurgeryBox: {
        flexDirection: "row",
        paddingVertical: 2,
    },
    laparoscopic: {
        height: 100,
        width: 100,
    },
    footer: {
        alignItems: "center",
        flexDirection: "row",
        paddingTop: 20,
    },
    footerTitle: {
        fontSize: 18,
        fontWeight: "500",
        paddingVertical: 20,
    },
    link: {
        color: colors.hyperLinkBlue,
        fontSize: 18,
        textDecorationLine: "underline",
    },
});

export default SurgeryTab;
