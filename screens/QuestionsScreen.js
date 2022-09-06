import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { colors } from '../assets/colors/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import { BASIC_INFO_ENTRY_ID } from '../env/env.json'

import { getContentfulData } from '../client'
import Container from '../components/shared/Container';
import Checkbox from '../components/shared/Checkbox';
import Footer from '../components/shared/Footer';
import TimeLine from '../components/shared/TimeLine';
import routes from '../navigators/routes';
import { Questions } from '../contexts/QuestionContext';

function QuestionsScreen({ navigation }) {
    const [geneticResults, setGeneticResults] = useState([]);
    const [data, setData] = useState({})
    const [showDropDown, setShowDropDown] = useState(false);
    const [geneticResult, setGeneticResult] = useState('');
    const [breastCancer, setBreastCancer] = useState('');
    const [ovarianCancer, setOvarianCancer] = useState('')
    const [age, setAge] = useState(null);

    const { value, setValue } = useContext(Questions)

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        const data = await getContentfulData(BASIC_INFO_ENTRY_ID);
        const geneticResults = data.geneticResults.values.map(result => ({ label: result, value: result }));
        setGeneticResults(geneticResults)
        setData(data)
        setValue([data.geneticResults, data.age, data.breastCancerValues, data.ovarianCancerValues])
    }

    const checkDisabled = () => {
        const breastCancerCount = Object.keys(breastCancer).length
        const ovarianCancerCount = Object.keys(ovarianCancer).length
        return geneticResult && age && ovarianCancerCount && breastCancerCount
    }


    return data.title && (
        <Container>
            <TimeLine currentStep={data.step} />
            <View style={styles.container}>
                <View>
                    <Text style={styles.headerArticle}>{data.title}</Text>
                    <Text style={styles.article}>{data.description}</Text>
                </View>
                <View>
                    <View style={[styles.questions, styles.dropDownQuestion]}>
                        <Text style={styles.questionsTitle}>{data.geneticResults.question}</Text>

                        <View style={styles.dropDownContainer}>
                            <DropDownPicker
                                open={showDropDown}
                                value={geneticResult}
                                items={geneticResults}
                                setOpen={setShowDropDown}
                                setValue={setGeneticResult}
                                style={styles.pickerContainer}
                                containerStyle={{ width: 460 }}
                                placeholder={data.geneticResults.placeholder}
                                placeholderStyle={styles.placeHolder}
                            />

                            <Icon name='information-circle-outline' size={21} color={colors.primaryText} />
                        </View>
                    </View>

                    <View style={styles.questions}>
                        <Text style={styles.questionsTitle}>{data.age.question}</Text>

                        <TextInput
                            style={styles.input}
                            onChangeText={setAge}
                            value={age}
                            keyboardType='numeric'
                            placeholder={data.age.placeholder}
                            placeholderTextColor={colors.darkGray}
                        />
                    </View>

                    <View style={styles.questions}>
                        <Text style={styles.questionsTitle}>{data.breastCancerValues.question}</Text>

                        <View style={styles.checkboxRow}>
                            {data.breastCancerValues.values.map(value => (
                                <Checkbox
                                    key={value}
                                    labelStyle={styles.checkbox}
                                    label={value}
                                    checked={breastCancer === value}
                                    onPress={() => setBreastCancer(value)}
                                />
                            ))}
                        </View>
                    </View>

                    <View style={styles.questions}>
                        <Text style={styles.questionsTitle}>{data.ovarianCancerValues.question}</Text>

                        <View style={styles.checkboxRow}>
                            {data.ovarianCancerValues.values.map(value => (
                                <Checkbox
                                    key={value}
                                    labelStyle={styles.checkbox}
                                    label={value}
                                    checked={ovarianCancer === value}
                                    onPress={() => setOvarianCancer(value)}
                                />
                            ))}
                        </View>
                        <Footer
                            style={styles.footer}
                            goBack={() => {
                                navigation.navigate(routes.INTRO_SCREEN)
                                setValue([])
                            }}
                            goTo={() => navigation.navigate(
                                routes.STATISTICS_SCREEN,
                                {
                                    geneticResult,
                                    age,
                                    breastCancer,
                                    ovarianCancer,
                                }
                            )}
                            disabled={checkDisabled()} />
                    </View>
                </View>
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 492,
    },
    headerArticle: {
        fontSize: 24,
        color: colors.black,
        marginBottom: 16,
        fontWeight: '500'
    },
    boldArticle: {
        fontWeight: "700",
    },
    article: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 32
    },
    input: {
        backgroundColor: colors.white,
        borderColor: colors.gray,
        borderRadius: 4,
        borderWidth: 1,
        height: 48,
        paddingHorizontal: 20,
        width: 460,
    },
    dropDownContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%'
    },
    pickerContainer: {
        borderColor: colors.gray,
        borderRadius: 4,
        borderWidth: 1,
        width: 460
    },
    placeHolder: {
        color: colors.darkGray,
        fontSize: 14,
        fontWeight: '500'
    },
    questions: {
        alignItems: "flex-start",
        flexDirection: 'column',
        justifyContent: "space-between",
        marginBottom: 32
    },
    dropDownQuestion: {
        zIndex: 1
    },
    checkboxRow: {
        flexDirection: 'row',
        marginTop: 8,
    },
    checkbox: {
        marginRight: 28
    },
    questionsTitle: {
        color: colors.black,
        fontSize: 14,
        fontWeight: "700",
        marginBottom: 8,
    }
})

export default QuestionsScreen;