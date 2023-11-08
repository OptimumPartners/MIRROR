import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import PurpleIcon from '../../assets/images/personIconPurple.svg'
import GrayIcon from '../../assets/images/personIconGray.svg'

const PercentageAmongPeople = ({ percentage }) => {

    return (
        <View style={styles.container}>

            {Array(100).fill('icon').map((elem, index) => {
                return (
                    <React.Fragment key={index}>
                        {percentage > index ? <PurpleIcon style={styles.icon} /> :
                            <GrayIcon style={styles.icon} />}
                    </React.Fragment>
                )
            })}
        </View>
    )
}
export default PercentageAmongPeople
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 160,
        width: 160,
    },
    icon: {
        height: 10,
        marginRight: 6,
        marginBottom: 6,
        width: 10
    }
})