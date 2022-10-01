import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import Riwayat from '../../component/InputRiwayat/InputRiwayat'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function RiwayatScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.controlScroll}>
        <View style={styles.vTittle}>
            <Text style={styles.txtTittle}>Riwayat Pengukuran</Text>
        </View>
        <ScrollView style={styles.scrollContainer}>
            <Riwayat
                tanggal={'09-12-2022'}/>
        </ScrollView>
        <TouchableOpacity style={styles.btnLogOut}>
                <Text style={styles.btnCap}>Logout</Text>
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