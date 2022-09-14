import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../assets/colors/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import IconO from "react-native-vector-icons/Octicons";

const ResultContainer = ({ answers, title, color, delayTo, result }) => {
  const [pros, setPros] = useState([]);
  const [cons, setCons] = useState([]);

  useEffect(() => {
    fillCons();
    fillPros();
  }, [answers]);

  const fillPros = () => {
    const allPros = [...result.pro.content];
    if (result.pro.menopause && answers.menopause !== 'Yes') allPros.push(result.pro.menopause);
    if (result.pro.breastCancer && answers.breastCancer === 'Yes') allPros.push(result.pro.breastCancer);
    if (result.pro.HRT && answers.HRT !== 'No') allPros.push(result.pro.HRT);
    if (result.pro.pregnant && answers.pregnant !== 'No') allPros.push(result.pro.pregnant);
    if (result.pro.ovarianCancer && answers.ovarianCancer === 'Yes') allPros.push(result.pro.ovarianCancer);
    if (result.pro.age && result.pro.age.lessThan >= answers.age) allPros.push(result.pro.age.text);
    setPros(allPros)
  };

  const fillCons = () => {
    const allCons = [...result.con.content];
    if (result.con.menopause && answers.menopause === 'No') allCons.push(result.con.menopause);
    if (result.con.breastCancer && answers.breastCancer === 'Yes') allCons.push(result.con.breastCancer);
    if (result.con.HRT && answers.HRT === 'Yes') allCons.push(result.con.HRT);
    if (result.con.pregnant && answers.pregnant === 'Yes') allCons.push(result.con.pregnant);
    if (result.con.ovarianCancer && answers.ovarianCancer === 'Yes') allCons.push(result.con.ovarianCancer);
    if (result.con.age && result.con.age.lessThan >= answers.age) allCons.push(result.con.age.text);
    setCons(allCons);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, color === 2 && styles.headerYellow]}>
        <Text style={[styles.headerTitle, color === 2 && styles.headerTitleYellow]}>
          {title || result.title} {delayTo || ''}
        </Text>
        <Icon name='information-circle-outline' size={21} color={color === 2 ? colors.primaryText : colors.white} />
      </View>

      <View style={styles.body}>
        <View style={[styles.results, styles.pros]}>
          <View style={styles.resultsTitles}>
            <Text style={styles.prosTitle}>{result.pro.title}</Text>
          </View>

          {pros.map((pro, index) => (
            <View
              key={`${pro}-${index}`}
              style={styles.proConContainer}
            >
              <IconO
                name={"dot-fill"}
                color={colors.primaryText}
                size={9}
                style={styles.blackDot}
              />

              <Text style={styles.proConText}>{pro}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.results, styles.cons]}>
          <View style={[styles.resultsTitles, styles.consResultsTitles]}>
            <Text style={styles.consTitle}>{result.con.title}</Text>
          </View>

          {cons.map((con, index) => (
            <View
              key={`${con}-${index}`}
              style={styles.proConContainer}
            >
              <IconO
                name={"dot-fill"}
                color={colors.primaryText}
                size={9}
                style={styles.blackDot}
              />

              <Text style={styles.proConText}>{con}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}
export default ResultContainer
const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 32
  },
  header: {
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 48,
    paddingHorizontal: 16,
    width: '100%'
  },
  headerYellow: {
    backgroundColor: colors.yellow
  },
  headerTitle: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600'
  },
  headerTitleYellow: {
    color: colors.primaryText
  },
  body: {
    borderColor: colors.lightGray,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  pros: {
    width: '45.1%',
  },
  cons: {
    width: '40.2%',
  },
  results: {
    marginTop: 20,
    marginBottom: 24,
  },
  resultsTitles: {
    alignItems: 'center',
    borderRadius: 4,
    justifyContent: 'center',
    height: 20,
    width: 36,
    backgroundColor: colors.lightGreen,
  },
  consResultsTitles: {
    backgroundColor: colors.lightRed
  },
  prosTitle: {
    color: colors.green,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1
  },
  consTitle: {
    color: colors.red,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1
  },
  proConContainer: {
    flexDirection: 'row',
    marginTop: 12
  },
  blackDot: {
    marginHorizontal: 7,
    marginTop: 3
  },
  proConText: {
    color: colors.primaryText,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 14
  }

})