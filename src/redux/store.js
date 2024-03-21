import { configureStore } from '@reduxjs/toolkit';
import { filterSliceReducer } from './filterSliceReducer';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { contactsReducer } from './contactsSliceReducer';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

// const customizedMiddleware = getDefaultMiddleware({
//   serializableCheck: false,
// });

const persistConfig = {
  key: 'contacts',
  storage,
  whitelist: ['contacts'],
  version: 1,
};

const reducers = combineReducers({
  filter: filterSliceReducer.reducer,
  contacts: contactsReducer.reducer,
});

export const persistContactsReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistContactsReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
