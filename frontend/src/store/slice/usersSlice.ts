import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../interface";

// ✅ State
interface UserState {
  users: IUser[];
  selectedUser: IUser | null;
  isLoading: boolean;
  error: string | null;
}



// ✅ Initial state
const initialState: UserState = {
  users: [],
  selectedUser: null,
  isLoading: false,
  error: null,
};

// ✅ Slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
    },

    addUser: (state, action: PayloadAction<IUser>) => {
      state.users.push(action.payload);
    },

    updateUser: (state, action: PayloadAction<IUser>) => {
      const index = state.users.findIndex((u) => u._id === action.payload._id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },

    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((u) => u._id !== action.payload);
    },

    setSelectedUser: (state, action: PayloadAction<IUser | null>) => {
      state.selectedUser = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// ✅ Exports
export const {
  setUsers,
  addUser,
  updateUser,
  deleteUser,
  setSelectedUser,
  setLoading,
  setError,
} = usersSlice.actions;

export default usersSlice.reducer;
