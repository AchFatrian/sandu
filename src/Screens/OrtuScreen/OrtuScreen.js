import { Text, View, StyleSheet, Dimensions, Image, TextInput, 
  TouchableOpacity, Keyboard, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from "react"
import Logo from '../../../assets/img/foto5.png'
import { useNavigation } from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';

const axios = require('axios')
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function OrtuScreen() {  
  const navigation = useNavigation('');

  const [isKeyboarVisible, setIsKeyboardVisible] = useState(false)
  const [childsNik, setChildNik] = useState('')
  const [isLoading, setLoading] = useState(false)

  const onDaftarPress = () => {
    navigation.navigate('daftar');
  }
  
  const getAlert = (title, message, button) => {
    return(
      Alert.alert(
        title, message,
        [{ text: button }]
      )
    )
  }

  const saveAuth = async (userData) => {
    EncryptedStorage.setItem("user", JSON.stringify({role: 'ortu', data: userData}))
    .then((result) => {
      setLoading(false)
      navigation.navigate('riwayatAnak', {id: userData._id, state: 'user'});
    }).catch((err) => {
        getAlert("Error", `Terjadi Kesalahan Saat Menyimpan sesi. ( ${err.message} )`, "kembali")
    });
  }

  const login = async () => {
    // navigation.navigate('riwayat');
    setLoading(true)
    if (childsNik != '') {
      axios.get(`https://harlequin-bullfrog-tie.cyclic.app/api/users/login/${Number(childsNik)}`)
        .then((result) => {
          if(result.data.length != 0 && result.data != null){
            saveAuth(result.data[0])
          } else {
            getAlert("Login gagal", "Pastikan NIK benar dan telah terdaftar", "kembali")
          }
        }).catch((err) => {
          getAlert("Login gagal", "Pastikan NIK benar dan telah terdaftar", "kembali")
        });
    } else {
      getAlert("Login Gagal", "Pastikan NIK Telah Terisi", "kembali")
    }
  }


  // const onLoginPress = () => {
  //   navigation.navigate('riwayat');
  // }
  
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
          <Text style={styles.title}>ORANG TUA</Text>
          {
              (!isKeyboarVisible) ? (
                  <Image source={Logo} style={styles.logo}/>
              ) : null
          }
          <Text style={styles.tName}>NIK ANAK :</Text>
          <TextInput style={styles.txtInput} onChangeText={setChildNik} value={childsNik}/>

          {
            (isLoading) ? (
                <ActivityIndicator size="large" />
            ) : (
              <TouchableOpacity style={styles.btnLogin} onPress={()=>login()}>
                <Text style={styles.btnCap}>Login</Text>
            </TouchableOpacity>
            )
          }

          <View style={styles.vDaftar}>
            <Text style={styles.tcap1}>Belum Punya Akun?</Text>
            <TouchableOpacity style={styles.tDaftar} 
            onPress={onDaftarPress}>
              <Text style={styles.tcap2}>Daftar disini</Text>
            </TouchableOpacity>
          </View>
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
      marginRight: windowWidth * 0.5,
      marginBottom: windowHeight * 0.007,
  },

  txtInput: {
      width: windowWidth * 0.7,
      height: windowHeight * 0.06,
      backgroundColor: '#4397af33',
      borderRadius: 8,
      marginBottom: windowHeight * 0.007,
      borderColor: '#4397AF',
      borderWidth: 1,
  },

  btnLogin:{
      marginTop: windowHeight *0.04,
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

  vDaftar:{
    marginTop: windowHeight * 0.15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth * 0.6,
    // backgroundColor: 'red',
  },

  tcap1:{
    color: 'black',
  },
  
  tDaftar: { 
    marginLeft: windowHeight * 0.01,
  },

  tcap2:{
    color: '#4397AF', 
    textDecorationLine: 'underline'
  },
})