import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import Logo from '../../../assets/img/foto1.png'
import LogoOrtu from '../../../assets/img/foto2.png'
import LogoKader from '../../../assets/img/foto3.png'
import EncryptedStorage from 'react-native-encrypted-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function StartScreen() {
  const navigation = useNavigation('');

  const onKader = async () => {
    const user = await JSON.parse(await EncryptedStorage.getItem("user"))
    if(user){
      user.role=='kader' ? navigation.navigate('listAnak') : navigation.navigate('kader') 
    } else {
      navigation.navigate('kader')
    }
  }

  const onOrtu = async () => {
    const user = await JSON.parse(await EncryptedStorage.getItem("user"))
    if(user){
      user.role=='ortu' ? navigation.navigate('riwayatAnak', {id: user.data._id, state: 'user'}) : navigation.navigate('ortu') 
    } else {
      navigation.navigate('ortu')
    }
  }

  return (
    <View style= {styles.root}>
      <Image source={Logo} style={styles.logo}/>
      <TouchableOpacity style={styles.btnOrtu} onPress={()=>{onOrtu()}}>
          <View style={styles.vLogoBtn}>
            <Image source={LogoOrtu} style={styles.logoBtn}/>
          </View>
          <View style={styles.vCapBtn}>
            <Text style={styles.textBtn}>Orang Tua</Text>
          </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnKader} onPress={()=>{onKader()}}>
          <View style={styles.vLogoBtn}>
            <Image source={LogoKader} style={styles.logoBtn}/>
          </View>
          <View style={styles.vCapBtn}>
            <Text style={styles.textBtn}>Kader</Text>
          </View>
      </TouchableOpacity>
      <View style={styles.copyright}>
          <Text style={{color:'black', marginHorizontal:windowWidth*0.1, textAlign:'center', fontSize:windowWidth*0.02}}>
            {`[v1.0] Pengabdian Masyarakat, Program Studi Sains Data Terapan, Departemen Teknik Informatika dan Komputer, Politeknik Elektronika Negeri Surabaya`}
          </Text>
          {/* <Text style={{color:'black', marginHorizontal:windowWidth*0.1, textAlign:'center', fontSize:windowWidth*0.026}}>
            {`[v1.0] Copyright © 2022 Program Studi Sains Data Terapan, Departemen Teknik Informatika dan Komputer, Politeknik Elektronika Negeri Surabaya`}
          </Text> */}
          {/* <Text style={{color:'black', marginHorizontal:windowWidth*0.2, textAlign:'center', fontSize:windowWidth*0.03}}>
            {`v1.0`}
          </Text> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root:{
    flex: 1,
    alignItems: 'center',
  },

  logo:{
    resizeMode:'contain',
    width: windowWidth * 0.9,
    height: windowHeight * 0.5,
  },

  btnOrtu:{
    width: windowWidth * 0.7,
    height: windowHeight * 0.12,
    flexDirection: 'row',
    borderRadius: 40,
    backgroundColor:'#4397af33',
    marginTop: windowHeight * 0.05,
  },

  vLogoBtn:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#4397AF',
    width: '30%',
    height: '100%',
    borderRadius: 40,
  },

  logoBtn:{
    resizeMode:'contain',
    width: windowWidth * 0.14,
    height: windowHeight * 0.14,
  },

  vCapBtn:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  copyright:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: windowHeight * 0.03
  },

  textBtn: {
    fontSize: windowHeight * 0.04,
    color: '#4397AF',
    fontWeight: '600',
    marginRight: windowWidth *0.04,
  },

  btnKader:{
    width: windowWidth * 0.7,
    height: windowHeight * 0.12,
    flexDirection: 'row',
    borderRadius: 40,
    backgroundColor:'#4397af33',
    marginTop: windowHeight * 0.03,
  }

})