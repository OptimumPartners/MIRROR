import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { REVIEW_OPTIONS_ENTRY_ID, ALGO_ENTRY_ID } from '../env/env.json'
import Container from '../components/shared/Container'
import { getContentfulData } from '../client';
import ResultContainer from '../components/shared/ResultContainer';
import Footer from '../components/shared/Footer';
import routes from '../navigators/routes';
import TimeLine from '../components/shared/TimeLine';
import { colors } from '../assets/colors/colors';
import { Questions } from '../contexts/QuestionContext';
import DropDown from '../components/shared/DropDown';
import VerticalLine from '../components/shared/VerticalLine';
import LearnMore from '../components/shared/LearnMore';

const SurgicalOptions = ({ navigation, route }) => {
    const [data, setData] = useState({})
    const [algoGroup, setAlgoGroup] = useState({})
    const [params, setParams] = useState(route.params);
    const [results, setResults] = useState([])
    const { value, setValue } = useContext(Questions)

    useEffect(() => {
        getData()
    }, [params])

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

        for (let i = 0; i < checkPregnant.length; i++) {
            const ageFrom = checkPregnant[i].age.from + ageAddition;
            const ageTo = checkPregnant[i].age.to + ageAddition;

            if (ageFrom <= params.age && ageTo >= params.age) {
                setResults(checkPregnant[i].answers);
                break;
            }
        }

        setAlgoGroup(algoGroupName);
    }

    const onSelect = (value, dataName) => {
        const newData = { ...params };
        newData[dataName] = value
        setParams(newData)
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
                        {index + 1 !== value.length && <View style={styles.horizontalLine}></View>}
                    </React.Fragment>
                ))}

            </View>

            <VerticalLine style={styles.verticalLine} />

            <View style={styles.container}>
                <Text style={styles.title}>{data.title}</Text>
                {results[0] && results.map((result, index) => (
                    <View key={`${result.name}-${index}`}>
                        <ResultContainer
                            answers={params}
                            title={result.header}
                            color={result.color}
                            delayTo={result.delayTo + algoGroup.ageAddition}
                            result={data[result.name]}
                        />
                    </View>
                ))}

                <Footer
                    buttonText='Next Step'
                    buttonStyle={styles.footerButton}
                    style={styles.footer}
                    goTo={() => navigation.navigate(routes.SELF_REFlECTION_SCREEN)}
                    goBack={() => {
                        setValue(value.slice(0, params.ansOldLength));
                        navigation.goBack()
                    }}
                />
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
    horizontalLine: {
        borderColor: colors.lightGray,
        borderWidth: 1,
        height: 36,
        marginHorizontal: 16
    },
    verticalLine: {
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
    }
})