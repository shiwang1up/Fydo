// context/LoadingProvider.js
import React, { createContext, useMemo, useState } from 'react';

const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);


    const contextValue = useMemo(() => ({
        isLoading,
        setIsLoading,
    }), [isLoading]);

    return (
        <LoadingContext.Provider value={contextValue}>
            {children}
        </LoadingContext.Provider>
    );
};

export { LoadingProvider, LoadingContext };
