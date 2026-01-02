import { createSlice } from '@reduxjs/toolkit'

export const requestSlice = createSlice({
    name: 'request',
    initialState: null,
    reducers: {
        addRequest: (state, action) => {
            return action.payload;
        },
        removeRequest: () => {
            return null;
        },
        removeRequestById: (state, action) => {
            if (!state) return null;
            return state.filter(request => request._id !== action.payload);
        }
    }
});

export const { addRequest, removeRequest, removeRequestById } = requestSlice.actions;
export default requestSlice.reducer;