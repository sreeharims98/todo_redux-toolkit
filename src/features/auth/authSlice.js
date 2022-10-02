import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../api/services/authService";
import { storage } from "../../utils/storageUtils";

const user = storage.getItem("user");

const initialState = {
  user: user ? user : null,
  loading: "idle",
  errorMsg: "",
};

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const res = await authService.login(data);
    const userData = { ...res.data.user, token: res.data.token };
    storage.setItem("user", userData);
    return userData;
  } catch (error) {
    return thunkAPI.rejectWithValue("Something went wrong!");
  }
});

export const logout = createAsyncThunk(
  "auth/logout",
  async (data, thunkAPI) => {
    try {
      await authService.logout();
      storage.removeItem("user");
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong!");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    //login
    [login.pending]: (state) => {
      state.loading = "pending";
      state.errorMsg = null;
    },
    [login.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.loading = "fulfilled";
    },
    [login.rejected]: (state, action) => {
      state.user = null;
      state.errorMsg = action.payload;
      state.loading = "rejected";
    },
    //logout
    [logout.pending]: (state) => {
      state.loading = "pending";
      state.errorMsg = null;
    },
    [logout.fulfilled]: (state) => {
      state.user = null;
      state.loading = "fulfilled";
    },
    [logout.rejected]: (state, action) => {
      state.errorMsg = action.payload;
      state.loading = "rejected";
    },
  },
});
export default authSlice.reducer;
