import { Container, Title, Text, Button, Stack, Image } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import sadCatGif from "../../assets/sadcat.gif";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container size="md" py={80}>
      <Stack align="center" gap="xl">
        <Stack gap="xs" align="center">
          <Title order={1} fw={900} size="34px" ta="center">
            Упс! Такой страницы не существует
          </Title>
          <Text c="dimmed" size="lg" ta="center">
            Давайте перейдем к началу.
          </Text>
        </Stack>

        <Button
          variant="filled"
          color="indigo.6"
          size="md"
          onClick={() => navigate("/vacancies/moscow")}
        >
          На главную
        </Button>

        <Image src={sadCatGif} alt="404 cat" radius="md" maw={600} />
      </Stack>
    </Container>
  );
};
