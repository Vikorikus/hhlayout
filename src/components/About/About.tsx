import { Container, Title, Text, Paper, Stack, Divider } from "@mantine/core";

export const About = () => {
  return (
    <Container size="sm" py={60}>
      <Paper withBorder p={40} radius="lg" shadow="sm" bg="white">
        <Stack gap="md">
          <Title order={1} size="32px" fw={700}>
            Виктор Мешков
          </Title>

          <Text size="lg" fw={500} c="indigo.6">
            Frontend-разработчик
          </Text>

          <Divider />

          <Text size="md" c="gray.7" style={{ lineHeight: 1.7 }}>
            Привет! Я - Frontend-разработчик. Пишу приложения на React +
            TypeScript
          </Text>
        </Stack>
      </Paper>
    </Container>
  );
};
