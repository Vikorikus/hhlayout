import { Paper, Text, Group, Button, Badge, Stack } from "@mantine/core";
import type { Vacancy } from "../../Types/vacancy";

interface VacancyCardProps {
  vacancy: Vacancy;
}

export const VacancyCard = ({ vacancy }: VacancyCardProps) => {
  const salaryText = vacancy.salary
    ? `${vacancy.salary.from?.toLocaleString() ?? ""} – ${vacancy.salary.to?.toLocaleString() ?? ""} ₽`
    : "Зарплата не указана";

  const getBadgeStyle = (type: string) => {
    const t = type.toLowerCase();

    if (t.includes("удалён") || t.includes("удален") || t.includes("remote")) {
      return {
        backgroundColor: "#4263EB",
        color: "#FFFFFF",
      };
    }

    if (t.includes("офис")) {
      return {
        backgroundColor: "rgba(15, 15, 16, 0.1)",
        color: "#0F0F10",
      };
    }

    return {
      backgroundColor: "#F1F3F5",
      color: "#495057",
    };
  };

  return (
    <Paper withBorder p={24} radius={12} bg="white" style={{ width: "100%" }}>
      <Stack gap={12} align="flex-start">
        <Text
          fw={700}
          size="24px"
          c="indigo.6"
          style={{ cursor: "pointer", lineHeight: 1.2, textAlign: "left" }}
        >
          {vacancy.name}
        </Text>

        <Group gap={12} align="center">
          <Text fw={700} size="18px">
            {salaryText}
          </Text>
          <Text size="16px" c="dimmed">
            {vacancy.experience?.name}
          </Text>
        </Group>

        <Stack gap={4} align="flex-start">
          <Text fw={500} size="16px" c="gray.6">
            {vacancy.employer?.name}
          </Text>
          {vacancy.schedule && (
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

        {/* Город */}
        <Text size="18px" fw={400} style={{ textAlign: "left" }}>
          {vacancy.area?.name}
        </Text>

        {/* Кнопки */}
        <Group mt={12} gap="md">
          <Button color="dark.8" radius="8px" h={42} px={24} fw={500}>
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
          >
            Откликнуться
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
};
