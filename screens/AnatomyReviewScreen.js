import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, } from 'react-native';
import { LEARN_YOUR_RISK_ANATOMY_ENTRY_ID } from '@env'
import { colors } from '../assets/colors/colors';
import { getContentfulData } from "../client"
import Container from '../components/shared/Container';
import Footer from '../components/shared/Footer';
import TimeLine from '../components/shared/TimeLine';
import routes from '../navigators/routes';
import CustomizedText from '../components/shared/CustomizedText';

function AnatomyReviewScreen({ navigation, route }) {
    const [data, setData] = useState({})

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const data = await getContentfulData(LEARN_YOUR_RISK_ANATOMY_ENTRY_ID);
        setData(data)
    }

    return data.title && (
        <Container >
            <TimeLine currentStep={data.step} />

            <View style={styles.dataContainer}>
                <View>
                    <Text style={styles.headerText} >{data.title}.</Text>

                    <View style={styles.basics}>
                        <Text style={styles.basicsTitle}>{data.basicsTitle}</Text>
                        {data.basics.map((text, index) =>
                            <CustomizedText ul key={index}>{text}</CustomizedText>
                        )}
                    </View>
                </View>

                <View style={styles.uterusContentContainer}>
                    <View style={styles.imageContainer}>
                        <Text style={styles.anatomyTitle}>{data.anatomyTitle}</Text>

                        <Image
                            source={require("../assets/images/uterus.png")}
                            style={styles.uterusImage}
                        />
                    </View>

                    <View style={styles.anatomyDescription}>
                        {data.anatomyParts.map((part, index) => (
                            <View style={styles.anatomyPart} key={part.name}>
                                <View style={styles.anatomyTitleContainer}>
                                    <View style={styles.partNumberHolder}>
                                        <Text style={styles.anatomyPartNumber}>{index + 1}</Text>
                                    </View>
                                    <Text style={styles.partName}>{part.name}</Text>
                                </View>

                                <View>
                                    {part.points.map((symptom, index) =>
                                        <View
                                            style={styles.rowedBox}
                                            key={part.name + index}
                                        >
                                            <CustomizedText ul={part.dots} style={styles.symptom}>
                                                {symptom}
                                            </CustomizedText>
                                        </View>
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
                <Footer
                    style={styles.footer}
                    footerElementStyle={styles.footerElement}
                    goTo={() => navigation.navigate(routes.ADDITIONAL_QUESTION_SCREEN, { ...route.params })}
                    goBack={() => navigation.goBack()}
                />
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    dataContainer: {
        alignSelf: 'flex-end',
        marginRight: '3.7%',
        width: '69%',
    },
    headerText: {
        color: colors.primaryText,
        fontSize: 24,
        fontWeight: '500'
    },
    basics: {
        backgroundColor: colors.lightestGray,
        borderLeftColor: colors.purple,
        borderLeftWidth: 4,
        paddingLeft: 24,
        marginTop: 20,
        paddingVertical: 19,
        width: '100%'
    },
    basicsTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.primaryText,
    },
    rowedBox: {
        width: '99%'
    },
    headerBoxRows: {
        marginLeft: 8,
    },
    notBoldSubtitle: {
        color: colors.black,
        fontSize: 14,
    },
    imageContainer: {
        width: '43.4%',
        marginRight: '5%'
    },
    anatomyTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    partNumberHolder: {
        alignItems: 'center',
        backgroundColor: colors.purple,
        borderRadius: 10,
        justifyContent: 'center',
        marginRight: 8,
        height: 20,
        width: 20,
    },
    anatomyPartNumber: {
        color: colors.white,
        fontSize: 10,
        fontWeight: '600'
    },
    anatomyTitle: {
        color: colors.primaryText,
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 16
    },
    uterusImage: {
        width: '100%'
    },
    anatomyDescription: {
        width: '51.6%'
    },
    blackDot: {
        alignSelf: 'center',
        marginRight: 10,
    },
    uterusContentContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
        width: '100%'
    },
    anatomyPart: {
        marginBottom: 22
    },
    partName: {
        color: colors.darkGray,
        fontSize: 12,
        fontWeight: '600'
    },
    symptom: {
        color: colors.primaryText,
        fontSize: 14,
        fontWeight: '500',
        marginTop: 10
    },
    footerElement: {
        marginRight: "33.4%",
        marginTop: 22
    },
    footer: {
        marginTop: 10
    }
})

export default AnatomyReviewScreen;
