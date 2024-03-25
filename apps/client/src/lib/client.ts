import { setContext } from "@apollo/client/link/context";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const httpLink = createHttpLink({ uri: `http://localhost:4000/graphql` });

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: localStorage.getItem("ebay-retail-token") || null,
        },
    };
});

export default new ApolloClient({ link: authLink.concat(httpLink), cache: new InMemoryCache() });
