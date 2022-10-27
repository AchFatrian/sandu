import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function InputDataScreen() {
  return (
    <View style={styles.container}>
        <View style={styles.control}>
            <View style={styles.vNama}>
                <Text style={styles.txtNama}>Nama Anak</Text>
            </View>
            <View style={styles.vCaption}>
                <Text style={styles.tTinggi}>Tinggi Badan</Text>
                <View style={styles.vCap}>
                    <Text style={styles.txtCaption}>65 CM</Text>
                </View>
                <Text style={styles.tTinggi}>Berat Badan</Text>
                <View style={styles.vCap}>
                    <Text style={styles.txtCaption}>20 Kg</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.btnSave}>
                <Text style={styles.btnCap}>Simpan</Text>
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

    vNama: {
        marginHorizontal: windowWidth *0.032,
        marginTop: windowHeight *0.12,
        width: windowWidth * 0.8,
        height: windowHeight * 0.08,
        borderRadius: 10,
        backgroundColor: 'white',
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    txtNama:{
        fontSize: windowWidth * 0.06,
        color: '#4397AF',
        fontWeight: '600',
    },

    vCaption: {
        marginHorizontal: windowWidth *0.032,
        marginTop: windowHeight *0.01,
        width: windowWidth * 0.8,
        height: windowHeight * 0.38,
        borderRadius: 20,
        backgroundColor: 'white',
        elevation: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    tTinggi: {
        fontSize: windowWidth * 0.05,
        fontWeight: '600',
        color: 'black',
        marginRight: windowWidth * 0.42,
        marginBottom: windowHeight * 0.01,

    },

    vCap:{
        width: windowWidth * 0.7,
        height: windowHeight * 0.08,
        backgroundColor: '#4397af33',
        borderRadius: 8,
        marginBottom: windowHeight * 0.007,
        justifyContent: 'center',
    },

    txtCaption:{
        fontSize: windowWidth * 0.05,
        color: 'black',
        marginLeft: windowWidth * 0.02,
    },

    btnSave: {
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
})