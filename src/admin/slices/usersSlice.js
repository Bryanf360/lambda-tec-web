import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
    isLoading: false,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
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
