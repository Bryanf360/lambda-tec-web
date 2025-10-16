import { createSlice } from '@reduxjs/toolkit'

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        isLoading: true,
        stats: {}
    },
    reducers: {
        loadingDashboardStats: (state, action) => {
            state.stats = action.payload;
        }
    }
})

// Action creators are generated for each case reducer function
export const { loadingDashboardStats, } = dashboardSlice.actions

export default dashboardSlice.reducer