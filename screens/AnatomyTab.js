import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { colors } from '../assets/colors/colors';
import { getContentfulData } from '../client';
import CustomizedText from '../components/shared/CustomizedText';
import TabContainer from '../components/shared/TabContainer';
import { ANATOMY_TAB_ENTRY_ID } from '@env'

function AnatomyTab({ navigation }) {

    const [data, setData] = useState({})

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const data = await getContentfulData(ANATOMY_TAB_ENTRY_ID);
        setData(data);
    }


    return data.content && (
        <TabContainer data={data} navigation={navigation} buttons={data.buttons}>
            <View>
                <Image style={styles.image} source={require('../assets/images/uterus.png')} />

                {data.content.map((part, index) => (
                    <View style={styles.anatomyPart} key={part.name}>
                        <View style={styles.anatomyTitleContainer}>
                            <View style={styles.partNumberHolder}>
                                <Text style={styles.anatomyPartNumber}>{index + 1}</Text>
                            </View>

                            <Text style={styles.partName}>{part.name}</Text>
                        </View>

                        <View style={styles.symptomsContainer}>
                            {part.points.map((symptom, index) =>
                                <View
                                    style={styles.rowedBox}
                                    key={part.name + index}
                                >
                                    <CustomizedText ul={part.dots} style={styles.symptom}>
                                        {symptom}
                                    </CustomizedText>
                                </View>
                            )}
                        </View>
                    </View>
                ))}
            </View>
        </TabContainer>

    );
}

const styles = StyleSheet.create({
    image:{
        marginBottom:35
    },
    anatomyTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    partNumberHolder: {
        alignItems: 'center',
        backgroundColor: colors.purple,
        borderRadius: 10,
        justifyContent: 'center',
        marginRight: 8,
        height: 20,
        width: 20,
    },
    anatomyPartNumber: {
        color: colors.white,
        fontSize: 10,
        fontWeight: '600'
    },
    anatomyPart: {
        marginBottom: 32
    },
    partName: {
        color: colors.darkGray,
        fontSize: 12,
        fontWeight: '600'
    },
})
export default AnatomyTab;