import React, { useState } from 'react';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { StyleSheet, View, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  DefaultTheme,
  DarkTheme,
  Provider as PaperProvider
} from 'react-native-paper';
import { bool } from 'prop-types';

import AppNavigator from './navigation/AppNavigator';
import { StoreProvider, Store } from './Store';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/robot-dev.png'),
      require('./assets/robot-prod.png')
    ]),
    Font.loadAsync({
      ...Ionicons.font
    })
  ]);
}

function handleLoadingError(error) {
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

function App({ skipLoadingScreen }) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  }

  const customTheme = {
    dark: false,
    roundness: 4,
    colors: {
      primary: '#034748',
      accent: '#11B5E4',
      background: '#F1F7ED',
      surface: '#F1F7ED',
      text: '#001021',
      error: '#B71F0E',
      disabled: '#BEC6C6',
      placeholder: '#1481BA',
      backdrop: '#001021'
    },
    fonts: {
      regular: 'Helvetica Neue',
      medium: 'Helvetica Neue Light'
    }
  };

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle='default' />}
      <StoreProvider>
        <Store.Consumer>
          {value => {
            const { isDarkModeOn } = value[0];

            return (
              <PaperProvider theme={isDarkModeOn ? DarkTheme : customTheme}>
                <AppNavigator theme={isDarkModeOn ? 'dark' : 'light'} />
              </PaperProvider>
            );
          }}
        </Store.Consumer>
      </StoreProvider>
    </View>
  );
}

export default App;
App.propTypes = {
  skipLoadingScreen: bool.isRequired
};
