import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors } from '../assets/colors/colors';
import { LEARN_YOUR_RISK_ENTRY_ID } from '@env'
import { getContentfulData } from '../client';
import Container from '../components/shared/Container';
import HorizontalLine from '../components/shared/HorizontalLine';
import TimeLine from '../components/shared/TimeLine';
import DropDown from '../components/shared/DropDown';
import Footer from '../components/shared/Footer';
import routes from '../navigators/routes';
import { Questions } from '../contexts/QuestionContext';
import PercentageAmongPeople from '../components/shared/PercentageAmongPeople';
import CustomizedText from '../components/shared/CustomizedText';

function StatisticsScreen({ navigation, route }) {
  const [params, setParams] = useState(route.params);
  const [data, setData] = useState({});
  const [riskPercentage, setRiskPercentage] = useState({});

  const { value } = useContext(Questions)

  useEffect(() => {
    getData()
  }, [params]);

  const getData = async () => {
    const data = await getContentfulData(LEARN_YOUR_RISK_ENTRY_ID);
    const fillAdditionalRisks = fillAdditionalRisk(data)
    const fillAdditionalAgeInfos = fillAdditionalAgeInfo(fillAdditionalRisks)

    setData(fillAdditionalAgeInfos)
    setRiskPercentage(data.risks.percentages[params.geneticResult])
  }

  const fillAdditionalRisk = (data) => {
    const allData = { ...data }
    if (params.ovarianCancer === 'Yes' && params.breastCancer === 'Yes') {
      allData.risks.values = [...allData.risks.values, ...allData.risks.breastAndOvarianCancer]
      return allData
    };
    if (params.ovarianCancer === 'Yes') {
      allData.risks.values = [...allData.risks.values, ...allData.risks.ovarianCancer]
      return allData
    };
    if (params.breastCancer === 'Yes') {
      allData.risks.values = [...allData.risks.values, ...allData.risks.breastCancer]
      return allData
    };
    return data
  }

  const fillAdditionalAgeInfo = (data) => {
    const allData = { ...data }
    if (allData?.ageInfo?.breastAndOvarianCancer && params.ovarianCancer === 'Yes' && params.breastCancer === 'Yes') {
      allData.ageInfo.values = [...allData.ageInfo.values, ...allData.ageInfo.breastAndOvarianCancer]
      return allData
    };
    if (allData?.ageInfo?.ovarianCancer && params.ovarianCancer === 'Yes') {
      allData.ageInfo.values = [...allData.ageInfo.values, ...allData.ageInfo.ovarianCancer]
      return allData
    };
    if (allData?.ageInfo?.breastCancer && params.breastCancer === 'Yes') {
      allData.ageInfo.values = [...allData.ageInfo.values, ...allData.ageInfo.breastCancer]
      return allData
    };
    return data
  }

  const onSelect = (value, dataName) => {
    const newData = { ...params };
    newData[dataName] = value
    setParams(newData)
  }

  return data.description && (
    <Container style={styles.container}>

      <TimeLine currentStep={data.step} />

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
              right={index > 2}
            />
            {index + 1 !== value.length && <View style={styles.verticalLine}></View>}
          </React.Fragment>
        ))}
      </View>

      <HorizontalLine style={styles.horizontalLine} />

      <View style={styles.bodyContainer}>
        <View style={styles.statistics}>
          <View style={styles.statisticsImageContainer}>
            <PercentageAmongPeople percentage={riskPercentage.to} />
            <Text style={styles.statisticsDescription}>Before surgery</Text>
          </View>

          <View style={styles.statisticsImageContainer}>
            <PercentageAmongPeople percentage={2} />
            <Text style={styles.statisticsDescription}>After removal of tubes and ovaries</Text>
          </View>
        </View>

        <View style={styles.resultContainer}>
          <View style={styles.banner}>
            <Text style={styles.bannerRiskDescription}>{data.description}</Text>
            <Text style={styles.bannerUnderLinedTitle}>{data.risksTitle}</Text>

            <View>
              {data.risks.values.map((risk, index) => {
                const ovarianRisk = index === data.risks.percentageIndex
                const ovarianRiskOutput = riskPercentage.from ? riskPercentage.from + '-' + riskPercentage.to : riskPercentage.to
                return (
                  <View key={risk?.text ? risk.text : risk}>
                    <CustomizedText
                      additions={<Text style={styles.fragment}>
                        {ovarianRisk && ovarianRiskOutput} {ovarianRisk && typeof riskPercentage.to === 'number' ? '%.' : ''}
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

          <View style={styles.doesAgeMatter}>
            <Text style={styles.bannerUnderLinedTitle}>{data.ageInfoTitle}</Text>

            <View style={styles.resultPoints}>
              {data.ageInfo.values.map((reason) => (
                <View key={reason?.text ? reason.text : reason}>
                  <CustomizedText ul>{reason}</CustomizedText>
                </View>
              ))}
            </View>
          </View>

        </View>
      </View>
      <Footer
        style={styles.footer}
        goBack={() => navigation.goBack()}
        goTo={() => {
          const isLynch = params.geneticResult.toLowerCase().startsWith('lynch')
          navigation.navigate(
            isLynch ? routes.LYNCH_STATISTICS : routes.ANATOMY_REVIEW_SCREEN,
            { ...params }
          )
        }}
      />
    </Container>
  );

}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
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
    width: '45.9%',
  },
  baseLine: {
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderStyle: "solid",
    borderWidth: 2,
    marginHorizontal: 20,
    width: 200,
  },
  iconMore: {
    alignSelf: "center",
    borderBottomWidth: 2,
    borderRightWidth: 2,
    padding: 5,
  },
  baseLineHeader: {
    flexDirection: "row",
  },
  baseLineHeaderTitle: {
    color: colors.black,
    flex: 1,
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
  baseLineContent: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  dataOption: {
    color: colors.gray,
    fontSize: 20,
    fontWeight: "500",
    marginRight: 7,
    textDecorationLine: "underline",
  },
  dataOptionInfo: {
    color: colors.black,
    fontSize: 20,
    fontWeight: "500",
  },
  banner: {
    paddingHorizontal: 20,
  },
  bannerRiskDescription: {
    color: colors.primaryText,
    fontSize: 24,
    fontWeight: "500",
  },
  bannerUnderLinedTitle: {
    color: colors.darkGray,
    fontSize: 14,
    fontWeight: "600",
    marginTop: 24
  },
  doesAgeMatter: {
    paddingHorizontal: 20,
  },
  fragment: {
    color: colors.primaryText,
    fontSize: 14,
    fontWeight: '700'
  },
  statistics: {
    marginRight: '7.7%',
  },
  statisticsImageContainer: {
    marginBottom: 32
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
  footer: {
    width: '45.6%',
    alignSelf: 'center'
  }
})

export default StatisticsScreen;