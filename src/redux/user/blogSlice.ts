import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import blogPosts from "../../data/blog-posts.json";
import {
  addBlogPost,
  BlogPost,
  deleteBlogPost,
  editBlogPost,
  getMembers,
} from "../../data/data";
import { RootState } from "../store";

export const fetchBlogs = createAsyncThunk<BlogPost[]>(
  "blogs/fetchBlogs",
  async () => getMembers(),
);

export const deleteSingleBlog = createAsyncThunk<boolean, string>(
  "blogs/deleteSingleBlog",
  async (id) => deleteBlogPost(id),
);

export const addSingleBlog = createAsyncThunk<
  typeof blogPosts[0],
  typeof blogPosts[0]
>("blogs/addSingleBlog", async (data) => addBlogPost(data));

export const editSingleBlog = createAsyncThunk<
  BlogPost,
  { id: string; data: typeof blogPosts[0] }
>(
  "blogs/editSingleBlog",
  async ({ id, data }: { id: string; data: typeof blogPosts[0] }) =>
    editBlogPost(id, data),
);

export interface BlogState {
  blogList: BlogPost[];
  shouldReloadUserBlogs: boolean;
  selectedBlog: BlogPost;
}

const initialState = {
  blogList: [],
  shouldReloadUserBlogs: false,
  selectedBlog: null,
} as unknown as BlogState;

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setSelectedBlog(state, action) {
      state.selectedBlog = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.blogList = action.payload;
      })

      .addCase(deleteSingleBlog.pending, (state) => {
        state.shouldReloadUserBlogs = false;
      })
      .addCase(deleteSingleBlog.fulfilled, (state, { payload }) => {
        state.shouldReloadUserBlogs = payload;
      })
      .addCase(deleteSingleBlog.rejected, (state) => {
        state.shouldReloadUserBlogs = false;
      })

      .addCase(addSingleBlog.pending, () => {})
      .addCase(addSingleBlog.fulfilled, (state) => {
        state.shouldReloadUserBlogs = true;
      })
      .addCase(addSingleBlog.rejected, () => {})

      .addCase(editSingleBlog.pending, () => {})
      .addCase(editSingleBlog.fulfilled, (state, { payload }) => {
        state.selectedBlog = payload;
      })
      .addCase(editSingleBlog.rejected, () => {});
  },
});

export const shouldReloadUserBlogs = (state: RootState) =>
  state.blog.shouldReloadUserBlogs;

export const selectBlogs = (state: RootState) => state.blog.blogList;

export const selectedBlog = (state: RootState) => state.blog.selectedBlog;

export const blogsActions = blogSlice.actions;

export default blogSlice.reducer;
