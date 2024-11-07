import { useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { v4 } from "uuid";
import { AppContext } from "../context/AppContext";
import GET_CART from "../../queries/get-cart";
import ADD_TO_CART from "../../mutations/add-to-cart";
import { getFormattedCart } from "../../functions";

const AddToCart = ({ product }) => {
    const productQryInput = {
        clientMutationId: v4(),
        productId: product.productId,
    };

    const [cart, setCart] = useContext(AppContext);
    const [requestError, setRequestError] = useState(null);
    const [addToCartLoading, setAddToCartLoading] = useState(false); // State for loading

    // Get Cart Data.
    const { data, refetch } = useQuery(GET_CART, {
        notifyOnNetworkStatusChange: true,
        onCompleted: () => {
            const updatedCart = getFormattedCart(data);
            localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));
            setCart(updatedCart);
        },
    });

    // Add to Cart Mutation.
    const [addToCart] = useMutation(ADD_TO_CART, {
        variables: { input: productQryInput },
        onCompleted: async () => {
            const res = await refetch();
            const updatedCart = getFormattedCart(res.data);
            setCart(updatedCart);
            localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));
            setAddToCartLoading(false); // Reset loading state
        },
        onError: (error) => {
            setRequestError(error?.graphQLErrors?.[0]?.message || "Error adding to cart");
            setAddToCartLoading(false); // Reset loading state
        },
    });

    const handleAddToCartClick = async () => {
        setRequestError(null);
        setAddToCartLoading(true); // Set loading state
        await addToCart();
    };

    return (
        <div>
            {"ExternalProduct" === product.__typename ? (
                <a href={product?.externalUrl ?? "/"} target="_blank">
                    Buy now
                </a>
            ) : (
                <button
                    disabled={addToCartLoading}
                    onClick={handleAddToCartClick}
                    className={`flex items-center justify-center h-full border border-black rounded-full ${addToCartLoading ? "opacity-50 cursor-not-allowed" : "w-12 hover:transition delay-150 duration-300 ease-in-out text-text_grey"}`}
                >
                    {addToCartLoading ? (
                        "Loading..."
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1024 1024"
                            style={{ width: "2em", height: "2em", verticalAlign: "middle" }}
                            fill="currentColor"
                        >
                            <path d="M409.5 758.8c28.3 0 51.2 22.9 51.1 51.2 0 28.3-22.9 51.2-51.1 51.2-28.3 0-51.2-22.9-51.2-51.2 0-28.3 22.9-51.2 51.2-51.2zm327.7 0c28.3 0 51.2 22.9 51.2 51.2 0 28.3-22.9 51.2-51.2 51.2-28.3 0-51.2-22.9-51.1-51.2 0-28.3 22.9-51.2 51.1-51.2zm-541-563.2c18.1 0 36.7 3.5 56.9 15.6 19.3 11.6 34.7 29.3 44.4 52.8l3.4 9 1.4 5.6 18.5 113.1L352.2 591c3.4 20.9 20.4 36.7 41 39l5.3.3h347.2c21.3 0 39.6-14.3 45.3-35.1l1.2-5.4 48.6-260.5c3.9-20.8 23.9-34.6 44.8-30.7 19.2 3.6 32.4 21 31.3 40l-.6 4.8-48.5 259.5c-9.2 57.5-57.1 100.4-114.5 103.9l-7.6.3H398.5c-60.6 0-112.3-43.9-122.1-104L240 372.8l-12.8-77.6-1-2.8c-2.6-6-5.9-10.3-9.8-13.3l-3-2.1c-4.4-2.6-8.8-3.9-13-4.4l-4.2-.2h-85.3c-21.2 0-38.4-17.2-38.4-38.4 0-19.6 14.6-35.7 33.6-38.1l4.8-.3h85.3zm382.2-1.2c19.6 0 35.7 14.6 38.1 33.6l.3 4.8v72.5h72.6c21.2 0 38.4 17.2 38.4 38.4 0 19.6-14.6 35.7-33.6 38.1l-4.8.3h-72.6v72.5c0 21.2-17.2 38.4-38.4 38.4-19.6 0-35.7-14.6-38.1-33.5l-.3-4.9v-72.5h-72.5c-21.2 0-38.4-17.2-38.4-38.4 0-19.6 14.6-35.7 33.6-38.1l4.8-.3H540v-72.5c0-21.2 17.2-38.4 38.4-38.4z" fill="#000" />
                        </svg>
                    )}
                </button>
            )}
            {requestError && <p>{requestError}</p>}
        </div>
    );
};

export default AddToCart;
