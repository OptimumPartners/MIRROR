import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { REVIEW_OPTIONS_ENTRY_ID } from '../env/env.json'
import Container from '../components/shared/Container'
import { getContentfulData } from '../client';
import ResultContainer from '../components/shared/ResultContainer';
import { ScrollView } from 'react-native-gesture-handler';
import Footer from '../components/shared/Footer';
import routes from '../navigators/routes';
import TimeLine from '../components/shared/TimeLine';
import { colors } from '../assets/colors/colors';
import { Questions } from '../contexts/QuestionContext';
import DropDown from '../components/shared/DropDown';
import VerticalLine from '../components/shared/VerticalLine';

const SurgicalOptions = ({ navigation, route }) => {
    const [data, setData] = useState({})

    const { value, setValues } = useContext(Questions)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const data = await getContentfulData(REVIEW_OPTIONS_ENTRY_ID);
        setData(data)
    }

    return data.title && (
        <ScrollView style={styles.scrollView}>
            <Container>
                <TimeLine currentStep={data.step} />

                <View style={styles.header}>
                    {value.map((question, index) => (
                        <>
                            <DropDown
                                key={question.key}
                                label={question.label}
                                value={route.params[question.key]}
                                options={question.values}
                                onSelect={(value) => onSelect(value, question.key)}
                                dropDownHeader={question.header}
                                placeholderStyle={styles.dropDownPlaceholder}
                                arrowSize={18}
                            />
                            {index + 1 !== value.length && <View style={styles.horizontalLine}></View>}
                        </>
                    ))}

                </View>

                <VerticalLine style={styles.verticalLine} />

                <View style={styles.container}>
                    <Text style={styles.title}>{data.title}</Text>
                    <View>
                        <ResultContainer result={data.BSO} />
                    </View>

                    <View>
                        <ResultContainer result={data.SDO} />
                    </View>
                    <Footer
                        buttonText='Submit for Discussion'
                        buttonStyle={styles.footerButton}
                        style={styles.footer}
                        goTo={() => { }}
                        goBack={() => navigation.navigate(routes.ADDITIONAL_QUESTION_SCREEN)}
                    // disabled={answers.pregnant && answers.menopause && answers.HRT}
                    />
                </View>
            </Container>
        </ScrollView>
    )
}
export default SurgicalOptions
const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        width: '45.5%'
    },
    scrollView: {
        width: '100%'
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
    },
    footerButton: {
        width: 219
    }
})