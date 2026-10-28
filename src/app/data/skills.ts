export interface SkillGroup {
  id: string;
  title: string;
  note: string;
  primary?: boolean;
  /** Core = used daily and in depth. Working = used in real projects, not a specialty. */
  core: string[];
  working: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend engineering',
    note: '',
    primary: true,
    core: ['Angular (standalone, signals)', 'NgRx Signal Store', 'TypeScript', 'RxJS', 'AngularJS', 'React', 'PrimeNG', 'HTML5 / CSS3', 'jQuery'],
    working: [],
  },
  {
    id: 'backend',
    title: 'Backend and APIs',
    note: '',
    core: ['C#', 'ASP.NET MVC', '.NET Core / .NET 6+', 'Web API', 'Node.js', 'Go', 'Java / Spring Boot', 'JWT, Clerk, OData'],
    working: [],
  },
  {
    id: 'data',
    title: 'Databases',
    note: '',
    core: ['SQL Server', 'PostgreSQL / Supabase', 'MySQL', 'Oracle (PL/SQL)', 'Query optimisation', 'Stored procedures'],
    working: [],
  },
  {
    id: 'delivery',
    title: 'Reporting and tools',
    note: '',
    core: ['Crystal Reports', 'RDLC', 'Chart.js', 'Excel import / export', 'Git', 'IIS', 'cPanel / VPS', 'Postman', 'Electron', 'WordPress'],
    working: [],
  },
];
