import React, { useState, useEffect } from 'react';

// Define the context with a more consistent default (e.g., an empty array instead of null).
export const AppContext = React.createContext([[], () => {}]);

export const AppProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Load cart from localStorage on the client side only.
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const cartData = localStorage.getItem('woo-next-cart');
            setCart(cartData ? JSON.parse(cartData) : []);
        }
    }, []);

    // Update localStorage whenever `cart` changes.
    useEffect(() => {
        if (typeof window !== 'undefined' && cart) {
            localStorage.setItem('woo-next-cart', JSON.stringify(cart));
        }
    }, [cart]);

    return (
        <AppContext.Provider value={[cart, setCart]}>
            {children}
        </AppContext.Provider>
    );
};
