import { Text, 
    View,
    StyleSheet, 
    Dimensions, 
    Image, 
    TextInput, 
    TouchableOpacity, 
    Keyboard, 
    Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from "react"
import Logo from '../../../assets/img/foto6.png'
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

const axios = require('axios')
import {Picker} from '@react-native-picker/picker';
import RadioGroup from 'react-native-radio-buttons-group';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const dateNow = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime()

export default function KaderScreen() {
    const navigation = useNavigation('');

    const [date, setDate] = useState(new Date(dateNow));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [isLoading, setLoading] = useState(false)
    
    const [isKeyboarVisible, setIsKeyboardVisible] = useState(false)
    const [parentsName, setParentsName ] = useState('')
    const [phoneNum, setPhoneNum] = useState('')
    const [childsName, setChildName] = useState('')
    const [childsNik, setChildNik] = useState('')
    const [birthDate, setBirthDate] = useState(dateNow)
    
    const [radioButtons, setRadioButtons] = useState([
        {
            id: '0', // acts as primary key, should be unique and non-empty string
            label: 'Laki-laki',
            value: 'laki',
            borderColor: '#4397AF',
            color:'#4397AF',
            labelStyle:{
                color:'black'
            }
        },
        {
            id: '1',
            label: 'Perempuan',
            value: 'perempuan',
            borderColor: '#4397AF',
            color:'#4397AF',
            labelStyle:{
                color:'black'
            }
        }
    ]);
   
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
      setBirthDate(new Date(new Date(currentDate).getFullYear(), new Date(currentDate).getMonth()-1, new Date(currentDate).getDate()).getTime())
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
        setLoading(true)
        if(parentsName != '' && phoneNum != '' &&  childsName != '' && childsNik != '' && birthDate != 1193051730000){
            const regisData = {
                childs_name: childsName,
                parents_name: parentsName,
                parents_phone: phoneNum, 
                childs_nik: Number(childsNik),
                childs_birth: birthDate,
                childs_gender: radioButtons.find(x => x.selected === true).value
            }

            console.log(regisData)

            const checkNik = await axios.get(`https://harlequin-bullfrog-tie.cyclic.app/api/users/login/${childsNik}`)

            if (checkNik.data.length != 0){
                getAlert("Pendaftaran Gagal", "NIK telah terdaftar, silahkan hubungi kader", "kembali")
            } else {
                axios.post(`https://harlequin-bullfrog-tie.cyclic.app/api/users`, regisData)
                .then((result) => {
                    if(result.data.status == 'success'){
                        setLoading(false)
                        navigation.navigate('ortu');
                    }
                    else {
                        getAlert("Pendaftaran gagal", "Pastikan data telah terisi dengan benar", "kembali")
                    }
                }).catch((err) => {
                    getAlert("Pendaftaran gagal", `Terjadi Error (${err.message})`, "kembali")
                });
            }

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

    function onPressRadioButton(radioButtonsArray) {
        setRadioButtons(radioButtonsArray);
        console.log(radioButtons.find(x => x.selected === true).value)
    }

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
            <Text style={styles.tGender}>Jenis Kelamin Anak :</Text>
            <View style={styles.vGender}>
                <RadioGroup 
                    radioButtons={radioButtons} 
                    onPress={onPressRadioButton} 
                    layout='row'
                />
            </View>

            {
                (isLoading) ? (
                    <ActivityIndicator size="large" />
                ) : (
                    <TouchableOpacity style={styles.btnLogin} onPress={()=>register()}>
                        <Text style={styles.btnCap}>Daftar</Text>
                    </TouchableOpacity>
                )
            }
            
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
        fontSize: windowWidth * 0.038,
        fontWeight: '600',
        color: 'black',
        marginRight: windowWidth * 0.39,
        marginBottom: windowHeight * 0.007,
    },

    tNoHP: {
        fontSize: windowWidth * 0.038,
        fontWeight: '600',
        color: 'black',
        marginRight: windowWidth * 0.57,
        marginBottom: windowHeight * 0.007,
    },

    tAnak: {
        fontSize: windowWidth * 0.038,
        fontWeight: '600',
        color: 'black',
        marginRight: windowWidth * 0.47,
        marginBottom: windowHeight * 0.007,
    },

    tNik:{ 
        fontSize: windowWidth * 0.038,
        fontWeight: '600',
        color: 'black',
        marginRight: windowWidth * 0.51,
        marginBottom: windowHeight * 0.007,
    },

    tTanggal:{
        fontSize: windowWidth * 0.038,
        fontWeight: '600',
        color: 'black',
        marginRight: windowWidth * 0.34,
        marginBottom: windowHeight * 0.007,
    },

    tGender: {
        fontSize: windowWidth * 0.04,
        fontWeight: '600',
        color: 'black',
        marginRight: windowWidth * 0.32,
        marginBottom: windowHeight * 0.007,
    },

    txtInput: {
        width: windowWidth * 0.7,
        height: windowHeight * 0.052,
        backgroundColor: '#4397af33',
        borderRadius: 8,
        marginBottom: windowHeight * 0.007,
        fontSize: windowWidth * 0.04,
        borderColor: '#4397AF',
        borderWidth: 1,
        color: 'black'
    },

    btnLogin:{
        marginTop: windowHeight *0.01,
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
        borderColor: '#4397AF',
        borderWidth: 1,
    },

    txtTanggal:{
        fontSize: windowWidth * 0.038,
        color: 'black',
    },

    tKelamin:{
        fontSize: windowWidth * 0.038,
        fontWeight: '600',
        color: 'black',
        marginRight: windowWidth * 0.32,
        marginBottom: windowHeight * 0.007,
    },

    vGender:{
        width: windowWidth * 0.7,
        height: windowHeight * 0.052,
        // backgroundColor: '#4397af33',
        // flexDirection: 'row',
        color: 'black'
    }
})