import { configureStore } from "@reduxjs/toolkit";
import vacancyReducer from "./Slices/vacancySlice";

export const store = configureStore({
  reducer: {
    vacancies: vacancyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
