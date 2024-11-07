import { Fragment } from 'react';
import CheckoutCartItem from "./CheckoutCartItem";

const YourOrder = ( { cart } ) => {

	return (
		<Fragment>
			{ cart ? (
				<Fragment>
					{/*Product Listing*/}
					<table className="checkout-cart table table-hover w-full mb-10">
						<thead>
						<tr className="woo-next-cart-head-container text-left">
							<th className="woo-next-cart-heading-el" scope="col"/>
							<th className="woo-next-cart-heading-el" scope="col">Продукти</th>
							<th className="woo-next-cart-heading-el" scope="col">Всього</th>
						</tr>
						</thead>
						<tbody>
						{ cart && cart.products && cart.products.length > 0 ? (
        cart.products.map(item => (
            <CheckoutCartItem key={item.productId} item={item} />
        ))
    ) : (
        <tr>
            <td colSpan="5" className="text-center">Корзина пуста</td>
        </tr>
    )}
						{/*Total*/}
						<tr className="bg-gray-200">
							<td className=""/>
							<td className="woo-next-checkout-total font-normal text-xl">Проміжний підсумок</td>
							<td className="woo-next-checkout-total font-bold text-xl">{ cart.totalProductsPrice }</td>
						</tr>
						{/* <tr className="">
							<td className=""/>
							<td className="woo-next-checkout-total">Total</td>
							<td className="woo-next-checkout-total">{ cart.totalProductsPrice }</td>
						</tr> */}
						</tbody>
					</table>
				</Fragment>
			) : '' }
		</Fragment>
	)
};

export default YourOrder;
