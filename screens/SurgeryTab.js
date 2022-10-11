import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { SURGERY_TAB_ENTRY_ID } from '../env/env.json'
import { colors } from '../assets/colors/colors';
import TabContainer from '../components/shared/TabContainer';
import { getContentfulData } from '../client';
import CustomizedText from '../components/shared/CustomizedText';
import VerticalLine from '../components/shared/VerticalLine';

function SurgeryTab({ navigation }) {
    const [data, setData] = useState({})

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const data = await getContentfulData(SURGERY_TAB_ENTRY_ID);
        setData(data);
    }



    return data.firstContent && (
        <TabContainer data={data} navigation={navigation}>
            <Text style={styles.title}>{data.firstContent.title}</Text>
            <View>
                {data.firstContent.list.map((text, index) => (
                    <CustomizedText key={index} style={styles.text} ul>{text}</CustomizedText>
                ))}
            </View>

            <View style={styles.secondContent}>
                <VerticalLine style={styles.verticalLine} />

                <View style={styles.surgicalInfo}>
                    <Image style={styles.image} source={{ uri: `https:${data.helperImage.fields.file.url}` }} />

                    <View style={styles.surgicalInfoList}>
                        <Text style={styles.title}>{data.secondContent.title}</Text>
                        {data.secondContent.list.map((text, index) => (
                            <CustomizedText key={index} style={styles.text} ul>{text}</CustomizedText>
                        ))}
                    </View>
                </View>
            </View>
        </TabContainer>
    );
}

const styles = StyleSheet.create({
    secondContent: {
        alignSelf: 'flex-end',
        width: '141.8%'
    },
    surgicalInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    verticalLine: {
        marginVertical: 32,
    },
    surgicalInfoList: {
        width: '70.5%',
        marginRight: '1%'
    },
    image: {
        height: 133,
        width: 129
    },
    text: {
        marginTop: 14
    },
    title: {
        color: colors.primaryText,
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 3
    }
})

export default SurgeryTab;