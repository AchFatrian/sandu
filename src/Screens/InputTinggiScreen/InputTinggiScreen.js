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
const manual = {id:'0',label:'Manual',value:'manual',borderColor:'#4397AF',color:'#4397AF'}
const otomatis = {id:'1',label:'Otomatis',value:'otomatis',borderColor:'#4397AF',color:'#4397AF'}

//======================== BLE ========================//

import base64 from 'react-native-base64';
import {BleManager, Device} from 'react-native-ble-plx';
import {LogBox} from 'react-native';

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const BLTManager = new BleManager();
const SERVICE_UUID = '1be79dcd-7069-4ac2-88f2-8dbc43adb8be';
const MESSAGE_UUID = '16488d3c-24e5-4442-92ff-83b583f70d93';

//======================== END BLE ========================//

export default function InputTinggiScreen({route}) {
    const navigation = useNavigation('');
    const [height, setHeight] = useState(0)
    const [isKeyboarVisible, setIsKeyboardVisible] = useState(false)
    const [user, setUser] = useState({})
    const [radioButtons, setRadioButtons] = useState([ 
        {...manual, selected: false},
        {...otomatis, selected: true}
    ]);

    const onPressRadioButton = (radioButtonsArray) => { setRadioButtons(radioButtonsArray) }
    const onPrevPress = () => { navigation.navigate('berat') }
    const onNextPress = () => { navigation.navigate('preview', { weight: route.params, height }) } 
    const getAlert = (title, message, button) => {
        return(
          Alert.alert( title, message, [{ text: button }] )
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

    //======================== BLE ========================//
    const [isConnected, setIsConnected] = useState(false); //Is a device connected?
    const [connectedDevice, setConnectedDevice] = useState(); //What device is connected?
    const [message, setMessage] = useState('Nothing Yet');
    
    // Scans availbale BLT Devices and then call connectDevice
    async function scanDevices() {
        PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
            title: 'Permission Localisation Bluetooth',
            message: 'Requirement for Bluetooth',
            buttonNeutral: 'Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
        },
        ).then(answere => {
            console.log('scanning');
            // display the Activityindicator
            BLTManager.startDeviceScan(null, null, (error, scannedDevice) => {
                if (error) { console.warn(error) }
                if (scannedDevice && scannedDevice.name == 'BLEExample') {
                    BLTManager.stopDeviceScan();
                    connectDevice(scannedDevice);
                }
            });

            // stop scanning devices after 5 seconds
            setTimeout(() => { BLTManager.stopDeviceScan() }, 5000);
        });
    }

    // handle the device disconnection (poorly)
    async function disconnectDevice() {
        console.log('Disconnecting start');
        if (connectedDevice != null) {
            const isDeviceConnected = await connectedDevice.isConnected();
            if (isDeviceConnected) {
                BLTManager.cancelTransaction('messagetransaction');
                BLTManager.cancelTransaction('nightmodetransaction');
                BLTManager.cancelDeviceConnection(connectedDevice.id)
                .then(() => console.log('DC completed'));
            }

            const connectionStatus = await connectedDevice.isConnected();
            if (!connectionStatus) { setIsConnected(false) }
        }
    }

    //Connect the device and start monitoring characteristics
    async function connectDevice(device) {
        console.log('connecting to Device:', device.name);
        device.connect()
        .then(device => {
            setConnectedDevice(device);
            setIsConnected(true);
            return device.discoverAllServicesAndCharacteristics();
        })
        .then(device => {
            //  Set what to do when DC is detected
            BLTManager.onDeviceDisconnected(device.id, (error, device) => {
                console.log('Device DC');
                setIsConnected(false);
            });

            //Read inital values 
            device.readCharacteristicForService(SERVICE_UUID, MESSAGE_UUID)
            .then(valenc => { setMessage(base64.decode(valenc?.value)) });

            //monitor values and tell what to do when receiving an update
            device.monitorCharacteristicForService( SERVICE_UUID, MESSAGE_UUID,
                (error, characteristic) => {
                    if (characteristic?.value != null) {
                        setMessage(base64.decode(characteristic?.value));
                        console.log(
                            'Message update received: ', 
                            base64.decode(characteristic?.value),
                        );
                    }
                },
                'messagetransaction',
            );
            console.log('Connection established');
        });
    }

    //======================== END BLE ========================//
    
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

            {/* Connect Button */}
            <View>
                <TouchableOpacity style={{width: 120}}>
                {!isConnected ? (
                    <Button title="Connect" onPress={()=>{ scanDevices() }} disabled={false}/>
                ) : ( 
                    <Button title="Disonnect" onPress={()=>{ disconnectDevice() }} disabled={false}/>
                )}
                </TouchableOpacity>
            </View>

            {/* Monitored Value */}
            <View> 
                <Text >{message}</Text>
            </View>

            {/* <Text>{route.params}</Text> */}
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