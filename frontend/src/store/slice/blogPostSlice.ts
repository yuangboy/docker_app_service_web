import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBlogPost } from "../interface"; // ton interface BlogPost

// ✅ Définition du state
interface BlogPostState {
  blogPosts: IBlogPost[]; // liste des articles
  selectedBlogPost: IBlogPost | null; // article en cours de consultation/édition
  isLoading: boolean; // état de chargement
  error: string | null; // message d'erreur éventuel
}

// ✅ État initial
const initialState: BlogPostState = {
  blogPosts: [],
  selectedBlogPost: null,
  isLoading: false,
  error: null,
};

// ✅ Slice
const blogPostSlice = createSlice({
  name: "blogPost",
  initialState,
  reducers: {
    setBlogPosts: (state, action: PayloadAction<IBlogPost[]>) => {
      state.blogPosts = action.payload;
    },
    addBlogPost: (state, action: PayloadAction<IBlogPost>) => {
      state.blogPosts.push(action.payload);
    },
    updateBlogPost: (state, action: PayloadAction<IBlogPost>) => {
      const index = state.blogPosts.findIndex(
        (p) => p._id === action.payload._id,
      );
      if (index !== -1) {
        state.blogPosts[index] = action.payload;
      }
    },
    deleteBlogPost: (state, action: PayloadAction<string>) => {
      state.blogPosts = state.blogPosts.filter((p) => p._id !== action.payload);
    },
    setSelectedBlogPost: (state, action: PayloadAction<IBlogPost | null>) => {
      state.selectedBlogPost = action.payload;
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
  setBlogPosts,
  addBlogPost,
  updateBlogPost,
  deleteBlogPost,
  setSelectedBlogPost,
  setLoading,
  setError,
} = blogPostSlice.actions;

export default blogPostSlice.reducer;
