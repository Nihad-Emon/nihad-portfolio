export interface ExperienceItem {
  org: string;
  orgDetail?: string;
  title: string;
  focus: string;
  period: string;
  points: string[];
  projects?: string[]; // project slugs
}

/** Newest first. */
export const EXPERIENCE: ExperienceItem[] = [
  {
    org: 'HurPal',
    orgDetail: 'Remote',
    title: 'Freelance Full Stack Developer',
    focus: 'SaaS CRM and warehouse products',
    period: 'Dec 2025 – Present',
    points: [
      'Building a SaaS CRM on Angular, Supabase, Go and Clerk.',
      'Built warehouse-management features and reports.',
    ],
    projects: ['hurpal-crm', 'rimal-fastpack'],
  },
  {
    org: 'McDoaw',
    orgDetail: 'Microsoft Dynamics consultancy · Remote',
    title: 'Freelance Full Stack Developer',
    focus: 'WordPress and frontend',
    period: 'Dec 2025 – Present',
    points: ['Built WordPress landing and service pages, including an interactive savings simulator.'],
    projects: ['mcdoaw-web'],
  },
  {
    org: 'Square InformatiX Ltd.',
    orgDetail: 'Square Group · Dhaka',
    title: 'Programmer',
    focus: 'Enterprise HR and business systems',
    period: 'Apr 2023 – Present',
    points: [
      'Develop and maintain enterprise HR, recruitment, performance, billing and document systems used across Square Group companies.',
      'Leading the HRMS migration to standalone Angular and .NET Core.',
      'Built a payslip API for the group’s mobile app on .NET 6.',
      'Own IIS deployments, reporting and production support.',
    ],
    projects: ['enterprise-hrms'],
  },
  {
    org: 'Quantsys',
    orgDetail: 'USA · Remote',
    title: 'Java Developer',
    focus: 'Backend services',
    period: 'Jun 2022 – Feb 2023',
    points: ['Developed and debugged backend services with Java, Spring Boot and MySQL; tested APIs with Postman.'],
  },
  {
    org: 'NSoftBD',
    orgDetail: 'My software company · Dhaka',
    title: 'Founder',
    focus: 'Products and client builds',
    period: '',
    points: [
      'Design, build and host the company’s own products.',
      'Deliver websites and web apps for clients.',
    ],
    projects: ['fixdeskbd', 'zolojog', 'velox-lifestyle'],
  },
];
