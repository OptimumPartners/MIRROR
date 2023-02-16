import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { colors } from '../../assets/colors/colors'
import { getContentfulData } from '../../client'
import { TIME_LINE_ENTRY_ID } from '@env'
import Icon from 'react-native-vector-icons/Ionicons';
import { StackActions, useNavigation } from '@react-navigation/native'
import { Questions } from '../../contexts/QuestionContext'

const TimeLine = ({ currentStep, header }) => {
  const [data, setData] = useState({});

  const navigation = useNavigation()

  const { value, setValue } = useContext(Questions)

  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
    const data = await getContentfulData(TIME_LINE_ENTRY_ID);
    setData(data)
  }


  const handleStepPress = (step) => {
    const numberToPop = step < 3 ? (navigation.getState().routes.length - 2) - step : currentStep - step
    if (numberToPop < 1) return;
    if (step < 4) setValue(value.slice(0, 4))
    const popAction = StackActions.pop(numberToPop)
    navigation.dispatch(popAction);
  }


  return data.steps && (
    <View style={styles.container}>
      {header && <Text style={styles.header}>{header}</Text>}
      <View>
        {data.steps.map(step => {
          const current = step.id === currentStep;
          const passed = step.id < currentStep;
          return (
            <TouchableWithoutFeedback key={step.id} onPress={() => handleStepPress(step.id)}>
              <View style={styles.stepContainer}>
                <View style={[styles.step, current && styles.currentStep, passed && styles.passedStep]}>
                  {passed ? <Icon name='ios-checkmark-sharp' color={colors.white} size={19} /> :
                    <Text style={[styles.stepNum, current && styles.stepNumCurrent]}>{step.id}</Text>}
                </View>

                <Text style={[styles.stepText, current && styles.currentStepText]}>{step.text}</Text>
              </View>
            </TouchableWithoutFeedback>
          )
        })}
        <View style={styles.horizontalLine}></View>
      </View>
    </View>
  )
}
export default TimeLine
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 41,
    top: 64,
  },
  header: {
    color: colors.darkGray,
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 16
  },
  stepContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 16,
  },
  step: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    borderColor: colors.lightGray,
    borderWidth: 2,
    justifyContent: 'center',
    marginRight: 12,
    height: 32,
    width: 32,
  },
  currentStep: {
    backgroundColor: colors.lightBlue,
    borderWidth: 0
  },
  passedStep: {
    backgroundColor: colors.lightGray
  },
  stepNum: {
    color: colors.darkGray,
    fontSize: 12,
    fontWeight: '600'
  },
  stepNumCurrent: {
    color: colors.white,
  },
  stepText: {
    color: colors.darkGray,
    fontSize: 12,
    fontWeight: '500'
  },
  currentStepText: {
    color: colors.primaryText
  },
  horizontalLine: {
    borderColor: colors.lightGray,
    borderWidth: 1,
    marginLeft: 16,
    position: 'absolute',
    top: 16,
    height: 228,
    width: 0,
    zIndex: -1
  }

})