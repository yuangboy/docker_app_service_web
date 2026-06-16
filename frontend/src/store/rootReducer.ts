// store/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import { RESET_STATE } from "./reset";
import userReducer from "./slice/userSlice";
import usersReducer from "./slice/usersSlice";
import serviceReducer from "./slice/serviceSlice";
import projectReducer from "./slice/projectSlice";
import blogPostReducer from "./slice/blogPostSlice";
import quoteRequestReducer from "./slice/quoteRequestSlice";
import ContactReducer from "./slice/contactSlice";
import FormationReducer from "./slice/formationSlice";
import ModuleReducer from "./slice/moduleSlice";
import CareerInfoReducer from "./slice/careerInfoSlice"; 
import CareerReducer from "./slice/careerSlice"; 
import EventReducer from "./slice/eventSlice.ts"; 
import { api } from "./api";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["user", "isEmailVerified", "isLoggedIn"],
};
const usersPersistConfig = {
  key: "users",
  storage,
  whitelist: ["users", "selectedUser"],
};

const servicePersistConfig = {
  key: "service",
  storage,
  whitelist: ["services", "selectedService"], // tu choisis ce que tu veux garder
};
const projectPersistConfig = {
  key: "project",
  storage,
  whitelist: ["projects", "selectedProject"], // tu choisis ce que tu veux garder
};
const blogPostPersistConfig = {
  key: "blogPost",
  storage,
  whitelist: ["blogPosts", "selectedBlogPost"], // tu choisis ce que tu veux garder
};
const quoteRequestPersistConfig = {
  key: "quoteRequest",
  storage,
  whitelist: ["quoteRequests", "selectedQuoteRequest"], // tu choisis ce que tu veux garder
};
const ContactPersistConfig = {
  key: "contact",
  storage,
  whitelist: ["contacts", "selectedContact"], // tu choisis ce que tu veux garder
};
const FormationPersistConfig = {
  key: "formation",
  storage,
  whitelist: ["formations", "selectedFormation"], // tu choisis ce que tu veux garder
};
const ModulePersistConfig = {
  key: "module",
  storage,
  whitelist: ["modules", "selectedModule"], // tu choisis ce que tu veux garder
};

// careers;
// selectedCareer;

const CareerInfoPersistConfig = {
  key: "careerInfo",
  storage,
  whitelist: ["careers", "selectedCareer"], // tu choisis ce que tu veux garder
};

const CareerPersistConfig = {
  key: "career",
  storage,
  whitelist: ["careers", "selectedCareer"], // tu choisis ce que tu veux garder
};
const EventPersistConfig = {
  key: "event",
  storage,
  whitelist: ["events", "selectedEvent"], // tu choisis ce que tu veux garder
};

const combinedReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  users: persistReducer(usersPersistConfig, usersReducer),
  service: persistReducer(servicePersistConfig, serviceReducer),
  project: persistReducer(projectPersistConfig, projectReducer),
  blogPost: persistReducer(blogPostPersistConfig, blogPostReducer),
  quoteRequest: persistReducer(quoteRequestPersistConfig, quoteRequestReducer),
  contact: persistReducer(ContactPersistConfig, ContactReducer),
  formation: persistReducer(FormationPersistConfig, FormationReducer),
  module: persistReducer(ModulePersistConfig, ModuleReducer),
  careerInfo: persistReducer(CareerInfoPersistConfig, CareerInfoReducer),
  career: persistReducer(CareerPersistConfig, CareerReducer),
  event: persistReducer(EventPersistConfig, EventReducer),
  [api.reducerPath]: api.reducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === RESET_STATE) {
    storage.removeItem("persist:user");
    storage.removeItem("persist:users");
    storage.removeItem("persist:service");
    storage.removeItem("persist:project");
    storage.removeItem("persist:blogPost");
    storage.removeItem("persist:quoteRequest");
    storage.removeItem("persist:contact");
    storage.removeItem("persist:formation");
    storage.removeItem("persist:module");
    storage.removeItem("persist:careerInfo");
    storage.removeItem("persist:career");
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default rootReducer;
