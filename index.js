/**
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { AppRegistry } from 'react-native';
import App2 from './App';
import { name as appName } from './app.json';

const App = () => {
    return (
        <NavigationContainer>
            <App2 />
        </NavigationContainer>
    )
}

AppRegistry.registerComponent(appName, () => App);
