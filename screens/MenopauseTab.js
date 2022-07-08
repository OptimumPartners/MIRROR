import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, Linking, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

import { colors } from '../assets/colors/colors';

import IconO from 'react-native-vector-icons/Octicons';
import InfoCirlcle from '../components/InfoCirlcle';
import CustomModal from '../components/CustomModal';


import { client } from "../client"


function MenopauseTab({ }) {
    const url = "https://www.menopause.org/for-women";

    const [keyPoints, setKeyPoints] = useState([]);
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        client.getEntries()
            .then((response) => setKeyPoints(response.items.find((item) => item.fields.keyPoints).fields.keyPoints))
            .catch((err) => console.log(err))
    }, [])


    const handleUrlPress = () => {
        if (Linking.canOpenURL(url)) {
            Linking.openURL(url)
        }
        return;
    }

    const handleShowModalPress = () => {
        setShowModal(!showModal);
    }

    const handleScreenPress = () => {
        if (showModal) {
            setShowModal(!showModal);
            return;
        }
    }

    return (
        <TouchableWithoutFeedback
            onPress={() => handleScreenPress()}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        source={require("../assets/images/menopause.png")}
                    />
                    <Text style={styles.headerTitle}>
                        Menopause and Hormone Therapy
                    </Text>
                </View>

                <View style={styles.banner}>
                    <Text style={styles.bannerTitle}>
                        {keyPoints.length} Key Points:
                    </Text>


                    {keyPoints.map((keyPoint, index) =>
                        <View key={index} style={styles.keyPointContainer}>
                            <View style={styles.keyPointBox}>
                                <Text style={styles.keyPointIndex}>
                                    {++index}.
                                </Text>
                                <Text style={styles.keyPoint}>
                                    {keyPoint.keyPoint}
                                    {keyPoint.info &&
                                        <InfoCirlcle
                                            onPress={() => handleShowModalPress()}
                                        />
                                    }
                                </Text>
                            </View>
                            <View>
                                {keyPoint.subpoints &&
                                    keyPoint.subpoints.map((subpoint, index) =>
                                        <View
                                            key={index}
                                            style={styles.subpointBox}
                                        >
                                            <IconO
                                                name={"dot-fill"}
                                                style={styles.blackDot}
                                            />
                                            <Text>
                                                {subpoint}
                                            </Text>
                                        </View>
                                    )
                                }
                            </View>
                            {showModal && keyPoint.info &&
                                <CustomModal
                                    article={keyPoint.info}
                                />
                            }
                        </View>

                    )}
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerTitle}>
                        Read More at
                    </Text>
                    <TouchableOpacity onPress={() => handleUrlPress()}>
                        <Text style={styles.link}> menopause.org </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback >
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: colors.white,
        flex: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
    },
    headerTitle: {
        fontSize: 26,
        flex: 1,
    },
    bannerTitle: {
        fontSize: 16,
        fontWeight: "500",
        paddingVertical: 20,
    },
    keyPointContainer: {
        paddingHorizontal: 5,
    },
    keyPointBox: {
        flexDirection: "row",
        paddingVertical: 5,
    },
    keyPointIndex: {
        paddingHorizontal: 5,
    },
    keyPoint: {
        fontSize: 13,
    },
    subpointBox: {
        flexDirection: "row",
        paddingHorizontal: 20,
    },
    blackDot: {
        paddingHorizontal: 5,
    },
    footer: {
        flexDirection: "row",
        alignItems: "center"
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

})

export default MenopauseTab;