import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* ================= TYPES ================= */
export type CareerStatus = "approved" | "rejected" | "pending" | "cancel";





export interface ICareer {
  _id: string;
  userId: string;
  careerInfoId: string;
  fullName: string;
  email: string;
  phone?: string;
  position?: string;
  experience?: string;
  coverLetter?: string;
  cvUrl?: string;
  status?: CareerStatus;
  createdAt?: string;
  updatedAt?: string;
}


/* ================= STATE ================= */
interface CareerState {
  careers: ICareer[];
  selectedCareer: ICareer | null;
  loading: boolean;
  error: string | null;
}

const initialState: CareerState = {
  careers: [],
  selectedCareer: null,
  loading: false,
  error: null,
};

/* ================= SLICE ================= */

const careerSlice = createSlice({
  name: "career",
  initialState,
  reducers: {
    /* SET ALL */
    setCareers(state, action: PayloadAction<ICareer[]>) {
      state.careers = action.payload;
    },

    /* ADD */
    addCareer(state, action: PayloadAction<ICareer>) {
      state.careers.push(action.payload);
    },

    /* SELECT */
    setSelectedCareer(state, action: PayloadAction<ICareer | null>) {
      state.selectedCareer = action.payload;
    },

    /* UPDATE */
    updateCareer(state, action: PayloadAction<ICareer>) {
      state.careers = state.careers.map((c) =>
        c._id === action.payload._id ? action.payload : c,
      );
    },

    /* UPDATE STATUS ONLY (très utile dans ton cas) */
    updateCareerStatus(
      state,
      action: PayloadAction<{ id: string; status: CareerStatus }>,
    ) {
      const career = state.careers.find((c) => c._id === action.payload.id);
      if (career) {
        career.status = action.payload.status;
      }
    },

    /* DELETE */
    deleteCareer(state, action: PayloadAction<string>) {
      state.careers = state.careers.filter((c) => c._id !== action.payload);
    },

    /* LOADING */
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    /* ERROR */
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

/* ================= EXPORTS ================= */

export const {
  setCareers,
  addCareer,
  setSelectedCareer,
  updateCareer,
  updateCareerStatus,
  deleteCareer,
  setLoading,
  setError,
} = careerSlice.actions;

export default careerSlice.reducer;