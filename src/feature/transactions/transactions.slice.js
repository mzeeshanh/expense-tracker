import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	balance:0,
	searchQuery:"",
	transactions:[]
};

export const transactionSlice = createSlice({
	name: "transactions",
	initialState: initialState,
	reducers:{
		incrementByValue: (state, action) => {
			state.balance = state.balance + action.payload;
		},
		decrementByValue: (state, action) => {
			state.balance = state.balance - action.payload;
		},
		transactionHistory: (state, action) => {
			state.transactions.push(action.payload);
		},
		searchTransaction: (state, action) => {
			state.searchQuery =  action.payload;
		}
	}
})

export const { incrementByValue, decrementByValue, transactionHistory, searchTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;