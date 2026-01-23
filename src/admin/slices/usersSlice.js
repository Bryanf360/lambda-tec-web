import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    isSaving: false,
    isEditing: false,
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
        setIsSaving: (state, action) => {
            state.isSaving = action.payload;
        },
        setIsEditing: (state, action) => {
            state.isSaving = action.payload;
        },
        setUsers: (state, { payload }) => {
            state.users = payload.data;
            state.meta = payload.meta;
        },
        addUser: (state, action) => {
            state.users.unshift(action.payload);
        },
        updateUser: (state, action) => {
            const index = state.users.findIndex((user) => user.user_id === action.payload.user_id);
            if (index !== -1) state.users[index] = action.payload;
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter((User) => User.id !== action.payload);
        },
    },
});

export const {
    setIsLoading,
    setIsSaving,
    setIsEditing,
    setUsers,
    addUser,
    updateUser,
    deleteUser,
} = usersSlice.actions;

export default usersSlice.reducer;
