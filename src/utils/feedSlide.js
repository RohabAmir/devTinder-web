import { createSlice } from '@reduxjs/toolkit'

export const feedSlice = createSlice({
    name: 'feed',
    initialState: null,
    reducers: {
        addFeed: (state, action) => {
            return action.payload;
        },
        removeFeed: () => {
            return null;
        },
    },
})

export const { addFeed, removeFeed } = feedSlice.actions

export default feedSlice.reducer;   