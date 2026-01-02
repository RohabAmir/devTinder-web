import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import feedReducer from './feedSlide'
import connectionReducer from './connectionSlice'
import requestReducer from './requestSlice'

export const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connection: connectionReducer,
    request: requestReducer
  },
  
});

export default appStore;