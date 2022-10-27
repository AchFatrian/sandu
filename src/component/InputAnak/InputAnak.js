import { Text, View, TouchableOpacity,StyleSheet, Dimensions, Image, Alert} from 'react-native';
import React, { Component } from 'react';
import Hapus from '../../../assets/img/delete1.png';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const InputAnak = ({ onPress, nama, nik, id, del}) =>{

    return(
        <TouchableOpacity onPress={onPress} style={styles.container} >
           <View style={styles.leftColor}></View>
           <View style={styles.vCaption}>
                <Text style={styles.txtNama}>{nama}</Text>
                <View style={styles.vNikDel}>
                    <Text style={styles.txtNik}>{nik}</Text>
                    <TouchableOpacity style={styles.tImg}
                        onPress={() => Alert.alert(
                                'Peringatan',
                                `Apakah anda yakin akan menghapus data dari ${nama} dengan nik ${nik}`,
                            [
                                { text: 'Tidak' },
                                { text: 'Iya', onPress:()=>del() },
                            ],
                            { cancelable: true }
                        )}
                      >
                        <Image source={Hapus} style={styles.img}/>
                    </TouchableOpacity>
                </View>
           </View>
       </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: windowWidth *0.032,
        marginVertical: windowHeight *0.01,
        width: windowWidth * 0.85,
        height: windowHeight * 0.1,
        borderRadius: 20,
        flexDirection: 'row',
        backgroundColor: 'white',
        elevation: 10,
    },

    leftColor:{
        width: windowWidth * 0.04,
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
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

    vNikDel:{
        flexDirection: 'row',
        alignItems: 'center',
    },

    tImg:{
        marginLeft: 'auto',
        width: windowWidth * 0.1,
        alignItems: 'center',
    },

    img:{
        width: windowWidth * 0.075,
        height: windowHeight * 0.04,
    },
    
})


export default InputAnak;