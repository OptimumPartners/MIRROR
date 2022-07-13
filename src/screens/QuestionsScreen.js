import React, { useState, useEffect } from "react";
import { 
    View, 
    StyleSheet, 
    Text 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";

import { colors } from "../../assets/colors/colors";

import CustomLongInput from "../components/CustomLongInput";
import CustomShortInput from "../components/CustomShortInput";

import { client } from "../API/client";

function QuestionsScreen() {

    const navigation = useNavigation();

    const [geneticResults, setGeneticResults] = useState([]);

    useEffect(() => {
        client.getEntries()
            .then((response) => setGeneticResults(response.items.find((item) => item.fields.geneticResult).fields.geneticResult))
            .catch((err) => console.log(err));
    }, []);

    const answers = [
        "Yes",
        "No",
    ];

    const [geneticResult, setGeneticResult] = useState();

    const [showResults, setShowResults] = useState(false);

    const [answerOne, setAnswerOne] = useState();
    const [showAnswersOne, setShowAnswersOne] = useState(false);

    const [answerTwo, setAnswerTwo] = useState();
    const [showAnswersTwo, setShowAnswersTwo] = useState(false);

    const [age, setAge] = useState(null);

    useEffect(() => {
        if (answerOne && answerTwo && geneticResult && age > 0) {
            navigation.navigate(
                "StatisticsScreen",
                {
                    geneticResult,
                    age,
                    answerOne,
                    answerTwo,
                },
            );
        }
    }, [answerOne, answerTwo, geneticResult, age]);

    const handleArrowPress = () => {
        setShowResults(!showResults);
    };

    const handleShowAnswersOne = () => {
        setShowAnswersOne(!showAnswersOne);
    };

    const handleShowAnswersTwo = () => {
        setShowAnswersTwo(!showAnswersTwo);
    };

    return (
        <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
                <View>
                    <Text style={styles.article}>
            You are here to discuss your increased risk of
                        {" "}
                        <Text style={styles.boldArticle}>ovarian cancer</Text>
            .
                    </Text>
                    <Text style={styles.article}>
            We will discuss next steps to reduce your risk,
            but first need some information about you.
                    </Text>
                </View>
                <View>
                    <View style={styles.questionInRow}>
                        <Text style={styles.questionTitle}>
              Genetic Result
                        </Text>
                        <CustomLongInput
                            value={geneticResult}
                            arrowOption
                            options={geneticResults}
                            showOptions={showResults}
                            handleArrowPress={handleArrowPress}
                            handleOptionChange={setGeneticResult}
                        />
                    </View>
                    <View style={styles.questionInRow}>
                        <Text style={styles.questionTitle}>
              Age
                        </Text>
                        <CustomLongInput
                            handleInputValueUpdate={setAge}
                        />
                    </View>
                    <View style={styles.questionInColumn}>
                        <Text style={styles.questionTitle}>
              Do you or have you had breast cancer?
                        </Text>
                        <CustomShortInput
                            value={answerOne}
                            options={answers}
                            showAnswers={showAnswersOne}
                            handleShowAnswers={handleShowAnswersOne}
                            handleOptionChange={setAnswerOne}
                        />
                    </View>
                    <View style={styles.questionInColumn}>
                        <Text style={styles.questionTitle}>
              Do you or have you had family members with ovarian cancer?
                        </Text>
                        <CustomShortInput
                            value={answerTwo}
                            options={answers}
                            showAnswers={showAnswersTwo}
                            handleShowAnswers={handleShowAnswersTwo}
                            handleOptionChange={setAnswerTwo}
                        />
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 80,
    },
    article: {
        fontSize: 20,
        color: colors.black,
        paddingBottom: 20,
    },
    boldArticle: {
        fontWeight: "500",
    },
    questionInRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginVertical: 5,
    },
    questionInColumn: {
        alignItems: "center",
    },
    questionTitle: {
        fontSize: 17,
        paddingRight: 20,
        fontWeight: "500",
        color: colors.black,
        marginVertical: 5,
    },
});

export default QuestionsScreen;
