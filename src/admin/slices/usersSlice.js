import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    isSaving: false,
    isEditing: false,
    isDeleting: false,
    isChangingPassword: false,
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
            state.isEditing = action.payload;
        },
        setIsDeleting: (state, action) => {
            state.isDeleting = action.payload;
        },
        setIsChangingPassword: (state, action) => {
            state.isChangingPassword = action.payload;
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
        deleteUserById: (state, action) => {
            state.users = state.users.filter((user) => user.user_id !== action.payload);
        },
    },
});

export const {
    setIsLoading,
    setIsSaving,
    setIsEditing,
    setIsDeleting,
    setIsChangingPassword,
    setUsers,
    addUser,
    updateUser,
    deleteUserById,
} = usersSlice.actions;

export default usersSlice.reducer;
