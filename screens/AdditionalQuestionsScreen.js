import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors } from '../assets/colors/colors';
import { ADDITIONAL_QUESTIONS_ENTRY_ID } from '@env'

import { getContentfulData } from "../client"
import Container from '../components/shared/Container';
import Checkbox from '../components/shared/Checkbox';
import HorizontalLine from '../components/shared/HorizontalLine';
import Footer from '../components/shared/Footer';
import TimeLine from '../components/shared/TimeLine';
import routes from '../navigators/routes';
import { Questions } from '../contexts/QuestionContext';
import CustomizedText from '../components/shared/CustomizedText';
import InfoBox from '../components/shared/InfoBox';

function AdditionalQuestionsScreen({ navigation, route }) {
    const [data, setData] = useState({})
    const [answers, setAnswers] = useState({ pregnant: '', menopause: '', HRT: '' })

    const { value, setValue } = useContext(Questions)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const data = await getContentfulData(ADDITIONAL_QUESTIONS_ENTRY_ID);
        const questions = [...value]
        questions.splice(4, data.questions.length)
        setValue(questions)
        setData(data)
    }

    const handleSetAnswers = (key, answer) => {
        const answersObject = { ...answers };
        answersObject[key] = answer
        setAnswers(answersObject)
    }


    return data.title && (
        <Container>
            <TimeLine currentStep={data.step} />
                <View style={styles.container}>
                    <View style={styles.partsContainers}>
                        <Text style={styles.headerText}>{data.title}</Text>

                        <Text style={styles.subject}>{data.subject}</Text>

                        <Text style={styles.decisionTitle}>{data.decisionMaking.title}</Text>

                        {data.decisionMaking.decisions.map((decision, index) =>
                            <CustomizedText key={index} ul>{decision}</CustomizedText>
                        )}
                    </View>

                    <HorizontalLine style={styles.HorizontalLine} />

                    <View style={[styles.partsContainers, styles.allQuestionsContainer]}>
                        {data.questions.map((question, index) => (
                            <View style={[styles.question, {zIndex: 1}]} key={question.key}>
                                <View style={styles.questionContainer}>
                                    <Text style={styles.questionText}>{question.question}</Text>
                                    {question.info && <InfoBox data={question.info} />}
                                </View>

                                <View style={styles.answersContainer}>
                                    {question.values.map(answer => (
                                        <Checkbox
                                            key={`${answer}-${question.key}`}
                                            labelStyle={styles.label}
                                            label={answer}
                                            onPress={() => handleSetAnswers(question.key, answer)}
                                            checked={answers[question.key] === answer}
                                        />
                                    ))}
                                </View>
                            </View>
                        )
                        )}
                        <Footer
                            style={styles.footer}
                            goTo={() => {
                                navigation.navigate(
                                    routes.SURGICAL_OPTIONS,
                                    {
                                        ...route.params,
                                        ...answers,
                                        ansOldLength: value.length
                                    })
                                setValue([...value, ...data.questions])
                            }}
                            goBack={() => {
                                navigation.goBack()
                            }}
                            disabled={answers.pregnant && answers.menopause && answers.HRT}
                        />
                    </View>
                </View>
        </Container >
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-end',
        width: '69%',
        marginRight: '3.7%'
    },
    partsContainers: {
        width: '100%',
    },
    headerText: {
        fontSize: 10,
        fontWeight: '600',
        color: colors.darkGray,
        marginBottom: 16
    },
    subject: {
        color: colors.primaryText,
        fontSize: 24,
        fontWeight: '500',
        marginBottom: 24,
    },
    decisionTitle: {
        color: colors.primaryText,
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 3
    },
    decision: {
        alignItems: 'center',
        flexDirection: "row",
        marginTop: 13
    },
    decisionText: {
        color: colors.primaryText,
        fontSize: 14,
        fontWeight: "500",
    },
    HorizontalLine: {
        marginVertical: 40
    },
    allQuestionsContainer: {
        width: '66%'
    },
    questionContainer:{
        flexDirection: 'row',
        width:'94.9%'
    },
    question: {
        marginBottom: 32
    },
    questionText: {
        color: colors.primaryText,
        fontSize: 14,
        fontWeight: '700',
        marginTop:2,
    },
    answersContainer: {
        flexDirection: 'row',
        marginTop: 19
    },
    label: {
        marginRight: 28,
        marginLeft: 7
    },
    blackDot: {
        paddingHorizontal: 10,
    },
    footer: {
        marginTop: 8
    }
})

export default AdditionalQuestionsScreen;