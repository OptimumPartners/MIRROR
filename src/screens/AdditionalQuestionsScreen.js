import React, { useEffect, useState } from "react";
import {
    View, 
    StyleSheet, 
    Text, 
    TouchableWithoutFeedback,
} from "react-native";

import { useNavigation, useRoute } from '@react-navigation/native';

import IconAD from "react-native-vector-icons/AntDesign";
import IconO from "react-native-vector-icons/Octicons";

import { colors } from "../../assets/colors/colors";


import TripleOptionBox from "../components/TripleOptionBox";
import CustomModal from "../components/CustomModal";
import InfoCirlcle from "../components/InfoCirlcle";

import { client } from "../API/client";

function AdditionalQuestionsScreen() {

    const navigation = useNavigation();
    const route = useRoute();

    const [dropDownMenu, setDropDownMenu] = useState([]);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        client.getEntries()
            .then((response) => {
                setDropDownMenu(response.items.find(
                    (item) => item.fields.dropDownMenu,
                ).fields.dropDownMenu);
                setOptions(response.items.find(
                    (item) => item.fields.options,
                ).fields.options);
            })
            .catch((err) => console.log(err));
    }, []);

    const [showInfo, setShowInfo] = useState(false);
    const [info, setInfo] = useState("");

    const [fertility, setFertility] = useState("");
    const [menopause, setMenopause] = useState("");
    const [hrt, setHrt] = useState("");

    const handleInfoPress = (element) => {
        setShowInfo(!showInfo);
        setInfo(element.info);
    };

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                setFertility(dropDownMenu[0].answer);
                setMenopause(dropDownMenu[1].answer);
                setHrt(dropDownMenu[2].answer);
                if (showInfo) {
                    setShowInfo(!showInfo);
                } else if ((fertility && menopause && hrt)) {
                    if (fertility === "Unsure") {
                        setFertility("Yes");
                    }
                    if (menopause === "Unsure") {
                        setMenopause("No");
                    }
                    if (hrt === "Unsure") {
                        setHrt("No");
                    }
                    return navigation.navigate(
                        "DashboardScreen",
                        {
                            fertility,
                            menopause,
                            hrt,
                            ...route.params.data,
                        },
                    );
                }
                return null;
            }}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>
                        {/* {' '} */}
            Additional questions:
                    </Text>
                    <View style={styles.banner}>
                        <Text style={styles.headerSubText}>
              There are multiple options for surgical management.
              The decision is complex and depends on your:
                        </Text>
                        <View style={styles.rowedBoxContainer}>
                            {options.map((option, index) => (
                                <View
                                    key={index[index]}
                                    style={styles.rowedBox}
                                >
                                    <Text style={styles.rowedBoxText}>
                                        <IconAD
                                            name="minus"
                                            size={14}
                                            color={colors.black}
                                            style={styles.rowedBoxIcon}
                                        />
                                        {option}
                                    </Text>
                                </View>
                            ))}
                        </View>
                        <View>
                            {dropDownMenu.map((element, index) => (
                                <>
                                    <View
                                        key={index}
                                        style={styles.questionContainer}
                                    >
                                        <View style={styles.rowedBox}>
                                            <IconO
                                                name="dot-fill"
                                                color={colors.black}
                                                style={styles.blackDot}
                                            />
                                            <Text style={styles.question}>
                                                {element.question}
                                            </Text>
                                        </View>
                                        <View style={styles.questionRight}>
                                            <TripleOptionBox
                                                info={element.info}
                                                defaultAnswer={element.answer}
                                                updateAnswer={(answer) => element.answer = answer}
                                            />
                                            {element.info !== ""
                                                ? <InfoCirlcle onPress={() => handleInfoPress(element)} />
                                                : <View style={styles.hiddenSpacing} />}
                                        </View>
                                    </View>
                                    {showInfo
                    && (
                        <CustomModal
                            key={Math.random()}
                            article={info}
                        />
                    )
                                    }
                                </>
                            ))}
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: 20,
    },
    header: {
        flex: 1,
    },
    headerText: {
        fontSize: 24,
        paddingVertical: 20,
    },
    headerContentContainer: {
        paddingHorizontal: 20,
    },
    headerSubText: {
        fontSize: 18,
        fontWeight: "500",
        lineHeight: 25,
    },
    banner: {
        flex: 1,
    },
    rowedBoxContainer: {
        flex: 0.3,
    },
    rowedBox: {
        flexDirection: "row",
        flex: 0.8,
    },
    rowedBoxText: {
        fontSize: 18,
        fontWeight: "500",
        lineHeight: 25,
    },
    questionContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 5,
    },
    questionRight: {
        alignItems: "center",
        flex: 0.7,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    blackDot: {
        paddingHorizontal: 5,
        top: 2,
    },
    question: {
        fontWeight: "500",
        fontSize: 10,
    },
    hiddenSpacing: {
        width: 10,
        height: 10,
    },
    infoIcon: {
        paddingHorizontal: 3,
    },
});

export default AdditionalQuestionsScreen;
