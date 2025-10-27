import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "../slices/authSlice";
import contentSlice from "../slices/contentSlice";
import saveInfoSlice from "../slices/saveInfoSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  login: authSlice,
  content: contentSlice,
  saveInfo: saveInfoSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;



//разбить на три страницы
//видео галерея метод мап вынести
//убрать массив из 28 строки проверку !