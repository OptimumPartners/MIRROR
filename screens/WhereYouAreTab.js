import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { colors } from '../assets/colors/colors';
import TitledContainer from '../components/TitledContainer';


import { client } from "../client"


function WhereAreYouTab({ navigation, route }) {

    const [showInfo, setShowInfo] = useState(false);

    const [removalRisksPROAll, setRemovalRisksPROAll] = useState([])
    const [removalRisksCONAll, setRemovalRisksCONAll] = useState([])
    const [removalOfBothPRO, setRemovalOfBothPRO] = useState([])
    const [removalOfBothCON, setRemovalOfBothCON] = useState([])


    useEffect(() => {
        client.getEntries()
            .then((response) => {
                setRemovalRisksPROAll(response.items.find((item) => item.fields.removalRisksProAll).fields.removalRisksProAll)
                setRemovalRisksCONAll(response.items.find((item) => item.fields.removalRisksConAll).fields.removalRisksConAll)
                setRemovalOfBothPRO(response.items.find((item) => item.fields.removalOfBothPro).fields.removalOfBothPro)
                setRemovalOfBothCON(response.items.find((item) => item.fields.removalOfBothCon).fields.removalOfBothCon)
            })
    }, [])

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={() => setShowInfo(false)}>
                <View >
                    <Text style={styles.title}>
                        Where you are?
                    </Text>
                    <View style={styles.container}>
                        <Text style={styles.subTitle}>
                            Your surgical options:
                        </Text>
                        <TitledContainer
                            title={"Removal of uterus both tubes and ovaries"}
                            pro={removalRisksPROAll}
                            con={removalRisksCONAll}
                            showInfo={showInfo}
                            setShowInfo={setShowInfo}
                        />
                        <TitledContainer
                            title={"Removal of both tubes and ovaries"}
                            pro={removalOfBothPRO}
                            con={removalOfBothCON}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 30,
    },
    subTitle: {
        fontSize: 18,
        paddingVertical: 10,
    }
})

export default WhereAreYouTab;
