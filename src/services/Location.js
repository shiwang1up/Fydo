import GetLocation from 'react-native-get-location';

async function checkNearbyPlacesOSM({ distance = 1, placeType = 'shop', setIsLoading } = {}) {
    try {
        setIsLoading(true)
        const location = await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        });

        const { latitude, longitude } = location;

        const overpassURL = `https://overpass-api.de/api/interpreter?data=[out:json];node(around:${distance},${latitude},${longitude})["${placeType}"];out;`;
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

export default checkNearbyPlacesOSM;
