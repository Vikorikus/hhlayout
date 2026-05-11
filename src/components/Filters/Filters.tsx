import { useState, useMemo, useEffect } from "react";
import {
  Paper,
  Text,
  TextInput,
  ActionIcon,
  PillsInput,
  Pill,
  Select,
  Stack,
  Group,
  Button,
} from "@mantine/core";
import { IconPlus, IconMapPin, IconTrash } from "@tabler/icons-react";
import { useSearchParams } from "react-router-dom";
import { areaMap } from "../../Types/areas";

export const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSkills = useMemo(() => {
    const skillsFromUrl = searchParams.get("skills");
    return skillsFromUrl ? skillsFromUrl.split(",") : [];
  }, []);

  const [skills, setSkills] = useState(initialSkills);
  const [currentSkill, setCurrentSkill] = useState("");

  useEffect(() => {
    const skillsFromUrl = searchParams.get("skills");
    setSkills(skillsFromUrl ? skillsFromUrl.split(",") : []);
  }, [searchParams]);

  const selectedCity = searchParams.get("city") || "Все города";

  const citiesForSelect = useMemo(() => {
    const mainCities = Object.keys(areaMap);
    return ["Все города", ...mainCities];
  }, []);

  const updateUrl = (newSkills: string[], cityName: string | null) => {
    const params = new URLSearchParams(searchParams);

    if (newSkills.length > 0) {
      params.set("skills", newSkills.join(","));
    } else {
      params.delete("skills");
    }

    if (!cityName || cityName === "Все города") {
      params.delete("city");
    } else {
      params.set("city", cityName);
    }

    params.delete("page");

    setSearchParams(params, { replace: true });
  };

  const handleCityChange = (value: string | null) => {
    const nextCity = value || "Все города";
    updateUrl(skills, nextCity);
  };

  const handleResetCity = () => {
    updateUrl(skills, "Все города");
  };

  const handleAddSkill = () => {
    const trimmed = currentSkill.trim().toLowerCase();
    if (trimmed && !skills.includes(trimmed)) {
      const newSkills = [...skills, trimmed];
      setSkills(newSkills);
      setCurrentSkill("");
      updateUrl(newSkills, selectedCity);
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const newSkills = skills.filter((s) => s !== skillToRemove);
    setSkills(newSkills);
    updateUrl(newSkills, selectedCity);
  };

  return (
    <Stack gap="md">
      <Paper withBorder p="md" radius="md">
        <Stack gap="xs">
          <Text fw={600} size="sm">
            Ключевые навыки
          </Text>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddSkill();
            }}
          >
            <Group gap={8}>
              <TextInput
                placeholder="Например: react"
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.currentTarget.value)}
                style={{ flex: 1 }}
              />
              <ActionIcon
                variant="filled"
                color="indigo.6"
                size="lg"
                onClick={handleAddSkill}
              >
                <IconPlus size={18} />
              </ActionIcon>
            </Group>
          </form>

          <PillsInput variant="unstyled">
            <Pill.Group>
              {skills.map((skill) => (
                <Pill
                  key={skill}
                  withRemoveButton
                  onRemove={() => handleRemoveSkill(skill)}
                >
                  {skill}
                </Pill>
              ))}
            </Pill.Group>
          </PillsInput>
        </Stack>
      </Paper>

      <Paper withBorder p="md" radius="md">
        <Stack gap="sm">
          <Select
            label={
              <Text fw={600} size="sm" mb={5}>
                Город
              </Text>
            }
            leftSection={<IconMapPin size={16} />}
            placeholder="Выберите город"
            data={citiesForSelect}
            value={selectedCity}
            onChange={handleCityChange}
          />
          {selectedCity !== "Все города" && (
            <Button
              variant="light"
              color="gray"
              size="xs"
              leftSection={<IconTrash size={14} />}
              onClick={handleResetCity}
            >
              Сбросить город
            </Button>
          )}
        </Stack>
      </Paper>
    </Stack>
  );
};
