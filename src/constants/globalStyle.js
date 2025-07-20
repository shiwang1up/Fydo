import { Dimensions, StyleSheet } from "react-native";
const screen = Dimensions.get('window');
export const width =
    screen.width > screen.height ? screen.height : screen.width;

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    submitButton: {
        backgroundColor: '#3B82F6',
        paddingVertical: width * 0.015,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: width * 0.01,
        marginTop: width * 0.015,
        width: width * 0.2,
        alignSelf: 'center'
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 16,
    },
    paddingContent: {
        paddingVertical: width * 0.025,
        backgroundColor: 'white',
        marginTop: width * 0.02,
        borderRadius: width * 0.01,
        paddingHorizontal: width * 0.02
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    placeButton: {
        paddingHorizontal: width * 0.02,
        paddingVertical: width * 0.01,
        borderRadius: width * 0.008,
        borderWidth: 1,
        marginRight: width * 0.01,
        marginBottom: width * 0.02,
    },
    selectedButton: {
        backgroundColor: '#3B82F6',
        borderColor: '#3B82F6',
    },
    unselectedButton: {
        backgroundColor: '#FFFFFF',
        borderColor: '#D1D5DB',
    },
    selectedText: {
        color: '#FFFFFF',
    },
    unselectedText: {
        color: '#374151',
    },
    unitContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        gap: 8,
        right: width * 0.02,
        top: width * 0.008
    },
    unitButton: {
        paddingHorizontal: width * 0.015,
        paddingVertical: width * 0.01,
        borderRadius: width * 0.3,
        borderWidth: 1,
    },
    unitButtonSelected: {
        backgroundColor: '#3B82F6',
        borderColor: '#2563EB',
    },
    unitButtonUnselected: {
        backgroundColor: '#FFFFFF',
        borderColor: '#D1D5DB',
    },
    unitTextSelected: {
        color: '#FFFFFF',
    },
    unitTextUnselected: {
        color: '#374151',
    },
    loading: {
        width: width * 0.8,
        height: width * 0.8,
        zIndex: 22
    },
    image: {
        width: width * 0.06,
        height: width * 0.06,
        borderRadius: 10000
    },
    borderColor: {
        borderColor: '#d1d5db'
    },
    error: {
        color: '#FF0000',
        position: 'absolute',
        bottom: -5,
        left: 10
    },
    empty: {
        width: width * 0.4,
        height: width * 0.4,
        zIndex: 22
    }
});