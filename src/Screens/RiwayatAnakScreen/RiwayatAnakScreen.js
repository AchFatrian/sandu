import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, 
  Alert, ActivityIndicator } from 'react-native'
import React, { useState, useCallback } from 'react'
import Riwayat from '../../component/InputRiwayat/InputRiwayat'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';

const axios = require('axios')

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const dateNow = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime()

export default function RiwayatAnakScreen({route}) {
    const navigation = useNavigation('');
    const [data, setData] = useState([])
    const [birthDate, setBirthDate] = useState(null)
    const [name, setName] = useState('')
    const [allData, setAllData] = useState({})
    const [isLoading, setLoading] = useState(false)

    const getAlert = (title, message, button) => {
        return(
          Alert.alert(
            title, message,
            [{ text: button }]
          )
        )
      }

      const profil = () => {
        let birth = `${new Date(allData.childs_birth).toLocaleDateString()} ( ${Math.round((((dateNow - allData.childs_birth)/2678400000) + Number.EPSILON) * 10)/10} bulan )`
        return(
          Alert.alert(
            "Profil Anda", 
            `*Jika ada kesalahan data, silahkan menghubungi kader untuk merubah data\n\nNIK Anak : ${allData.childs_nik}\nNama Anak : ${allData.childs_name}\nNama Orang Tua : ${allData.parents_name}\nTgl Lahir : ${birth}\nJenis Kelamin : ${allData.childs_gender == 'laki' ? 'laki - laki' : 'perempuan'}\nNo.HP : ${allData.parents_phone}`,
            [{ text: "kembali" }]
          )
        )
      }
    
    const getUserData = async (id) => {
        setLoading(true)
        axios.get(`https://harlequin-bullfrog-tie.cyclic.app/api/users/id/${id}`)
        .then((result) => {
            setAllData(result.data[0])
            setData(result.data[0].data)
            setBirthDate(result.data[0].childs_birth)
            setName(result.data[0].childs_name)
            setLoading(false)
        }).catch((err) => {
          getAlert("Error", "Terjadi Kesalahan Saat Menampilkan Data", "kembali")
        });
    }

    const deleteData = async (user_id, data_id) => {
      setLoading(true)
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
          setLoading(true)
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
                <View style={{flexDirection:'row'}}>
                  <TouchableOpacity style={styles.btnLogOut} onPress={()=>{logout()}}>
                    <Text style={styles.btnCap}>Keluar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnLogOut} onPress={()=>{profil()}}>
                    <Text style={styles.btnCap}>Profil</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity style={styles.btnLogOut} onPress={()=>{navigation.navigate('listAnak')}}>
                  <Text style={styles.btnCap}>kembali</Text>
                </TouchableOpacity>
              )
            }
        </View>

        {
          (isLoading) ? (
              <ActivityIndicator size="large" />
          ) : (
            <ScrollView style={styles.scrollContainer}>
              { data.reverse().map((prop, key) => {
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
          )
        }
        
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
      width: windowWidth * 0.17,
      height: windowHeight * 0.04,
      backgroundColor: '#4397AF',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius:10, 
      marginHorizontal: 8,
      marginLeft:'auto'
    },

    btnCap:{
        fontSize: windowWidth *0.04,
        color: 'white',
    }
})