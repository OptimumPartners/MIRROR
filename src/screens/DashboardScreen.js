import React from "react";
import TabNavigator from "../../navigators/TabNavigator";

import { useRoute } from "@react-navigation/native";
function DashboardScreen() {
    const { params } = useRoute()
    return (
        <TabNavigator answers={params} />
    );
}

export default DashboardScreen;
