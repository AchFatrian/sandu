import React, {useState} from 'react';
import {
  TouchableOpacity,
  Button,
  PermissionsAndroid,
  View,
  Text,
} from 'react-native';

import base64 from 'react-native-base64';

import {BleManager, Device} from 'react-native-ble-plx';
import {LogBox} from 'react-native';

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const BLTManager = new BleManager();

const SERVICE_UUID = '1be79dcd-7069-4ac2-88f2-8dbc43adb8be';

const MESSAGE_UUID = '16488d3c-24e5-4442-92ff-83b583f70d93';

function StringToBool(input) {
  if (input == '1') {
    return true;
  } else {
    return false;
  }
}

function BoolToString(input) {
  if (input == true) {
    return '1';
  } else {
    return '0';
  }
}

export default function KaderScreen() {
  //Is a device connected?
  const [isConnected, setIsConnected] = useState(false);

  //What device is connected?
  const [connectedDevice, setConnectedDevice] = useState();

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
        if (error) {
          console.warn(error);
        }

        if (scannedDevice && scannedDevice.name == 'BLEExample') {
          BLTManager.stopDeviceScan();
          connectDevice(scannedDevice);
        }
      });

      // stop scanning devices after 5 seconds
      setTimeout(() => {
        BLTManager.stopDeviceScan();
      }, 5000);
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

        BLTManager.cancelDeviceConnection(connectedDevice.id).then(() =>
          console.log('DC completed'),
        );
      }

      const connectionStatus = await connectedDevice.isConnected();
      if (!connectionStatus) {
        setIsConnected(false);
      }
    }
  }

  
  //Connect the device and start monitoring characteristics
  async function connectDevice(device) {
    console.log('connecting to Device:', device.name);

    device
      .connect()
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

        //Message
        device
          .readCharacteristicForService(SERVICE_UUID, MESSAGE_UUID)
          .then(valenc => {
            setMessage(base64.decode(valenc?.value));
          });

        //monitor values and tell what to do when receiving an update

        //Message
        device.monitorCharacteristicForService(
          SERVICE_UUID,
          MESSAGE_UUID,
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

  return (
    <View>
      <View style={{paddingBottom: 200}}></View>

      {/* Title */}
      <View >
        <Text >BLE Example</Text>
      </View>

      <View style={{paddingBottom: 20}}></View>

      {/* Connect Button */}
      <View >
        <TouchableOpacity style={{width: 120}}>
          {!isConnected ? (
            <Button
              title="Connect"
              onPress={() => {
                scanDevices();
              }}
              disabled={false}
            />
          ) : (
            <Button
              title="Disonnect"
              onPress={() => {
                disconnectDevice();
              }}
              disabled={false}
            />
          )}
        </TouchableOpacity>
      </View>

      <View style={{paddingBottom: 20}}></View>

      {/* Monitored Value */}

      <View >
        <Text >{message}</Text>
      </View>

      <View style={{paddingBottom: 20}}></View>

    </View>
  );
}
