import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFormation } from "../interface";

/* ================= TYPES ================= */

export interface IVideo {
  title: string;
  url: string;
}

export interface IModule {
  _id: string;
  formationId: IFormation;
  title: string;
  videos: IVideo[];
  price: string;
  nbreTranche: number;
  createdAt?: string;
  updatedAt?: string;
}

/* ================= STATE ================= */

interface ModuleState {
  modules: IModule[];
  selectedModule: IModule | null;
  isLoading: boolean;
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: ModuleState = {
  modules: [],
  selectedModule: null,
  isLoading: false,
  error: null,
};

/* ================= SLICE ================= */

const moduleSlice = createSlice({
  name: "module",
  initialState,
  reducers: {
    // SET ALL MODULES
    setModules: (state, action: PayloadAction<IModule[]>) => {
      state.modules = action.payload;
    },

    // ✅ NEW: SET MODULES BY FORMATION
    setModulesByFormation: (state, action: PayloadAction<IModule[]>) => {
      state.modules = action.payload;
    },

    // ADD MODULE
    addModule: (state, action: PayloadAction<IModule>) => {
      state.modules.push(action.payload);
    },

    // UPDATE MODULE
    updateModule: (state, action: PayloadAction<IModule>) => {
      const index = state.modules.findIndex(
        (m) => m._id === action.payload._id,
      );

      if (index !== -1) {
        state.modules[index] = action.payload;
      }
    },

    // DELETE MODULE
    deleteModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.filter((m) => m._id !== action.payload);
    },

    // SELECT MODULE
    setSelectedModule: (state, action: PayloadAction<IModule | null>) => {
      state.selectedModule = action.payload;
    },

    // LOADING
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // ERROR
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

/* ================= EXPORTS ================= */

export const {
  setModules,
  setModulesByFormation, // 👈 important
  addModule,
  updateModule,
  deleteModule,
  setSelectedModule,
  setLoading,
  setError,
} = moduleSlice.actions;

export default moduleSlice.reducer;
