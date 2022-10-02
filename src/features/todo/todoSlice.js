import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import todoService from "../../api/services/todoService";

const initialState = {
  todoList: [],
  loading: "idle", //"pending"|"fulfilled"|"rejected"
  errorMsg: "",
};

export const getTodoList = createAsyncThunk(
  "user/getTodoList",
  async (name, thunkAPI) => {
    try {
      const res = await todoService.getTodoList();
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong!");
    }
  }
);

export const addTodoTask = createAsyncThunk(
  "user/addTodoTask",
  async (value, thunkAPI) => {
    try {
      const data = { description: value };
      const res = await todoService.addTodoTask(data);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong!");
    }
  }
);

export const delTodoTask = createAsyncThunk(
  "user/delTodoTask",
  async (id, thunkAPI) => {
    try {
      await todoService.delTodoTask(id);
      let todoList = [...thunkAPI.getState().todo.todoList];
      todoList = todoList.filter((t) => t._id !== id);
      return todoList;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong!");
    }
  }
);

export const updateTodoTask = createAsyncThunk(
  "user/updateTodoTask",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await todoService.updateTodoTask(id, data);
      let resData = res.data.data;
      let todoList = [...thunkAPI.getState().todo.todoList];
      const findIndex = todoList.findIndex((t) => t._id === resData._id);
      todoList[findIndex] = { ...resData };
      return todoList;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Something went wrong!");
    }
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: {
    //  getTodoList
    [getTodoList.fulfilled]: (state, action) => {
      state.todoList = action.payload;
      state.loading = "fulfilled";
    },
    [getTodoList.pending]: (state) => {
      state.loading = "pending";
    },
    [getTodoList.rejected]: (state, action) => {
      state.errorMsg = action.payload;
      state.loading = "rejected";
    },
    //addTodoTask
    [addTodoTask.fulfilled]: (state, { payload }) => {
      state.todoList = [...state.todoList, payload];
      state.loading = "fulfilled";
    },
    [addTodoTask.pending]: (state) => {
      state.loading = "pending";
    },
    [addTodoTask.rejected]: (state, action) => {
      state.errorMsg = action.payload;
      state.loading = "rejected";
    },
    //delTodoTask
    [delTodoTask.fulfilled]: (state, { payload }) => {
      state.todoList = [...payload];
      state.loading = "fulfilled";
    },
    [delTodoTask.pending]: (state) => {
      state.loading = "pending";
    },
    [delTodoTask.rejected]: (state, action) => {
      state.loading = "rejected";
      state.errorMsg = action.payload;
    },
    //updateTodoTask
    [updateTodoTask.fulfilled]: (state, { payload }) => {
      state.todoList = [...payload];
      state.loading = "fulfilled";
    },
    [updateTodoTask.pending]: (state) => {
      state.loading = "pending";
    },
    [updateTodoTask.rejected]: (state, action) => {
      state.loading = "rejected";
      state.errorMsg = action.payload;
    },
  },
});

// export const {  } = todoSlice.actions;
export default todoSlice.reducer;
