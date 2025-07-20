import { createContext, useEffect, useMemo, } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';

const InternetContext = createContext();

const InternetProvider = ({ children }) => {
    const netInfo = useNetInfo();

    useEffect(() => {
        let timeoutRef = null;
        return () => {
            if (timeoutRef) {
                clearTimeout(timeoutRef);
            }
        };
    }, [netInfo.isConnected]);

    const contextValue = useMemo(() => ({
        isConnected: netInfo.isConnected,

    }), [netInfo.isConnected,]);

    return (
        <InternetContext.Provider value={contextValue}>
            {children}
        </InternetContext.Provider>
    );
};

export { InternetContext, InternetProvider };