import { Paper, Text, Group, Button, Badge, Stack } from "@mantine/core";
import type { Vacancy } from "../../Types/vacancy";
import { Link } from "react-router-dom";

interface VacancyCardProps {
  vacancy: Vacancy;
}

export const VacancyCard = ({ vacancy }: VacancyCardProps) => {
  // 1. Улучшенная логика отображения зарплаты (с проверками на null)
  const renderSalary = () => {
    if (!vacancy.salary) return "Зарплата не указана";

    const { from, to, currency } = vacancy.salary;
    const curr = currency === "RUR" ? "₽" : currency;

    if (from && to)
      return `${from.toLocaleString()} – ${to.toLocaleString()} ${curr}`;
    if (from) return `от ${from.toLocaleString()} ${curr}`;
    if (to) return `до ${to.toLocaleString()} ${curr}`;

    return "Зарплата не указана";
  };

  const getBadgeStyle = (type: string = "") => {
    const t = type.toLowerCase();
    if (t.includes("удалён") || t.includes("удален") || t.includes("remote")) {
      return { backgroundColor: "#4263EB", color: "#FFFFFF" };
    }
    if (t.includes("офис")) {
      return { backgroundColor: "rgba(15, 15, 16, 0.1)", color: "#0F0F10" };
    }
    return { backgroundColor: "#F1F3F5", color: "#495057" };
  };

  const internalLink = `/vacancies/${vacancy.id}`;

  return (
    <Paper withBorder p={24} radius={12} bg="white" style={{ width: "100%" }}>
      <Stack gap={12} align="flex-start">
        <Text
          component={Link}
          to={internalLink}
          fw={700}
          size="24px"
          c="indigo.6"
          style={{
            cursor: "pointer",
            lineHeight: 1.2,
            textAlign: "left",
            textDecoration: "none",
          }}
        >
          {vacancy.name}
        </Text>

        <Group gap={12} align="center">
          <Text fw={700} size="18px">
            {renderSalary()}
          </Text>

          <Text size="16px" c="dimmed">
            {vacancy.experience?.name ?? "Опыт не указан"}
          </Text>
        </Group>

        <Stack gap={4} align="flex-start">
          <Text fw={500} size="16px" c="gray.6">
            {vacancy.employer?.name ?? "Компания не указана"}
          </Text>
          {vacancy.schedule?.name && (
            <Badge
              variant="filled"
              radius="4px"
              size="sm"
              tt="uppercase"
              px={8}
              styles={{ root: getBadgeStyle(vacancy.schedule.name) }}
            >
              {vacancy.schedule.name}
            </Badge>
          )}
        </Stack>

        <Text size="18px" fw={400} style={{ textAlign: "left" }}>
          {vacancy.area?.name ?? "Город не указан"}
        </Text>

        <Group mt={12} gap="md">
          <Button
            component={Link}
            to={internalLink}
            color="dark.8"
            radius="8px"
            h={42}
            px={24}
            fw={500}
          >
            Смотреть вакансию
          </Button>

          <Button
            variant="filled"
            color="gray.2"
            c="dark.8"
            radius="8px"
            h={42}
            px={24}
            fw={500}
            component="a"
            href={
              vacancy.alternate_url || `https://hh.ru/vacancy/${vacancy.id}`
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            Откликнуться на HH
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
};
