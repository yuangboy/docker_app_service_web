import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProject } from "../interface"; // ton interface Project

// ✅ Définition du state
interface ProjectState {
  projects: IProject[];              // liste des projets
  selectedProject: IProject | null;  // projet en cours de consultation/édition
  isLoading: boolean;                // état de chargement
  error: string | null;              // message d'erreur éventuel
}

// ✅ État initial
const initialState: ProjectState = {
  projects: [],
  selectedProject: null,
  isLoading: false,
  error: null,
};

// ✅ Slice
const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<IProject[]>) => {
      state.projects = action.payload;
    },
    addProject: (state, action: PayloadAction<IProject>) => {
      state.projects.push(action.payload);
    },
    updateProject: (state, action: PayloadAction<IProject>) => {
      const index = state.projects.findIndex(p => p._id === action.payload._id);
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(p => p._id !== action.payload);
    },
    setSelectedProject: (state, action: PayloadAction<IProject | null>) => {
      state.selectedProject = action.payload;
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
  setProjects,
  addProject,
  updateProject,
  deleteProject,
  setSelectedProject,
  setLoading,
  setError,
} = projectSlice.actions;

export default projectSlice.reducer;
