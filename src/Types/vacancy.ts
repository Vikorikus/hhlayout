export interface Area {
  name: string;
}
export interface Salary {
  from: number | null;
  to: number | null;
  currency: string;
}
export interface Employer {
  name: string;
}

export interface Experience {
  name: string;
}
export interface Employment {
  type: string;
}
export interface Schedule {
  name: string;
}
export interface Vacancy {
  id: string;
  name: string;
  area: Area;
  salary: Salary | null;
  employer: Employer;
  experience: Experience;
  employment: Employment;
  schedule: Schedule;
  alternate_url?: string;
}
