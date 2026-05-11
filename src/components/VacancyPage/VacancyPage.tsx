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
  Divider,
} from "@mantine/core";
import {
  IconChevronLeft,
  IconExternalLink,
  IconMapPin,
  IconBriefcase,
} from "@tabler/icons-react";
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

    window.scrollTo(0, 0);
  }, [dispatch, id, vacancy]);

  if (loading && !vacancy) {
    return (
      <Center style={{ height: "70vh" }}>
        <Loader size="xl" color="indigo" />
      </Center>
    );
  }

  if (!vacancy) {
    return (
      <Container size="md" py="xl">
        <Stack align="center" gap="md">
          <Text size="lg" fw={500}>
            Вакансия не найдена. Возможно, она была удалена.
          </Text>
          <Button
            component={Link}
            to="/vacancies/moscow"
            variant="light"
            color="indigo"
          >
            Вернуться к списку
          </Button>
        </Stack>
      </Container>
    );
  }

  return (
    <Container size="md" py="xl">
      <Anchor
        component={Link}
        to="/vacancies/moscow"
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
            <Title order={2} c="indigo.7">
              {vacancy.name}
            </Title>

            <Group gap="xs">
              <Text fw={700} size="xl">
                {vacancy.salary
                  ? `${vacancy.salary.from?.toLocaleString() || 0} – ${vacancy.salary.to?.toLocaleString() || 0} ${vacancy.salary.currency}`
                  : "Зарплата не указана"}
              </Text>
            </Group>

            <Group gap="sm" mt="xs">
              <Group gap={4} c="dimmed">
                <IconBriefcase size={16} />
                <Text size="sm">
                  {vacancy.experience?.name || "Опыт не указан"}
                </Text>
              </Group>
              <Group gap={4} c="dimmed">
                <IconMapPin size={16} />
                <Text size="sm">{vacancy.area?.name}</Text>
              </Group>
            </Group>

            <Text fw={500} mt="sm">
              {vacancy.employer?.name}
            </Text>

            <Badge color="indigo" variant="light" radius="sm" mt={5}>
              {vacancy.schedule?.name || "полный день"}
            </Badge>

            <Button
              component="a"
              href={vacancy.alternate_url || "https://hh.ru"}
              target="_blank"
              mt="xl"
              color="dark"
              radius="md"
              size="md"
              style={{ alignSelf: "flex-start" }}
              rightSection={<IconExternalLink size={18} />}
            >
              Откликнуться на hh.ru
            </Button>
          </Stack>
        </Paper>

        <Paper withBorder p="xl" radius="md" shadow="sm">
          <Title order={3} mb="md">
            Описание вакансии
          </Title>

          <Divider mb="lg" />

          <Stack gap="md">
            <section>
              <Text
                size="md"
                style={{ lineHeight: 1.7 }}
                dangerouslySetInnerHTML={{
                  __html: `
                    <p style="margin-bottom: 8px;"><strong>Обязанности и требования:</strong></p>
                    ${vacancy.snippet?.responsibility || "Описание обязанностей отсутствует."}
                    <br/><br/>
                    ${vacancy.snippet?.requirement || "Требования не указаны."}
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
