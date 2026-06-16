import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* ================= INTERFACE ================= */

export interface IEvent {
  _id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  price: number;
  currency?: string;
  eventDate?: string; // Date en string côté frontend
  location?: string;
  maxParticipants: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/* ================= STATE ================= */

interface EventState {
  events: IEvent[];
  selectedEvent: IEvent | null;
  isLoading: boolean;
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: EventState = {
  events: [],
  selectedEvent: null,
  isLoading: false,
  error: null,
};

/* ================= SLICE ================= */

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    /* SET ALL EVENTS */
    setEvents: (state, action: PayloadAction<IEvent[]>) => {
      state.events = action.payload;
    },

    /* ADD EVENT */
    addEvent: (state, action: PayloadAction<IEvent>) => {
      state.events.push(action.payload);
    },

    /* UPDATE EVENT */
    updateEvent: (state, action: PayloadAction<IEvent>) => {
      const index = state.events.findIndex((e) => e._id === action.payload._id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },

    /* DELETE EVENT */
    deleteEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter((e) => e._id !== action.payload);
    },

    /* SELECT EVENT */
    setSelectedEvent: (state, action: PayloadAction<IEvent | null>) => {
      state.selectedEvent = action.payload;
    },

    /* LOADING */
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    /* ERROR */
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    /* RESET (optionnel mais très utile) */
    resetEventState: () => initialState,
  },
});

/* ================= EXPORT ================= */

export const {
  setEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  setSelectedEvent,
  setLoading,
  setError,
  resetEventState,
} = eventSlice.actions;

export default eventSlice.reducer;
