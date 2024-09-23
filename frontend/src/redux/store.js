import { configureStore } from "@reduxjs/toolkit";

const configStore = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default configStore;
