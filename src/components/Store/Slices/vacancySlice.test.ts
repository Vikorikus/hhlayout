import vacancyReducer, { fetchVacancies } from "./vacancySlice";
import { configureStore } from "@reduxjs/toolkit";
import { describe, it, expect } from "vitest";

describe("vacancySlice extraReducers", () => {
  it("должен устанавливать loading: true", () => {
    const initialState = {
      list: [],
      loading: false,
      error: null,
      found: 0,
      page: 0,
      pages: 0,
      perPage: 10,
    };

    const action = { type: fetchVacancies.pending.type };
    const state = vacancyReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it("должен фильтровать данные по городу Москва (area: '1')", async () => {
    const store = configureStore({ reducer: { vacancies: vacancyReducer } });

    await store.dispatch(fetchVacancies({ text: "", page: 0, area: "1" }));

    const state = store.getState().vacancies;

    state.list.forEach((v) => {
      expect(v.area.name).toBe("Москва");
    });
  });
});
