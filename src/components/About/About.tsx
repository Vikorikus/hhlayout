import { Container, Title, Text, Paper, Stack } from "@mantine/core";

export const AboutPage = () => {
  return (
    <Container size="sm" py={100}>
      <Paper withBorder p={40} radius="lg" shadow="sm">
        <Stack gap="md">
          <Title order={1} size="32px">
            Иван Васильев
          </Title>
          <Text size="lg" c="gray.7" style={{ lineHeight: 1.6 }}>
            Привет! Я — Frontend-разработчик. Пишу приложения на React +
            TypeScript + Redux Toolkit.
          </Text>
        </Stack>
      </Paper>
    </Container>
  );
};
