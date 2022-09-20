import { Text, View, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'
import { StackActions } from '@react-navigation/native'
import Logo from '../../../assets/img/sandu.png'

class splashscreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.dispatch(StackActions.replace('start'));
    }, 2500);
  }

  render() {
    return (
      <View style={styles.root}>
        <Image
        source={Logo}
        style={styles.logo}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: { 
    flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
  },

  logo: {
    resizeMode:'contain',
    width:175,
    height:175,
}

})
export default splashscreen;