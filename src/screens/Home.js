import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, Alert, ActivityIndicator, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../components/Header';
import checkNearbyPlacesOSM from '../services/Location';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { LoadingContext } from '../context/LoadingContext';
import CustomSlider from '../components/Slider';
import { globalStyles } from '../constants/globalStyle';
import LottieView from 'lottie-react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [searchResult, setSearchResult] = useState(null);
    const { isLoading, setIsLoading } = useContext(LoadingContext);
    const [error, setError] = useState('');
    const [distance, setDistance] = useState(null);
    const placeTypes = [
        { label: "Alcohol", value: 'alcohol' },
        { label: "Hardware", value: 'hardware' },
        { label: "Books", value: 'books' },
        { label: "Bakery", value: 'bakery' },
        { label: "Clothes", value: 'clothes' },
        { label: "Electronics", value: 'electronics' },
        { label: "Gifts", value: 'gift' },
        { label: "Cosmetics", value: 'cosmetics' },
    ];
    const [selectedPlaceType, setSelectedPlaceType] = useState(placeTypes[0].value);
    const [displayName, setDisplayName] = useState('');
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [placeCounts, setPlaceCounts] = useState({});
    const [limitedPlaces, setLimitedPlaces] = useState([]);


    useEffect(() => {
        if (limitedPlaces.length > 0) {
            filterPlaces(limitedPlaces, selectedPlaceType);
        }
    }, [selectedPlaceType]);


    const handleRandomRender = async () => {
        const response = await checkNearbyPlacesOSM({
            distance,
            setIsLoading
        });
        console.log(response, "res");
        setDistance(0);

        if (response.places && response.places.length) {
            console.log('in if', response.places);
            const limited = response.places.slice(0, 100);
            setLimitedPlaces(limited);

            const counts = limited.reduce((acc, place) => {
                acc[place.type] = (acc[place.type] || 0) + 1;
                return acc;
            }, {});

            setPlaceCounts(counts);
            filterPlaces(limited, selectedPlaceType);
        } else {
            setPlaceCounts(0);
            setSearchResult('nothing');
        }
    };

    const filterPlaces = (places, type) => {
        const filtered = places.filter(place => place.type === type);
        setFilteredPlaces(filtered);
        console.log(filtered, "f");
        if (filtered.length > 0) {
            setSearchResult(type);
        } else {
            setSearchResult('nothing');
        }
    };

    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Logout", onPress: () => navigation.replace('Login') }
            ]
        );
    };

    const renderResult = () => {
        if (searchResult === 'nothing') {
            return <NothingFoundUI displayName={selectedPlaceType} />;
        } else if (searchResult !== 'nothing') {
            return <ShopsUI places={filteredPlaces} displayName={selectedPlaceType} />;
        } else {
            return
        }

    }


    return (
        <SafeAreaView className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
            <Header rightIconOnPress={handleLogout} />
            <View className='px-4'>
                <HomeUI />
            </View>

            <View className="flex-1 px-4">
                {isLoading ? (
                    <View className='flex-1 items-center flex-col justify-center'>
                        <LottieView
                            source={require('../assets/animation/searching.json')}
                            autoPlay
                            loop
                            style={globalStyles.loading}
                        />
                    </View>
                ) : (
                    <>
                        <View style={globalStyles.paddingContent}>
                            <View style={{ position: 'relative' }}>
                                <CustomSlider
                                    onValueChange={(value) => {
                                        if (value.value > 100000) {
                                            setError('* Please reduce search radius');
                                        } else {
                                            setDistance(value.value);
                                            setDisplayName(value.placeType);
                                            setError('');
                                        }
                                    }}
                                />
                                {error && <Text style={globalStyles.error}>{error}</Text>}
                            </View>
                            <TouchableOpacity
                                style={globalStyles.submitButton}
                                onPress={handleRandomRender}
                            >
                                <Text style={globalStyles.submitButtonText}>Search Place</Text>
                            </TouchableOpacity>
                        </View>

                        {!isLoading && (
                            <>
                                <View style={globalStyles.paddingContent}>
                                    <Text className="text-lg font-semibold" style={{ marginBottom: 8 }}>
                                        Found Places Type
                                    </Text>
                                    <ScrollView
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        style={{ marginTop: 8 }}
                                        contentContainerStyle={{ paddingHorizontal: 4 }}
                                    >
                                        {placeTypes.map((place) => (
                                            <TouchableOpacity
                                                key={place.value}
                                                style={[
                                                    globalStyles.placeButton,
                                                    selectedPlaceType === place.value
                                                        ? globalStyles.selectedButton
                                                        : globalStyles.unselectedButton,
                                                    { marginRight: 8 },
                                                ]}
                                                onPress={() => setSelectedPlaceType(place.value)}
                                            >
                                                <Text
                                                    style={
                                                        selectedPlaceType === place.value
                                                            ? globalStyles.selectedText
                                                            : globalStyles.unselectedText
                                                    }
                                                >
                                                    {place.label} ({placeCounts[place.value] || 0})
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </View>
                                <View style={{ flex: 1 }}>
                                    {renderResult()}
                                </View>
                            </>
                        )}
                    </>
                )}
            </View>
        </SafeAreaView>
    );
};

const getIconConfigForPlaceType = (type) => {
    const iconMap = {
        alcohol: {
            lib: MaterialCommunityIcons,
            name: 'glass-cocktail',
            color: '#8B5CF6',
            bgColor: '#EDE9FE'
        },

        hardware: {
            lib: MaterialIcons,
            name: 'handyman',
            color: '#F59E0B',
            bgColor: '#FEF3C7'
        },

        books: {
            lib: MaterialIcons,
            name: 'menu-book',
            color: '#10B981',
            bgColor: '#D1FAE5'
        },

        bakery: {
            lib: MaterialCommunityIcons,
            name: 'bread-slice',
            color: '#F97316',
            bgColor: '#FFEDD5'
        },

        clothes: {
            lib: Ionicons,
            name: 'shirt-outline',
            color: '#EC4899',
            bgColor: '#FCE7F3'
        },

        electronics: {
            lib: MaterialIcons,
            name: 'devices',
            color: '#3B82F6',
            bgColor: '#DBEAFE'
        },

        gift: {
            lib: MaterialIcons,
            name: 'card-giftcard',
            color: '#EF4444',
            bgColor: '#FEE2E2'
        },

        cosmetics: {
            lib: MaterialCommunityIcons,
            name: 'lipstick',
            color: '#EC4899',
            bgColor: '#FCE7F3'
        },

        shop: {
            lib: MaterialIcons,
            name: 'shopping-bag',
            color: '#6366F1',
            bgColor: '#E0E7FF'
        },

        default: {
            lib: MaterialIcons,
            name: 'store',
            color: '#64748B',
            bgColor: '#F1F5F9'
        }
    };

    return iconMap[type] || iconMap.default;
};


const PlaceItem = ({ place }) => {
    const { colors } = useTheme();
    const { lib: IconComponent, name: iconName, color, bgColor } = getIconConfigForPlaceType(place.type);

    return (
        <View className='rounded-lg shadow-sm mb-4 overflow-hidden'
            style={{ backgroundColor: colors.card }}>
            <TouchableOpacity className="flex-row items-center p-3">
                <View className='rounded-full p-3' style={{ backgroundColor: bgColor, marginRight: 12 }}>
                    <IconComponent
                        name={iconName}
                        size={20}
                        color={color}
                    />
                </View>
                <View className="flex-1">
                    <Text className="text-lg font-semibold" style={{ color: colors.text }}>
                        {place.name}
                    </Text>
                    <Text className="text-sm capitalize mb-1" style={{ color: colors.text }}>
                        {place.type.replace(/_/g, ' ')}
                    </Text>
                    {place.latitude && place.longitude && (
                        <Text className="text-xs" style={{ color: colors.text }}>
                            {place.latitude.toFixed(4)}, {place.longitude.toFixed(4)}
                        </Text>
                    )}
                </View>
                <MaterialIcons
                    name="chevron-right"
                    size={24}
                    color={colors.text}
                    style={{ opacity: 0.5 }}
                />
            </TouchableOpacity>
        </View>
    );
};

const ShopsUI = ({ places, displayName }) => (
    <View style={[globalStyles.paddingContent]}>
        <Text className="text-xl font-semibold text-gray-700 mb-4">
            Nearby {displayName} shop available ({places.length})
        </Text>
        <FlatList
            data={places}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <PlaceItem place={item} iconName="shopping-bag" />}
        />
    </View>
);

const HomeUI = () => (
    <View style={[globalStyles.paddingContent, globalStyles.center]}>
        <Text className="text-xl font-semibold text-gray-800 mb-2">Welcome Home!</Text>
        <Text className="text-gray-600 text-center px-10">
            You're viewing your home location.
        </Text>
    </View>
);

const NothingFoundUI = ({ displayName }) => (
    <View style={[globalStyles.paddingContent, globalStyles.center]}>
        <Image
            source={require('../assets/logo/fydoin_logo.jpeg')}
            className="w-32 h-32 mb-6"
        />
        <Text className="text-xl font-semibold text-gray-800 mb-2">Nothing Found</Text>
        <Text className="text-gray-600 text-center px-10">
            Try widening your search radius in order to search
            <Text style={{ fontWeight: 'bold' }}>{" "}{displayName}{" "}</Text>
            shop near you
        </Text>
    </View>
);

export default HomeScreen;