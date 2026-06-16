import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* ================= TYPES ================= */

export type ContractType = "CDI" | "CDD" | "Stage" | "Freelance";

export interface ICareerInfo {
  _id: string;
  title: string;
  content: string;
  year: string;
  competence: string[];
  contractType: ContractType;
  createdAt?: string;
  updatedAt?: string;
}

/* ================= STATE ================= */

interface CareerState {
  careers: ICareerInfo[];
  selectedCareer: ICareerInfo | null;
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

const careerInfoSlice = createSlice({
  name: "career",
  initialState,
  reducers: {
    /* SET ALL */
    setCareerInfos(state, action: PayloadAction<ICareerInfo[]>) {
      state.careers = action.payload;
    },

    /* ADD */
    addCareerInfo(state, action: PayloadAction<ICareerInfo>) {
      state.careers.push(action.payload);
    },

    /* SELECT */
    setSelectedCareerInfo(state, action: PayloadAction<ICareerInfo | null>) {
      state.selectedCareer = action.payload;
    },

    /* UPDATE */
    updateCareerInfo(state, action: PayloadAction<ICareerInfo>) {
      state.careers = state.careers.map((c) =>
        c._id === action.payload._id ? action.payload : c,
      );
    },

    /* DELETE */
    deleteCareerInfo(state, action: PayloadAction<string>) {
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
  setCareerInfos,
  addCareerInfo,
  setSelectedCareerInfo,
  updateCareerInfo,
  deleteCareerInfo,
  setLoading,
  setError,
} = careerInfoSlice.actions;

export default careerInfoSlice.reducer;
