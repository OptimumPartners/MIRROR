import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { colors } from '../../assets/colors/colors'

const Checkbox = ({ labelStyle, label, checked, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={[styles.checkerOutLine, checked && styles.checkerOutLineChecked]}>
          {checked && <View style={styles.checkerInner}></View>}
        </View>

        <Text style={[styles.label, checked && styles.checkedLabel, labelStyle]}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Checkbox
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkerOutLine: {
    borderColor: colors.gray,
    borderRadius: 20,
    borderWidth: 2,
    height: 24,
    width: 24
  },
  checkerOutLineChecked: {
    borderColor:colors.primaryText
  },
  checkerInner: {
    backgroundColor: colors.lightBlue,
    flex: 1,
    borderRadius: 10,
    margin: 2
  },
  label: {
    marginLeft: 7,
    color: colors.gray
  },
  checkedLabel: {
    color: colors.primaryText
  }
})