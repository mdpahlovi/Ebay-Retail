import "swiper/css";
import "./index.css";

import App from "./app.tsx";
import Cookies from "js-cookie";
import { StrictMode } from "react";
import store from "./redux/store.ts";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache(),
    headers: { authorization: Cookies.get("ebay-retail-auth")! },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ApolloProvider client={client}>
            <Provider store={store}>
                <App />
            </Provider>
        </ApolloProvider>
    </StrictMode>
);
