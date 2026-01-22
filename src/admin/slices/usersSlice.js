import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    meta: {
        page: 1,
        limit: 5,
        total: 0,
    },
    users: [],
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setUsers: (state, { payload }) => {
            state.users = payload.data;
            state.meta = payload.meta;
        },
        addUser: (state, action) => {
            state.users.unshift(action.payload);
        },
        updateUser: (state, action) => {
            const index = state.users.findIndex((user) => user.id === action.payload.id);
            if (index !== -1) state.users[index] = action.payload;
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter((User) => User.id !== action.payload);
        },
    },
});

export const { setIsLoading, setUsers, addUser, updateUser, deleteUser } = usersSlice.actions;

export default usersSlice.reducer;
