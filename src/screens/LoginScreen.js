import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!email.trim()) {
            Alert.alert('Error', 'Please enter your email');
            return;
        }

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            Alert.alert('Error', 'Please enter a valid email');
            return;
        }

        if (!password.trim()) {
            Alert.alert('Error', 'Please enter your password');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);
        await AsyncStorage.setItem('isLoggedIn', 'true');
        // Simulate login process
        setTimeout(() => {
            setIsLoading(false);
            navigation.replace('Home')
        }, 1500);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-white"
        // style={{ paddingTop: insets.top }}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View className="flex-1 px-6 pb-10 justify-center">
                    {/* Logo */}
                    <View className="items-center mb-10 bg-black ">
                        <Image
                            source={require('../assets/logo/fydoin_logo.jpeg')} // Replace with your logo
                            className="w-36 h-36 rounded-full"
                            resizeMode="contain"
                        />
                    </View>

                    {/* Title */}
                    <Text className="text-3xl font-bold text-gray-800 mb-2 text-center  ">
                        Welcome Back
                    </Text>
                    <Text className="text-gray-500 mb-8 text-center">
                        Sign in to continue to your account
                    </Text>

                    {/* Email Input */}
                    <View className="mb-4">
                        <Text className="text-gray-700 mb-2">Email</Text>
                        <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-3">
                            <TextInput
                                className="flex-1 text-gray-700"
                                placeholder="Enter your email"
                                placeholderTextColor="#9CA3AF"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>
                    </View>

                    {/* Password Input */}
                    <View className="mb-6">
                        <Text className="text-gray-700 mb-2">Password</Text>
                        <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-3">
                            <TextInput
                                className="flex-1 text-gray-700"
                                placeholder="Enter your password"
                                placeholderTextColor="#9CA3AF"
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={setPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Icon
                                    name={showPassword ? "eye-slash" : "eye"}
                                    size={20}
                                    color="#6B7280"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Forgot Password */}
                    <TouchableOpacity className="items-end mb-6">
                        <Text className="text-blue-500 font-medium">Forgot Password?</Text>
                    </TouchableOpacity>

                    {/* Login Button */}
                    <TouchableOpacity
                        className={`bg-blue-600 py-3 rounded-lg items-center justify-center ${isLoading ? 'opacity-70' : ''}`}
                        onPress={handleLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Text className="text-white font-medium">Processing...</Text>
                        ) : (
                            <Text className="text-white font-medium">Sign In</Text>
                        )}
                    </TouchableOpacity>

                    {/* Divider */}
                    <View className="flex-row items-center my-6">
                        <View className="flex-1 h-px bg-gray-300" />
                        <Text className="px-3 text-gray-500">OR</Text>
                        <View className="flex-1 h-px bg-gray-300" />
                    </View>

                    {/* Social Login */}
                    <View className="flex-row justify-center gap-2">
                        <TouchableOpacity className="border border-gray-300 p-3 rounded-full">
                            <Image
                                source={require('../assets/logo/icons8-google-100.png')} // Replace with your Google icon
                                className="w-6 h-6"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity className="border border-gray-300 p-3 rounded-full">
                            <Image
                                source={require('../assets/logo/icons8-meta-500.png')} // Replace with your Facebook icon
                                className="w-6 h-6"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity className="border border-gray-300 p-3 rounded-full">
                            <Image
                                source={require('../assets/logo/icons8-apple-104.png')} // Replace with your Apple icon
                                className="w-6 h-6"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Sign Up Link */}
                    <View className="flex-row justify-center mt-6">
                        <Text className="text-gray-500">Don't have an account? </Text>
                        <TouchableOpacity>
                            <Text className="text-blue-500 font-medium">Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;