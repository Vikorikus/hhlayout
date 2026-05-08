// src/mockData.ts

export interface MockVacancy {
  id: string;
  name: string;
  employer: { name: string };
  salary: { from: number | null; to: number | null; currency: string } | null;
  area: { name: string };
  snippet: { requirement: string | null; responsibility: string | null };
  experience: { name: string };
  schedule: { name: string } | null;
}

const skillsPool = [
  "React, TypeScript, Redux Toolkit, FSD",
  "JavaScript, HTML5, CSS3, БЭМ",
  "React, JavaScript, SCSS, Styled Components",
  "TypeScript, Next.js, Tailwind CSS",
  "JavaScript, React, Unit-тесты",
  "Frontend, TypeScript, Vue.js",
];

const roles = [
  "Senior React Developer",
  "Frontend Engineer",
  "React-Native Developer",
  "Middle Frontend Developer",
  "Junior Frontend Developer",
];

const companies = [
  "Yandex",
  "Mail.ru",
  "Skb Kontur",
  "Alfa Bank",
  "Tinkoff",
  "Kata Academy",
  "777",
  "Точно Стрельнет",
];

const areas = [
  "Москва",
  "Санкт-Петербург",
  "Екатеринбург",
  "Новосибирск",
  "Казань",
];

const schedules = ["можно удалённо", "офис", "гибрид"];

const experiences = [
  "Опыт 3-6 лет",
  "Опыт 1-3 года",
  "Без опыта",
  "Опыт более 6 лет",
];

export const mockVacanciesResponse = {
  items: [
    // Фиксированные первые 3 вакансии
    {
      id: "1",
      name: "Frontend разработчик в EdTech продукт",
      employer: { name: "Kata Academy" },
      salary: { from: 80000, to: 170000, currency: "RUR" },
      area: { name: "Набережные Челны" },
      snippet: {
        requirement:
          "Опыт работы с React и JavaScript. Понимание современных методологий.",
        responsibility: "Разработка образовательной платформы.",
      },
      experience: { name: "Опыт 1-3 года" },
      schedule: { name: "можно удалённо" },
    },
    {
      id: "2",
      name: "Frontend разработчик в казино",
      employer: { name: "777" },
      salary: { from: 30000, to: 970000, currency: "RUR" },
      area: { name: "Уфа" },
      snippet: {
        requirement: "JavaScript, анимации, работа с Canvas.",
        responsibility: "Создание захватывающих игровых интерфейсов.",
      },
      experience: { name: "Без опыта" },
      schedule: { name: "офис" },
    },
    {
      id: "3",
      name: "Frontend разработчик в стартап",
      employer: { name: "Точно Стрельнет" },
      salary: { from: 15000, to: 20000, currency: "RUR" },
      area: { name: "Замоскворечье" },
      snippet: {
        requirement: "TypeScript, React, желание быстро учиться.",
        responsibility: "Верстка лендингов и логики приложения.",
      },
      experience: { name: "Без опыта" },
      schedule: { name: "гибрид" },
    },
    // Генерируем остальные 27 вакансий БЕЗ рандома
    ...Array.from({ length: 27 }).map((_, i) => {
      const id = (i + 4).toString();

      // Используем остаток от деления (%), чтобы детерминировано выбирать значения из массивов
      const role = roles[i % roles.length];
      const company = companies[i % companies.length];
      const area = areas[i % areas.length];
      const skill = skillsPool[i % skillsPool.length];
      const schedule = schedules[i % schedules.length];
      const exp = experiences[i % experiences.length];

      // Зарплата тоже фиксированная для каждого ID
      const salaryFrom = 50000 + i * 5000;

      return {
        id,
        name: role,
        employer: { name: company },
        salary: { from: salaryFrom, to: salaryFrom + 30000, currency: "RUR" },
        area: { name: area },
        snippet: {
          requirement: skill,
          responsibility: "Разработка и поддержка клиентской части приложения.",
        },
        experience: { name: exp },
        schedule: { name: schedule },
      };
    }),
  ],
  found: 30,
  pages: 3,
  page: 0,
  per_page: 10,
};
