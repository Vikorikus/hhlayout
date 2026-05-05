import { Title, Text, Group, TextInput, Button, Stack } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchVacancies } from "../Store/Slices/vacancySlice";
import type { AppDispatch } from "../Store/store";
import { useSearchParams } from "react-router-dom"; // Импортируем хук

export const SearchBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Инициализируем стейт значением из URL (обратная синхронизация)
  const [query, setQuery] = useState(searchParams.get("text") || "");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 2. Обновляем URL (прямая синхронизация)
    const params = Object.fromEntries(searchParams);
    if (query.trim()) {
      params.text = query;
    } else {
      delete params.text;
    }
    setSearchParams(params);

    // 3. Отправляем запрос, подхватывая остальные фильтры из URL
    dispatch(
      fetchVacancies({
        text: query,
        page: 0,
        // Не забываем про навыки и город, если они уже есть в URL
        area: params.city,
        skill_set: params.skills ? params.skills.split(",") : [],
      }),
    );
  };

  return (
    <Group justify="space-between" align="flex-end" wrap="nowrap">
      <Stack gap={0}>
        <Title order={2} size="32px" fw={700}>
          Список вакансий
        </Title>
        <Text c="dimmed" size="lg">
          по профессии Frontend-разработчик
        </Text>
      </Stack>

      <form onSubmit={handleSearchSubmit} style={{ flex: 1, maxWidth: 600 }}>
        <Group gap="xs">
          <TextInput
            placeholder="Должность или название компании"
            leftSection={<IconSearch size={18} />}
            size="md"
            style={{ flex: 1 }}
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
          <Button type="submit" color="indigo.6" size="md" radius="md" px={30}>
            Найти
          </Button>
        </Group>
      </form>
    </Group>
  );
};
