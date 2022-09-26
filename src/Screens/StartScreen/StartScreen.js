import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import Logo from '../../../assets/img/foto1.png'
import LogoOrtu from '../../../assets/img/foto2.png'
import LogoKader from '../../../assets/img/foto3.png'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class StartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    return (
      <View style= {styles.root}>
        <Image
        source={Logo}
        style={styles.logo}/>
        <TouchableOpacity style={styles.btnOrtu}
         onPress={()=>this.props.navigation.navigate('ortu')}>
            <View style={styles.vLogoBtn}>
              <Image
              source={LogoOrtu}
              style={styles.logoBtn}/>
            </View>
            <View style={styles.vCapBtn}>
              <Text style={styles.textBtn}>Orang Tua</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnKader}
          onPress={()=>this.props.navigation.navigate('kader')}>
            <View style={styles.vLogoBtn}>
              <Image
              source={LogoKader}
              style={styles.logoBtn}/>
            </View>
            <View style={styles.vCapBtn}>
              <Text style={styles.textBtn}>Kader</Text>
            </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root:{
    flex: 1,
    alignItems: 'center',
  },

  logo:{
    resizeMode:'contain',
    width: windowWidth * 0.9,
    height: windowHeight * 0.5,
  },

  btnOrtu:{
    width: windowWidth * 0.7,
    height: windowHeight * 0.12,
    flexDirection: 'row',
    borderRadius: 40,
    backgroundColor:'#4397af33',
    marginTop: windowHeight * 0.05,
  },

  vLogoBtn:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#4397AF',
    width: '30%',
    height: '100%',
    borderRadius: 40,
  },

  logoBtn:{
    resizeMode:'contain',
    width: windowWidth * 0.14,
    height: windowHeight * 0.14,
  },

  vCapBtn:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textBtn: {
    fontSize: windowHeight * 0.04,
    color: '#4397AF',
    fontWeight: '600',
    marginRight: windowWidth *0.04,
  },

  btnKader:{
    width: windowWidth * 0.7,
    height: windowHeight * 0.12,
    flexDirection: 'row',
    borderRadius: 40,
    backgroundColor:'#4397af33',
    marginTop: windowHeight * 0.03,
  }

})