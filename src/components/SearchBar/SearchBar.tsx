import { Title, Text, Group, TextInput, Button, Stack } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchVacancies } from "../Store/Slices/vacancySlice";
import type { AppDispatch } from "../Store/store";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(
      fetchVacancies({
        text: "",
        skill_set: ["TypeScript", "React", "Redux"],
        page: 0,
      }),
    );
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(fetchVacancies({ text: query, page: 0 }));
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

      <Group gap="xs" style={{ flex: 1, maxWidth: 600 }}>
        <TextInput
          placeholder="Должность или название компании"
          leftSection={<IconSearch size={18} />}
          size="md"
          style={{ flex: 1 }}
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button
          onClick={handleSearch}
          color="indigo.6"
          size="md"
          radius="md"
          px={30}
        >
          Найти
        </Button>
      </Group>
    </Group>
  );
};
