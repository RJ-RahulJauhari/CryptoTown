// store/slices/recentlyVisitedSlice.js
import { createSlice } from '@reduxjs/toolkit';

const recentlyVisitedSlice = createSlice({
    name: 'recentlyVisited',
    initialState: {
        visitedCoins: [], // Array of visited coins
    },
    reducers: {
        addCoinToRecentlyVisited: (state, action) => {
            const newCoin = action.payload;
            const existingIndex = state.visitedCoins.findIndex(coin => coin.id === newCoin.id);

            if (existingIndex !== -1) {
                // Move the coin to the top if it already exists
                state.visitedCoins.splice(existingIndex, 1);
            }
            state.visitedCoins.unshift(newCoin);

            // Optionally limit the list to a certain number of items
            if (state.visitedCoins.length > 10) {
                state.visitedCoins.pop();
            }
        },
    },
});

export const { addCoinToRecentlyVisited } = recentlyVisitedSlice.actions;
export default recentlyVisitedSlice.reducer;