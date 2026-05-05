import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Paper,
  Text,
  Title,
  Button,
  Stack,
  Group,
  Badge,
  Anchor,
  Loader,
  Center,
} from "@mantine/core";
import { IconChevronLeft, IconExternalLink } from "@tabler/icons-react";
import { fetchVacancyById } from "../Store/Slices/vacancySlice";
import type { RootState, AppDispatch } from "../Store/store";

export const VacancyPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { list, loading } = useSelector((state: RootState) => state.vacancies);

  const vacancy = list.find((v) => v.id === id);

  useEffect(() => {
    if (!vacancy && id) {
      dispatch(fetchVacancyById(id));
    }
  }, [dispatch, id, vacancy]);

  if (loading && !vacancy) {
    return (
      <Center style={{ height: "50vh" }}>
        <Loader size="xl" />
      </Center>
    );
  }

  if (!vacancy) {
    return (
      <Container size="md" py="xl">
        <Stack align="center" gap="md">
          <Text size="lg" fw={500}>
            Вакансия не найдена. Попробуйте вернуться к списку.
          </Text>
          <Button component={Link} to="/" variant="light">
            Назад к поиску
          </Button>
        </Stack>
      </Container>
    );
  }

  return (
    <Container size="md" py="xl">
      <Anchor
        component={Link}
        to="/"
        size="sm"
        c="dimmed"
        mb="md"
        style={{ display: "flex", alignItems: "center", gap: "4px" }}
      >
        <IconChevronLeft size={16} /> Назад к списку
      </Anchor>

      <Stack gap="lg">
        <Paper withBorder p="xl" radius="md" shadow="sm">
          <Stack gap="xs">
            <Title order={2} c="blue.7">
              {vacancy.name}
            </Title>

            <Group gap="xs">
              <Text fw={700} size="lg">
                {vacancy.salary
                  ? `от ${vacancy.salary.from} до ${vacancy.salary.to} ${vacancy.salary.currency}`
                  : "Зарплата не указана"}
              </Text>
              <Text c="dimmed">Опыт 1-3 года</Text>
            </Group>

            <Text size="sm" mt="sm">
              {vacancy.employer?.name}
            </Text>

            <Group gap="xs" mt={5}>
              <Badge color="blue" variant="light" radius="sm">
                можно удаленно
              </Badge>
              <Text size="sm" c="dimmed">
                {vacancy.area?.name}
              </Text>
            </Group>

            <Button
              component="a"
              href={vacancy.alternate_url}
              target="_blank"
              mt="lg"
              color="dark"
              radius="md"
              style={{ alignSelf: "flex-start" }}
              rightSection={<IconExternalLink size={16} />}
            >
              Откликнуться на hh.ru
            </Button>
          </Stack>
        </Paper>

        <Paper withBorder p="xl" radius="md" shadow="sm">
          <Title order={3} mb="md">
            Описание вакансии
          </Title>

          <Stack gap="md">
            <section>
              <Text fw={600} mb={5}>
                Обязанности и требования:
              </Text>

              <Text
                size="sm"
                style={{ lineHeight: 1.6 }}
                dangerouslySetInnerHTML={{
                  __html: `
                    ${vacancy.snippet?.responsibility || ""} <br/><br/> 
                    ${vacancy.snippet?.requirement || ""}
                  `,
                }}
              />
            </section>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};
