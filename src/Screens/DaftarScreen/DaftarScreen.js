import { Text, 
    View,
    StyleSheet, 
    Dimensions, 
    Image, 
    TextInput, 
    TouchableOpacity, 
    Keyboard, 
    Alert, Button } from 'react-native'
import React, { useState, useEffect } from "react"
import Logo from '../../../assets/img/foto6.png'
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

// const axios = require('axios')
import {Picker} from '@react-native-picker/picker';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function KaderScreen() {
    const navigation = useNavigation('');

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    
    const [isKeyboarVisible, setIsKeyboardVisible] = useState(false)
    const [parentsName, setParentsName ] = useState('')
    const [phoneNum, setPhoneNum] = useState('')
    const [childsName, setChildName] = useState('')
    const [childsNik, setChildNik] = useState('')
    // const [birthDate, setBirthDate] = useState('')
   
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
    };
  
    const showMode = (currentMode) => {
      if (Platform.OS === 'android') {
        setShow(true);
      }
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };

    const getAlert = (title, message, button) => {
        return(
          Alert.alert(
            title, message,
            [{ text: button }]
          )
        )
      }

    const register = async () => {
        if(parentsName != '' && phoneNum != '' &&  childsName != '' && childsNik != ''){
            const regisData = {
                childs_name: childsName,
                childs_birth: 29839238, // tambahan
                parents_name: parentsName,
                parents_phone: phoneNum, // tambahan
                childs_nik: childsNik,
                childs_birth: date
            }

            // console.log(regisData)
            //axios
            axios.post(`https://sandu-api-production.up.railway.app/api/users`, regisData)
            .then((result) => {
                // console.log(result)
                if(result.status == 'Authorized'){
                    navigation.navigate('ortu');
                }
                else {
                    getAlert("Pendaftaran gagal", "Pastikan data telah terisi dengan benar", "kembali")
                }
            }).catch((err) => {
                console.log(err)
            });

        } else {
            getAlert("Pendaftaran Gagal", "Pastikan Semua Data Telah Terisi", "kembali")
        }
    }

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", () => {
            setIsKeyboardVisible(true);
        })
        Keyboard.addListener("keyboardDidHide", () => {
            setIsKeyboardVisible(false);
        })
    }, [isKeyboarVisible])

  return (
        <View style={styles.container}>
            {
                (!isKeyboarVisible) ? (
                    <Image source={Logo} style={styles.logo}/>
                ) : null
            }
            <Text style={styles.tName}>Nama Orang Tua :</Text>
            <TextInput style={styles.txtInput} onChangeText={setParentsName} value={parentsName}/>

            <Text style={styles.tNoHP}>No HP :</Text>
            <TextInput style={styles.txtInput} onChangeText={setPhoneNum} value={phoneNum}/>
            
            <Text style={styles.tAnak}>Nama Anak :</Text>
            <TextInput style={styles.txtInput} onChangeText={setChildName} value={childsName}/>

            <Text style={styles.tNik}>NIK Anak :</Text>
            <TextInput style={styles.txtInput} onChangeText={setChildNik} value={childsNik}/>

            <Text style={styles.tTanggal}>Tanggal Lahir Anak :</Text>
            <TouchableOpacity style={styles.tanggal} onPress={showDatepicker}>
                <Text style={styles.txtTanggal}> {date.toLocaleDateString()}</Text>
                    {show && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        onChange={onChange}
                        />
                    )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnLogin} onPress={()=>register()}>
                <Text style={styles.btnCap}>Daftar</Text>
            </TouchableOpacity>
        </View>
  )
}

const styles = StyleSheet.create({
    container: {  
        flex: 1,
        alignItems: 'center',
    },

    logo:{
        resizeMode:'contain',
        width: windowWidth * 0.8,
        height: windowHeight * 0.3,
        marginBottom: windowHeight * 0.01,
    },

    tName:{
        fontSize: windowWidth * 0.045,
        fontWeight: '600',
        color: 'black',
        marginRight: windowWidth * 0.39,
        marginBottom: windowHeight * 0.007,
    },

    tNoHP: {
        fontSize: windowWidth * 0.045,
        fontWeight: '600',
        color: 'black',
        marginRight: windowWidth * 0.57,
        marginBottom: windowHeight * 0.007,
    },

    tAnak: {
        fontSize: windowWidth * 0.045,
        fontWeight: '600',
        color: 'black',
        marginRight: windowWidth * 0.47,
        marginBottom: windowHeight * 0.007,
    },

    tNik:{ 
        fontSize: windowWidth * 0.045,
        fontWeight: '600',
        color: 'black',
        marginRight: windowWidth * 0.51,
        marginBottom: windowHeight * 0.007,
    },

    tTanggal:{
        fontSize: windowWidth * 0.045,
        fontWeight: '600',
        color: 'black',
        marginRight: windowWidth * 0.34,
        marginBottom: windowHeight * 0.007,
    },

    txtInput: {
        width: windowWidth * 0.7,
        height: windowHeight * 0.052,
        backgroundColor: '#4397af33',
        borderRadius: 8,
        marginBottom: windowHeight * 0.007,
        fontSize: windowWidth * 0.045,
    },

    btnLogin:{
        marginTop: windowHeight *0.03,
        width: windowWidth * 0.35,
        height: windowHeight * 0.05,
        backgroundColor: '#4397AF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:29,
    },

    btnCap:{
        fontSize: windowWidth *0.0545,
        color: 'white',
    },

    tanggal:{
        width: windowWidth * 0.7,
        height: windowHeight * 0.052,
        backgroundColor: '#4397af33',
        borderRadius: 8,
        marginBottom: windowHeight * 0.007,
        justifyContent: 'center',
    },

    txtTanggal:{
        fontSize: windowWidth * 0.045,
        color: 'black',
    },

    tKelamin:{
        fontSize: windowWidth * 0.045,
        fontWeight: '600',
        color: 'black',
        marginRight: windowWidth * 0.32,
        marginBottom: windowHeight * 0.007,
    },

    picker: {
        width: windowWidth * 0.7,
        height: windowHeight * 0.01,
        backgroundColor: '#4397af33',
        borderRadius: 8,
        marginBottom: windowHeight * 0.007,
        fontSize: windowWidth * 0.045,
      },
})