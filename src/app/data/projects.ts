export type ProjectKind = 'Professional work' | 'Client project' | 'Product' | 'Personal project';
export type ProjectCategory = 'enterprise' | 'products' | 'client' | 'personal';
export type ProjectStatus = 'Live' | 'In development' | 'Ongoing' | '';
export type MockupVariant =
  | 'hrms' | 'crm' | 'helpdesk' | 'social' | 'shop'
  | 'warehouse' | 'landing' | 'rail' | 'orders' | 'calendar';

export interface Project {
  slug: string;
  /** Generic name used on the home page instead of the product name. */
  alias: string;
  title: string;
  org?: string;
  kind: ProjectKind;
  category: ProjectCategory;
  /** Only set what you can confirm. Empty hides the badge. */
  status: ProjectStatus;
  featured?: boolean;
  summary: string;
  /** One short line for cards on the home page. */
  tagline: string;
  /** Used when no `cover` screenshot is set. Always labelled as illustrative. */
  mockup: MockupVariant;
  /** Real screenshot, e.g. 'images/projects/fixdesk.webp'. Replaces the mockup. */
  cover?: string;
  stack: string[];
  overview: string;
  context: string;
  role: string;
  contributions: string[];
  challenges: { title: string; body: string }[];
  links: { label: string; url: string }[];
  confidential?: boolean;
}

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  enterprise: 'Enterprise',
  products: 'Products',
  client: 'Client work',
  personal: 'Personal',
};

