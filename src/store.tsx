import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './slices/channelsSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    channels: channelsReducer,
    auth: authReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;