import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loginStatus: !!localStorage.getItem('authToken'), // Check for auth token in localStorage
    isAdmin: localStorage.getItem('isAdmin') === 'true' // persisted admin flag
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setloginStatus: (state,action) => {
            state.loginStatus = (action.payload)
        },
        setIsAdmin: (state, action) => {
            state.isAdmin = !!action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setloginStatus, setIsAdmin } = loginSlice.actions

export default loginSlice.reducer