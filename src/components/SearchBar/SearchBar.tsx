import { Title, Text, Group, TextInput, Button, Stack } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("text") || "");

  useEffect(() => {
    setQuery(searchParams.get("text") || "");
  }, [searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);

    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      params.set("text", trimmedQuery);
    } else {
      params.delete("text");
    }

    params.delete("page");

    setSearchParams(params, { replace: true });
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
