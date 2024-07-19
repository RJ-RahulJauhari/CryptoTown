// store/historicalDataSlice.js
import { createSlice } from '@reduxjs/toolkit';

const historicalDataSlice = createSlice({
    name: 'historicalData',
    initialState: [],
    reducers: {
        setHistoricalData: (state, action) => {
            return action.payload;
        },
    },
});

export const { setHistoricalData } = historicalDataSlice.actions;
export default historicalDataSlice.reducer;