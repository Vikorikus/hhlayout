import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Vacancy } from "../../../Types/vacancy";
import { mockVacanciesResponse } from "../../../mockData";

interface FetchVacanciesArgs {
  text: string;
  page: number;
  area?: string;
  skill_set?: string[];
}

interface VacancyState {
  list: Vacancy[];
  loading: boolean;
  error: string | null;
  found: number;
  page: number;
  pages: number;
  perPage: number;
}

const initialState: VacancyState = {
  list: [],
  loading: false,
  error: null,
  found: 0,
  page: 0,
  pages: 0,
  perPage: 10,
};

export const fetchVacancies = createAsyncThunk(
  "vacancies/fetchAll",
  async (arg: FetchVacanciesArgs, { rejectWithValue }) => {
    try {
      // для мока задержка типа грузится с api hh
      await new Promise((resolve) => setTimeout(resolve, 600));

      let filteredItems = [...mockVacanciesResponse.items];

      if (arg.text) {
        const query = arg.text.toLowerCase();
        filteredItems = filteredItems.filter(
          (v) =>
            v.name.toLowerCase().includes(query) ||
            v.employer?.name.toLowerCase().includes(query),
        );
      }

      if (arg.area) {
        filteredItems = filteredItems.filter((v) => {
          if (arg.area === "1") return v.area?.name === "Москва";
          if (arg.area === "2") return v.area?.name === "Санкт-Петербург";
          return true;
        });
      }

      if (arg.skill_set && arg.skill_set.length > 0) {
        filteredItems = filteredItems.filter((v) =>
          arg.skill_set?.some((skill) =>
            v.snippet?.requirement?.toLowerCase().includes(skill.toLowerCase()),
          ),
        );
      }

      const perPage = 10;
      const totalFound = filteredItems.length;
      const totalPages = Math.ceil(totalFound / perPage);

      const offset = arg.page * perPage;
      const paginatedItems = filteredItems.slice(offset, offset + perPage);

      return {
        items: paginatedItems,
        found: totalFound,
        page: arg.page,
        pages: totalPages,
      };
    } catch (error) {
      return rejectWithValue("Ошибка загрузки данных");
    }
  },
);

const VacancySlice = createSlice({
  name: "vacancies",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacancies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVacancies.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.items as unknown as Vacancy[];
        state.found = action.payload.found;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(fetchVacancies.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Произошла ошибка";
      });
  },
});

export const { setPage } = VacancySlice.actions;
export default VacancySlice.reducer;
