import React from 'react';
import TabNavigator from '../navigators/TabNavigator';

function DashboardScreen({ route }) {
    return (
        <TabNavigator answers={route.params} />
    );
}

export default DashboardScreen;