
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { LogBox } from 'react-native';
import Navigation from './src/Navigation';
import codePush from 'react-native-code-push';

LogBox.ignoreAllLogs();

let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };

// MyApp = codePush(codePushOptions)(MyApp);

const App = () => {
  useEffect(() => {
    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE
    });
  }, [])
  
  return (
      <SafeAreaView style={styles.root}>
        <Navigation />
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f3f6f4'
  }
});

export default codePush(codePushOptions)(App);
