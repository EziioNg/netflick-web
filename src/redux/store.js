// Redux: State management tool
import { combineReducers } from 'redux'

import { configureStore } from '@reduxjs/toolkit'

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { activeUserReducer } from './user/userSlice'

// Cấu hình persist
const rootPersistConfig = {
    key: 'root', // key tự chỉ định, mặc định là root
    storage: storage, // Biến storage ở trên, lưu vào localstorage
    whitelist: ['user'] // định nghĩa các slice dữ liệu được duy trì sau mỗi lần f5
}

// Combine các reducer trong dự án ở đây
const reducers = combineReducers({
    user: activeUserReducer
})

// Thực hiện persist Reducer
const persistedReducers = persistReducer(rootPersistConfig, reducers)

export const store = configureStore({
    reducer: persistedReducers,
    middleware: (getDefaultMiddleware) => // fix warning persist
        getDefaultMiddleware({
            serializableCheck: false // Vô hiệu hóa kiểm tra serializable
        })
})

