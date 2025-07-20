import React, { useEffect } from 'react';
import { View, Text, Image, StatusBar } from 'react-native';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loading from '../components/Loading';

const SplashScreen = ({ navigation }) => {

    // useEffect(() => {
    //     // Simulate loading process
    //     const timer = setTimeout(() => {
    //         navigation.replace('Home'); // Replace with your main screen name
    //     }, 3000);

    //     return () => clearTimeout(timer);
    // }, [navigation]);

    return (
        <LinearGradient
            colors={['#ade8f4', '#90e0ef', '#48cae4', '#00b4d8', '#0096c7']} // Tailwind indigo-600 to indigo-900
            className="flex-1"
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0.8 }}
        >
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <View
                className="flex-1 items-center justify-center flex-col px-6 relative"
            // style={{ justifyContent: 'space-around' }}
            >
                {/* App Logo with shadow */}
                <View className="bg-white/20 p-6 rounded-full mb-8 shadow-lg shadow-black/30 pl-6">
                    <Icon name="rocket-launch" size={60} color="#023e8a" />
                </View>

                {/* Animated Logo */}
                <LottieView
                    source={require('../assets/animation/Coupon_Discount.json')} // Replace with your Lottie file
                    autoPlay
                    loop
                    style={{ width: 250, height: 250 }}
                />

                {/* App Name */}
                <View className='flex-col items-center'>
                    <View className="flex-row items-center mb-10" style={{ marginTop: 10 }}>
                        <Loading color={'black'} type={3} size={1.5} />
                    </View>
                </View>
                <View className='flex-col items-center mt-10'>
                    <Text className="text-3xl font-bold text-white mt-8 mb-2 ">Assignment Application</Text>
                    <Text className="text-lg text-white/80 mb-12">Your perfect shopping companion</Text>
                    {/* Loading Indicator */}

                </View>
            </View>
        </LinearGradient >
    );
};

export default SplashScreen;