import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { LYNCH_ENTRY_ID } from '@env'
import { getContentfulData } from '../client';
import Container from '../components/shared/Container';
import TimeLine from '../components/shared/TimeLine';
import CustomizedText from '../components/shared/CustomizedText';
import { colors } from '../assets/colors/colors';
import PercentageAmongPeople from '../components/shared/PercentageAmongPeople';
import HorizontalLine from '../components/shared/HorizontalLine';
import Footer from '../components/shared/Footer';
import routes from '../navigators/routes';
import DropDown from '../components/shared/DropDown';
import { Questions } from '../contexts/QuestionContext';

const LynchStatistics = ({ navigation, route }) => {
    const [params, setParams] = useState(route.params);
    const [data, setData] = useState({})
    const [riskPercentage, setRiskPercentage] = useState({});

    const { value } = useContext(Questions)

    useEffect(() => {
        getData()
    }, []);

    useEffect(() => {
        setRiskPercentage(data?.risks?.percentages[params.geneticResult])
    }, [params]);

    const getData = async () => {
        const data = await getContentfulData(LYNCH_ENTRY_ID);
        setRiskPercentage(data.risks.percentages[params.geneticResult])
        setData(data);
    };

    const onSelect = (value, dataName) => {
        const newData = { ...params };
        newData[dataName] = value
        setParams(newData)
    }

    const getLynchOptions = (options) => {
        const finalOptions = options.filter(element => element.toLowerCase().startsWith('lynch'))
        return finalOptions
    }

    return data.risks && (
        <Container style={styles.container}>
            <TimeLine currentStep={data.step} />

            <View style={styles.header}>
                {value.map((question, index) => {
                    const values = question.key !== 'geneticResult' ? question.values : getLynchOptions(question.values)
                    return (
                        <React.Fragment key={question.key}>
                            <DropDown
                                isInput={question.key === 'age'}
                                label={question.label}
                                value={params[question.key]}
                                options={values}
                                onSelect={(value) => onSelect(value, question.key)}
                                dropDownHeader={question.header}
                                right={index > 2}
                            />
                            {index + 1 !== value.length && <View style={styles.verticalLine}></View>}
                        </React.Fragment>
                    )
                })}
            </View>

            <HorizontalLine style={styles.horizontalLine} />

            <View style={styles.bodyContainer}>

                <View style={styles.statistics}>
                    <View style={styles.statisticsImageContainer}>
                        <PercentageAmongPeople percentage={riskPercentage.to} />
                        <Text style={styles.statisticsDescription}>Before surgery</Text>
                    </View>

                    <View style={styles.statisticsImageContainer}>
                        <PercentageAmongPeople percentage={3} />
                        <Text style={styles.statisticsDescription}>After removal of uterus and cervix</Text>
                    </View>
                </View>


                <View style={styles.resultContainer}>
                    <View>
                        {data.titleText.map(text => (
                            <Text style={styles.titles} key={text}>{text}</Text>
                        ))}
                    </View>

                    <Text style={styles.risksTitle}>{data.risks.title}</Text>

                    {data.risks.values.map((risk, index) => {
                        const uterusRisk = index === data.risks.percentageIndex
                        const uterusRiskOutput = riskPercentage.from ? riskPercentage.from + '-' + riskPercentage.to : riskPercentage.to
                        return (
                            <View key={risk?.text ? risk.text : risk}>
                                <CustomizedText
                                    additions={<Text style={styles.fragment}>
                                        {uterusRisk && uterusRiskOutput} {uterusRisk && typeof riskPercentage.to === 'number' ? '%.' : ''}
                                        {risk.fixedPercentage && risk.fixedPercentage}
                                    </Text>}
                                    ul
                                >{risk}
                                </CustomizedText>
                            </View>
                        )
                    })}
                </View>
            </View>
            <Footer
                style={styles.footer}
                goBack={() => navigation.goBack()}
                goTo={() => {
                    navigation.navigate(
                        routes.ANATOMY_REVIEW_SCREEN,
                        { ...params }
                    )
                }}
            />
        </Container>
    )
}
export default LynchStatistics
const styles = StyleSheet.create({
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
    verticalLine: {
        borderColor: colors.lightGray,
        borderWidth: 1,
        height: 51,
        marginHorizontal: 24
    },
    horizontalLine: {
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
        width: '46%',
    },
    titles: {
        fontSize: 24,
        fontWeight: '500',
        marginBottom: 20
    },
    risksTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.darkGray,
        marginTop: 10
    },
    fragment: {
        color: colors.primaryText,
        fontSize: 14,
        fontWeight: '700'
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
    statistics: {
        marginRight: '7.7%',
    },
    statisticsImageContainer: {
        marginBottom: 32
    },
    footer: {
        width: '45.6%',
        alignSelf: 'center'
    }
})