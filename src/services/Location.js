import GetLocation from 'react-native-get-location';
import { CHECK_NEARBY_API, CHECK_USER_LOCATION } from '../api/apiRoutes';

export const checkNearbyPlacesOSM = async ({ distance = 1, placeType = 'shop', setIsLoading }) => {
    try {
        setIsLoading(true)
        const location = await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        });

        const { latitude, longitude } = location;

        const overpassURL = `${CHECK_NEARBY_API}[out:json];node(around:${distance},${latitude},${longitude})["${placeType}"];out;`;
        console.log(overpassURL, "url")
        const response = await fetch(overpassURL);
        const data = await response.json();

        if (data.elements && data.elements.length > 0) {
            return {
                hasNearbyPlace: true,
                places: data.elements.map(place => ({
                    id: place.id,
                    name: place.tags?.name || 'Unnamed',
                    type: place.tags?.[placeType] || placeType,
                    latitude: place.lat,
                    longitude: place.lon
                }))
            };
        } else {
            return { hasNearbyPlace: false, places: [], placeType };
        }
    } catch (error) {
        console.warn('Error fetching places:', error);
        return { hasNearbyPlace: false, places: [], error };
    } finally {
        setIsLoading(false)
    }
}


let isLocationRequestInProgress = false;

export const getPlaceName = async () => {
    if (isLocationRequestInProgress) {
        console.warn("Location request already in progress");
        return { latitude: '0.0000', longitude: '0.0000', placeName: 'Unknown' };
    }

    try {
        isLocationRequestInProgress = true;
        const location = await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 30000,
        });

        const { latitude, longitude } = location;
        const response = await fetch(
            `${CHECK_USER_LOCATION}json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
            { headers: { 'User-Agent': 'YourApp/1.0 (you@example.com)' } }
        );

        if (!response.ok) throw new Error('Failed to fetch place name');
        const data = await response.json();

        const placeName = data.name || data.address?.amenity || data.display_name || 'Unknown Place';
        return { latitude: latitude.toFixed(4), longitude: longitude.toFixed(4), placeName };

    } catch (error) {
        console.error('Error getting place name:', error);
        return { latitude: '0.0000', longitude: '0.0000', placeName: 'Unknown' };
    } finally {
        isLocationRequestInProgress = false;
    }
};