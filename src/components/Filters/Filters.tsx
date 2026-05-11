import { useState, useMemo, useEffect } from "react";
import {
  Paper,
  Text,
  TextInput,
  ActionIcon,
  PillsInput,
  Pill,
  Stack,
  Group,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useSearchParams } from "react-router-dom";

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

  const updateUrl = (newSkills: string[]) => {
    const params = new URLSearchParams(searchParams);

    if (newSkills.length > 0) {
      params.set("skills", newSkills.join(","));
    } else {
      params.delete("skills");
    }

    params.delete("page");

    setSearchParams(params, { replace: true });
  };

  const handleAddSkill = () => {
    const trimmed = currentSkill.trim().toLowerCase();
    if (trimmed && !skills.includes(trimmed)) {
      const newSkills = [...skills, trimmed];
      setSkills(newSkills);
      setCurrentSkill("");
      updateUrl(newSkills);
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const newSkills = skills.filter((s) => s !== skillToRemove);
    setSkills(newSkills);
    updateUrl(newSkills);
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
    </Stack>
  );
};
