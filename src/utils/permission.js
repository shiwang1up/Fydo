// permissions.js
import { PermissionsAndroid, Platform } from 'react-native';

export const requestPermissions = async () => {
    if (Platform.OS === 'android') {
        try {

            const apiLevel = Platform.constants.Version;
            const locationPermission =
                apiLevel >= 31
                    ? PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                    : PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;

            const granted = await PermissionsAndroid.requestMultiple([
                locationPermission,
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            ]);

            if (
                granted[locationPermission] === PermissionsAndroid.RESULTS.GRANTED &&
                (apiLevel < 33 || // POST_NOTIFICATIONS introduced in Android 13 (API 33)
                    granted[PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS] ===
                    PermissionsAndroid.RESULTS.GRANTED)
            ) {
                console.log('All permissions granted');
                return true;
            } else {
                console.log('Some permissions denied');
                return false;
            }
        } catch (err) {
            console.warn('Error requesting permissions:', err);
            return false;
        }
    }
    return true;
};

export const checkPermissions = async () => {
    if (Platform.OS === 'android') {
        try {
            const apiLevel = Platform.constants.Version;
            const locationPermission =
                apiLevel >= 31
                    ? PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                    : PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;

            const locationGranted = await PermissionsAndroid.check(locationPermission);
            let notificationsGranted = true;

            // POST_NOTIFICATIONS only exists in Android 13+
            if (apiLevel >= 33) {
                notificationsGranted = await PermissionsAndroid.check(
                    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
                );
            }

            return locationGranted && notificationsGranted;
        } catch (err) {
            console.warn('Error checking permissions:', err);
            return false;
        }
    }
    return true;
};