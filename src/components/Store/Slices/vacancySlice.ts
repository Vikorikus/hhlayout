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
      await new Promise((resolve) => setTimeout(resolve, 600));

      let filteredItems = [...mockVacanciesResponse.items];

      // 1. Поиск по тексту (название вакансии или компания)
      if (arg.text) {
        const query = arg.text.toLowerCase().trim();
        filteredItems = filteredItems.filter(
          (v) =>
            v.name.toLowerCase().includes(query) ||
            v.employer?.name.toLowerCase().includes(query),
        );
      }

      // 2. Фильтр по региону (Tabs/Select)
      if (arg.area) {
        filteredItems = filteredItems.filter((v) => {
          if (arg.area === "1") return v.area?.name === "Москва";
          if (arg.area === "2") return v.area?.name === "Санкт-Петербург";
          return true;
        });
      }

      // 3. СТРОГИЙ ФИЛЬТР ПО НАВЫКАМ (Исправляет "Абракадабру" и "Данные не исчезают")
      if (arg.skill_set && arg.skill_set.length > 0) {
        filteredItems = filteredItems.filter((v) => {
          const requirement = (v.snippet?.requirement || "").toLowerCase();

          // Проверяем, что КАЖДЫЙ выбранный навык есть в описании вакансии
          return arg.skill_set!.every((skill) => {
            const s = skill.toLowerCase().trim();

            // "Умная" проверка для JS: чтобы JavaScript и JS считались одним и тем же
            if (s === "js" || s === "javascript") {
              return (
                requirement.includes("javascript") || requirement.includes("js")
              );
            }

            return requirement.includes(s);
          });
        });
      }

      // 4. Пагинация и защита от пустых страниц
      const perPage = 10;
      const totalFound = filteredItems.length;
      const totalPages = Math.ceil(totalFound / perPage) || 1;

      // Если после фильтрации страница оказалась за пределами диапазона - сбрасываем на 0
      const actualPage = arg.page >= totalPages ? 0 : arg.page;

      const offset = actualPage * perPage;
      const paginatedItems = filteredItems.slice(offset, offset + perPage);

      return {
        items: paginatedItems,
        found: totalFound,
        page: actualPage,
        pages: totalPages,
      };
    } catch (error) {
      return rejectWithValue("Ошибка загрузки данных");
    }
  },
);

export const fetchVacancyById = createAsyncThunk(
  "vacancies/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 400));

      // Находим вакансию в моках. Важно: ID в моках теперь стабильны.
      const vacancy = mockVacanciesResponse.items.find((v) => v.id === id);

      if (!vacancy) {
        return rejectWithValue("Вакансия не найдена");
      }

      return vacancy;
    } catch (error) {
      return rejectWithValue("Ошибка при получении вакансии");
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
      })
      .addCase(fetchVacancyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVacancyById.fulfilled, (state, action) => {
        state.loading = false;
        // Если вакансии нет в текущем списке (например, после F5), добавляем её
        const exists = state.list.find((v) => v.id === action.payload.id);
        if (!exists) {
          state.list.push(action.payload as unknown as Vacancy);
        }
      })
      .addCase(fetchVacancyById.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Ошибка загрузки вакансии";
      });
  },
});

export const { setPage } = VacancySlice.actions;
export default VacancySlice.reducer;
