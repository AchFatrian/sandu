import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useCallback } from 'react'
import Riwayat from '../../component/InputRiwayat/InputRiwayat'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';

const axios = require('axios')

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function RiwayatAnakScreen({route}) {
    const navigation = useNavigation('');
    const [data, setData] = useState([])
    const [birthDate, setBirthDate] = useState(null)
    const [name, setName] = useState('')

    const getAlert = (title, message, button) => {
        return(
          Alert.alert(
            title, message,
            [{ text: button }]
          )
        )
      }
    
    const getUserData = async (id) => {
        axios.get(`https://harlequin-bullfrog-tie.cyclic.app/api/users/id/${id}`)
        .then((result) => {
            // console.log(result.data[0])
            setData(result.data[0].data)
            setBirthDate(result.data[0].childs_birth)
            setName(result.data[0].childs_name)
        }).catch((err) => {
          getAlert("Error", "Terjadi Kesalahan Saat Menampilkan Data", "kembali")
        });
    }

    const deleteData = async (user_id, data_id) => {
      console.log(user_id, data_id)
      axios.post(`https://harlequin-bullfrog-tie.cyclic.app/api/users/data/delete`,{ user_id, data_id })
      .then((result) => {
          getUserData(route.params.id)
      }).catch((err) => {
        getAlert("Error", "Terjadi Kesalahan Menghapus Data", "kembali")
      });
    }

    const logout = async () => {
      try {
          await EncryptedStorage.removeItem("user")
          navigation.navigate('start')
      } catch (err) {
          getAlert("Error", "Terjadi Kesalahan Saat Keluar Akun", "kembali")
      }
    }

    useFocusEffect(
        useCallback(() => {
          getUserData(route.params.id)
        }, [])
    )

  return (
    <View style={styles.container}>
      <View style={styles.controlScroll}>
        <View style={[styles.vTittle, {flexDirection:'row'}]}>
            <Text style={styles.txtTittle}>Riwayat Data Anak</Text>
            {
              (route.params.state == 'user') ? (
                <TouchableOpacity style={styles.btnLogOut} onPress={()=>{logout()}}>
                  <Text style={styles.btnCap}>Keluar</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.btnLogOut} onPress={()=>{navigation.navigate('listAnak')}}>
                  <Text style={styles.btnCap}>kembali</Text>
                </TouchableOpacity>
              )
            }
        </View>
        <ScrollView style={styles.scrollContainer}>
            { data.map((prop, key) => {
                return(
                    <Riwayat 
                      data={prop} 
                      birthDate={birthDate} 
                      key={key} 
                      name={name}
                      del={()=>deleteData(route.params.id, prop._id)}
                      status={route.params.state}
                    />
                )
            })}
        </ScrollView>
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

    vTittle: {
        width: '100%',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    txtTittle: {
      fontSize: windowWidth * 0.05,
      color: 'black',
      fontWeight: '600',
      paddingHorizontal: 20
    },

    controlScroll: {
        height: '95%',
        width: '92%',
        backgroundColor: '#4397af33',
        borderRadius: 20,
        alignItems: 'center',
    },

    scrollContainer: {
        flex: 1, 
    },
    
    btnLogOut:{
      width: windowWidth * 0.25,
      height: windowHeight * 0.04,
      backgroundColor: '#4397AF',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius:29, 
      marginHorizontal: 20,
      marginLeft:'auto'
    },

    btnCap:{
        fontSize: windowWidth *0.04,
        color: 'white',
    }
})