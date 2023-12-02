import "./index.css";

import ReactDOM from "react-dom/client";
import store from "./redux/store.ts";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "./router/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
    </Provider>
);
