import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Back from '../../../assets/img/back.png'
import Lihat from '../../../assets/img/lihat1.png'
import Input from '../../../assets/img/input.png'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MenuScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.control}>
        <TouchableOpacity style={styles.tBackImg}>
            <Image source={Back} style={styles.backImg}/>
        </TouchableOpacity>
        <View style={styles.vNama}>
            <Text style={styles.txtNama}>Nama Anak</Text>
        </View>
        <TouchableOpacity style={styles.tBtn}>
            <Text style={styles.txtCap}>Lihat Data</Text>
            <Image source={Lihat} style={styles.iLihat}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tBtn}>
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

    vNama: {
        marginHorizontal: windowWidth *0.032,
        marginTop: windowHeight *0.05,
        width: windowWidth * 0.8,
        height: windowHeight * 0.08,
        borderRadius: 10,
        backgroundColor: 'white',
        // elevation: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    txtNama:{
        fontSize: windowWidth * 0.06,
        color: '#4397AF',
        fontWeight: '600',
    },
    
    tBtn: { 
        marginHorizontal: windowWidth *0.032,
        marginTop: windowHeight *0.04,
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