import { configureStore } from '@reduxjs/toolkit';
import recentlyVisitedReducer from './slices/recentlyVisitedSlice';
import historicalDataReducer from './slices/historicalDataSlice';
import watchListReducer from './slices/watchListSlice';

export const store = configureStore({
    reducer: {
        recentlyVisited: recentlyVisitedReducer,
        historicalData: historicalDataReducer,
        watchList: watchListReducer,
    },
});