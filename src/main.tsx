import "swiper/css";
import "./index.css";

import axios from "axios";
import App from "./app.tsx";
import store from "./redux/store.ts";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

axios.defaults.baseURL = "https://ebay-retail-server.vercel.app";
axios.defaults.withCredentials = true;
const client = new ApolloClient({
    uri: "https://ebay-retail-server.vercel.app",
    cache: new InMemoryCache(),
    headers: {
        credentials: "include",
        mode: "cors",
    },
});

const google_client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")!).render(
    <GoogleOAuthProvider clientId={google_client_id}>
        <ApolloProvider client={client}>
            <Provider store={store}>
                <App />
            </Provider>
        </ApolloProvider>
    </GoogleOAuthProvider>
);
