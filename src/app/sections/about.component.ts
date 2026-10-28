import { Component } from '@angular/core';
import { RevealDirective, SpotlightDirective, TiltDirective } from '../shared/motion.directives';

@Component({
  selector: 'app-about',
  imports: [RevealDirective, SpotlightDirective, TiltDirective],
  template: `
    <section class="section" id="about" aria-labelledby="about-title">
      <div class="container grid">
        <div reveal>
          <span class="eyebrow">About</span>
          <h2 id="about-title">Engineer first, <span class="grad-text">product thinker</span> always.</h2>
          <div class="bio">
            <p>
              I’m a software engineer who enjoys clean interfaces, awkward problems and making everyday
              workflows simpler. I care about maintainable code, thoughtful user experience and understanding
              the business behind every feature.
            </p>
            <p>
              I’ve worked on enterprise platforms, SaaS products and client websites, and I run a small software
              company of my own.
            </p>
          </div>
          <dl class="facts">
            <div><dt>Education</dt><dd>B.Sc. in Computer Science &amp; Engineering</dd></div>
            <div><dt>Languages</dt><dd>Bengali · English</dd></div>
            <div><dt>Work style</dt><dd>Onsite &amp; remote</dd></div>
          </dl>
        </div>

        <ul class="values">
          @for (v of values; track v.title; let i = $index) {
            <li class="card-surface" spot tilt="5" [reveal]="i * 110">
              <span class="num">0{{ i + 1 }}</span>
              <h3>{{ v.title }}</h3>
              <p>{{ v.body }}</p>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  styles: `
    .grid { display: grid; gap: 3.5rem; align-items: center; }
    @media (min-width: 900px) { .grid { grid-template-columns: minmax(0, 6fr) minmax(0, 5fr); gap: 5rem; } }
    h2 { font-size: var(--step-3); margin-bottom: 1.75rem; }
    .bio { display: grid; gap: 1.1rem; font-size: var(--step-1); line-height: 1.7; max-width: 56ch; color: var(--muted); }
    .bio p:first-child { color: var(--text); }
    .facts { display: grid; gap: .1rem; margin: 2rem 0 0; max-width: 56ch; }
    .facts div { display: flex; justify-content: space-between; gap: 1.5rem; padding: .8rem 0; border-top: 1px solid var(--line); font-size: .92rem; }
    .facts dt { color: var(--faint); }
    .facts dd { margin: 0; text-align: right; }
    .values { list-style: none; margin: 0; padding: 0; display: grid; gap: 1rem; }
    .values li { padding: 1.4rem 1.5rem 1.5rem; }
    .num { font: 500 .78rem/1 var(--mono); color: var(--accent); }
    h3 { font-size: 1.15rem; margin: .6rem 0 .35rem; }
    .values p { color: var(--muted); font-size: .95rem; }
  `,
})
export class AboutComponent {
  protected values = [
    { title: 'Frontend craft', body: 'Fast, accessible interfaces built from clear, reusable components.' },
    { title: 'Full-stack reach', body: 'Comfortable from the UI, through the API, down to the database.' },
    { title: 'Business sense', body: 'I build what solves the problem, not just what was asked.' },
  ];
}
