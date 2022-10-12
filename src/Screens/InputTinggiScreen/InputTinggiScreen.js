import { View, Text, StyleSheet,TouchableOpacity, 
    Dimensions, Image,TextInput, Keyboard } from 'react-native'
import React, {useState, useEffect, useCallback} from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Tinggi from '../../../assets/img/tinggi1.png';
import Next from '../../../assets/img/next.png';
import Previous from '../../../assets/img/previous.png';
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

export default function InputTinggiScreen({route}) {
    const navigation = useNavigation('');
    const [height, setHeight] = useState(0)
    const [isKeyboarVisible, setIsKeyboardVisible] = useState(false)
    const [user, setUser] = useState({})
    const [radioButtons, setRadioButtons] = useState([ 
        {...manual, selected: false},
        {...otomatis, selected: true}
    ]);

    function onPressRadioButton(radioButtonsArray) {
        setRadioButtons(radioButtonsArray);
    }

    const onPrevPress = () => {
        navigation.navigate('berat');
    }

    const onNextPress = () => {
        navigation.navigate('preview', { weight: route.params, height });
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
        <Text>{route.params}</Text>
        <View style={styles.containerInput}>
            {
                (!isKeyboarVisible) ? (
                    <Image source={Tinggi} style={styles.img}/>
                ) : null
            }
            <Text style={styles.txtCap}>Tinggi Badan</Text>
            <View style={styles.txtCap}>
                <RadioGroup 
                    radioButtons={radioButtons} 
                    onPress={onPressRadioButton} 
                    layout='row'
                />
            </View>
            <View style={[styles.vInput,{display: radioButtons[1].selected ? 'flex' : 'none'}]}>
                <Text style={styles.tCap}>90 Cm</Text>
            </View>
            <TextInput style={[styles.vInput,{display: radioButtons[0].selected ? 'flex' : 'none'}]} 
            onChangeText={setHeight} value={height}/>
            <View style={styles.vBtn}>
                <TouchableOpacity style={styles.tBtnPrev} onPress={onPrevPress}>
                    <Image source={Previous} style={styles.imgNav}/>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.tBtnNext} onPress={onNextPress}>
                    <Image source={Next} style={styles.imgNav}/>
                </TouchableOpacity> 
            </View>
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
        width: windowWidth * 0.4,
        height: windowHeight * 0.25,
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
        marginBottom: windowHeight * 0.007,
        borderColor: '#4397AF',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    tCap:{
        color: 'black',
        fontSize: windowWidth * 0.05,
    },

    vBtn:{
        width: '100%',
        flexDirection: 'row',
    },

    tBtnPrev:{
        marginTop: windowHeight * 0.06,
        marginLeft: windowWidth * 0.12,
    },

    tBtnNext:{
        marginTop: windowHeight * 0.06,
        marginLeft: windowWidth * 0.363,
    },

    imgNav:{
        width: windowWidth * 0.1,
        height: windowHeight * 0.06
    },

})