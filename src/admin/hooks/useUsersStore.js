import { useDispatch, useSelector } from 'react-redux';

import lambdaTecApi from '../../core/api/lambdaTecApi';
import { addUser, setIsLoading, setUsers, updateUser } from '../slices/usersSlice';

const useUsersStore = () => {
    const dispatch = useDispatch();
    const { users, isLoading } = useSelector((state) => state.users);

    const getUsers = async () => {
        dispatch(setIsLoading(true));
        try {
            const { data } = await lambdaTecApi.get('/users');
            dispatch(setUsers(data.data));
        } catch (err) {
            console.log('err: ', err);
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    const saveUser = async (user) => {
        dispatch(setIsLoading(true));
        try {
            if (user.id) {
                const { data } = await lambdaTecApi.put('/users', user);
                dispatch(updateUser(data.data));
                return data.message;
            }
            const { data } = await lambdaTecApi.post('/users', user);
            dispatch(addUser(data.data));
            return data.message;
        } catch (err) {
            throw err?.response?.data?.message;
        } finally {
            dispatch(setIsLoading(false));
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
        users,
        isLoading,
        getUsers,
        saveUser,
        removeUser,
    };
};

export default useUsersStore;
