import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isAutheticated: false,
    visible: false,
  },
  reducers: {
    // Sign In Request

    signInRequest: (state) => {
      state.loading = true;
    },

    signInSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.isAutheticated = true;
    },

    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAutheticated = false;
    },

    // Load User

    loadUserRequest: (state) => {
      state.loading = true;
    },

    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.profile = action.payload;
      state.isAutheticated = true;
    },

    loadUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAutheticated = false;
    },

    // User Update

    userUpdateRequest: (state) => {
      state.loading = true;
    },

    userUpdateSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },

    userUpdateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Contact Us
    contactUsRequest: (state) => {
      state.loading = true;
    },
    contactUsSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    contactUsfailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Logout User

    userLogoutRequest: (state) => {
      state.loading = true;
    },
    userLogoutSuccess: (state) => {
      state.loading = false;
      state.message = "";
      state.profile = null;
      state.isAutheticated = false;
    },
    userLogoutfailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAutheticated = true;
    },

    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const projectSlice = createSlice({
  name: "name",
  initialState: {},
  reducers: {
    // Add Project
    addProjectRequest: (state) => {
      state.loading = true;
    },
    addProjectSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    addProjectFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete Project

    deleteProjectRequest: (state) => {
      state.loading = true;
    },
    deleteProjectSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteProjectFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update Project

    updateProjectRequest: (state) => {
      state.loading = true;
    },
    updateProjectSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateProjectFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Show Project

    showProjectRequest: (state) => {
      state.loading = true;
    },
    showProjectSuccess: (state, action) => {
      state.loading = false;
      state.project = action.payload;
    },
    showProjectfailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const messageSlice = createSlice({
  name: "message",
  initialState: {},
  reducers: {
    // Delete Message

    deleteMessageRequest: (state) => {
      state.loading = true;
    },
    deleteMessageSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteMessageFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Reply Message

    replyMessageRequest: (state) => {
      state.loading = true;
    },
    replyMessageSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    replyMessageFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const userAction = userSlice.actions;
export const projectAction = projectSlice.actions;
export const messageAction = messageSlice.actions;
