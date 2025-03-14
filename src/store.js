import { configureStore } from "@reduxjs/toolkit";
import transactionSlice from './feature/transactions/transactions.slice'

export const store = configureStore({
    reducer: {
        transactions: transactionSlice
    }
})