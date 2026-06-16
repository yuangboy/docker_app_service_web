import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IService } from "../interface"; // ton interface Service

// ✅ Définition du state
interface ServiceState {
  services: IService[];        // liste des services
  selectedService: IService | null; // service en cours de consultation/édition
  isLoading: boolean;          // état de chargement
  error: string | null;        // message d'erreur éventuel
}

// ✅ État initial
const initialState: ServiceState = {
  services: [],
  selectedService: null,
  isLoading: false,
  error: null,
};

// ✅ Slice
const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setServices: (state, action: PayloadAction<IService[]>) => {
      state.services = action.payload;
    },
    addService: (state, action: PayloadAction<IService>) => {
      state.services.push(action.payload);
    },
    updateService: (state, action: PayloadAction<IService>) => {
      const index = state.services.findIndex(s => s._id === action.payload._id);
      if (index !== -1) {
        state.services[index] = action.payload;
      }
    },
    deleteService: (state, action: PayloadAction<string>) => {
      state.services = state.services.filter(s => s._id !== action.payload);
    },
    setSelectedService: (state, action: PayloadAction<IService | null>) => {
      state.selectedService = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// ✅ Export des actions et du reducer
export const {
  setServices,
  addService,
  updateService,
  deleteService,
  setSelectedService,
  setLoading,
  setError,
} = serviceSlice.actions;

export default serviceSlice.reducer;
