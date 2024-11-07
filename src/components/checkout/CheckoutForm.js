import { useState, useContext, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import cx from 'classnames';

import YourOrder from "./YourOrder";
import PaymentModes from "./PaymentModes";
import { AppContext } from "../context/AppContext";
import validateAndSanitizeCheckoutForm from '../../validator/checkout';
import { getFormattedCart, createCheckoutData } from "../../functions";
import OrderSuccess from "./OrderSuccess";
import GET_CART from "../../queries/get-cart";
import CHECKOUT_MUTATION from "../../mutations/checkout";
import Address from "./Address";
import { handleBillingDifferentThanShipping, handleCreateAccount, handleStripeCheckout, setStatesForCountry } from "../../utils/checkout";
import CheckboxField from "./form-elements/CheckboxField";
import CLEAR_CART_MUTATION from "../../mutations/clear-cart";

const defaultCustomerInfo = {
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    phone: '',
    errors: null
};

const CheckoutForm = () => {
    const [cart, setCart] = useContext(AppContext);
    const [input, setInput] = useState({
        billing: { ...defaultCustomerInfo },
        shipping: { ...defaultCustomerInfo },
        createAccount: false,
        orderNotes: '',
        billingDifferentThanShipping: false,
        paymentMethod: 'cod',
    });
    const [orderData, setOrderData] = useState(null);
    const [requestError, setRequestError] = useState(null);
    const [theShippingStates, setTheShippingStates] = useState([]);
    const [theBillingStates, setTheBillingStates] = useState([]);
    const [isStripeOrderProcessing, setIsStripeOrderProcessing] = useState(false);

    const { data } = useQuery(GET_CART, {
        notifyOnNetworkStatusChange: true,
        onCompleted: () => {
            const updatedCart = getFormattedCart(data);
            if (updatedCart) {
                localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart));
                setCart(updatedCart);
            }
        },
    });

    const [checkout, { data: checkoutResponse, loading: checkoutLoading }] = useMutation(CHECKOUT_MUTATION, {
        variables: { input: orderData },
        onError: (error) => setRequestError(error?.graphQLErrors?.[0]?.message || 'An error occurred'),
    });

    const [clearCartMutation] = useMutation(CLEAR_CART_MUTATION);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const billingValid = input.billingDifferentThanShipping
            ? validateAndSanitizeCheckoutForm(input.billing, theBillingStates.length)
            : { errors: null, isValid: true };
        const shippingValid = validateAndSanitizeCheckoutForm(input.shipping, theShippingStates.length);

        if (!shippingValid.isValid || !billingValid.isValid) {
            setInput((prevInput) => ({
                ...prevInput,
                billing: { ...prevInput.billing, errors: billingValid.errors },
                shipping: { ...prevInput.shipping, errors: shippingValid.errors },
            }));
            return;
        }

        if (input.paymentMethod === 'stripe-mode') {
            await handleStripeCheckout(input, cart?.products, setRequestError, clearCartMutation, setIsStripeOrderProcessing, setOrderData);
            return;
        }

        setOrderData(createCheckoutData(input));
        setRequestError(null);
    };

    const handleOnChange = async (event, isShipping = false, isBillingOrShipping = false) => {
        const { target } = event;
        if (target.name === 'createAccount') {
            handleCreateAccount(input, setInput, target);
        } else if (target.name === 'billingDifferentThanShipping') {
            handleBillingDifferentThanShipping(input, setInput, target);
        } else if (isBillingOrShipping) {
            if (isShipping) {
                await handleShippingChange(target);
            } else {
                await handleBillingChange(target);
            }
        } else {
            setInput((prevInput) => ({ ...prevInput, [target.name]: target.value }));
        }
    };

    const handleShippingChange = async (target) => {
        setInput((prevInput) => ({
            ...prevInput,
            shipping: { ...prevInput.shipping, [target.name]: target.value },
        }));
        await setStatesForCountry(target, setTheShippingStates);
    };

    const handleBillingChange = async (target) => {
        setInput((prevInput) => ({
            ...prevInput,
            billing: { ...prevInput.billing, [target.name]: target.value },
        }));
        await setStatesForCountry(target, setTheBillingStates);
    };

    useEffect(() => {
        if (orderData) {
            const executeCheckout = async () => {
                await checkout();
            };
            executeCheckout();
        }
    }, [orderData, checkout]);

    const isOrderProcessing = checkoutLoading || isStripeOrderProcessing;

    useEffect(() => {
        const storedCart = typeof window !== 'undefined' && localStorage.getItem('woo-next-cart');
        if (storedCart && !cart) {
            setCart(JSON.parse(storedCart));
        }
    }, [cart, setCart]);

    useEffect(() => {
        if (checkoutResponse && checkoutResponse.order) {
            setCart(null);
            localStorage.removeItem('woo-next-cart');
        }
    }, [checkoutResponse, setCart]);

    return (
        <>
            {cart ? (
                <form onSubmit={handleFormSubmit} className="woo-next-checkout-form">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                        <div>
                            <div className="billing-details">
                                <h2 className="text-xl font-medium mb-4">Деталі доставки</h2>
                                <Address
                                    states={theShippingStates}
                                    input={input.shipping}
                                    handleOnChange={(event) => handleOnChange(event, true, true)}
                                />
                            </div>
                            {input.billingDifferentThanShipping && (
                                <div className="billing-details">
                                    <h2 className="text-xl font-medium mb-4">Платіжна інформація</h2>
                                    <Address
                                        states={theBillingStates}
                                        input={input.billing}
                                        handleOnChange={(event) => handleOnChange(event, false, true)}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="your-orders">
                            <h2 className="text-xl font-medium mb-4">Ваше замовлення</h2>
                            <YourOrder cart={cart} />
                            <PaymentModes input={input} handleOnChange={handleOnChange} />
                            <div className="woo-next-place-order-btn-wrap mt-5">
                                <button
                                    disabled={isOrderProcessing}
                                    className={cx('bg-blue text-white px-5 py-3 rounded-sm w-auto xl:w-full', { 'opacity-50': isOrderProcessing })}
                                    type="submit"
                                >
                                    Зробити замовлення
                                </button>
                            </div>
                            {isOrderProcessing && <p>Обробка замовлення...</p>}
                            {requestError && <p>Error : {requestError} :( Будь ласка спробуйте ще раз</p>}
                        </div>
                    </div>
                </form>
            ) : null}
            <OrderSuccess response={checkoutResponse} />
        </>
    );
};

export default CheckoutForm;
