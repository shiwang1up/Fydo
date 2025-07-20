import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { globalStyles } from '../constants/globalStyle';

const CustomSlider = ({
    initialValue = null,
    units = ['m', 'km'],
    onValueChange,
}) => {
    const [value, setValue] = useState(initialValue ? initialValue : 0);
    const [selectedUnit, setSelectedUnit] = useState(units[1]); // default 'meter'

    const handleValueChange = (newValue) => {
        setValue(newValue);
        if (onValueChange) {
            let numericValue = parseFloat(newValue) || 0;

            // Convert km to meters
            if (selectedUnit === 'km') {
                numericValue = numericValue * 1000;
            }
            onValueChange({ value: numericValue });
        }
    };

    const handleUnitSelect = (unit) => {
        setSelectedUnit(unit);
        if (onValueChange) {
            const numericValue = parseFloat(value) || 0;
            onValueChange({ value: numericValue, unit });
        }
    };

    return (
        <View className="my-6 relative ">
            <TextInput
                className="h-10 border border-gray-300 rounded-lg  mb-3"
                keyboardType="numeric"
                value={value}
                style={{ paddingLeft: 40 }}
                onChangeText={handleValueChange}
                placeholder='Enter search radius'
            />
            <View style={{ position: 'absolute', top: 11, left: 10 }}>
                <MaterialIcons name='search' size={20} color={globalStyles.borderColor} />
            </View>
            <View style={globalStyles.unitContainer}>
                {units.map((unit) => (
                    <TouchableOpacity
                        key={unit}
                        style={[
                            globalStyles.unitButton,
                            selectedUnit === unit
                                ? globalStyles.unitButtonSelected
                                : globalStyles.unitButtonUnselected,
                        ]}
                        onPress={() => handleUnitSelect(unit)}
                    >
                        <Text
                            style={
                                selectedUnit === unit
                                    ? globalStyles.unitTextSelected
                                    : globalStyles.unitTextUnselected
                            }
                        >
                            {unit}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default CustomSlider;
