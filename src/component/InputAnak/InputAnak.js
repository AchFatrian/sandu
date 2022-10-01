import { Text, View, TouchableOpacity,StyleSheet, Dimensions, Image} from 'react-native';
import React, { Component } from 'react';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const InputAnak = ({ onPress, nama, nik}) =>{

    return(
        <TouchableOpacity onPress={onPress} style={styles.container} >
           <View style={styles.leftColor}></View>
           <View style={styles.vCaption}>
                <Text style={styles.txtNama}>{nama}</Text>
                <Text style={styles.txtNik}>{nik}</Text>
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
    
})


export default InputAnak;