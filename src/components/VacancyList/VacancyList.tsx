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
  const [searchParams, setSearchParams] = useSearchParams();

  const { list, loading, error, pages, page } = useSelector(
    (state: RootState) => state.vacancies,
  );

  useEffect(() => {
    const cityFromUrl = searchParams.get("city");
    const textFromUrl = searchParams.get("text") || "";
    const skillsParam = searchParams.get("skills");
    const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);

    const skills = skillsParam ? skillsParam.split(",") : undefined;
    const areaId = cityFromUrl ? areaMap[cityFromUrl] : undefined;

    dispatch(
      fetchVacancies({
        text: textFromUrl,
        area: areaId,
        skill_set: skills,
        page: pageFromUrl - 1,
      }),
    );
  }, [dispatch, searchParams]);

  const handlePageChange = (newPage: number) => {
    const nextParams = new URLSearchParams(searchParams);

    nextParams.set("page", newPage.toString());
    setSearchParams(nextParams, { replace: true });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading && list.length === 0) {
    return (
      <Center mt="xl" style={{ minHeight: "200px" }}>
        <Stack align="center">
          <Loader size="lg" color="indigo" />
          <Text size="xl" fw={500} c="dimmed">
            Загрузка вакансий...
          </Text>
        </Stack>
      </Center>
    );
  }

  if (error) {
    return (
      <Center mt="xl">
        <Paper
          p="xl"
          withBorder
          radius="md"
          bg="red.0"
          style={{ maxWidth: 500 }}
        >
          <Text c="red.9" fw={700} ta="center">
            Ошибка при загрузке данных:
            <br />
            {error}
          </Text>
        </Paper>
      </Center>
    );
  }

  return (
    <Stack gap="md">
      {list.length > 0 ? (
        <>
          {list.map((vacancy) => (
            <VacancyCard key={vacancy.id} vacancy={vacancy} />
          ))}

          {pages > 1 && (
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
        </>
      ) : (
        !loading && (
          <Paper p="xl" withBorder radius="md">
            <Center>
              <Text c="dimmed">
                Вакансий не найдено. Попробуйте изменить параметры фильтров.
              </Text>
            </Center>
          </Paper>
        )
      )}
    </Stack>
  );
};
