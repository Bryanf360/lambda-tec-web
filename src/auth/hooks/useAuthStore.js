import { useDispatch, useSelector } from "react-redux";

import lambdaTecApi from "../../core/api/lambdaTecApi";
import { checking, clearErrorMessage, login, logout } from "../../admin/slices/authSlice";
import { toast } from "react-toastify";

export const useAuthStore = () => {
    const dispatch = useDispatch();
    const { status, user, errorMessage, isLoading } = useSelector(state => state.auth);

    const startLogin = async (email, password) => {
        // dispatch(setIsLoading(true));
        // dispatch(checking());
        try {
            const { data } = await lambdaTecApi.post('/auth/login', {
                email,
                password
            });
            localStorage.setItem('token', data.data.token);
            dispatch(login({ ...data.data.user }));
        } catch (error) {
            dispatch(logout(error?.response?.data?.message));
            toast.error(error?.response?.data?.message);
        } finally {
            // dispatch(setIsLoading(false));
        }
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(logout())
        try {
            const { data } = await lambdaTecApi.get('/auth/renew');
            localStorage.setItem('token', data.data.token);
            dispatch(login({ ...data.data.user }));
        } catch(error) {
            dispatch(logout(error?.response?.data?.message));
            localStorage.clear();
            dispatch(logout());
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(logout())
    }

    return {
        // Properties
        isLoading,
        status, 
        user, 
        errorMessage,

        // Methods
        startLogin,
        checkAuthToken,
        startLogout,
    }
}
