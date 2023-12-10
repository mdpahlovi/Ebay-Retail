import "./index.css";

import axios from "axios";
import ReactDOM from "react-dom/client";
import store from "./redux/store.ts";
import { Provider } from "react-redux";
import App from "./app.tsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

axios.defaults.baseURL = "https://ebay-retail.onrender.com";

const client = new ApolloClient({
    uri: "https://ebay-retail-nbcn.onrender.com/",
    cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <App />
        </Provider>
    </ApolloProvider>
);
