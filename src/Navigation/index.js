import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splashscreen from '../Screens/SplashScreen';
import StartScreen from '../Screens/StartScreen';
import OrtuScreen from '../Screens/OrtuScreen';
import KaderScreen from '../Screens/KaderScreen';
import DaftarScreen from '../Screens/DaftarScreen';
import ListAnakScreen from '../Screens//ListAnakScreen';
import InputDataScreen from '../Screens/InputDataScreen/InputDataScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {  
    return (
        <NavigationContainer style= {{flex: 1}}>
            <Stack.Navigator
            initialRouteName='splash'
            screenOptions={{headerShown: false}}>
                <Stack.Screen name="splash" component={Splashscreen} />
                <Stack.Screen name="start" component={StartScreen} />
                <Stack.Screen name="ortu" component={OrtuScreen} />
                <Stack.Screen name="kader" component={KaderScreen} />
                <Stack.Screen name="daftar" component={DaftarScreen} />
                <Stack.Screen name="listAnak" component={ListAnakScreen} />
                <Stack.Screen name="input" component={InputDataScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;