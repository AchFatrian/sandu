import { Text, 
    View,
    StyleSheet, 
    Dimensions, 
    Image, 
    TextInput, 
    TouchableOpacity, 
    Keyboard, } from 'react-native'
import React, { useState, useEffect } from "react"
import Logo from '../../../assets/img/foto6.png'
import DateTimePicker from '@react-native-community/datetimepicker';
import RadioGroup from 'react-native-radio-buttons-group';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function KaderScreen() {
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [radioButtons, setRadioButtons] = useState([
        {
            id: '0', // acts as primary key, should be unique and non-empty string
            label: 'Laki-laki',
            value: 'laki',
            borderColor: '#4397AF',
            color:'#4397AF'
        },
        {
            id: '1',
            label: 'Perempuan',
            value: 'perempuan',
            borderColor: '#4397AF',
            color:'#4397AF'
        }
    ]);
   
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
  
    const [isKeyboarVisible, setIsKeyboardVisible] = useState(false)
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
    }

  return (
        <View style={styles.container}>
            {
                (!isKeyboarVisible) ? (
                    <Image source={Logo} style={styles.logo}/>
                ) : null
            }
            <Text style={styles.tName}>Nama Orang Tua :</Text>
            <TextInput style={styles.txtInput}/>
            <Text style={styles.tNoHP}>No HP :</Text>
            <TextInput style={styles.txtInput}/>
            <Text style={styles.tAnak}>Nama Anak :</Text>
            <TextInput style={styles.txtInput}/>
            <Text style={styles.tNik}>NIK Anak :</Text>
            <TextInput style={styles.txtInput}/>
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
            <TouchableOpacity style={styles.btnLogin}>
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
        fontSize: windowWidth * 0.04,
        fontWeight: '600',
        color: 'black',
        marginRight: windowWidth * 0.39,
        marginBottom: windowHeight * 0.007,
    },

    tNoHP: {
        fontSize: windowWidth * 0.04,
        fontWeight: '600',
        color: 'black',
        marginRight: windowWidth * 0.57,
        marginBottom: windowHeight * 0.007,
    },

    tAnak: {
        fontSize: windowWidth * 0.04,
        fontWeight: '600',
        color: 'black',
        marginRight: windowWidth * 0.47,
        marginBottom: windowHeight * 0.007,
    },

    tNik:{ 
        fontSize: windowWidth * 0.04,
        fontWeight: '600',
        color: 'black',
        marginRight: windowWidth * 0.51,
        marginBottom: windowHeight * 0.007,
    },

    tTanggal:{
        fontSize: windowWidth * 0.04,
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
        fontSize: windowWidth * 0.03,
        borderColor: '#4397AF',
        borderWidth: 1,
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
        fontSize: windowWidth *0.055,
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
        fontSize: windowWidth * 0.03,
        color: 'black',
    },

    tKelamin:{
        fontSize: windowWidth * 0.04,
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
    },
})