export const PROJECTS: Project[] = [
  {
    slug: 'enterprise-hrms',
    alias: 'Enterprise HR Platform',
    title: 'Enterprise HRMS',
    org: 'Square InformatiX',
    kind: 'Professional work',
    category: 'enterprise',
    status: 'Ongoing',
    featured: true,
    summary:
      'HR operations for a large industrial group: overtime planning and approval, leave, attendance and reporting, now moving from AngularJS to modern Angular and .NET Core.',
    tagline: 'Enterprise HR platform for a large industrial group.',
    mockup: 'hrms',
    stack: ['Angular', 'AngularJS', 'TypeScript', 'ASP.NET MVC', '.NET Core', 'Oracle', 'PL/SQL', 'RDLC', 'Crystal Reports', 'IIS'],
    overview:
      'A Human Resource Management System used across the business for day-to-day HR work. I work on both sides of it: keeping the established AngularJS and ASP.NET MVC application healthy, and building its replacement on standalone Angular and .NET Core.',
    context:
      'HR rules in a large organisation are detailed and change often. Overtime has to be planned before it is approved, leave depends on balances held in Oracle, and reports have to match printed formats people already rely on. Any change has to fit workflows that are already in daily use.',
    role: 'Software engineer on the HRMS team, working across frontend, API and database layers.',
    contributions: [
      'Overtime planning and approval screens, including time-format validation in editable tables.',
      'Excel upload and paste-from-spreadsheet entry for bulk HR data.',
      'Report generation with RDLC and Crystal Reports, including layout fixes for wide column sets.',
      'File transfer to the document server over FTP with FluentFTP.',
      'In the new platform: JWT authentication, the sidebar navigation shell and leave-application modules on standalone Angular with signals.',
      'A payslip API for the group’s mobile app on .NET 6, reading Oracle REF CURSOR results.',
    ],
    challenges: [
      {
        title: 'Modernising without stopping the business',
        body: 'The legacy app stays in production while the new one is built. The new Angular app uses standalone components, signals and inject(), with a small HTTP service wrapper for calls that must skip the global interceptors, so modules can move over one at a time.',
      },
      {
        title: 'Loading states across promise chains',
        body: 'Several AngularJS screens chain multiple requests. Making loading indicators reliable meant restructuring those chains so every path, including failures, resets the state.',
      },
      {
        title: 'Production reliability',
        body: 'Diagnosing IIS deployment problems, Oracle connection-pool timeouts (ORA-50000) and keeping Web.config switching between production and development databases predictable.',
      },
    ],
    links: [],
    confidential: true,
  },
  {
    slug: 'hurpal-crm',
    alias: 'SaaS CRM Platform',
    title: 'HurPal CRM',
    org: 'HurPal',
    kind: 'Professional work',
    category: 'enterprise',
    status: 'Ongoing',
    featured: true,
    summary:
      'A SaaS CRM with contact and account management, an email-insights dashboard and a drag-and-drop home dashboard that each user arranges.',
    tagline: 'A multi-tenant SaaS CRM with rich analytics.',
    mockup: 'crm',
    stack: ['Angular', 'TypeScript', 'NgRx Signal Store', 'PrimeNG', 'Chart.js', 'Supabase', 'Go', 'Clerk'],
    overview:
      'HurPal CRM is a multi-tenant SaaS product. I build much of its Angular frontend, from data-heavy record screens to analytics and the public marketing pages.',
    context:
      'Sales teams live in a CRM all day, so record screens must be fast to edit and analytics must be easy to read in each user’s own time zone.',
    role: 'Frontend engineer on the product team.',
    contributions: [
      'Contact and account management with inline editing, tabbed detail pages and PrimeNG tables.',
      'An email-insights dashboard modelled on Resend’s analytics, built with Chart.js and NgRx Signal Store.',
      'A drag-and-drop home dashboard with HubSpot-style widget management, using angular-grid-layout.',
      'Landing page, pricing section, an llms.txt file for AI discoverability, and a status page for HurPal’s products.',
    ],
    challenges: [
      {
        title: 'Time zones in analytics',
        body: 'Email events are stored in UTC but read by users across regions. Aggregations and chart buckets are converted per user with Luxon and date-fns so a “day” means the user’s day.',
      },
      {
        title: 'User-arranged dashboards',
        body: 'Widgets can be added, removed, resized and moved. Layout state is persisted per user so the dashboard comes back exactly as it was left.',
      },
    ],
    links: [],
  },
  {
    slug: 'fixdeskbd',
    alias: 'IT Support Helpdesk',
    title: 'FixDeskBD',
    org: 'NSoftBD',
    kind: 'Product',
    category: 'products',
    status: 'Live',
    featured: true,
    summary:
      'An IT-support helpdesk for offices, factories and support companies: numbered requests with owners and history, response timers, and equipment records.',
    tagline: 'IT-support helpdesk, built and run as a product.',
    mockup: 'helpdesk',
    stack: ['Node.js', 'MySQL', 'JavaScript', 'cPanel'],
    overview:
      'FixDeskBD is an NSoftBD product for teams who handle IT support. It works for a single office or factory, or for a support company serving many client companies from one account, in Bangla and English.',
    context:
      'Many IT teams in Bangladesh still track support requests over phone calls and chat groups, which makes it hard to know who owns a problem, what is overdue and which machines keep failing.',
    role: 'Founder and sole engineer: product design, development and deployment.',
    contributions: [
      'Numbered support requests with an owner and a full history.',
      'Response timers that show what is due and what is overdue.',
      'Records for computers, printers and network devices.',
      'Team reports, Bangla and English interfaces, and a 14-day free trial with no card required.',
      'Deployed as a Node.js app with MySQL on a subdomain of the NSoftBD hosting.',
    ],
    challenges: [
      {
        title: 'One account, many client companies',
        body: 'Support companies need to keep each client’s requests and equipment separate while working from one login, so the data model is organised around client companies from the start.',
      },
      {
        title: 'Two languages, one product',
        body: 'The interface works fully in Bangla and English so it fits both office staff and technical teams.',
      },
    ],
    links: [{ label: 'Visit FixDeskBD', url: 'https://fixdesk.nsoftbd.com' }],
  },
  {
    slug: 'zolojog',
    alias: 'All-in-One Life & Work App',
    title: 'Zolojog',
    org: 'NSoftBD',
    kind: 'Product',
    category: 'products',
    status: '',
    summary:
      'Work, social, family and planning in one app: team chat, tasks, a social feed, baby care, planning and analytics.',
    tagline: 'Work, social and family in a single app.',
    mockup: 'social',
    stack: [],
    overview:
      'Zolojog brings the apps people juggle into one place, under the idea “Where everything connects and flows.” It combines team communication and tasks with a personal side for family and planning.',
    context:
      'People switch between a chat app, a task tool, a social feed and notes for family life. Zolojog asks what it looks like when those live together without becoming cluttered.',
    role: 'Founder: product direction, design and engineering.',
    contributions: [
      'Team chat and task management.',
      'A social feed alongside work spaces.',
      'Family features including baby care, plus planning and analytics.',
    ],
    challenges: [
      {
        title: 'Keeping many features simple',
        body: 'With work, social and family in one product, the information architecture has to keep each area clear and stop it from feeling like several apps glued together.',
      },
    ],
    links: [{ label: 'Visit Zolojog', url: 'https://zolojog.com' }],
  },
  {
    slug: 'velox-lifestyle',
    alias: 'E-commerce Storefront',
    title: 'Velox Lifestyle',
    org: 'Client via NSoftBD',
    kind: 'Client project',
    category: 'client',
    status: 'Live',
    featured: true,
    summary:
      'An online shop for a lifestyle startup selling watches, shoes and accessories, with order confirmation instead of online payment and an admin panel for orders.',
    tagline: 'Online storefront for a lifestyle brand.',
    mockup: 'shop',
    stack: ['Angular', 'Node.js', 'cPanel'],
    overview:
      'A storefront built for a new lifestyle business that wanted to sell online quickly without paying for extra services.',
    context:
      'The business takes payment on delivery, so checkout ends with an order confirmation. It needed to be cheap to host, easy to add new categories to, and work well on phones.',
    role: 'Built end to end through NSoftBD.',
    contributions: [
      'Angular storefront designed for mobile and desktop.',
      'Checkout that ends at order confirmation, with no payment gateway.',
      'Admin panel to review incoming orders.',
      'Node.js backend hosted on standard cPanel hosting.',
    ],
    challenges: [
      {
        title: 'Choosing the right size of stack',
        body: 'A .NET backend was considered and dropped as more than a simple shop needed. Angular with a small Node.js API runs on ordinary shared hosting and keeps running costs low.',
      },
    ],
    links: [{ label: 'Visit veloxlifestyle.com', url: 'https://veloxlifestyle.com' }],
  },
  {
    slug: 'rimal-fastpack',
    alias: 'Warehouse Management Suite',
    title: 'RIMAL FastPack',
    org: 'HurPal',
    kind: 'Professional work',
    category: 'enterprise',
    status: '',
    summary:
      'Warehouse and supply-chain screens: wave selection tables with OData filtering, a FastPack preview and delivery-performance reporting.',
    tagline: 'Warehouse and supply-chain dashboards.',
    mockup: 'warehouse',
    stack: ['Angular', 'TypeScript', 'OData', 'Chart.js'],
    overview: 'RIMAL is a warehouse and supply-chain application in the HurPal product family.',
    context: 'Warehouse teams work with large, constantly changing order sets and need to filter them fast and spot delivery problems early.',
    role: 'Frontend engineer.',
    contributions: [
      'Wave Selections tables with server-side OData filtering.',
      'A FastPack preview component.',
      'A sales shortage report.',
      'On-time-delivery bubble and bar charts.',
    ],
    challenges: [
      {
        title: 'Filtering large data on the server',
        body: 'Filters are translated into OData queries so the server does the heavy work and the table stays responsive.',
      },
    ],
    links: [],
  },
  {
    slug: 'mcdoaw-web',
    alias: 'Marketing Website',
    title: 'McDoaw web',
    org: 'McDoaw',
    kind: 'Client project',
    category: 'client',
    status: 'Live',
    summary:
      'Campaign landing page with a savings simulator, and Salesforce and HubSpot service pages for a Microsoft Business Central consultancy.',
    tagline: 'Marketing site and campaign pages.',
    mockup: 'landing',
    stack: ['WordPress', 'React', 'HTML', 'CSS', 'Google Tag Manager', 'Contact Form 7'],
    overview: 'Frontend and WordPress work for McDoaw’s marketing site.',
    context: 'Marketing pages need to look consistent with the rest of the site, track properly and be editable inside WordPress.',
    role: 'Frontend developer.',
    contributions: [
      'Campaign landing page with an interactive savings simulator, converted from React into WordPress.',
      'Salesforce and HubSpot service pages matching the existing service-page design.',
      'Tag Manager integration, Contact Form 7 customisation and thank-you page design.',
    ],
    challenges: [
      {
        title: 'React inside WordPress',
        body: 'The simulator was first built in React, then converted so it runs inside WordPress while keeping its behaviour.',
      },
    ],
    links: [
      { label: 'Salesforce page', url: 'https://mcdoaw.com/salesforce/' },
      { label: 'HubSpot page', url: 'https://mcdoaw.com/hubspot/' },
    ],
  },
  {
    slug: 'shipkoro',
    alias: 'Order Management Tool',
    title: 'ShipKoro',
    org: 'NSoftBD',
    kind: 'Product',
    category: 'products',
    status: 'In development',
    summary:
      'Order management for Facebook-page sellers in Bangladesh: order capture, courier booking, fraud checks and cash-on-delivery tracking.',
    tagline: 'Order management for online sellers.',
    mockup: 'orders',
    stack: ['.NET'],
    overview: 'ShipKoro is an NSoftBD product for F-commerce sellers who take orders through Facebook pages.',
    context:
      'Page sellers collect orders in chat, book couriers by hand and lose money on fake orders and unpaid COD. ShipKoro brings that into one workflow.',
    role: 'Founder and engineer.',
    contributions: ['Order capture', 'Courier booking', 'Fraud checks', 'Cash-on-delivery tracking'],
    challenges: [],
    links: [],
  },
  {
    slug: 'caltaskbd',
    alias: 'Desktop Calendar App',
    title: 'CalTaskBD',
    org: 'NSoft',
    kind: 'Product',
    category: 'products',
    status: 'In development',
    summary:
      'A Windows desktop calendar and reminders app that knows Bangladesh’s holidays, with an experimental mode that runs as the desktop wallpaper.',
    tagline: 'Desktop calendar with local holidays.',
    mockup: 'calendar',
    stack: ['Electron', 'JavaScript', 'Rust (native module)'],
    overview: 'A desktop calendar and reminder app for Windows built with Electron.',
    context: 'General calendar apps don’t show Bangladesh’s public holidays out of the box.',
    role: 'Solo developer.',
    contributions: [
      'Calendar and reminders with Bangladesh holidays built in.',
      'An experimental “set as desktop background” mode that renders behind the desktop icons.',
    ],
    challenges: [
      {
        title: 'Rendering behind desktop icons',
        body: 'The wallpaper mode relies on a native module that needs Rust and the MSVC build tools to compile on Windows.',
      },
    ],
    links: [],
  },
];
