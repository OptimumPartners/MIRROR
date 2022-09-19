import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { colors } from '../assets/colors/colors';
import { MENOPAUSE_TAB_ENTRY_ID } from '../env/env.json'
import { getContentfulData } from "../client"
import TabContainer from '../components/shared/TabContainer';
import CustomizedText from '../components/shared/CustomizedText';


function MenopauseTab({ navigation }) {
    const [data, setData] = useState({})

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const data = await getContentfulData(MENOPAUSE_TAB_ENTRY_ID);
        setData(data)
    }

    return data.title && (
        <TabContainer data={data} navigation={navigation} buttons={data.buttons}>
            <View>
                {data.content.map((element, index) => (
                    <View key={index}>
                        <CustomizedText ol olNum={index + 1}>{element}</CustomizedText>
                        {element.subText && element.subText.map((text, index) => (
                            <CustomizedText
                                key={index}
                                ul
                                dotColor={colors.gray}
                                textStyle={styles.subText}
                                style={styles.subTextContainer}
                            >
                                {text}
                            </CustomizedText>
                        ))}
                    </View>
                ))}
            </View>
        </TabContainer>
    );
}

const styles = StyleSheet.create({
    subText: {
        color: colors.gray,
    },
    subTextContainer: {
        marginLeft: 8
    }
})

export default MenopauseTab;