import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import Auth from './screens/Auth'
import SplashScreen from './screens/SplashScreen'

const Stack = createStackNavigator();

const initialState = {
    isSignedIn: false,
    isLoading: true,
}

export default class App extends Component {
    state = {
        ...initialState
    }
    render() {
        return (
            <Stack.Navigator headerMode="none">
                {this.state.isLoading ?
                    <Stack.Screen name="SplashScreen">
                        {() => <SplashScreen isLoading={() => this.setState({ isLoading: false })} {...this.props} />}
                    </Stack.Screen> : this.state.isSignedIn ?
                        <Stack.Screen name="Feed">
                            {() => <Auth {...this.props} login={() => this.setState({ isSignedIn: true })} />}
                        </Stack.Screen> :
                        <Stack.Screen name="Login" >
                            {() => <Auth {...this.props} login={() => this.setState({ isSignedIn: true })} />}
                        </Stack.Screen>}
            </Stack.Navigator>
        )
    }
}