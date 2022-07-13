import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import IconFA from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../assets/colors/colors';

const options = [
  'Yes',
  'No',
  'Unsure',
];

function TripleOptionBox({ defaultAnswer, updateAnswer }) {
  const [answer, setAnswer] = useState(defaultAnswer);

  const [showMenu, setShowMenu] = useState(false);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.option}>
          {answer}
        </Text>
        {showMenu && options.map((option) => (
          <TouchableOpacity
            key={option.id}// ??
            onPress={() => {
              updateAnswer(option);
              setAnswer(option);
              setShowMenu(!showMenu);
            }}
          >
            <Text style={styles.option}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        onPress={() => setShowMenu(!showMenu)}
        style={styles.iconContainer}
      >
        <IconFA
          name="angle-down"
          size={25}
          color={colors.black}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: colors.black,
    borderStyle: 'solid',
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
    width: 100,
  },
  option: {
    padding: 5,
  },
  iconContainer: {
    alignSelf: 'flex-start',
    borderBottomWidth: 2,
    borderColor: colors.black,
    borderLeftWidth: 2,
    borderStyle: 'solid',
  },
});

export default TripleOptionBox;
