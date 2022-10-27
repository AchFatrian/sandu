import { View, Text, StyleSheet,TouchableOpacity, 
    Dimensions, Image, TextInput, Keyboard } from 'react-native'
import React, {useState, useEffect, useCallback} from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Berat from '../../../assets/img/berat1.png';
import Next from '../../../assets/img/next.png';
import RadioGroup from 'react-native-radio-buttons-group';
import EncryptedStorage from 'react-native-encrypted-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const manual = {
    id: '0', 
    label: 'Manual',
    value: 'manual',
    borderColor: '#4397AF',
    color:'#4397AF'
}

const otomatis = {
    id: '1',
    label: 'Otomatis',
    value: 'otomatis',
    borderColor: '#4397AF',
    color:'#4397AF'
}

export default function InputBeratScreen() {
    const navigation = useNavigation('');
    const [weight, setWeight] = useState(0)
    const [isKeyboarVisible, setIsKeyboardVisible] = useState(false)
    const [user, setUser] = useState({})
    const [radioButtons, setRadioButtons] = useState([ 
        {...manual, selected: false},
        {...otomatis, selected: true}
    ]);

    function onPressRadioButton(radioButtonsArray) {
        setRadioButtons(radioButtonsArray);
    }

    const onNextPress = () => {
        navigation.navigate('tinggi', weight);
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

    useFocusEffect(
        useCallback(() => {
          getUsers()
          onPressRadioButton([ {...manual, selected: false}, {...otomatis, selected: true} ])
          onPressRadioButton([ {...manual, selected: true}, {...otomatis, selected: false} ])
          onPressRadioButton([ {...manual, selected: false}, {...otomatis, selected: true} ])
        }, [])
    )

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
      <View style={styles.control}>
        <View style={styles.containerNama} >
            <View style={styles.leftColor}></View>
            <View style={styles.vCaption}>
                <Text style={styles.txtNama}>{user.childs_name}</Text>
                <Text style={styles.txtNik}>{user.childs_nik}</Text>
            </View>
        </View>
        <View style={styles.containerInput}>
            {
                (!isKeyboarVisible) ? (
                    <Image source={Berat} style={styles.img}/>
                ) : null
            }
            <Text style={styles.txtCap}>Berat Badan</Text>
            <View style={styles.txtCap}>
                <RadioGroup 
                    radioButtons={radioButtons} 
                    onPress={onPressRadioButton} 
                    layout='row'
                />
            </View>
            <View style={[styles.vInput,{display: radioButtons[1].selected ? 'flex' : 'none'}]}>
                <Text style={styles.tCap}>20 Kg</Text>
            </View>
            <TextInput style={[styles.vInput,{display: radioButtons[0].selected ? 'flex' : 'none'}]} 
            onChangeText={setWeight} value={weight}/>
            <TouchableOpacity style={styles.tBtn} onPress={onNextPress}>
                <Image source={Next} style={styles.imgNext}/>
            </TouchableOpacity>
        </View>
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

    containerNama: {
        marginTop: windowWidth *0.2,
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

    containerInput:{
        marginTop: windowWidth *0.04,
        width: windowWidth * 0.8,
        height: windowHeight * 0.64,
        borderRadius: 10,
        backgroundColor: 'white',
        alignItems: 'center',
    },

    img:{
        width: windowWidth * 0.5,
        height: windowHeight * 0.27,
        marginTop: windowHeight * 0.04,
    },

    txtCap:{
        marginTop: windowWidth * 0.02,
        fontSize: windowWidth * 0.05,
        color: 'black',
        fontWeight: '600',
        
    },

    vInput:{
        width: windowWidth * 0.55,
        height: windowHeight * 0.06,
        backgroundColor: '#4397af33',
        borderRadius: 8,
        marginVertical: windowHeight * 0.02,
        borderColor: '#4397AF',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    tCap:{
        color: 'black',
        fontSize: windowWidth * 0.05,
    },

    tBtn:{
        marginTop: windowHeight * 0.03,
        marginLeft: windowWidth * 0.6,
        width: windowWidth * 0.2,
        height: windowHeight * 0.08
    },

    imgNext:{
        width: windowWidth * 0.132,
        height: windowHeight * 0.07
    },
})