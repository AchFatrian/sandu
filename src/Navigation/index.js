import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splashscreen from '../Screens/SplashScreen';
import StartScreen from '../Screens/StartScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {  
    return (
        <NavigationContainer style= {{flex: 1}}>
            <Stack.Navigator
            initialRouteName='Splash'
            screenOptions={{headerShown: false}}>
                <Stack.Screen name="Splash" component={Splashscreen} />
                <Stack.Screen name="Start" component={StartScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;