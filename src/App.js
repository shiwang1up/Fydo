/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import "../global.css";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from "react";
import LoginScreen from "./screens/LoginScreen";
import { requestPermissions, checkPermissions } from './utils/permission';
import Home from "./screens/Home";
import Immersive from 'react-native-immersive';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoadingProvider } from './context/LoadingContext';
import SplashScreen from "./screens/SplashScreen";



function App() {
  Immersive.setImmersive(true);
  const Stack = createNativeStackNavigator();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSplashVisible, setIsSplashVisible] = useState(true);


  const [permissionsGranted, setPermissionsGranted] = useState(false);


  const handlePermissions = async () => {
    const hasPermissions = await checkPermissions();

    if (!hasPermissions) {
      const granted = await requestPermissions();
      setPermissionsGranted(granted);
    } else {
      setPermissionsGranted(true);
    }
  };
  useEffect(() => {
    initializeApp()
    handlePermissions();

    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const initializeApp = async () => {
    try {
      const token = await AsyncStorage.getItem('isLoggedIn');
      setIsLoggedIn(token === 'true');
    } catch (error) {
      console.log(error)
    }
  };
  if (isSplashVisible) {
    return <SplashScreen />;
  }

  if (!permissionsGranted) {
    handlePermissions();
  }


  return (
    <NavigationContainer>
      <LoadingProvider>
        <Stack.Navigator
          initialRouteName={isLoggedIn ? 'Home' : 'Login'}
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </LoadingProvider>
    </NavigationContainer>
  );
}

export default App;