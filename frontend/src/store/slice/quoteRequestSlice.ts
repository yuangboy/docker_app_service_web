import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IQuoteRequest } from "../interface"; // adapte le chemin

// ✅ State
interface QuoteRequestState {
  quoteRequests: IQuoteRequest[];
  selectedQuoteRequest: IQuoteRequest | null;
  isLoading: boolean;
  error: string | null;
}

// ✅ Initial state
const initialState: QuoteRequestState = {
  quoteRequests: [],
  selectedQuoteRequest: null,
  isLoading: false,
  error: null,
};

// ✅ Slice
const quoteRequestSlice = createSlice({
  name: "quoteRequest",
  initialState,
  reducers: {
    // 🔹 SET ALL
    setQuoteRequests: (state, action: PayloadAction<IQuoteRequest[]>) => {
      state.quoteRequests = action.payload;
    },

    // 🔹 ADD
    addQuoteRequest: (state, action: PayloadAction<IQuoteRequest>) => {
      state.quoteRequests.push(action.payload);
    },

    // 🔹 UPDATE
    updateQuoteRequest: (state, action: PayloadAction<IQuoteRequest>) => {
      const index = state.quoteRequests.findIndex(
        (q) => q._id === action.payload._id,
      );
      if (index !== -1) {
        state.quoteRequests[index] = action.payload;
      }
    },

    // 🔹 DELETE
    deleteQuoteRequest: (state, action: PayloadAction<string>) => {
      state.quoteRequests = state.quoteRequests.filter(
        (q) => q._id !== action.payload,
      );
    },

    // 🔹 SELECT ONE
    setSelectedQuoteRequest: (
      state,
      action: PayloadAction<IQuoteRequest | null>,
    ) => {
      state.selectedQuoteRequest = action.payload;
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
  setQuoteRequests,
  addQuoteRequest,
  updateQuoteRequest,
  deleteQuoteRequest,
  setSelectedQuoteRequest,
  setLoading,
  setError,
} = quoteRequestSlice.actions;

export default quoteRequestSlice.reducer;
