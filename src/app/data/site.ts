/**
 * Single place to edit personal details.
 * Any link left as an empty string is hidden everywhere on the site,
 * so nothing ever renders as a dead button.
 */
export const SITE = {
  name: 'Md. Nihad Hasan Emon',
  shortName: 'Nihad Hasan Emon',
  role: 'Full Stack Software Engineer',
  location: 'Dhaka, Bangladesh',
  photo: 'images/nihad.webp',

  /** Shown in the contact section and used by the email form. */
  email: 'info@nsoftbd.com',
  /** e.g. 'https://www.linkedin.com/in/your-handle' */
  linkedin: 'https://www.linkedin.com/in/nihad-hasan-emon-1923801a5/',
  /** e.g. 'https://github.com/your-handle' */
  github: 'https://github.com/Nihad-Emon',
  /** Put your PDF in /public (e.g. public/resume.pdf) and set 'resume.pdf'. */
  resumeUrl: '',

  /** Leave false unless you want the "open to opportunities" indicator. */
  openToWork: false,
};

export const HERO_STACK = ['Angular', 'TypeScript', 'JavaScript', 'React', '.NET', 'REST APIs', 'Oracle'];
