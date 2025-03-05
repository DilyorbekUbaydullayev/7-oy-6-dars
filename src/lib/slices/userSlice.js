import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser(state, action) {
      state.users.push(action.payload);
    },
    clearUser(state) {
      state.users = [];
    },
    setUser(state, action) {
      state.users = action.payload;
    },
    setLogin(state, action) {
      state.users = state.users.map((user) =>
        user.id === action.payload
          ? { ...user, isLogin:true }
          : user
      );
    },
    setLogout(state, action) {
        state.users = state.users.map((user) =>
            user.id === action.payload
            ? { ...user, isLogin:false }
            : user
        );
    }
  },
});

export const { addUser, clearUser, setUser,setLogin,setLogout } = usersSlice.actions;
export default usersSlice.reducer;
