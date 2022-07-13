import React from "react";
import { View, TouchableOpacity } from "react-native";

import IconAD from "react-native-vector-icons/AntDesign";

function InfoCirlcle({ onPress, size }) {
    return (
        <View>
            <TouchableOpacity onPress={onPress}>
                <IconAD
                    name="infocirlce"
                    size={size}
                />
            </TouchableOpacity>
        </View>
    );
}

export default InfoCirlcle;
