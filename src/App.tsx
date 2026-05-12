import {
  MantineProvider,
  Container,
  Grid,
  createTheme,
  Stack,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { Routes, Route, Navigate } from "react-router-dom";

import { Filters } from "./components/Filters/Filters";
import { VacancyList } from "./components/VacancyList/VacancyList";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { VacancyPage } from "./components/VacancyPage/VacancyPage";
import { NotFoundPage } from "./components/NotFoundPage/NotFoundPage";
import { Layout } from "./components/Layout/Layout";
import { About } from "./components/About/About";

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
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/vacancies/moscow" replace />} />

          <Route
            path="vacancies/:city"
            element={
              <Container size="xl" py="xl">
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
              </Container>
            }
          />

          <Route
            path="vacancies"
            element={<Navigate to="/vacancies/moscow" replace />}
          />

          <Route path="vacancy/:id" element={<VacancyPage />} />

          <Route path="about" element={<About />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </MantineProvider>
  );
}
