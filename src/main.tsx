import "swiper/css";
import "./index.css";

import axios from "axios";
import App from "./app.tsx";
import store from "./redux/store.ts";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// Initial Setup
const baseURL = import.meta.env.VITE_SERVER_URL;
const google_client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;
axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;
const client = new ApolloClient({ uri: baseURL, cache: new InMemoryCache(), credentials: "include" });

ReactDOM.createRoot(document.getElementById("root")!).render(
    <GoogleOAuthProvider clientId={google_client_id}>
        <ApolloProvider client={client}>
            <Provider store={store}>
                <App />
            </Provider>
        </ApolloProvider>
    </GoogleOAuthProvider>
);
