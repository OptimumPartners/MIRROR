import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../../assets/colors/colors'
import { getContentfulData } from '../../client'
import { LEARN_MORE_ENTRY_ID } from '../../env/env.json'
import HorizontalLine from './HorizontalLine'

const LearnMore = ({ navigate }) => {
    const [data, setData] = useState({})
    const [modalVisible, setModalVisible] = useState(false)
    useEffect(() => {
        getData()
    }, []);
    const { push } = useNavigation()
    const getData = async () => {
        const data = await getContentfulData(LEARN_MORE_ENTRY_ID);
        setData(data)
    }

    useEffect(() => {

    }, [])


    return data.icons && (
        <View style={styles.container}>
            <Text style={styles.title}>{data.title}</Text>
            <HorizontalLine />
            {data.icons.map(icon => (
                <View key={icon.fields.description}>
                    <TouchableOpacity onPress={() => navigate(icon.fields.title)}>
                        <View style={styles.rowData}>
                            <Image style={styles.image} source={{ uri: `https:${icon.fields.file.url}` }} />
                            <Text style={styles.rowTitle}>{icon.fields.description}</Text>
                        </View>
                    </TouchableOpacity>
                    <HorizontalLine />
                </View>
            ))}
        </View>
    )
}
export default LearnMore
const styles = StyleSheet.create({
    container: {
        left: 41,
        position: 'absolute',
        top: 442,
        width: '18.3%'
    },
    title: {
        color: colors.gray,
        fontSize: 10,
        fontWeight: '600',
        marginBottom: 16
    },
    rowData: {
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 12,
    },
    image: {
        height: 24,
        resizeMode: 'contain',
        width: 32,
    },
    rowTitle: {
        color: colors.primaryText,
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 13
    },

})