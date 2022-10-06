import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import InputAnak from '../../component/InputAnak/InputAnak'
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ListAnakScreen() {
    const navigation = useNavigation('');
        const onInputPress = () => {
        navigation.navigate('input');
        }
  return (
    <View style={styles.container}>
        <View style={styles.controlScroll}>
            <View style={styles.vTittle}>
                <Text style={styles.txtTittle}>List Data Anak</Text>
            </View>
            <ScrollView style={styles.scrollContainer}>
                <InputAnak
                    onPress={onInputPress}
                    nama={'Cahyo Arrisabarno'}
                    tinggi={'60 CM'}
                    berat={'18 Kg'}
                    umur={26}
                    status={'Sehat'}/>
                <InputAnak
                    onPress={onInputPress}
                    nama={'Achmad Fatrian'}
                    tinggi={'40 CM'}
                    berat={'14 Kg'}
                    umur={26}
                    status={'Sehat'}/>
                <InputAnak
                    onPress={onInputPress}
                    nama={'M Imam Wahyuda'}
                    tinggi={'30 CM'}
                    berat={'10 Kg'}
                    umur={36}
                    status={'Sakit'}/>
                <InputAnak
                    onPress={onInputPress}
                    nama={'Jasmine Azzahra'}
                    tinggi={'60 CM'}
                    berat={'18 Kg'}
                    umur={26}
                    status={'Sehat'}/>
            </ScrollView>
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

    vTittle: {
        width: '100%',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    txtTittle: {
        fontSize: windowWidth * 0.05,
        color: 'black',
        fontWeight: '600',
    },

    controlScroll: {
        height: '95%',
        width: '92%',
        backgroundColor: '#4397af33',
        borderRadius: 20,
    },

    scrollContainer: {
        flex: 1, 
    },
})