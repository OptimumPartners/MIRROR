import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import IconFA from "react-native-vector-icons/FontAwesome";
import { colors } from "../../assets/colors/colors";

import { commonStyles } from "../styles/commonStyles"

function CustomShortInput({
    value, showAnswers, options, handleShowAnswers, handleOptionChange,
}) {
    return (
        <View style={styles.container}>
            <View style={styles.choosenOption}>
                <Text style={commonStyles.optionValue}>
                    {value}
                </Text>
                <TouchableOpacity
                    style={commonStyles.optionArrow}
                    onPress={() => handleShowAnswers()}
                >
                    <IconFA
                        name="angle-down"
                        size={25}
                        color={colors.black}
                    />
                </TouchableOpacity>
            </View>
            <View>
                {showAnswers
                    && options.map((option, k) => (
                        <TouchableOpacity
                            key={k}
                            onPress={() => {
                                handleOptionChange(option);
                                handleShowAnswers();
                            }}
                        >
                            <Text style={styles.optionValue}>
                                {option}
                            </Text>
                        </TouchableOpacity>
                    ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderColor: colors.black,
        borderStyle: "solid",
        borderWidth: 2,
        width: 150,
    },
    choosenOption: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

export default CustomShortInput;
