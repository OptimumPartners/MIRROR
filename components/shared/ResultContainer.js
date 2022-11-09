import React, {  useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../assets/colors/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import IconO from "react-native-vector-icons/Octicons";

const ResultContainer = ({result }) => {
  const [finalResult, setFinalResult] = useState({ ...result })

  return (
    <View style={styles.container}>
      <View style={[styles.header, result.color === 2 && styles.headerYellow]}>
        <Text style={[styles.headerTitle, result.color === 2 && styles.headerTitleYellow]}>
          {result.title} {result.delayTo || ''}
        </Text>
        <Icon name='information-circle-outline' size={21} color={result.color === 2 ? colors.primaryText : colors.white} />
      </View>

      <View style={styles.body}>
        <View style={[styles.results, styles.pros]}>
          <View style={styles.resultsTitles}>
            <Text style={styles.prosTitle}>{result.pro.title}</Text>
          </View>

          {result.pro.content.map((pro, index) => (
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

          {result.con.content.map((con, index) => (
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