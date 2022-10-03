import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Back from '../../../assets/img/back.png'
import Input from '../../../assets/img/input.png'
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function PreviewScreen() {
    const navigation = useNavigation('');
    const onBackPress = () => {
        navigation.navigate('tinggi');
    }
  return (
    <View style={styles.container}>
      <View style={styles.control}>
        <TouchableOpacity style={styles.tBackImg} onPress={onBackPress}>
            <Image source={Back} style={styles.backImg}/>
        </TouchableOpacity>
        <View style={styles.containerNama} >
           <View style={styles.leftColor}></View>
           <View style={styles.vCaption}>
                <Text style={styles.txtNama}>Nama Anak</Text>
                <Text style={styles.txtNik}>35xxxxxxxxxxx</Text>
           </View>
        </View>
        <Image source={Input} style={styles.iInput}/>
        <Text style={styles.txtCap}>Tinggi Badan</Text>
        <View style={styles.vInput}>
                <Text style={styles.tCap}>100 Cm</Text>
        </View>
        <Text style={styles.txtCap}>Berat Badan</Text>
        <View style={styles.vInput}>
                <Text style={styles.tCap}>20 Kg</Text>
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

    tBackImg: {
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
        marginRight: windowHeight * 0.28,
        marginTop: windowHeight * 0.016,
        marginBottom: windowHeight * 0.01,
        
    },

    iInput:{
        marginTop: windowHeight * 0.04,
        width: windowWidth * 0.5,
        height: windowHeight * 0.3,
    },

    vInput:{
        width: windowWidth * 0.75,
        height: windowHeight * 0.06,
        backgroundColor: 'white',
        borderRadius: 8,
        borderColor: '#4397AF',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    tCap:{
        color: 'black',
        fontSize: windowWidth * 0.05,
    },

    btnSave:{
        marginTop: windowHeight *0.03,
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