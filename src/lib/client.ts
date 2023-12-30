import { split, HttpLink, ApolloLink, concat } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const httpLink = new HttpLink({ uri: `http://localhost:4000/graphql` });
const authToken = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            authorization: localStorage.getItem("ebay-retail-token") || null,
        },
    }));
    return forward(operation);
});

const wsLink = new GraphQLWsLink(createClient({ url: "ws://localhost:4000/subscription" }));

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === "OperationDefinition" && definition.operation === "subscription";
    },
    wsLink,
    concat(authToken, httpLink)
);

export default new ApolloClient({ link: splitLink, cache: new InMemoryCache() });
