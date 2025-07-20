import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // or any other icon set
import { globalStyles } from '../constants/globalStyle';

const Header = ({

    rightIcon = null,
    rightIconName = 'logout', // default icon name
    bgColor = 'bg-white',
    showBorder = true,
    iconColor = '#374151', // gray-700
    iconSize = 24,
    onLeftPress = () => { },
    rightIconOnPress = () => { },
}) => {
    return (
        <View className={`flex-row items-center justify-between px-4 py-3  ${bgColor} ${showBorder ? 'border-b border-gray-200' : ''}`
        }
            style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Left Icon/Button */}
            <View className="w-8 border border-[#d1d5db] rounded-full " style={{ borderColor: '#d1d5db' }}>
                <Image
                    source={{ uri: 'https://avatar.iran.liara.run/public/37' }}
                    style={globalStyles.image}
                />
            </View>


            <Image
                source={require('../assets/logo/fydoin_logo.jpeg')}     
                style={globalStyles.image}
            />
            {/* Right Icon/Button */}
            <View className="w-8">
                {rightIcon !== false && (
                    <TouchableOpacity onPress={rightIconOnPress}>
                        {rightIcon || (
                            <Icon name={rightIconName} size={iconSize} color={iconColor} />
                        )}
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default Header;