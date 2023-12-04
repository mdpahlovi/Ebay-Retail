import "./index.css";

import axios from "axios";
import ReactDOM from "react-dom/client";
import store from "./redux/store.ts";
import { Provider } from "react-redux";
import App from "./app.tsx";

axios.defaults.baseURL = "https://ebay-retail.onrender.com";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <App />
    </Provider>
);
