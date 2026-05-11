import {
  MantineProvider,
  Container,
  Grid,
  createTheme,
  Stack,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { Header } from "./components/Header/Header";
import { Filters } from "./components/Filters/Filters";
import { VacancyList } from "./components/VacancyList/VacancyList";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { Routes, Route, Navigate } from "react-router-dom";
import { VacancyPage } from "./components/VacancyPage/VacancyPage";
import { NotFoundPage } from "./components/NotFoundPage/NotFoundPage"; // Импортируем кота

const theme = createTheme({
  primaryColor: "indigo",
  defaultRadius: "md",
  colors: {
    indigo: [
      "#edf2ff",
      "#dbe4ff",
      "#bac8ff",
      "#91a7ff",
      "#748ffc",
      "#5c7cfa",
      "#4263eb",
      "#3b5bdb",
      "#364fc7",
      "#2b3991",
    ],
  },
});

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <div style={{ backgroundColor: "#F6F6F7", minHeight: "100vh" }}>
        <Header />

        <Container size="xl" py="xl">
          <Routes>
            {/* 1. Главная страница просто перекидывает на Москву */}
            <Route
              path="/"
              element={<Navigate to="/vacancies/moscow" replace />}
            />

            {/* 2. Маршрут для списка вакансий с параметром города */}
            <Route
              path="vacancies/:city"
              element={
                <>
                  <Stack gap="xl" mb="xl">
                    <SearchBar />
                  </Stack>
                  <Grid>
                    <Grid.Col span={{ base: 12, md: 4 }}>
                      <Filters />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 8 }}>
                      <VacancyList />
                    </Grid.Col>
                  </Grid>
                </>
              }
            />

            {/* 3. Если зашли просто на /vacancies без города — кидаем на москву */}
            <Route
              path="vacancies"
              element={<Navigate to="/vacancies/moscow" replace />}
            />

            {/* 4. Страница конкретной вакансии. 
               Важно: путь теперь /vacancy/:id, чтобы не путать с городами, 
               либо оставить как есть, но тогда этот роут должен быть ВЫШЕ списка городов.
            */}
            <Route path="vacancy/:id" element={<VacancyPage />} />

            {/* 5. Наша новая 404 страница с гифкой */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Container>
      </div>
    </MantineProvider>
  );
}
