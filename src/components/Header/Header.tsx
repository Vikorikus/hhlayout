import { Container, Group, Text, UnstyledButton } from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";
import { NavLink, Link } from "react-router-dom";
import classes from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={classes.header}>
      <Container size="xl" h="100%">
        <Group justify="space-between" h="100%">
          <UnstyledButton
            component={Link}
            to="/vacancies"
            className={classes.logoButton}
          >
            <Group gap={4}>
              <Text fw={900} size="xl" c="red.6" style={{ letterSpacing: -1 }}>
                hh
              </Text>
              <Text fw={700} size="lg">
                .FrontEnd
              </Text>
            </Group>
          </UnstyledButton>

          <Group gap="xl">
            <NavLink
              to="/vacancies"
              className={({ isActive }) =>
                isActive
                  ? `${classes.link} ${classes.activeLink}`
                  : classes.link
              }
              style={{ textDecoration: "none" }}
            >
              {({ isActive }) => (
                <Group gap={6}>
                  <Text fw={600} size="sm">
                    Вакансии FE
                  </Text>

                  {isActive && <div className={classes.dot} />}
                </Group>
              )}
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? `${classes.link} ${classes.activeLink}`
                  : classes.link
              }
              style={{ textDecoration: "none" }}
            >
              {({ isActive }) => (
                <Group gap={6}>
                  <IconUserCircle size={18} stroke={1.5} />
                  <Text fw={600} size="sm">
                    Обо мне
                  </Text>

                  {isActive && <div className={classes.dot} />}
                </Group>
              )}
            </NavLink>
          </Group>

          <div style={{ width: 120 }} />
        </Group>
      </Container>
    </header>
  );
};
