// src/mockData.ts

export interface MockVacancy {
  id: string;
  name: string;
  employer: { name: string };
  salary: { from: number | null; to: number | null; currency: string } | null;
  area: { name: string };
  snippet: { requirement: string | null; responsibility: string | null };
  experience: { name: string };
  schedule: { name: string } | null; // Поле для графика работы
}

export const mockVacanciesResponse: {
  items: MockVacancy[];
  found: number;
  pages: number;
  page: number;
  per_page: number;
} = {
  items: [
    // 1-я вакансия из макета
    {
      id: "1",
      name: "Frontend разработчик в EdTech продукт",
      employer: { name: "Kata Academy" },
      salary: { from: 80000, to: 170000, currency: "RUR" },
      area: { name: "Набережные Челны" },
      snippet: { requirement: null, responsibility: null },
      experience: { name: "Опыт 1-3 года" },
      schedule: { name: "можно удалённо" },
    },
    // 2-я вакансия из макета
    {
      id: "2",
      name: "Frontend разработчик в казино",
      employer: { name: "777" },
      salary: { from: 30000, to: 970000, currency: "RUR" },
      area: { name: "Уфа" },
      snippet: { requirement: null, responsibility: null },
      experience: { name: "Без опыта" },
      schedule: { name: "офис" },
    },
    // 3-я вакансия из макета
    {
      id: "3",
      name: "Frontend разработчик в стартап",
      employer: { name: "Точно Стрельнет" },
      salary: { from: 15000, to: 20000, currency: "RUR" },
      area: { name: "Замоскворечье" },
      snippet: { requirement: null, responsibility: null },
      experience: { name: "Без опыта" },
      schedule: { name: "гибрид" },
    },
    // ---- Повторяем для объема (4-6) ----
    {
      id: "4",
      name: "Frontend разработчик в EdTech продукт",
      employer: { name: "Kata Academy" },
      salary: { from: 80000, to: 170000, currency: "RUR" },
      area: { name: "Набережные Челны" },
      snippet: { requirement: null, responsibility: null },
      experience: { name: "Опыт 1-3 года" },
      schedule: { name: "можно удалённо" },
    },
    {
      id: "5",
      name: "Frontend разработчик в казино",
      employer: { name: "777" },
      salary: { from: 30000, to: 970000, currency: "RUR" },
      area: { name: "Уфа" },
      snippet: { requirement: null, responsibility: null },
      experience: { name: "Без опыта" },
      schedule: { name: "офис" },
    },
    {
      id: "6",
      name: "Frontend разработчик в стартап",
      employer: { name: "Точно Стрельнет" },
      salary: { from: 15000, to: 20000, currency: "RUR" },
      area: { name: "Замоскворечье" },
      snippet: { requirement: null, responsibility: null },
      experience: { name: "Без опыта" },
      schedule: { name: "гибрид" },
    },
    // ---- Генерируем еще 24 разных вакансии для объема ----
    ...Array.from({ length: 24 }).map((_, i) => {
      const id = (i + 7).toString();
      const roles = [
        "Senior React Developer",
        "Frontend Engineer",
        "React-Native Developer",
        "Middle Frontend Team Lead",
      ];
      const companies = [
        "Yandex",
        "Mail.ru",
        "Skb Kontur",
        "Alfa Bank",
        "Tinkoff",
      ];
      const areas = [
        "Москва",
        "Санкт-Петербург",
        "Екатеринбург",
        "Удаленно",
        "Новосибирск",
      ];
      const schedules = ["можно удалённо", "офис", "гибрид"];
      const experiences = [
        "Опыт 3-6 лет",
        "Опыт 1-3 года",
        "Без опыта",
        "Опыт более 6 лет",
      ];

      const salaryFrom =
        Math.floor(Math.random() * (250000 - 50000 + 1)) + 50000;
      const salaryTo =
        salaryFrom + Math.floor(Math.random() * (100000 - 30000 + 1)) + 30000;

      return {
        id,
        name: roles[Math.floor(Math.random() * roles.length)],
        employer: {
          name: companies[Math.floor(Math.random() * companies.length)],
        },
        salary: { from: salaryFrom, to: salaryTo, currency: "RUR" },
        area: { name: areas[Math.floor(Math.random() * areas.length)] },
        snippet: {
          requirement:
            "Уверенное знание React, TypeScript, Redux Toolkit. FSD архитектура будет плюсом.",
          responsibility:
            "Разработка новых компонентов UI-кита, участие в код-ревью.",
        },
        experience: {
          name: experiences[Math.floor(Math.random() * experiences.length)],
        },
        schedule: {
          name: schedules[Math.floor(Math.random() * schedules.length)],
        },
      };
    }),
  ],
  found: 30,
  pages: 3, // Покажем 3 страницы по 10 вакансий
  page: 0,
  per_page: 10,
};
