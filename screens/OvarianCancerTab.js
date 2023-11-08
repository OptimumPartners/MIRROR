import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../assets/colors/colors';
import { getContentfulData } from '../client';
import CustomizedText from '../components/shared/CustomizedText';
import TabContainer from '../components/shared/TabContainer';
import { OVARIAN_CANCER_TAB_ENTRY_ID } from '@env'

function OvarianCancerTab({ navigation }) {

    const [data, setData] = useState({})

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const data = await getContentfulData(OVARIAN_CANCER_TAB_ENTRY_ID);
        setData(data);
    }


    return data.content && (
        <TabContainer data={data} navigation={navigation} buttons={data.buttons}>
            <View>
                {data.content.map((element, index) => (
                    <View key={index}>
                        <CustomizedText ul>{element}</CustomizedText>
                        {element.subText && element.subText.map((text, index) => (
                            <CustomizedText key={index} ul dotColor={colors.gray} textStyle={styles.subText} style={styles.subTextContainer}>{text}</CustomizedText>
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


export default OvarianCancerTab;