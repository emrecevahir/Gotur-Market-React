import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        username: "",
        email: "",
        surname: "",
        user: false
    },
    reducers: {
        handleLogin: (state, action) => {
            state.email = action.payload.email
            state.username = action.payload.username
            state.surname = action.payload.surname
            state.user = true
            console.log(action.payload)

        },
        handleLogout: (state) => {
            state.email = ""
            state.username = ""
            state.user = false
            localStorage.removeItem("access_token")
        }
    }
       
})
export const { handleLogin, handleLogout } = userSlice.actions
export default userSlice.reducer