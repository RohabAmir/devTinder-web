import { createSlice } from '@reduxjs/toolkit'

export const feedSlice = createSlice({
    name: 'feed',
    initialState: null,
    reducers: {
        addFeed: (state, action) => {
            return action.payload;
        },
        removeUserFeed: (state, action) => {
            return state.filter(user => user._id !== action.payload);
        },
    },
})

export const { addFeed, removeUserFeed } = feedSlice.actions

export default feedSlice.reducer;   