import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors } from '../assets/colors/colors';
import DropDownPicker from 'react-native-dropdown-picker';
import { BASIC_INFO_ENTRY_ID } from '../env/env.json'

import { getContentfulData } from '../client'
import Container from '../components/shared/Container';
import Checkbox from '../components/shared/Checkbox';
import Footer from '../components/shared/Footer';
import TimeLine from '../components/shared/TimeLine';
import routes from '../navigators/routes';
import { Questions } from '../contexts/QuestionContext';
import NumberInput from '../components/shared/NumberInput';
import CustomizedText from '../components/shared/CustomizedText';
import InfoBox from '../components/shared/InfoBox';

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
          <CustomizedText textStyle={styles.headerArticle}>{data.title}</CustomizedText>
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

              <InfoBox data={data.geneticResultInfo} style={styles.infoBox} />

            </View>
          </View>

          <View style={styles.questions}>
            <Text style={styles.questionsTitle}>{data.age.question}</Text>
            <NumberInput
              onChange={setAge}
              value={age}
              placeholder={data.age.placeholder}
              placeholderTextColor={colors.darkGray}
            />
          </View>

          <View style={styles.questions}>
            <Text style={styles.questionsTitle}>{data.breastCancerValues.question}</Text>
            <View style={styles.checkboxRow}>
              {data.breastCancerValues.values.map((value, index) => (
                <Checkbox
                  key={`${value}~${index}`}
                  labelStyle={styles.checkbox}
                  label={value}
                  checked={breastCancer === value}
                  onPress={() => setBreastCancer(value)}
                />
              ))}
            </View>
          </View>

          <View style={styles.questions}>
            <View style={styles.questionTextContainer}>
              <Text style={styles.questionsTitle}>{data.ovarianCancerValues.question}</Text>
              <InfoBox data={data.familyMembersInfo} style={styles.infoBox} />
            </View>

            <View style={styles.checkboxRow}>
              {data.ovarianCancerValues.values.map((value, index) => (
                <Checkbox
                  key={`${index}-${value}`}
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
                navigation.goBack()
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
    marginBottom: 16,
  },
  boldArticle: {
    fontWeight: "700",
  },
  article: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 32
  },
  infoBox: {
    marginLeft: 16
  },
  dropDownContainer: {
    alignItems: 'center',
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
  questionTextContainer: {
    flexDirection: 'row'
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
    color: colors.primaryText,
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
    // marginRight:16
  }
})

export default QuestionsScreen;