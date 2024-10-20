import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  user: null,
  tokens: JSON.parse(localStorage.getItem("tokens")) || null,
};

// ==============================|| SLICE - AUTH ||============================== //

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const { user, tokens } = action.payload;
      state.user = user;
      state.tokens = tokens;
      // Lưu thông tin vào localStorage
      localStorage.setItem("tokens", JSON.stringify(tokens));
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout(state) {
      state.user = null;
      state.tokens = null;
      // Xóa thông tin khỏi localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("tokens");
    },
    restoreAuth(state, action) {
      const { user, tokens } = action.payload;
      state.user = user;
      state.tokens = tokens;
    },
  },
});

export default auth.reducer;

export const { login, logout, restoreAuth } = auth.actions;
