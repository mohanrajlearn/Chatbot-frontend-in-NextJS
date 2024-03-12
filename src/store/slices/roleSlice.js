import { createSlice } from "@reduxjs/toolkit";

export const roleSlice = createSlice({
  name: "role",
  initialState: {
    role: "CUSTOMER",
  },
  reducers: {
    setRole: (state, action) => {
      const payload = action.payload;
      if (payload) {
        localStorage.setItem("role", JSON.stringify(payload));
        state.role = payload;
      }
    },
  },
});

export const selectRole = (state) => state.role.role;

export const { setRole } = roleSlice.actions;

export default roleSlice.reducer;
