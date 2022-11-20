import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../assets/colors/colors';
import { getContentfulData } from '../client';
import CustomizedText from '../components/shared/CustomizedText';
import TabContainer from '../components/shared/TabContainer';
import { HELP_TAB_ENTRY_ID } from '@env'

const HelpTab = ({ navigation }) => {

    const [data, setData] = useState({})

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const data = await getContentfulData(HELP_TAB_ENTRY_ID);
        setData(data);
    }


    return data.content && (
        <TabContainer data={data} navigation={navigation} buttons={data.buttons}>

            <CustomizedText style={styles.title}>{data.content.title}</CustomizedText>

            {data.content.list.map((element, index) => (
                <View key={index}>
                    <CustomizedText ul>{element}</CustomizedText>
                    {element.subText && element.subText.map((text, index) => (
                        <CustomizedText key={index} ul dotColor={colors.gray} textStyle={styles.subText} style={styles.subTextContainer}>{text}</CustomizedText>
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

export default HelpTab