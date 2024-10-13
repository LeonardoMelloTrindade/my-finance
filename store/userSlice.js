import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  password: '',
  expenses: 0,
  downPayment: 0,
  overallBalance: 0,
  listExpenses: [],
  listDownPayment: []
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setListDownPayment: (state, action) => {
      state.listDownPayment = action.payload;
    },
    setListExpenses: (state, action) => {
      state.listExpenses = action.payload;
    },
    setExpenses: (state, action) => {
      state.expenses = action.payload;
      state.overallBalance = state.downPayment - state.expenses;
    },
    setDownPayment: (state, action) => {
      state.downPayment = action.payload;
      state.overallBalance = state.downPayment - state.expenses;
    },
    
  },
});

export const { setExpenses, setDownPayment, setName, setPassword, setEmail, setListDownPayment, setListExpenses } = userSlice.actions;

export default userSlice.reducer;