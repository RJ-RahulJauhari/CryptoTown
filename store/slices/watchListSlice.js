// store/slices/watchListSlice.js
import { createSlice } from '@reduxjs/toolkit';

const watchListSlice = createSlice({
    name: 'watchList',
    initialState: [],
    reducers: {
        addCoin: (state, action) => {
            const existingCoin = state.find(coin => coin.id === action.payload.id);
            if (!existingCoin) {
                state.push(action.payload);
            }
        },
        removeCoin: (state, action) => {
            return state.filter(coin => coin.id !== action.payload);
        },
    },
});

export const { addCoin, removeCoin } = watchListSlice.actions;
export default watchListSlice.reducer;