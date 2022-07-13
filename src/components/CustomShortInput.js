import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import IconFA from "react-native-vector-icons/FontAwesome";
import { colors } from "../../assets/colors/colors";

IconFA.loadFont();

function CustomShortInput({
    value, showAnswers, options, handleShowAnswers, handleOptionChange,
}) {
    return (
        <View style={styles.container}>
            <View style={styles.choosenOption}>
                <Text style={styles.optionValue}>
                    {value}
                </Text>
                <TouchableOpacity
                    style={styles.optionArrow}
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
    optionArrow: {
        borderBottomWidth: 2,
        borderLeftColor: colors.black,
        borderLeftStyle: "solid",
        borderLeftWidth: 2,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    optionValue: {
        alignSelf: "flex-start",
        color: colors.black,
        fontSize: 20,
        fontWeight: "500",
        paddingLeft: 10,
    },
});

export default CustomShortInput;
