import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/AuthSlice";
import timelineReducer from "./slices/TimelineSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    timeline: timelineReducer,
  },
});

export default store;
