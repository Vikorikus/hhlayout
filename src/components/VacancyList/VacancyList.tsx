import { useEffect } from "react";
import { Stack, Text, Loader, Center, Paper, Pagination } from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import type { RootState, AppDispatch } from "../Store/store";
import { fetchVacancies } from "../Store/Slices/vacancySlice";
import { VacancyCard } from "../VacancyCard/VacancyCard";
import { areaMap } from "../../Types/areas";

export const VacancyList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();

  const { list, loading, error, pages, page } = useSelector(
    (state: RootState) => state.vacancies,
  );

  useEffect(() => {
    const cityFromUrl = searchParams.get("city");
    const text = searchParams.get("text") || "";
    const skills = searchParams.get("skills")?.split(",") || [];

    const areaId = cityFromUrl ? areaMap[cityFromUrl] : undefined;

    dispatch(
      fetchVacancies({
        text,
        area: areaId,
        skill_set: skills.length > 0 ? skills : undefined,
        page: 0,
      }),
    );
  }, [dispatch, searchParams]);

  const handlePageChange = (newPage: number) => {
    const text = searchParams.get("text") || "";

    dispatch(
      fetchVacancies({
        text,
        page: newPage - 1,
      }),
    );

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading && list.length === 0) {
    return (
      <Center mt="xl" style={{ minHeight: "200px" }}>
        <Stack align="center">
          <Loader size="lg" color="indigo" />
          <Text size="xl" fw={500} c="dimmed">
            Поиск подходящих вакансий...
          </Text>
        </Stack>
      </Center>
    );
  }

  if (error) {
    return (
      <Center mt="xl">
        <Paper p="xl" withBorder radius="md" bg="red.0">
          <Text c="red.9" fw={700}>
            Ошибка при загрузке: {error}
          </Text>
        </Paper>
      </Center>
    );
  }

  return (
    <Stack gap="md">
      {list.length > 0 ? (
        list.map((vacancy) => (
          <VacancyCard key={vacancy.id} vacancy={vacancy} />
        ))
      ) : (
        <Paper p="xl" withBorder radius="md">
          <Center>
            <Text c="dimmed">
              Вакансий не найдено. Попробуйте изменить параметры фильтров.
            </Text>
          </Center>
        </Paper>
      )}

      {list.length > 0 && pages > 1 && (
        <Center mt="lg" pb="xl">
          <Pagination
            total={pages}
            value={page + 1}
            onChange={handlePageChange}
            color="indigo.6"
            radius="md"
            withEdges={false}
          />
        </Center>
      )}
    </Stack>
  );
};
