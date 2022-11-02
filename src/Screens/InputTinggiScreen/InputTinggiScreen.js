import { View, Text, StyleSheet,TouchableOpacity, 
    Dimensions, Image, TextInput, Keyboard, BackHandler, PermissionsAndroid, Alert } from 'react-native'
import React, {useState, useEffect, useCallback} from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Tinggi from '../../../assets/img/tinggi1.png';
import Next from '../../../assets/img/next.png';
import Previous from '../../../assets/img/previous.png';
import EncryptedStorage from 'react-native-encrypted-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
    const [auto, setAuto] = useState(true)

    const onPrevPress = () => { navigation.navigate('berat'); disconnectDevice() }
    const onNextPress = () => { navigation.navigate('preview', { height: route.params, height }); disconnectDevice() } 
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
          scanDevices()
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

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])

    //======================== BLE ========================//
    const [isConnected, setIsConnected] = useState(false); //Is a device connected?
    const [connectedDevice, setConnectedDevice] = useState(); //What device is connected?
    const [log, setLog] = useState('')
    
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
            setLog('scanning')
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
        setLog('Disconnecting start')
        if (connectedDevice != null) {
            const isDeviceConnected = await connectedDevice.isConnected();
            if (isDeviceConnected) {
                BLTManager.cancelTransaction('messagetransaction');
                BLTManager.cancelTransaction('nightmodetransaction');
                BLTManager.cancelDeviceConnection(connectedDevice.id)
                .then(() => {
                    console.log('DC completed')
                    setLog('DC completed')
                });
            }

            const connectionStatus = await connectedDevice.isConnected();
            if (!connectionStatus) { setIsConnected(false) }
        }
    }

    //Connect the device and start monitoring characteristics
    async function connectDevice(device) {
        console.log('connecting to Device:', device.name);
        setLog(`connecting to Device: ${device.name}`);
        device.connect()
        .then(device => {
            setConnectedDevice(device);
            setIsConnected(true);
            return device.discoverAllServicesAndCharacteristics();
        })
        .then(device => {
            //  Set what to do when DC is detected
            BLTManager.onDeviceDisconnected(device.id, (error, device) => {
                console.log('Device Disconected');
                setLog('Device Disconected')
                setIsConnected(false);
            });

            //Read inital values 
            device.readCharacteristicForService(SERVICE_UUID, MESSAGE_UUID)
            .then(valenc => { setHeight(base64.decode(valenc?.value)) });

            //monitor values and tell what to do when receiving an update
            device.monitorCharacteristicForService( SERVICE_UUID, MESSAGE_UUID,
                (error, characteristic) => {
                    if (characteristic?.value != null) {
                        setHeight(base64.decode(characteristic?.value));
                        console.log(
                            'Message update received: ', 
                            base64.decode(characteristic?.value),
                        );
                    }
                },
                'messagetransaction',
            );
            console.log('Connection established');
            setLog('Connection established')
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

            <View style={styles.containerInput}>
                <Text style={styles.txtCap}>Tinggi Badan</Text>
                {
                    (!isKeyboarVisible) ? (
                        <Image source={Tinggi} style={styles.img}/>
                    ) : null
                }
                
                <View style={styles.txtCap}>
                    <TouchableOpacity 
                        style={[styles.btnBl,{backgroundColor:`${auto ? '#f2f2f2' : '#4397AF'}`}]}
                        onPress={()=>{disconnectDevice(); setAuto(false); setHeight(0)}}
                    >
                        <Text style={[styles.btnCap,{color:`${auto ? '#4397AF' : '#f2f2f2'}`}]}>Manual</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.btnBl,{backgroundColor:`${auto ? '#4397AF' : '#f2f2f2'}`}]}
                        onPress={()=>{scanDevices(); setAuto(true); setHeight(0)}}
                    >
                        <Text style={[styles.btnCap,{color:`${auto ? '#f2f2f2' : '#4397AF'}`}]}>Otomatis</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.vConInput}>
                    <View style={[styles.vInput,{display: auto ? 'flex' : 'none'}]}>
                        <Text style={styles.tCap}>{height}</Text>
                    </View>
                    <TextInput style={[styles.vInput,{display: !auto ? 'flex' : 'none'}]} onChangeText={setHeight} value={height}/>
                    <Text style={styles.tCap}>Cm</Text>
                </View>
                <Text>{log}</Text>
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
        fontheight:'700',
    },
    
    txtNik:{ 
        fontSize: windowWidth * 0.04,
        marginLeft: windowWidth * 0.03,
        marginTop: windowHeight * 0.01,
        color:'#4397AF',
        fontheight:'400',
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
        marginVertical: windowHeight * 0.02,
    },

    txtCap:{
        marginTop: windowWidth * 0.02,
        fontSize: windowWidth * 0.05,
        color: 'black',
        fontheight: '600',
        flexDirection: 'row'
    },

    vInput:{
        width: windowWidth * 0.4,
        height: windowHeight * 0.06,
        backgroundColor: '#4397af33',
        borderRadius: 8,
        marginVertical: windowHeight * 0.02,
        marginRight: windowHeight * 0.02,
        borderColor: '#4397AF',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    vConInput:{
        // marginVertical: windowHeight * 0.02,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
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
        marginTop: windowHeight * 0.025,
        marginLeft: windowWidth * 0.085,
    },

    tBtnNext:{
        marginTop: windowHeight * 0.025,
        marginLeft: windowWidth * 0.43,
    },

    imgNav:{
        width: windowWidth * 0.1,
        height: windowHeight * 0.05
    },

    btnCap:{
        fontSize: windowWidth *0.04,
        // color: 'white',
    },

    btnBl:{
        paddingHorizontal: windowHeight * 0.015,
        paddingVertical: windowHeight * 0.004,
        marginHorizontal: windowHeight * 0.01,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:10
    },
})