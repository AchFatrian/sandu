import { Text, View, TouchableOpacity,StyleSheet, Dimensions, Image} from 'react-native';
import React, { Component } from 'react';
import Tinggi from '../../../assets/img/tinggi.png';
import Berat from '../../../assets/img/berat.png';
import Umur from '../../../assets/img/umur.png';
import Status from '../../../assets/img/status.png'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const InputRiwayat = ({ tanggal, tinggi, berat, umur, status}) =>{

    return(
        <View style={styles.container} >
           <View style={styles.leftColor}></View>
           <View style={styles.vCaption}>
                <Text style={styles.txtTanggal}>{tanggal}</Text>
                <View style={styles.vRows}>
                    <View style={styles.vCapImg}>
                        <View style={styles.vImg}>
                            <Text style={styles.txtCapImg}>Tinggi Badan</Text> 
                            <Image source={Tinggi} style={styles.image}/>
                        </View>
                        <View style={styles.vCap}>
                            <Text style={styles.textCaption}>{tinggi}</Text>
                        </View>
                    </View>
                    <View style={styles.vCapImg}>
                        <View style={styles.vImg}>
                                <Text style={styles.txtCapImg}>Berat Badan</Text> 
                                <Image source={Berat} style={styles.image}/>
                            </View>
                            <View style={styles.vCap}>
                                <Text style={styles.textCaption}>{berat}</Text>
                            </View>
                    </View>
                    <View style={styles.vCapImg}>
                        <View style={styles.vImg}>
                            <Text style={styles.txtCapImg}>{'Umur (Bulan)'}</Text> 
                            <Image source={Umur} style={styles.image}/>
                        </View>
                        <View style={styles.vCap}>
                            <Text style={styles.textCaption}>{umur}</Text>
                        </View>
                    </View>
                    <View style={styles.vCapImg}>
                        <View style={styles.vImg}>
                                    <Text style={styles.txtCapImg}>Status Anak</Text> 
                                    <Image source={Status} style={styles.image}/>
                                </View>
                                <View style={styles.vCap}>
                                    <Text style={styles.textCaption}>{status}</Text>
                                </View>
                    </View>
                </View>
           </View>
       </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: windowWidth *0.032,
        marginVertical: windowHeight *0.01,
        width: windowWidth * 0.85,
        height: windowHeight * 0.25,
        borderRadius: 20,
        flexDirection: 'row',
        backgroundColor: 'white',
        elevation: 10,
    },

    leftColor:{
        width: windowWidth * 0.08,
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: '#4397AF',
    },

    vCaption:{
        flex: 1,
    },

    txtTanggal:{
        fontSize: windowWidth * 0.06,
        marginLeft: windowWidth * 0.03,
        marginTop: windowHeight * 0.01,
        color:'#4397AF',
    },
    
    vRows:{
        flex: 1,
        // borderWidth: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',

    },

    vCapImg: {
        width: '20%',
        height: '85%',
        // borderWidth: 1,
        alignItems: 'center',
    },
    
    vImg: {
        width: '100%',
        height: '60%',
        backgroundColor: '#D9EAEF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
    },

    txtCapImg:{
        fontSize: windowWidth * 0.02,
        color: 'black',
        fontWeight: 'bold',
    },

    image: {
        marginTop: windowHeight * 0.007,
        width: '60%',
        height: '60%',
    },

    vCap:{
        marginTop:windowHeight * 0.018,
        width: '100%',
        height: '28%',
        backgroundColor: '#D9EAEF',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textCaption: {
        fontSize: windowWidth * 0.04,
        color: 'black',
    },
})


export default InputRiwayat;