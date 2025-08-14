import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Stopwatch from './components/Stopwatch';
import { purpleTheme } from './styles';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Stopwatch />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: purpleTheme.background,
  },
});

export default App;