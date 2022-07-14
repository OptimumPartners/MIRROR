import React from "react";
import {
    View, 
    StyleSheet,
    Text, 
    TouchableWithoutFeedback,
} from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import { screenNames } from "../../navigators/screenNames";
import { colors } from "../../assets/colors/colors";

function AnatomyIntroScreen() {

    const { navigate } = useNavigation();
    const { params } = useRoute();

    return (
        <TouchableWithoutFeedback
            onPress={() => navigate(
                screenNames.ANATOMY_REVIEW_SCREEN,
                params,
            )}
        >
            <View style={styles.container}>
                <Text style={styles.intro}>
          First, let’s review some anatomy
          and basic facts about ovarian cancer
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 50,
    },
    intro: {
        color: colors.color,
        fontSize: 35,
        fontWeight: "500",
    },
});

export default AnatomyIntroScreen;
