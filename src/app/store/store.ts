import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { testSlice } from '../../features/lab/testSlice';
import { authSlice } from '../../features/auth/authSlice';
import { modalSlice } from '../common/modals/modalSlice';
import { menuItemSlice } from '../../features/menuItemSlice';
import { categorySlice } from '../../features/categories/categorySlice';
import { foodItemSlice } from '../../features/foodItemSlice';

export const store = configureStore({
    reducer: {
        test: testSlice.reducer,
        menuItems: menuItemSlice.reducer,
        foodItems: foodItemSlice.reducer,
        categories: categorySlice.reducer,
        modals: modalSlice.reducer,
        auth: authSlice.reducer,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector