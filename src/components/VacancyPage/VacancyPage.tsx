import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
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
} from "@mantine/core";
import { IconChevronLeft, IconExternalLink } from "@tabler/icons-react";
import type { RootState } from "../Store/store";

export const VacancyPage = () => {
  const { id } = useParams<{ id: string }>();

  const vacancy = useSelector((state: RootState) =>
    state.vacancies.list.find((v) => v.id === id),
  );

  if (!vacancy) {
    return (
      <Container size="md" py="xl">
        <Text>Вакансия не найдена. Попробуйте вернуться к списку.</Text>
        <Anchor component={Link} to="/">
          Назад к поиску
        </Anchor>
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
        style={{ display: "flex", alignItems: "center" }}
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
              fullWidth={false}
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
