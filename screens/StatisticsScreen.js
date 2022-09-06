import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { colors } from '../assets/colors/colors';
import IconO from "react-native-vector-icons/Octicons";
import { LEARN_YOUR_RISK_ENTRY_ID } from '../env/env.json'
import { getContentfulData } from '../client';
import Container from '../components/shared/Container';
import VerticalLine from '../components/shared/VerticalLine';
import TimeLine from '../components/shared/TimeLine';
import DropDown from '../components/shared/DropDown';
import Footer from '../components/shared/Footer';
import routes from '../navigators/routes';
import { Questions } from '../contexts/QuestionContext';

function StatisticsScreen({ navigation, route }) {
    const [params, setParams] = useState(route.params);
    const [data, setData] = useState({})

    const { value, setValue } = useContext(Questions)

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        const data = await getContentfulData(LEARN_YOUR_RISK_ENTRY_ID);
        setData(data)
    }

    const onSelect = (value, dataName) => {
        const newData = { ...params };
        newData[dataName] = value
        setParams(newData)
    }

    return data.description && (
        <ScrollView>
            <Container style={styles.container}>

                <TimeLine currentStep={data.step} />
                <View style={styles.header}>
                    {value.map((question, index) => (<>
                        <DropDown
                            key={question.key}
                            label={question.label}
                            value={params[question.key]}
                            options={question.values}
                            onSelect={(value) => onSelect(value, question.key)}
                            dropDownHeader={question.header}
                        />
                        {index + 1 !== value.length && <View style={styles.horizontalLine}></View>}
                    </>
                    ))}

                </View>

                <VerticalLine style={styles.verticalLine} />

                <View style={styles.bodyContainer}>
                    <View style={styles.statistics}>
                        <View style={styles.statisticsImageContainer}>
                            <Image source={require("../assets/images/statistics.png")} />
                            <Text style={styles.statisticsDescription}>Before surgery</Text>
                        </View>

                        <View style={styles.statisticsImageContainer}>
                            <Image source={require("../assets/images/statistics2.png")} />
                            <Text style={styles.statisticsDescription}>After removal of tubes and ovaries</Text>
                        </View>
                    </View>

                    <View style={styles.resultContainer}>

                        <View style={styles.banner}>
                            <Text style={styles.bannerRiskDescription}>{data.description}</Text>

                            <Text style={styles.bannerUnderLinedTitle}>{data.risksTitle}</Text>
                            <View style={styles.resultPoints}>
                                {[...data.risks, params.ovarianCancer === "Yes" && data.familyHistoryRisk].map((risk, index) => (
                                    <View
                                        key={index}
                                        style={styles.textFragmentContainer}
                                    >
                                        <IconO
                                            name={"dot-fill"}
                                            color={colors.black}
                                            style={styles.blackDot}
                                        />
                                        <Text style={styles.fragment}>
                                            {risk}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        {params.geneticResult !== "Lynch" &&
                            <View style={styles.doesAgeMatter}>
                                <Text style={styles.bannerUnderLinedTitle}>{data.ageInfoTitle}</Text>

                                <View style={styles.resultPoints}>
                                    {data.ageInfo.map((reason, index) => (
                                        <View
                                            key={index}
                                            style={styles.textFragmentContainer}
                                        >
                                            <IconO
                                                name={"dot-fill"}
                                                color={colors.black}
                                                style={styles.blackDot}
                                            />

                                            <Text style={styles.fragment}>
                                                {reason}
                                            </Text>

                                        </View>
                                    ))}
                                </View>
                            </View>
                        }
                    </View>
                </View>
                <Footer style={styles.footer}
                    goBack={() => navigation.navigate(routes.QUESTIONS_SCREEN)}
                    goTo={() =>
                        navigation.navigate(
                            routes.ANATOMY_REVIEW_SCREEN,
                            { ...params }
                        )}
                />
            </Container>
        </ScrollView >
    );

}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
    },
    container: {
        alignItems: 'flex-end'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginRight: '3.7%',
        width: '69%',
        zIndex: 1
    },
    horizontalLine: {
        borderColor: colors.lightGray,
        borderWidth: 1,
        height: 51,
        marginHorizontal: 24
    },
    verticalLine: {
        marginRight: '3.7%',
        marginVertical: 24,
        width: '69%',
    },
    bodyContainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        width: '100%',
    },
    resultContainer: {
        marginRight: '5.6%',
        width: '45.9%',
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
        color: colors.primaryText,
        fontSize: 24,
        fontWeight: "500",
    },
    bannerUnderLinedTitle: {
        color: colors.darkGray,
        fontSize: 14,
        fontWeight: "600",
        marginTop: 24
    },
    resultPoints: {
        marginTop: 16
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
    statistics: {
        marginRight: '7.7%',
    },
    statisticsImageContainer: {
        marginBottom: 32
    },
    statisticsDescription: {
        color: colors.darkGray,
        fontSize: 14,
        fontWeight: '600',
        fontStyle: 'italic',
        marginTop: 11,
        textAlign: 'center',
        width: 158,
    },
    footer: {
        width: '45.6%',
        alignSelf: 'center'
    }
})

export default StatisticsScreen;