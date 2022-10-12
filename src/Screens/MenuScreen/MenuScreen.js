import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState, useCallback } from 'react'
import Back from '../../../assets/img/back.png'
import Lihat from '../../../assets/img/lihat1.png'
import Input from '../../../assets/img/input.png'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MenuScreen() {
    const navigation = useNavigation('');
    const [user, setUser] = useState({});

    const onInputPress = () => {
        navigation.navigate('berat');
    }

    const onBackPress = () => {
        navigation.navigate('listAnak');
    }

    const onLihatPress = () => {
        navigation.navigate('riwayatAnak');
    }

    const getAlert = (title, message, button) => {
        return(
          Alert.alert(
            title, message,
            [{ text: button }]
          )
        )
      }

    const getUsers = async () => {
        EncryptedStorage.getItem("selected_user")
        .then((result) => {
            setUser(JSON.parse(result))
        }).catch((err) => {
            getAlert("Error", `Terjadi Kesalahan Saat Mengambil Data, ( ${err.message} )`, "kembali")
        });
    }

    useFocusEffect(
        useCallback(() => {
          getUsers()
        }, [])
    )
    return (
    <View style={styles.container}>
      <View style={styles.control}>
        <TouchableOpacity style={styles.tBackImg} onPress={onBackPress}>
            <Image source={Back} style={styles.backImg}/>
        </TouchableOpacity>
        <View style={styles.containerNama} >
           <View style={styles.leftColor}></View>
           <View style={styles.vCaption}>
                <Text style={styles.txtNama}>{user.childs_name}</Text>
                <Text style={styles.txtNik}>{user.childs_nik}</Text>
           </View>
        </View>
        <TouchableOpacity style={styles.tBtn} onPress={onLihatPress}>
            <Text style={styles.txtCap}>Lihat Data</Text>
            <Image source={Lihat} style={styles.iLihat}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tBtn} onPress={onInputPress}>
            <Text style={styles.txtCap}>Input Data</Text>
            <Image source={Input} style={styles.iInput}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    control: {
        height: '95%',
        width: '92%',
        backgroundColor: '#4397af33',
        borderRadius: 20,
        alignItems: 'center',
    },

    tBackImg: {
        // borderWidth: 1,
        marginRight: windowWidth * 0.75,
        marginTop: windowHeight * 0.04,
    },

    backImg: {
        width: windowWidth * 0.025,
        height: windowHeight * 0.035,
    },

    containerNama: {
        marginTop: windowWidth *0.06,
        width: windowWidth * 0.8,
        height: windowHeight * 0.1,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        elevation: 10,
    },

    leftColor:{
        width: windowWidth * 0.04,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: '#4397AF',
    },

    vCaption:{
        flex: 1,
    },

    txtNama:{
        fontSize: windowWidth * 0.05,
        marginLeft: windowWidth * 0.03,
        marginTop: windowHeight * 0.01,
        color:'#4397AF',
        fontWeight:'700',
    },
    
    txtNik:{ 
        fontSize: windowWidth * 0.04,
        marginLeft: windowWidth * 0.03,
        marginTop: windowHeight * 0.01,
        color:'#4397AF',
        fontWeight:'400',
    },

    
    tBtn: { 
        marginHorizontal: windowWidth *0.032,
        marginTop: windowHeight *0.03,
        width: windowWidth * 0.8,
        height: windowHeight * 0.24,
        borderRadius: 10,
        backgroundColor: 'white',
        elevation: 10,
        alignItems: 'center',
    },

    txtCap:{
        fontSize: windowWidth * 0.05,
        color: 'black',
        fontWeight: '600',
        
    },

    iLihat:{
        width: windowWidth * 0.4,
        height: windowHeight * 0.2,
    },

    iInput:{
        width: windowWidth * 0.38,
        height: windowHeight * 0.19,
    },

})