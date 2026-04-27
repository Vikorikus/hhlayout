import { useState, useMemo } from "react";
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
} from "@mantine/core";
import { IconPlus, IconMapPin } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVacancies } from "../Store/Slices/vacancySlice";
import type { AppDispatch, RootState } from "../Store/store";

export const Filters = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { list } = useSelector((state: RootState) => state.vacancies);

  const [skills, setSkills] = useState(["TypeScript", "React", "Redux"]);
  const [currentSkill, setCurrentSkill] = useState("");

  const [selectedCity, setSelectedCity] = useState<string | null>("Все города");

  const areaMap: Record<string, string> = {
    Москва: "1",
    "Санкт-Петербург": "2",
  };

  const citiesForSelect = useMemo(() => {
    const uniqueCities = Array.from(
      new Set(list.map((v) => v.area?.name)),
    ).filter(Boolean) as string[];

    const basic = ["Все города", "Москва", "Санкт-Петербург"];
    return Array.from(new Set([...basic, ...uniqueCities]));
  }, [list]);

  const handleFilterChange = (updatedSkills: string[], city: string | null) => {
    const areaId = city && areaMap[city] ? areaMap[city] : undefined;

    dispatch(
      fetchVacancies({
        text: "",
        page: 0,
        skill_set: updatedSkills,
        area: areaId,
      }),
    );
  };

  const handleAddSkill = () => {
    const trimmed = currentSkill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      const newSkills = [...skills, trimmed];
      setSkills(newSkills);
      setCurrentSkill("");
      handleFilterChange(newSkills, selectedCity);
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const newSkills = skills.filter((s) => s !== skillToRemove);
    setSkills(newSkills);
    handleFilterChange(newSkills, selectedCity);
  };

  const handleCityChange = (value: string | null) => {
    setSelectedCity(value);
    handleFilterChange(skills, value);
  };

  return (
    <Stack gap="md">
      <Paper withBorder p="md" radius="md">
        <Stack gap="xs">
          <Text fw={600} size="sm">
            Ключевые навыки
          </Text>

          <Group gap={8}>
            <TextInput
              placeholder="Навык"
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.currentTarget.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
              style={{ flex: 1 }}
            />
            <ActionIcon
              variant="filled"
              color="indigo.3"
              size="lg"
              onClick={handleAddSkill}
            >
              <IconPlus size={18} />
            </ActionIcon>
          </Group>

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
          variant="default"
        />
      </Paper>
    </Stack>
  );
};
