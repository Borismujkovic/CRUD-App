import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { deleteUser, getUsers, User } from "../../data/data";
import { RootState } from "../store";

export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchUsers",
  async () => getUsers(),
);

export const deleteSingleUser = createAsyncThunk<boolean, number>(
  "users/deleteSingleUser",
  async (id) => deleteUser(id),
);

export interface UserState {
  userList: User[];
  filteredUserList: User[];
  isLoadingUserList: boolean;
  shouldReloadUserList: boolean;
}

const initialState = {
  userList: [],
  filteredUserList: [],
  isLoadingUserList: false,
  shouldReloadUserList: false,
} as UserState;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    filterUsers(state, action) {
      state.userList = [...state.filteredUserList].filter(
        (user) =>
          user.first_name
            .toLowerCase()
            .includes(action.payload.toLowerCase()) ||
          user.last_name.toLowerCase().includes(action.payload.toLowerCase()),
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoadingUserList = true;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.isLoadingUserList = false;
        state.userList = payload;
        state.filteredUserList = payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.isLoadingUserList = false;
      })
      .addCase(deleteSingleUser.pending, (state) => {
        state.shouldReloadUserList = false;
      })
      .addCase(deleteSingleUser.fulfilled, (state, { payload }) => {
        state.shouldReloadUserList = payload;
      })
      .addCase(deleteSingleUser.rejected, (state) => {
        state.shouldReloadUserList = false;
      });
  },
});

export default userSlice.reducer;

export const usersActions = userSlice.actions;

export const shouldReloadUserList = (state: RootState) =>
  state.user.shouldReloadUserList;

export const loadingUsers = (state: RootState) => state.user.isLoadingUserList;

export const selectUsers = (state: RootState) => state.user.userList;
