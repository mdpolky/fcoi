import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import leaguesReducer from "./leaguesSlice";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const rootReducer = combineReducers({
  leagues: leaguesReducer,
  user: userReducer,
});

const persistConfig = {
  storage: AsyncStorage,
  key: "root",
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
