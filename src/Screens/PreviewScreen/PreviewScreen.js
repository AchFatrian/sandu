import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, {useState, useEffect, useCallback} from 'react'
import Back from '../../../assets/img/back.png'
import Input from '../../../assets/img/input.png'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function PreviewScreen({route}) {
    const navigation = useNavigation('');
    const [user, setUser] = useState({})
    const [isLoading, setLoading] = useState(false)

    const onBackPress = () => {
        navigation.navigate('tinggi', route.params.weight);
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
        EncryptedStorage.getItem("selected_user")
        .then((result) => {
            setUser(JSON.parse(result))
        }).catch((err) => {
            getAlert("Error", `Terjadi Kesalahan Saat Mengambil Data, ( ${err.message} )`, "kembali")
        });
    }

    const sendData = async () => {
        setLoading(true)
        const dateNow = new Date(new Date().getFullYear(), new Date().getMonth()-1, new Date().getDate()).getTime()
        const dataStatus = {
            "gender": user.childs_gender == 'laki' ? 1 : user.childs_gender == 'perempuan' ? 0 : null,
            "umur": Math.round((((dateNow - user.childs_birth)/2678400000) + Number.EPSILON) * 10)/10,
            "tb": Number(route.params.height),
            "bb": Number(route.params.weight)
        }

        // console.log(data)
        axios.post('http://cahyo.pythonanywhere.com/get_status', dataStatus)
        .then((result) => {
            const data = {
                user_id: user._id,
                weight: Number(route.params.weight),
                height: Number(route.params.height),
                status_h: result.data.status.tb,
                status_w: result.data.status.bb,
                status_a: result.data.status.gz
            }
            console.log(data)
            axios.post('https://harlequin-bullfrog-tie.cyclic.app/api/users/data', data)
            .then((result) => {
                console.log(result.data)
                setLoading(false)
                navigation.navigate('listAnak');
            }).catch((err) => {
                getAlert("Error", `Terjadi Kesalahan Saat Menyimpan Data, ( ${err.message} )`, "kembali")
            });           
        }).catch((err) => {
            getAlert("Error", `Terjadi Kesalahan Saat Menyimpan Data, ( ${err.message} )`, "kembali")
        });

        // console.log(getStatus.data.status)

    }

    useFocusEffect(
        useCallback(() => {
          getUsers()
        }, [])
    )

  return (
    <View style={styles.container}>
      <View style={styles.control}>
        <TouchableOpacity style={styles.tBackImg} onPress={onBackPress}>
            <Image source={Back} style={styles.backImg}/>
        </TouchableOpacity>
        <View style={styles.containerNama} >
           <View style={styles.leftColor}></View>
           <View style={styles.vCaption}>
                <Text style={styles.txtNama}>{user.childs_name}</Text>
                <Text style={styles.txtNik}>{user.childs_nik}</Text>
           </View>
        </View>
        <Image source={Input} style={styles.iInput}/>
        <Text style={styles.txtCap}>Tinggi Badan</Text>
        <View style={styles.vInput}>
            <Text style={styles.tCap}>{route.params.height} Cm</Text>
        </View>
        <Text style={styles.txtCap}>Berat Badan</Text>
        <View style={styles.vInput}>
            <Text style={styles.tCap}>{route.params.weight} Kg</Text>
        </View>
        {
            (isLoading) ? (
                <ActivityIndicator size="large" />
            ) : (
                <TouchableOpacity style={styles.btnSave} onPress={()=>sendData()}>
                    <Text style={styles.btnCap}>Simpan</Text>
                </TouchableOpacity>
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