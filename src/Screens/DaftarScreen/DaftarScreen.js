import { Text, 
    View,
    StyleSheet, 
    Dimensions, 
    Image, 
    TextInput, 
    TouchableOpacity, 
    Keyboard, Alert } from 'react-native'
import React, { useState, useEffect } from "react"
import Logo from '../../../assets/img/foto6.png'
import { useNavigation } from '@react-navigation/native';

const axios = require('axios')

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function KaderScreen() {
    const navigation = useNavigation('');

    const [isKeyboarVisible, setIsKeyboardVisible] = useState(false)
    const [parentsName, setParentsName ] = useState('')
    const [phoneNum, setPhoneNum] = useState('')
    const [childsName, setChildName] = useState('')
    const [childsNik, setChildNik] = useState('')

    const register = async () => {
        if(parentsName != '' && phoneNum != '' &&  childsName != '' && childsNik != ''){
            const regisData = {
                childs_name: childsName,
                childs_birth: 29839238, // tambahan
                parents_name: parentsName,
                parents_phone: phoneNum, // tambahan
                childs_nik: childsNik,
                address: "jl.kskdsdjskdjsksd",
                posyandu_name: "Psyandu keren",
                posyandu_address: "jl.kajsakjskasjak",
            }

            // console.log(regisData)
            //axios
            axios.post(`https://sandu-api-production.up.railway.app/api/users`, regisData)
            .then((result) => {
                // console.log(result)
                navigation.navigate('ortu');
            }).catch((err) => {
                console.log(err)
            });

        } else {
            return(
                Alert.alert(
                    "Pendaftaran Gagal",
                    "Pastikan Semua Data Telah Terisi",
                    [
                      {
                        text: "Kembali",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                      }
                    ]
                  )
            )
        }
    }

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
            {
                (!isKeyboarVisible) ? (
                    <Image source={Logo} style={styles.logo}/>
                ) : null
            }
            <Text style={styles.tName}>Nama Orang Tua :</Text>
            <TextInput style={styles.txtInput} onChangeText={setParentsName} value={parentsName}/>

            <Text style={styles.tNoHP}>No HP :</Text>
            <TextInput style={styles.txtInput} onChangeText={setPhoneNum} value={phoneNum}/>
            
            <Text style={styles.tAnak}>Nama Anak :</Text>
            <TextInput style={styles.txtInput} onChangeText={setChildName} value={childsName}/>

            <Text style={styles.tNik}>NIK Anak :</Text>
            <TextInput style={styles.txtInput} onChangeText={setChildNik} value={childsNik}/>
            
            <TouchableOpacity style={styles.btnLogin} onPress={()=>register()}>
                <Text style={styles.btnCap}>Daftar</Text>
            </TouchableOpacity>
        </View>
  )
}

const styles = StyleSheet.create({
    container: {  
        flex: 1,
        alignItems: 'center',
    },

    logo:{
        resizeMode:'contain',
        width: windowWidth * 0.8,
        height: windowHeight * 0.3,
        marginBottom: windowHeight * 0.01,
    },

    tName:{
        fontSize: windowWidth * 0.04,
        fontWeight: '600',
        color: 'black',
        marginRight: windowWidth * 0.39,
        marginBottom: windowHeight * 0.007,
    },

    tNoHP: {
        fontSize: windowWidth * 0.04,
        fontWeight: '600',
        color: 'black',
        marginRight: windowWidth * 0.57,
        marginBottom: windowHeight * 0.007,
    },

    tAnak: {
        fontSize: windowWidth * 0.04,
        fontWeight: '600',
        color: 'black',
        marginRight: windowWidth * 0.47,
        marginBottom: windowHeight * 0.007,
    },

    tNik:{ 
        fontSize: windowWidth * 0.04,
        fontWeight: '600',
        color: 'black',
        marginRight: windowWidth * 0.51,
        marginBottom: windowHeight * 0.007,
    },

    txtInput: {
        width: windowWidth * 0.7,
        height: windowHeight * 0.06,
        backgroundColor: '#4397af33',
        borderRadius: 8,
        marginBottom: windowHeight * 0.007,
    },

    btnLogin:{
        marginTop: windowHeight *0.03,
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