import "swiper/css";
import "./index.css";
import "regenerator-runtime/runtime";
import "react-responsive-pagination/themes/classic.css";

import App from "./app.tsx";
import client from "./lib/client.ts";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.ts";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ApolloProvider } from "@apollo/client";
import { PersistGate } from "redux-persist/integration/react";

const google_client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")!).render(
    <GoogleOAuthProvider clientId={google_client_id}>
        <ApolloProvider client={client}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        </ApolloProvider>
    </GoogleOAuthProvider>
);
