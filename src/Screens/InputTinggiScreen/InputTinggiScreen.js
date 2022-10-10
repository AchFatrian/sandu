import { View, Text, StyleSheet,TouchableOpacity, Dimensions, Image, Keyboard, TextInput } from 'react-native'
import React, { useState, useEffect } from "react"
import { useNavigation } from '@react-navigation/native';
import Tinggi from '../../../assets/img/tinggi1.png';
import Next from '../../../assets/img/next.png';
import Previous from '../../../assets/img/previous.png';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function InputTinggiScreen() {
    const navigation = useNavigation('');

    const onPrevPress = () => {
        navigation.navigate('berat');
    }

    const onNextPress = () => {
        navigation.navigate('preview');
    }
    const [isKeyboarVisible, setIsKeyboardVisible] = useState(false)
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
                    <Text style={styles.txtNama}>Nama Anak</Text>
                    <Text style={styles.txtNik}>35xxxxxxxxxxx</Text>
            </View>
        </View>
        <View style={styles.containerInput}>
            {
                (!isKeyboarVisible) ? (
                <Image source={Tinggi} style={styles.img}/>
                ) : null
            }
            <Text style={styles.txtCap}>{'Tinggi Badan (Cm)'}</Text>
            <View style={styles.vInput}>
                <TextInput style={styles.tCap}/>
            </View>
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
        height: windowHeight * 0.55,
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
        marginTop: windowHeight * 0.04,
        marginLeft: windowWidth * 0.085,
    },

    tBtnNext:{
        marginTop: windowHeight * 0.04,
        marginLeft: windowWidth * 0.363,
    },

    imgNav:{
        width: windowWidth * 0.132,
        height: windowHeight * 0.07
    },

})