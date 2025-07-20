import { PermissionsAndroid, Platform } from 'react-native';

export const requestPermissions = async () => {
    if (Platform.OS === 'android') {
        try {
            const apiLevel = Platform.constants.Version;
            const locationPermission = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
            const notificationPermission = PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS;

            const requestAll = async () => {
                const granted = await PermissionsAndroid.requestMultiple([
                    locationPermission,
                    notificationPermission,
                ]);

                const locationGranted = granted[locationPermission] === PermissionsAndroid.RESULTS.GRANTED;
                const notificationsGranted =
                    apiLevel < 33 ||
                    granted[notificationPermission] === PermissionsAndroid.RESULTS.GRANTED;

                if (locationGranted && notificationsGranted) {
                    console.log('All permissions granted');
                    return true;
                } else {
                    console.log('Some permissions denied, asking again...');
                    return false;
                }
            };

            let grantedAll = await requestAll();

            while (!grantedAll) {
                grantedAll = await requestAll();
                if (!grantedAll) {
                    break;
                }
            }

            return grantedAll;
        } catch (err) {
            console.warn('Error requesting permissions:', err);
            return false;
        }
    }
    return true;
};
