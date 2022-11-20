import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducer";
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
// import thunk from 'redux-thunk'

const reducers = combineReducers({
    cart: cartReducer
});

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['persist/PERSIST'],
            },
        }),
})