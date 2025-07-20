import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { globalStyles, width } from '../constants/globalStyle';

const CustomSlider = ({
    initialValue = null,
    units = [' m ', 'km'],
    onValueChange,
}) => {
    const [value, setValue] = useState(initialValue ? initialValue : 0);
    const [selectedUnit, setSelectedUnit] = useState(units[1]);

    const handleValueChange = (newValue) => {
        setValue(newValue);
        if (onValueChange) {
            let numericValue = parseFloat(newValue) || 0;

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
        <View className="my-2 relative">
            <TextInput
                className=" border border-gray-300 rounded-lg"
                keyboardType="numeric"
                value={value}
                style={{ paddingLeft: width * 0.08 }}
                onChangeText={handleValueChange}
                placeholder='Enter search radius'
                placeholderTextColor={'#d1d5db'}
            />
            <View className="absolute top-1/2 -translate-y-1/2 left-2  ">
                <MaterialIcons name='search' size={width * 0.05} color={'#d1d5db'} />
            </View>
            <View className="absolute top-1/2 -translate-y-1/2 right-2 flex-row ">
                {units.map((unit) => (
                    <TouchableOpacity
                        key={unit}
                        className='px-2 py-2 border rounded-full ml-2'
                        style={[
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
