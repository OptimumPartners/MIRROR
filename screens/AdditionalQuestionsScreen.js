import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { colors } from '../assets/colors/colors';
import { ADDITIONAL_QUESTIONS_ENTRY_ID } from '../env/env.json'

import IconO from "react-native-vector-icons/Octicons";
import { getContentfulData } from "../client"
import Container from '../components/shared/Container';
import Checkbox from '../components/shared/Checkbox';
import VerticalLine from '../components/shared/VerticalLine';
import Footer from '../components/shared/Footer';
import TimeLine from '../components/shared/TimeLine';
import routes from '../navigators/routes';
import { Questions } from '../contexts/QuestionContext';

function AdditionalQuestionsScreen({ navigation, route }) {
    const [data, setData] = useState({})
    const [answers, setAnswers] = useState({ pregnant: '', menopause: '', HRT: '' })

    const { value, setValue } = useContext(Questions)

    useEffect(() => {
        console.log(value);
        getData()
    }, [value])

    const getData = async () => {
        const data = await getContentfulData(ADDITIONAL_QUESTIONS_ENTRY_ID);
        setData(data)
        setValue([...value, ...data.questions])
    }

    const handleSetAnswers = (key, answer) => {
        const answersObject = { ...answers };
        answersObject[key] = answer
        setAnswers(answersObject)
    }


    return data.title && (
        <Container>
            <TimeLine currentStep={data.step} />
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <View style={styles.partsContainers}>
                        <Text style={styles.headerText}>{data.title}</Text>

                        <Text style={styles.subject}>{data.subject}</Text>

                        <Text style={styles.decisionTitle}>{data.decisionMaking.title}</Text>

                        {data.decisionMaking.decisions.map((decision, index) =>
                            <View
                                key={index}
                                style={styles.decision}
                            >
                                <IconO
                                    name={"dot-fill"}
                                    color={colors.primaryText}
                                    size={10}
                                    style={styles.blackDot}
                                />
                                <Text style={styles.decisionText}>
                                    {decision}
                                </Text>
                            </View>
                        )}
                    </View>

                    <VerticalLine style={styles.VerticalLine} />

                    <View style={[styles.partsContainers, styles.questionsContainer]}>
                        {data.questions.map(question => (
                            <View style={styles.question} key={question.key}>
                                <Text style={styles.questionText}>{question.question}</Text>
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
                            goTo={() => navigation.navigate(
                                routes.SURGICAL_OPTIONS,
                                {
                                    ...route.params,
                                    ...answers
                                })
                            }
                            goBack={() => {
                                const questions = [...value]
                                questions.splice(4, data.questions.length)
                                setValue(questions)
                                navigation.navigate(routes.ANATOMY_REVIEW_SCREEN)
                            }}
                            disabled={answers.pregnant && answers.menopause && answers.HRT}
                        />
                    </View>
                </View>
            </ScrollView>
        </Container >
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-end',
        width: '69%',
        marginRight: '3.7%'
    },
    scrollView: {
        width: '100%',
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
    VerticalLine: {
        marginVertical: 40
    },
    questionsContainer: {
        width: '66%'
    },
    question: {
        marginBottom: 32
    },
    questionText: {
        color: colors.primaryText,
        fontSize: 14,
        fontWeight: '700',
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