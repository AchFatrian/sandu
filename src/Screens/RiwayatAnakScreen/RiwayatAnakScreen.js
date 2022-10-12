import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useCallback } from 'react'
import Riwayat from '../../component/InputRiwayat/InputRiwayat'
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const axios = require('axios')

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function RiwayatAnakScreen({route}) {
    const [data, setData] = useState([])
    const [birthDate, setBirthDate] = useState(null)

    const getAlert = (title, message, button) => {
        return(
          Alert.alert(
            title, message,
            [{ text: button }]
          )
        )
      }
    
    const getUserData = async (id) => {
        axios.get(`https://sandu-api-production.up.railway.app/api/users/id/${id}`)
        .then((result) => {
            // console.log(result.data[0])
            setData(result.data[0].data)
            setBirthDate(result.data[0].childs_birth)
        }).catch((err) => {
          getAlert("Error", "Terjadi Kesalahan Saat Menampilkan Data", "kembali")
        });
    }

    useFocusEffect(
        useCallback(() => {
          getUserData(route.params)
        }, [])
    )

  return (
    <View style={styles.container}>
      <View style={styles.controlScroll}>
        <View style={styles.vTittle}>
            <Text style={styles.txtTittle}>Riwayat Data Anak</Text>
        </View>
        <ScrollView style={styles.scrollContainer}>
            { data.map((prop, key) => {
                console.log(data)
                return(
                    <Riwayat data={prop} birthDate={birthDate} key={key}/>
                )
            })}
        </ScrollView>
        {/* <TouchableOpacity style={styles.btnLogOut}>
                <Text style={styles.btnCap}>Kembali</Text>
        </TouchableOpacity> */}
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