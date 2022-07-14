import React from "react";
import { View, StyleSheet, TouchableOpacity, TextInput, Text } from "react-native";
import IconFA from "react-native-vector-icons/FontAwesome";
import { colors } from "../../assets/colors/colors";

import { commonStyles } from "../styles/commonStyles"

function CustomLongInput({
    value,
    arrowOption = false,
    handleArrowPress,
    options,
    showOptions,
    handleOptionChange,
    handleInputValueUpdate,
}) {
    return (
        <View style={styles.container}>
            {arrowOption
                ? (
                    <View style={styles.choosenOption}>
                        <Text style={commonStyles.optionValue}>
                            {value}
                        </Text>
                        <TouchableOpacity
                            style={commonStyles.optionArrow}
                            onPress={() => handleArrowPress()}
                        >
                            <IconFA
                                name="angle-down"
                                size={25}
                                color={colors.black}
                            />
                        </TouchableOpacity>
                    </View>
                )
                : (
                    <TextInput
                        keyboardType="numeric"
                        style={styles.optionInput}
                        onChangeText={handleInputValueUpdate}
                    />
                )}
            <View>
                {showOptions
                    && options.map((option, k) => (
                        <TouchableOpacity
                            key={k}
                            onPress={() => {
                                handleOptionChange(option);
                                handleArrowPress();
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
        width: 200,
    },
    choosenOption: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    optionInput: {
        fontSize: 20,
        fontWeight: "500",
        paddingVertical: 5,
    },
});

export default CustomLongInput;
