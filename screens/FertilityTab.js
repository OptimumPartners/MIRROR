import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors } from "../assets/colors/colors"
import { getContentfulData } from '../client';
import CustomizedText from '../components/shared/CustomizedText';
import TabContainer from '../components/shared/TabContainer';
import { FERTILITY_TAB_ENTRY_ID } from '../env/env.json'

function FertilityTab({ navigation }) {

    const [data, setData] = useState({})

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const data = await getContentfulData(FERTILITY_TAB_ENTRY_ID);
        setData(data);
    }


    return data.content && (
        <TabContainer data={data} navigation={navigation} buttons={data.buttons}>
            <Text style={styles.title}>{data.content.title}</Text>

            {data.content.list.map((element, index) => (
                <View key={index}>
                    <CustomizedText ul>{element}</CustomizedText>
                    {element.subText && element.subText.map((text, index) => (
                        <CustomizedText key={text} ul dotColor={colors.gray} textStyle={styles.subText} style={styles.subTextContainer}>{text}</CustomizedText>
                    ))}
                </View>
            ))}
        </TabContainer>

    );
}

const styles = StyleSheet.create({
    subText: {
        color: colors.gray,
    },
    subTextContainer: {
        marginLeft: 8
    },
    title: {
        color: colors.primaryText,
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 3
    }
})

export default FertilityTab;
