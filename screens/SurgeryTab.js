import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { SURGERY_TAB_ENTRY_ID } from '@env'
import { colors } from '../assets/colors/colors';
import TabContainer from '../components/shared/TabContainer';
import { getContentfulData } from '../client';
import CustomizedText from '../components/shared/CustomizedText';
import HorizontalLine from '../components/shared/HorizontalLine';
import InfoBox from '../components/shared/InfoBox';

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
            <View style={{ zIndex: 1 }}>
                {data.firstContent.list.map((text, index) => (
                    <View key={text} style={styles.text}>
                        <CustomizedText key={index} style={{ marginTop: 0 }} ul>
                            {text}
                        </CustomizedText>
                        {data.infoBox.afterText === text && <InfoBox data={data.infoBox} />}
                    </View>
                ))}
            </View>

            <View style={styles.secondContent}>
                <HorizontalLine style={styles.HorizontalLine} />

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
    HorizontalLine: {
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
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 14,
        width: '100%',
    },
    title: {
        color: colors.primaryText,
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 3
    }
})

export default SurgeryTab;