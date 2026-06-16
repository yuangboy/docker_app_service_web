import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* ================= TYPES ================= */

export interface IParticipantsByType {
  hybrid: number;
  online: number;
  onsite: number;
}

export interface IFormation {
  _id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  totalPrice: string;
  currency?: string;
  duration?: string;
  startDate?: string;
  participantsCount: number;
  participantsByType: IParticipantsByType;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/* ================= STATE ================= */

interface FormationState {
  formations: IFormation[];
  selectedFormation: IFormation | null;
  loading: boolean;
}

const initialState: FormationState = {
  formations: [],
  selectedFormation: null,
  loading: false,
};

/* ================= SLICE ================= */

const formationSlice = createSlice({
  name: "formation",
  initialState,
  reducers: {
    /* SET ALL */
    setFormations(state, action: PayloadAction<IFormation[]>) {
      state.formations = action.payload;
    },

    /* ADD ONE */
    addFormation(state, action: PayloadAction<IFormation>) {
      state.formations.push(action.payload);
    },

    /* SET SELECTED */
    setSelectedFormation(state, action: PayloadAction<IFormation | null>) {
      state.selectedFormation = action.payload;
    },

    /* UPDATE */
    updateFormation(state, action: PayloadAction<IFormation>) {
      state.formations = state.formations.map((f) =>
        f._id === action.payload._id ? action.payload : f,
      );
    },

    /* DELETE */
    deleteFormation(state, action: PayloadAction<string>) {
      state.formations = state.formations.filter(
        (f) => f._id !== action.payload,
      );
    },

    /* LOADING */
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

/* ================= EXPORTS ================= */

export const {
  setFormations,
  addFormation,
  setSelectedFormation,
  updateFormation,
  deleteFormation,
  setLoading,
} = formationSlice.actions;

export default formationSlice.reducer;
