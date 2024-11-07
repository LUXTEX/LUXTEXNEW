import fetch from 'node-fetch';
import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from "@apollo/client";

/**
 * Middleware operation
 * If we have a session token in localStorage, add it to the GraphQL request as a Session header.
 */
export const middleware = new ApolloLink((operation, forward) => {
	/**
	 * If session data exists in local storage, set value as session header.
	 */
	const session = (typeof window !== 'undefined') ? localStorage.getItem("woo-session") : null;

	if (session) {
		operation.setContext(({ headers = {} }) => ({
			headers: {
				...headers, // Ensure we keep existing headers
				"woocommerce-session": `Session ${session}`
			}
		}));
	}

	return forward(operation);
});

/**
 * Afterware operation.
 *
 * This catches the incoming session token and stores it in localStorage, for future GraphQL requests.
 */
export const afterware = new ApolloLink((operation, forward) => {
	return forward(operation).map(response => {
		// Check if we are in a browser environment
		if (typeof window === 'undefined') {
			return response; // Don't proceed if running on the server
		}

		/**
		 * Check for session header and update session in local storage accordingly.
		 */
		const context = operation.getContext();
		const { response: { headers } } = context;
		const session = headers.get("woocommerce-session");

		if (session) {
			// Remove session data if session destroyed.
			if ("false" === session) {
				localStorage.removeItem("woo-session");
			} else if (localStorage.getItem("woo-session") !== session) {
				// Update session new data if changed.
				localStorage.setItem("woo-session", session);
			}
		}

		return response;
	});
});

// Apollo GraphQL client.
const client = new ApolloClient({
	link: middleware.concat(afterware.concat(createHttpLink({
		uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
		fetch: fetch,
		credentials: 'include',
	}))),
	cache: new InMemoryCache(),
});

export default client;
