import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/theme/themeSlice";
import userReducer from "./features/users/userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = { key: "ebay-retail-states", storage, blacklist: ["user"] };
const rootReducer = combineReducers({ theme: themeReducer, user: userReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
