import React from 'react';
import { View } from 'react-native';
import { LoaderKitView, } from 'react-native-loader-kit';


const Loading = ({ color, type, size = 1 }) => {
    const handleType = () => {
        switch (type) {
            case 1:
                return 'BallPulse';
            case 2:
                return 'BallGridPulse';
            case 3:
                return 'BallSpinFadeLoader';
            case 4:
                return 'BallGridBeat';
            default:
                return 'BallSpinFadeLoader';
        }
    };
    const loaderSize = 26 * size;
    return (
        <View style={{ backgroundColor: 'transparent', flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <LoaderKitView
                style={{ width: loaderSize, height: loaderSize }}
                name={handleType()}
                animationSpeedMultiplier={1.0}
                color={color}
            />
        </View>
    );
};

export default Loading;