# Nihad Hasan Emon — Portfolio

Angular 20 (standalone components, signals, zoneless) portfolio site. No backend required.

## Run it

```bash
npm install
npm start            # http://localhost:4200
npm run build        # production build in dist/portfolio/browser
```

## Edit your content

Everything you'd change lives in `src/app/data/`:

| File | What's in it |
| --- | --- |
| `site.ts` | Name, email, LinkedIn, GitHub, resume path, photo, "open to work" flag |
| `projects.ts` | Every project, its label (Professional work / Client project / Product / Personal project), status, case-study text and links |
| `experience.ts` | Employers, job titles, dates and responsibilities |
| `skills.ts` | Skill groups, split into core and working knowledge |

Empty values are hidden automatically, so nothing ever shows as a dead link.

### Things to fill in before going live

1. **Job titles and dates** in `experience.ts` (`title` and `period`).
2. **LinkedIn, GitHub and resume** in `site.ts`. For the resume, put `resume.pdf` in `public/` and set `resumeUrl: 'resume.pdf'`.
3. **Email**: currently `info@nsoftbd.com`. Swap in a personal address if you prefer.
4. **Stack details** for Zolojog, Rail Chalak and ShipKoro, which are left minimal.

### Adding real screenshots and logos

Project cards show labelled, illustrative mockups by default. To use a real screenshot:

1. Save it as `public/images/projects/fixdesk.webp` (16:10 works best).
2. Set `cover: 'images/projects/fixdesk.webp'` on that project in `projects.ts`.

The "Illustrative" label disappears automatically when a real image is used.
Keep the HRMS project illustrative: it's marked `confidential`.

### Adding a project

Copy an entry in `projects.ts`, give it a unique `slug`, and pick a `mockup`
variant (`hrms`, `crm`, `helpdesk`, `social`, `shop`, `warehouse`, `landing`,
`rail`, `orders`, `calendar`). Set `featured: true` to show it as a large row.

## Deploying

The build is static. Upload `dist/portfolio/browser` to any host.
Because case studies use real URLs (`/projects/fixdeskbd`), the host must
send unknown paths to `index.html`:

- **cPanel / Apache**: add an `.htaccess` (included in `public/`).
- **Netlify**: a `_redirects` file is included in `public/`.
- **Vercel / Cloudflare Pages**: SPA fallback is on by default.

`npm run build -- --configuration preview` produces a hash-routed build for
hosts that can't do SPA fallback.

## Structure

```
src/app/
  data/        content (edit these)
  core/        theme, section scrolling, icons
  layout/      nav, footer
  sections/    hero, about, skills, projects, experience, approach, beyond, contact
  pages/       home and project case-study pages
  shared/      illustrative mockups, project visual, icon
```
