import { configureStore, createSlice } from "@reduxjs/toolkit";

// Auth Slice---------------------------------------------------------------------------

const authState = {
  token: "",
  email: "",
};

const authSlice = createSlice({
  initialState: authState,
  name: "Auth",
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.email = action.payload.email;
    },
    logout(state) {
      state.token = "";
    },
  },
});

export const authSliceActions = authSlice.actions;

// emails Slice -----------------------------------------------------------------------------------

const emailState = {
  recieved: [],
  sent: [],
  activEmail: {},
  stack: "recieved",
};
const emailSlice = createSlice({
  initialState: emailState,
  name: "Email",
  reducers: {
    setMails(state, action) {
      state.recieved = action.payload?.recieved || [];
      state.sent = action.payload?.sent || [];
    },
    
// const emailSlice = createSlice({
//   initialState: emailState,
//   name: "Email",
//   reducers: {
//     setMails(state, action) {
//       state.recieved = action.payload.recieved;
//       state.sent = action.payload.sent;
//     },

    setActivEmail(state, action) {
      state.currentEmail = action.payload;
    },
    setStack(state, action) {
      console.log(action);
      state.stack = action.payload;
    },
  },
});

export const emailSliceActions = emailSlice.actions;

// UI Slice -------------------------------------------------------------------------------------------

const uiState = {
  readMode: false,
  compose: false,
};

const uiSlice = createSlice({
  initialState: uiState,
  name: "UI",
  reducers: {
    showReadMode(state) {
      state.readMode = true;
    },
    hideReadMode(state) {
      state.readMode = false;
    },
    showCompose(state) {
      state.compose = true;
    },
    hideCompose(state) {
      state.compose = false;
    },
  },
});

export const uiSliceActions = uiSlice.actions;

// Store ----------------------------------------------------------------------------------------------

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    email: emailSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;
