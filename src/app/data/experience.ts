export interface ExperienceItem {
  org: string;
  orgDetail?: string;
  title: string;
  focus: string;
  period: string;
  points: string[];
  projects?: string[]; // project slugs
}

/** Oldest first, so the timeline reads left to right. */
export const EXPERIENCE: ExperienceItem[] = [
  {
    org: 'Quantsys',
    orgDetail: 'USA · Remote',
    title: 'Java Developer',
    focus: 'Backend services',
    period: 'Jun 2022 – Feb 2023',
    points: ['Developed and debugged backend services with Java, Spring Boot and MySQL; tested APIs with Postman.'],
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
    org: 'International clients',
    orgDetail: 'Remote',
    title: 'Freelance Full Stack Developer',
    focus: 'SaaS, warehouse and web projects',
    period: 'Dec 2025 – Present',
    points: [
      'Building a SaaS CRM on Angular, Supabase, Go and Clerk.',
      'Built warehouse-management features and reports.',
      'Built WordPress landing and service pages for a Microsoft Dynamics consultancy.',
    ],
    projects: ['hurpal-crm', 'rimal-fastpack', 'mcdoaw-web'],
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
