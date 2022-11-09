import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splashscreen from '../Screens/SplashScreen';
import StartScreen from '../Screens/StartScreen';
import OrtuScreen from '../Screens/OrtuScreen';
import KaderScreen from '../Screens/KaderScreen';
import DaftarScreen from '../Screens/DaftarScreen';
import EditScreen from '../Screens/EditScreen';
import ListAnakScreen from '../Screens//ListAnakScreen';
import InputDataScreen from '../Screens/InputDataScreen/InputDataScreen';
import MenuScreen from '../Screens/MenuScreen';
import RiwayatScreen from '../Screens/RiwayatScreen';
import InputBeratScreen from '../Screens/InputBeratScreen';
import InputTinggiScreen from '../Screens/InputTinggiScreen';
import PreviewScreen from '../Screens/PreviewScreen';
import RiwayatAnakScreen from '../Screens/RiwayatAnakScreen';

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
                <Stack.Screen name="edit" component={EditScreen} />
                <Stack.Screen name="listAnak" component={ListAnakScreen} />
                <Stack.Screen name="menu" component={MenuScreen} />
                <Stack.Screen name="input" component={InputDataScreen} />
                <Stack.Screen name="riwayat" component={RiwayatScreen} />
                <Stack.Screen name="berat" component={InputBeratScreen} />
                <Stack.Screen name="tinggi" component={InputTinggiScreen} />
                <Stack.Screen name="preview" component={PreviewScreen} />
                <Stack.Screen name="riwayatAnak" component={RiwayatAnakScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;