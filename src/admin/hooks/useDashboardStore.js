import { useDispatch, useSelector } from "react-redux"

import { loadingDashboardStats } from "../slices/dashboardSlice";
import lambdaTecApi from "../../core/api/lambdaTecApi";

const useDashboardStore = () => {
    const { stats } = useSelector(state => state.dashboard);
    const dispatch = useDispatch();

    const startLoadingStats = async () => {
        try {
            const { data } = await lambdaTecApi.get('/dashboard');
            dispatch(loadingDashboardStats(data.data));
        } catch(error) {
            // dispatch(logout(error?.response?.data?.message));
        }
    }
    
    return {
        stats,
        startLoadingStats,
    }
}

export default useDashboardStore;
