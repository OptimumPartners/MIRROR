import React, { useEffect, useState } from 'react'
import { Linking, StyleSheet, Text, View } from 'react-native'
import IconO from "react-native-vector-icons/Octicons";
import { colors } from '../../assets/colors/colors';
import InfoBox from './InfoBox';

const CustomizedText = ({ children, ul = false, ol = false, olNum = 0, dotSize = 9, dotColor = colors.primaryText, textStyle = {}, style = {}, additions }) => {
    const [textResult, setTextResult] = useState('')

    useEffect(() => {
        if (!children.text) {
            setTextResult(children)
            return
        }
        const boldResult = detectBold()
        const linkResult = detectLink(boldResult)
        setTextResult(linkResult)
    }, [])

    const detectBold = () => {
        if (!children.bold) {
            return children.text
        }
        const result = children.text.split(children.bold);
        const purple = children.purple ? <Text key={children.purple} style={styles.purple}>{children.purple}</Text> : ''
        const text = <Text key={children.bold} style={styles.boldText}>{purple}{children.bold}</Text>
        result.splice(1, 0, text)
        return result
    }

    const detectLink = (result) => {
        if (!children.link) {
            return result
        }

        const newText = <Text key={children.link.text} onPress={() => Linking.openURL(children.link.url)} style={styles.link}>
            {children.link.text}
        </Text>

        if (typeof result === 'string') {
            result = result.split(children.link.text);
            result.splice(1, 0, newText);
        }
        else {
            if (result[0].indexOf(children.link.text) >= 0) {
                result[0] = result[0].split(children.link.text);
                result[0].splice(1, 0, newText);
            }

            if (result[2]?.indexOf(children.link.text)) {
                result[2] = result[2].split(children.link.text);
                result[2].splice(1, 0, newText);
            }
        }

        return result
    }

    return (
        <View style={[styles.container, style]}>
            {ul && <IconO
                name={"dot-fill"}
                color={dotColor}
                size={dotSize}
                style={styles.blackDot}
            />}
            {ol && <Text style={[styles.text, textStyle]}>{olNum}. </Text>}

            <Text style={[styles.text, textStyle]}>{textResult} {additions && additions}</Text>

            {children?.info && <InfoBox style={styles.infoBox} data={children.info}/>}
        </View>
    )
}
export default CustomizedText
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 17
    },
    blackDot: {
        marginHorizontal: 7,
        top: 3
    },
    text: {
        color: colors.primaryText,
        fontSize: 14,
        fontWeight: '500',
    },
    boldText: {
        fontWeight: '700'
    },
    purple: {
        color: colors.purple
    },
    link: {
        color: colors.lightBlue,
        fontWeight: '700'
    },
    infoBox:{
        marginLeft:0
    }

})