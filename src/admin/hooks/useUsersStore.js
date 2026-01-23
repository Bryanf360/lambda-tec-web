import { useDispatch, useSelector } from 'react-redux';

import lambdaTecApi from '../../core/api/lambdaTecApi';
import {
    addUser,
    setIsEditing,
    setIsLoading,
    setIsSaving,
    setUsers,
    updateUser,
} from '../slices/usersSlice';

const useUsersStore = () => {
    const dispatch = useDispatch();
    const { isLoading, isSaving, isEditing, users, meta } = useSelector((state) => state.users);

    const getUsers = async ({ page = 1, limit = 10 }) => {
        dispatch(setIsLoading(true));
        try {
            const { data } = await lambdaTecApi.get('/users', {
                params: { page, limit },
            });
            dispatch(setUsers({ data: data.data, meta: data.meta }));
        } catch (err) {
            console.log('err: ', err);
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    const saveUser = async (user) => {
        try {
            if (user.user_id) {
                dispatch(setIsEditing(true));
                const { data } = await lambdaTecApi.put(`/users/${user.user_id}`, user);
                dispatch(updateUser(data.data));
                return data.message;
            }
            dispatch(setIsSaving(true));
            const { data } = await lambdaTecApi.post('/users', user);
            // dispatch(addUser(data.data));
            return data.message;
        } catch (err) {
            console.log('err: ', err);
            throw err?.response?.data?.message;
        } finally {
            dispatch(setIsSaving(false));
            dispatch(setIsEditing(false));
        }
    };

    const removeUser = async (userId) => {
        // dispatch(setIsLoading(true));
        // try {
        //     const { data } = await lambdaTecApi.delete(`/companies/${userId}`);
        //     dispatch(deleteuserById(userId));
        //     return data.message;
        // } catch (err) {
        //     throw err?.response?.data?.message;
        // } finally {
        //     dispatch(setIsLoading(false));
        // }
    };

    return {
        isLoading,
        isSaving,
        isEditing,
        users,
        meta,
        getUsers,
        saveUser,
        removeUser,
    };
};

export default useUsersStore;
