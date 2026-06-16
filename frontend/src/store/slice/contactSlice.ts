import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IContact } from "../interface"; // adapte le chemin

// ✅ State
interface ContactState {
  contacts: IContact[];
  selectedContact: IContact | null;
  isLoading: boolean;
  error: string | null;
}

// ✅ Initial state
const initialState: ContactState = {
  contacts: [],
  selectedContact: null,
  isLoading: false,
  error: null,
};

// ✅ Slice
const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    // 🔹 SET ALL
    setContacts: (state, action: PayloadAction<IContact[]>) => {
      state.contacts = action.payload;
    },

    // 🔹 ADD
    addContact: (state, action: PayloadAction<IContact>) => {
      state.contacts.push(action.payload);
    },

    // 🔹 UPDATE
    updateContact: (state, action: PayloadAction<IContact>) => {
      const index = state.contacts.findIndex(
        (c) => c._id === action.payload._id,
      );
      if (index !== -1) {
        state.contacts[index] = action.payload;
      }
    },

    // 🔹 DELETE
    deleteContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter((c) => c._id !== action.payload);
    },

    // 🔹 SELECT ONE
    setSelectedContact: (state, action: PayloadAction<IContact | null>) => {
      state.selectedContact = action.payload;
    },

    // 🔹 MARK AS READ
    markAsRead: (state, action: PayloadAction<string>) => {
      const contact = state.contacts.find((c) => c._id === action.payload);
      if (contact) {
        contact.isRead = true;
      }
    },

    // 🔹 LOADING
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // 🔹 ERROR
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// ✅ Exports
export const {
  setContacts,
  addContact,
  updateContact,
  deleteContact,
  setSelectedContact,
  markAsRead,
  setLoading,
  setError,
} = contactSlice.actions;

export default contactSlice.reducer;
