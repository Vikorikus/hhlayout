import { Container, Group, Text, UnstyledButton } from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";
import classes from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={classes.header}>
      <Container size="xl" h="100%">
        <Group justify="space-between" h="100%">
          <Group gap={4}>
            <Text fw={900} size="xl" c="red.6" style={{ letterSpacing: -1 }}>
              hh
            </Text>
            <Text fw={700} size="lg">
              .FrontEnd
            </Text>
          </Group>

          <Group gap="xl">
            <UnstyledButton className={classes.activeLink}>
              <Group gap={6}>
                <Text fw={600} size="sm">
                  Вакансии FE
                </Text>
                <div className={classes.dot} />
              </Group>
            </UnstyledButton>

            <UnstyledButton className={classes.link}>
              <Group gap={6}>
                <IconUserCircle size={18} stroke={1.5} />
                <Text fw={600} size="sm">
                  Обо мне
                </Text>
              </Group>
            </UnstyledButton>
          </Group>

          <div style={{ width: 120 }} />
        </Group>
      </Container>
    </header>
  );
};
