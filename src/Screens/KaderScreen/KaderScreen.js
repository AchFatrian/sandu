import { Text, 
    View,
    StyleSheet, 
    Dimensions, 
    Image, 
    TextInput, 
    TouchableOpacity, 
    Keyboard, } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import React, { useState, useEffect } from "react"
import Logo from '../../../assets/img/foto4.png'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function KaderScreen() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isKeyboarVisible, setIsKeyboardVisible] = useState(false)
    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", () => {
            setIsKeyboardVisible(true);
        })
        Keyboard.addListener("keyboardDidHide", () => {
            setIsKeyboardVisible(false);
        })
    }, [isKeyboarVisible])

  return (
        <View style={styles.container}>
            <Text style={styles.title}>KADER</Text>
            {
                (!isKeyboarVisible) ? (
                    <Image source={Logo} style={styles.logo}/>
                ) : null
            }
            <Text style={styles.tName}>Nama Posyandu:</Text>
            <TextInput style={styles.txtInput}/>
            <Text style={styles.tPass}>Password:</Text>
            <TextInput style={styles.txtPass} secureTextEntry={!passwordVisible}/>
            <View style={styles.vCheckbox}>
                <CheckBox
                value={passwordVisible}
                onValueChange={setPasswordVisible}
                style={styles.checkbox}/>
                <Text style={styles.label}>Tampilkan Password</Text>
            </View>
            <TouchableOpacity style={styles.btnLogin}>
                <Text style={styles.btnCap}>Login</Text>
            </TouchableOpacity>
        </View>
  )
}

const styles = StyleSheet.create({
    container: {  
        flex: 1,
        alignItems: 'center',
    },

    title: {
        fontSize: windowWidth * 0.07,
        color: '#4397AF',
        fontWeight: '800',
        marginTop: windowHeight * 0.04,
    },

    logo:{
        resizeMode:'contain',
        width: windowWidth * 0.8,
        height: windowHeight * 0.455,
    },

    tName:{
        fontSize: windowWidth * 0.04,
        fontWeight: '600',
        color: 'black',
        marginRight: windowWidth * 0.4,
        marginBottom: windowHeight * 0.007,
    },

    txtInput: {
        width: windowWidth * 0.7,
        height: windowHeight * 0.06,
        backgroundColor: '#4397af33',
        borderRadius: 8,
        marginBottom: windowHeight * 0.007,
    },

    tPass: {
        fontSize: windowWidth * 0.04,
        fontWeight: '600',
        color: 'black',
        marginRight: windowWidth * 0.52,
        marginBottom: windowHeight * 0.007,
    },

    txtPass: {
        width: windowWidth * 0.7,
        height: windowHeight * 0.06,
        backgroundColor: '#4397af33',
        borderRadius: 8,
    },

    vCheckbox: { 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: windowWidth * 0.34,
    },

    label:{
        color: 'black',
    },

    btnLogin:{
        marginTop: windowHeight *0.02,
        width: windowWidth * 0.35,
        height: windowHeight * 0.05,
        backgroundColor: '#4397AF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:29,
    },

    btnCap:{
        fontSize: windowWidth *0.055,
        color: 'white',
    },

})