import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView, Modal, StyleSheet, Text, View } from 'react-native'
import { REVIEW_OPTIONS_ENTRY_ID, ALGO_ENTRY_ID } from '@env'
import Container from '../components/shared/Container'
import { getContentfulData } from '../client';
import ResultContainer from '../components/shared/ResultContainer';
import Footer from '../components/shared/Footer';
import routes from '../navigators/routes';
import TimeLine from '../components/shared/TimeLine';
import { colors } from '../assets/colors/colors';
import { Questions } from '../contexts/QuestionContext';
import DropDown from '../components/shared/DropDown';
import HorizontalLine from '../components/shared/HorizontalLine';
import LearnMore from '../components/shared/LearnMore';
import Button from '../components/shared/Button';
import { TextInput } from 'react-native-gesture-handler';
import sendEmail from '../services/emailService';

const SurgicalOptions = ({ navigation, route }) => {
    const [data, setData] = useState({});
    const [algoGroup, setAlgoGroup] = useState({});
    const [params, setParams] = useState(route.params);
    const [results, setResults] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false)
    const [finalResults, setFinalResults] = useState([])

    const { value, setValue } = useContext(Questions)

    useEffect(() => {
        getData();
    }, [params])

    useEffect(() => {
        fillBoxData('pro')
        fillBoxData('con')
    }, [results])

    const fillBoxData = (type) => {
        const final = []
        for (let i = 0; i < results.length; i++) {
            const algoResult = [...results][i]
            const result = { ...data[algoResult.name] };

            const allBoxData = result[type].content;

            if (result[type].menopause && params.menopause !== 'Yes') allBoxData.push(result[type].menopause);
            if (result[type].breast && algoGroup.breast) allBoxData.push(result[type].breast);
            if (result[type].HRT && params.HRT !== 'No') allBoxData.push(result[type].HRT);
            if (result[type].pregnant && params.pregnant !== 'No') allBoxData.push(result[type].pregnant);
            if (result[type].UT && algoGroup.UT) allBoxData.push(result[type].UT);
            if (result[type].age) {
                for (let i = 0; i < result[type].age.length; i++) {
                    if (result[type].age[i].lessThan >= params.age) {
                        allBoxData.push(result[type].age[i].text)
                    }
                }
            };

            result[type].content = allBoxData;
            result.delayTo = algoResult?.delayTo + (algoGroup?.ageAddition || 0) || '';
            result.color = results[i].color
            if (results[i].header) result.title = results[i].header
            final.push(result)
        }
        setFinalResults(final)
    }
    const getData = async () => {
        const data = await getContentfulData(REVIEW_OPTIONS_ENTRY_ID);
        setData(data);
        await getAlgoResult()
    }

    const getAlgoResult = async () => {
        const algo = await getContentfulData(ALGO_ENTRY_ID);
        const algoGroupName = algo.checkGroup[params.geneticResult];
        const ageAddition = algoGroupName.ageAddition
        const groupAlgo = algo[algoGroupName.group];
        const checkMenopause = groupAlgo[params.menopause] || groupAlgo.No
        const checkPregnant = checkMenopause[params.pregnant] || checkMenopause.Yes
        setAlgoGroup(algoGroupName);

        for (let i = 0; i < checkPregnant.length; i++) {
            const ageFrom = checkPregnant[i].age.from + ageAddition;
            const ageTo = checkPregnant[i].age.to + ageAddition;

            if (ageFrom <= params.age && ageTo >= params.age) {
                setResults(checkPregnant[i].answers);
                break;
            }
        }
    }

    const onSelect = (value, dataName) => {
        const newData = { ...params };
        newData[dataName] = value
        setParams(newData)
    }

    const handleSendEmail = async () => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(email)) {
            await sendEmail(email, finalResults, params)
            setShowModal(false)
            setEmailError(false)
        }
        else {
            setEmailError(true)
        }
    }

    return data.title && (
        <Container>
            <TimeLine header={data.timelineHeader} currentStep={data.step} />

            <View style={styles.header}>
                {value.map((question, index) => (
                    <React.Fragment key={question.key}>
                        <DropDown
                            isInput={question.key === 'age'}
                            label={question.label}
                            value={params[question.key]}
                            options={question.values}
                            onSelect={(value) => onSelect(value, question.key)}
                            dropDownHeader={question.header}
                            placeholderStyle={styles.dropDownPlaceholder}
                            arrowSize={18}
                            right={index > 3}
                        />
                        {index + 1 !== value.length && <View style={styles.VerticalLine}></View>}
                    </React.Fragment>
                ))}
            </View>

            <HorizontalLine style={styles.HorizontalLine} />

            <View style={styles.container}>
                <Text style={styles.title}>{data.title}</Text>

                {finalResults[0] && finalResults.map((result, index) => (
                    <ResultContainer
                        key={`${result.name}-${index}`}
                        info={algoGroup.info}
                        result={result}
                    />
                ))}

                <Footer
                    buttonText='Next Step'
                    buttonStyle={styles.footerButton}
                    style={styles.footer}
                    goTo={() => navigation.navigate(routes.SELF_REFLECTION_SCREEN)}
                    goBack={() => {
                        setValue(value.slice(0, params.ansOldLength));
                        navigation.goBack()
                    }}
                />

                <Button
                    text="Send me results"
                    style={styles.openModalBtn}
                    onPress={() => setShowModal(true)}
                />

                <Modal
                    animationType='fade'
                    visible={showModal}
                    onRequestClose={() => setShowModal(false)}
                    transparent={true}
                >
                    <KeyboardAvoidingView style={styles.modalContentHolder} behavior='padding'>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>Write your email bellow and press send to get your results email</Text>

                            <TextInput
                                style={styles.emailInput}
                                onChangeText={setEmail}
                            />
                            {emailError && <Text style={styles.invalidEmail}>Invalid email</Text>}
                            <View style={styles.modalButtonsHolder}>
                                <Button
                                    onPress={() => setShowModal(!showModal)}
                                    text='Cancel'
                                    style={styles.cancelButton}
                                    textStyle={styles.cancelButtonText}
                                />
                                <Button
                                    onPress={handleSendEmail}
                                    text='Send'
                                />
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </Modal>

            </View>

            <LearnMore navigate={navigation.navigate} />
        </Container>
    )
}
export default SurgicalOptions
const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        width: '45.5%'
    },
    header: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginRight: '3.7%',
        width: '69%',
        zIndex: 1
    },
    dropDownPlaceholder: {
        fontSize: 12,
        fontWeight: '700',
    },
    VerticalLine: {
        borderColor: colors.lightGray,
        borderWidth: 1,
        height: 36,
        marginHorizontal: 16
    },
    HorizontalLine: {
        alignSelf: 'flex-end',
        marginRight: '3.7%',
        marginVertical: 32,
        width: '69%',
    },
    title: {
        color: colors.primaryText,
        fontSize: 24,
        fontWeight: '500',
        marginBottom: 24
    },
    footer: {
        marginTop: 0
    },
    openModalBtn: {
        alignSelf: 'flex-end',
        marginTop: 30,
        width: 180,
    },
    modalContentHolder: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalContent: {
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 350
    },
    modalText: {
        textAlign: "center",
    },
    emailInput: {
        backgroundColor: colors.white,
        borderColor: colors.gray,
        borderRadius: 4,
        borderWidth: 1,
        height: 48,
        marginTop: 35,
        paddingHorizontal: 20,
        width: '100%',
    },
    invalidEmail: {
        color: colors.red,
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'left',
        marginTop: 4,
        width: '98%'
    },
    modalButtonsHolder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40,
        width: '100%',
    },
    cancelButton: {
        backgroundColor: colors.white,
        borderColor: colors.green,
        borderWidth: 2
    },
    cancelButtonText: {
        color: colors.green
    }

})