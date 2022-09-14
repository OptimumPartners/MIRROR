import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const PercentageAmongPeople = ({ percentage }) => {

    return (
        <View style={styles.container}>

            {Array(100).fill('icon').map((elem, index) => {
                return (
                    <React.Fragment key={index}>
                        {percentage > index ? <Image style={styles.icon} source={require('../../assets/images/personIconPurple.png')} /> :
                            <Image style={styles.icon} source={require('../../assets/images/personIconGray.png')} />}
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
        flexWrap:'wrap',
        height: 160,
        width: 160,
    },
    icon: {
        height: 10,
        marginRight: 6,
        marginBottom:6,
        width: 10
    }
})