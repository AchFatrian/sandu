
import React from 'react';
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

LogBox.ignoreAllLogs();

const App = () => {
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
export default App;
