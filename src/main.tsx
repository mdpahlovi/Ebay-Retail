import "swiper/css";
import "./index.css";

import axios from "axios";
import "regenerator-runtime/runtime";
import App from "./app.tsx";
import client from "./lib/client.ts";
import store from "./redux/store.ts";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ApolloProvider } from "@apollo/client";

const apiKey = import.meta.env.VITE_NEWS_API_KEY;
const google_client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;
export const newsapi = axios.create({ baseURL: "https://newsapi.org/v2", params: { apiKey } });

ReactDOM.createRoot(document.getElementById("root")!).render(
    <GoogleOAuthProvider clientId={google_client_id}>
        <ApolloProvider client={client}>
            <Provider store={store}>
                <App />
            </Provider>
        </ApolloProvider>
    </GoogleOAuthProvider>
);
