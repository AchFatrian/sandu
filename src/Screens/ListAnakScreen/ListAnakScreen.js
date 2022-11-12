import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, 
    Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import InputAnak from '../../component/InputAnak/InputAnak'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';

const axios = require('axios')

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ListAnakScreen() {
    const [users, setUsers] = useState([])
    const [isLoading, setLoading] = useState(false)

    const navigation = useNavigation('');
    const onMenuPress = (user) => {
        EncryptedStorage.setItem(
            "selected_user",
            JSON.stringify(user)
        ).then((result) => {
            console.log(result)
            navigation.navigate('menu');
        }).catch((err) => {
            getAlert("Error", `Terjadi Kesalahan Saat Mendapatkan Data. ( ${err.message} )`, "kembali")
        });
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
        setLoading(true)
        axios.get(`https://harlequin-bullfrog-tie.cyclic.app/api/users`)
        .then((result) => {
            setUsers(result.data)
            setLoading(false)
        }).catch((err) => {
          getAlert("Error", "Terjadi Kesalahan Saat Menampilkan Data", "kembali")
        });
    }

    const deleteUser = async (id) => {
        // setLoading(true)
        // axios.delete(`https://harlequin-bullfrog-tie.cyclic.app/api/users`,{ data: {user_id: id} })
        // .then((result) => {
        //     getUsers()
        // }).catch((err) => {
        //   getAlert("Error", "Terjadi Kesalahan Menghapus Data", "kembali")
        // });
        
        setLoading(true)
        axios.put(`https://harlequin-bullfrog-tie.cyclic.app/api/users/softdel`,{ user_id: id })
        .then((result) => {
            console.log(result.data)
            getUsers()
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
          getUsers()
        }, [])
    )
    
  return (
    <View style={styles.container}>
        <View style={styles.controlScroll}>
            <View style={styles.vTittle}>
                <Text style={styles.txtTittle}>List Data Anak</Text>
            </View>
            
            {
                (isLoading) ? (
                    <ActivityIndicator size="large" />
                ) : (
                    <ScrollView style={styles.scrollContainer}>
                        { users.map((prop, key) => {
                            return(
                                <InputAnak
                                    onPress={()=>onMenuPress(prop)}
                                    nama={prop.childs_name}
                                    nik={prop.childs_nik}
                                    id={prop._id}
                                    key={key}
                                    del={()=>deleteUser(prop._id)}
                                />
                            )
                        })}
                    </ScrollView>
                )
            }
            
            <TouchableOpacity style={styles.btnLogOut}>
                <Text style={styles.btnCap} onPress={()=>{logout()}}>
                    Keluar
                </Text>
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
        marginTop: windowHeight *0.03,
        width: windowWidth * 0.35,
        height: windowHeight * 0.05,
        backgroundColor: '#4397AF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:29,
        marginBottom: windowHeight * 0.05,
    },

    btnCap:{
        fontSize: windowWidth *0.055,
        color: 'white',
    }
})