import { Text, View, TouchableOpacity,StyleSheet, Dimensions, Image, ScrollView, Alert} from 'react-native';
import React, { Component } from 'react';
import Tinggi from '../../../assets/img/tinggi.png';
import Berat from '../../../assets/img/berat.png';
import Umur from '../../../assets/img/umur.png';
import Status from '../../../assets/img/status.png';
import StatusTinggi from '../../../assets/img/sTinggi.png';
import StatusBerat from '../../../assets/img/sBerat1.png';
import Hapus from '../../../assets/img/delete1.png';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const dateNow = new Date(new Date().getFullYear(), new Date().getMonth()-1, new Date().getDate()).getTime()

const InputRiwayat = ({data, birthDate, name, del, status}) =>{
    console.log(data)
    return(
        <View style={styles.container} >
           <View style={styles.leftColor}></View>
           <View style={styles.vCaption}>
                <View style={styles.vDel}>
                    <Text style={styles.txtTanggal}>{`${data.date}-${data.month}-${data.year}`}</Text>
                    <TouchableOpacity style={[styles.tImg, {display:`${status == 'kader' ? 'flex' : 'none'}`}]}
                        onPress={() => Alert.alert(
                                'Peringatan',
                                `Apakah anda yakin akan menghapus data dari ${name} pada tanggal ${data.date}-${data.month}-${data.year}`,
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
                <ScrollView style={styles.controlScroll}>
                    <View style={styles.vRows}>
                        <View style={styles.vCapImg}>
                            <View style={styles.vImg}>
                                <Text style={styles.txtCapImg}>Tinggi Badan</Text> 
                                <Image source={Tinggi} style={styles.image}/>
                            </View>
                            <View style={styles.vCap}>
                                <Text style={styles.textCaption}>{data.height || 0} cm</Text>
                            </View>
                        </View>
                        <View style={styles.vCapImg}>
                            <View style={styles.vImg}>
                                <Text style={styles.txtCapImg}>Berat Badan</Text> 
                                <Image source={Berat} style={styles.image}/>
                            </View>
                            <View style={styles.vCap}>
                                <Text style={styles.textCaption}>{data.weight || 0} kg</Text>
                            </View>
                        </View>
                        <View style={styles.vCapImg}>
                            <View style={styles.vImg}>
                                <Text style={styles.txtCapImg}>{'Umur (Bulan)'}</Text> 
                                <Image source={Umur} style={styles.image}/>
                            </View>
                            <View style={styles.vCap}>
                                <Text style={styles.textCaption}>{Math.round((((dateNow - birthDate)/2678400000) + Number.EPSILON) * 10)/10 || 0} bln</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.vRows2}>
                        <View style={styles.vCapImgStatus}>
                            <View style={styles.vImg}>
                                <Text style={styles.txtCapImg}>Status Tinggi</Text> 
                                <Image source={StatusTinggi} style={styles.image}/>
                            </View>
                            <View style={styles.vCap}>
                                <Text style={styles.textCaption}>{data.status_h || "status"}</Text>
                            </View>
                        </View>
                        <View style={styles.vCapImgStatus}>
                            <View style={styles.vImg}>
                                <Text style={styles.txtCapImg}>Status Berat</Text> 
                                <Image source={StatusBerat} style={styles.image}/>
                            </View>
                            <View style={styles.vCap}>
                                <Text style={styles.textCaption}>{data.status_w || "status"}</Text>
                            </View>
                        </View>
                        <View style={styles.vCapImg}>
                            <View style={styles.vImg}>
                                <Text style={styles.txtCapImg}>Status Anak</Text> 
                                <Image source={Status} style={styles.image}/>
                            </View>
                            <View style={styles.vCap}>
                                <Text style={styles.textCaption}>{data.status_a || "status"}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
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
        width: windowWidth * 0.06,
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

    controlScroll:{
        // borderWidth: 1,
    },
    
    vRows:{
        width: '100%',
        height: windowHeight * 0.19,
        // borderWidth: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',

    },

    vRows2:{
        width: '100%',
        height: windowHeight * 0.19,
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

    vDel:{
        flexDirection: 'row',
        alignItems: 'center',
    },

    tImg:{
        marginLeft: 'auto',
        width: windowWidth * 0.1,
        alignItems: 'center',
        marginTop: windowHeight * 0.015,
    },

    img:{
        width: windowWidth * 0.072,
        height: windowHeight * 0.036,
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

    vCapImgStatus: {
        width: '20%',
        height: '85%',
        // borderWidth: 1,
        alignItems: 'center',
    },
})


export default InputRiwayat;