import React, { Component } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'

import Auth from './screens/Auth'
import SplashScreen from './screens/SplashScreen'
import Feed from './screens/Feed';
import Video from './screens/Video';
import CommonStyles from './CommonStyles';

const Stack = createStackNavigator();

const initialState = {
    isSignedIn: false,
    isLoading: true,
}

class AppStack extends Component {
    render() {
        return (
            <Stack.Navigator
                screenOptions={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    headerTitleStyle: {
                        fontFamily: CommonStyles.fontFamilyTitle,
                    },
                    headerTintColor: 'red'
                }}>
                <Stack.Screen name="Feed"  >
                    {(props) => <Feed {...this.props} {...props} />}
                </Stack.Screen>
                <Stack.Screen name="Video" options={{ headerTintColor: 'black' }}>
                    {(props) => <Video {...this.props} {...props} />}
                </Stack.Screen>
            </Stack.Navigator>
        )
    }
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
                            {(props) => <AppStack {...props} {...this.props} />}
                        </Stack.Screen> :
                        <Stack.Screen name="Login" >
                            {() => <Auth {...this.props} login={() => this.setState({ isSignedIn: true })} />}
                        </Stack.Screen>}
            </Stack.Navigator>
        )
    }
}