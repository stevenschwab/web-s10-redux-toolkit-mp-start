import { configureStore } from "@reduxjs/toolkit";
import reducer from './quotesSlice'

export const store = configureStore({
    reducer: {
        quotes: reducer
    }
})