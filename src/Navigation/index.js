import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splashscreen from './src/Screens/SplashScreen/splashscreen';

const stack = createNativeStackNavigator();

const Navigation = () => {  
    return (
        <NavigationContainer>
            <Stack.Navigator
            initialRouteName='Splash'
            screenOptions={{headerShown: false}}            >
                <Stack.Screen name="Splash" component={Splashscreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;