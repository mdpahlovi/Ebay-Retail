import { newApi } from "@/redux/apis/newsApi";
import storage from "redux-persist/lib/storage";
import userReducer from "./features/users/userSlice";
import themeReducer from "./features/theme/themeSlice";
import bookingReducer from "./features/booking/bookingSlice";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const persistConfig = { key: "ebay-retail-states", storage, whitelist: ["theme"] };
const rootReducer = combineReducers({
    theme: themeReducer,
    user: userReducer,
    booking: bookingReducer,
    [newApi.reducerPath]: newApi.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(newApi.middleware),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
