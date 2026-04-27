import { render, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { VacancyCard } from "./VacancyCard";
import { describe, it, expect } from "vitest";
import type { Vacancy } from "../../Types/vacancy";

const mockVacancy: Vacancy = {
  id: "1",
  name: "Frontend Developer",
  salary: { from: 100000, to: 150000, currency: "RUR" },
  experience: { name: "От 1 года до 3 лет" },
  employer: { name: "Best Company" },
  area: { name: "Москва" },
  employment: { type: "Full-time" },
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MantineProvider>{children}</MantineProvider>
);

describe("VacancyCard Component", () => {
  it("должен корректно отображать название вакансии и компанию", () => {
    render(<VacancyCard vacancy={mockVacancy} />, { wrapper });

    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    expect(screen.getByText("Best Company")).toBeInTheDocument();
  });

  it("должен правильно форматировать зарплату", () => {
    render(<VacancyCard vacancy={mockVacancy} />, { wrapper });

    expect(screen.getByText(/100.*000.*150.*000.*₽/i)).toBeInTheDocument();
  });

  it("должен иметь корректную ссылку для отклика", () => {
    render(<VacancyCard vacancy={mockVacancy} />, { wrapper });
    const link = screen.getByRole("link", { name: /откликнуться/i });
    expect(link).toHaveAttribute("href", "https://hh.ru/vacancy/1");
    expect(link).toHaveAttribute("target", "_blank");
  });
});
