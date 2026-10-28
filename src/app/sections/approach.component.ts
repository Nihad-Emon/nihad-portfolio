import { Component } from '@angular/core';
import { RevealDirective, SpotlightDirective, TiltDirective } from '../shared/motion.directives';

@Component({
  selector: 'app-approach',
  imports: [RevealDirective, SpotlightDirective, TiltDirective],
  template: `
    <section class="section" id="approach" aria-labelledby="approach-title">
      <div class="container">
        <header class="section-head" reveal>
          <div>
            <span class="eyebrow">Approach</span>
            <h2 id="approach-title">How I work.</h2>
          </div>
          <p>Four habits I come back to on every project.</p>
        </header>
        <ol class="steps">
          @for (s of steps; track s.title; let i = $index) {
            <li class="card-surface" spot tilt="5" [reveal]="i * 110">
              <span class="icon" aria-hidden="true">{{ i + 1 }}</span>
              <h3>{{ s.title }}</h3>
              <p>{{ s.body }}</p>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
  styles: `
    h2 { font-size: var(--step-3); }
    .steps { list-style: none; margin: 0; padding: 0; display: grid; gap: 1rem; counter-reset: s; }
    @media (min-width: 640px) { .steps { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1020px) { .steps { grid-template-columns: repeat(4, 1fr); } }
    li { padding: 1.6rem; display: flex; flex-direction: column; gap: .6rem; }
    .icon { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 12px; margin-bottom: .6rem;
      font: 600 .95rem/1 var(--mono); color: var(--accent-ink); background: var(--grad); }
    h3 { font-size: 1.15rem; }
    p { color: var(--muted); font-size: .95rem; }
  `,
})
export class ApproachComponent {
  protected steps = [
    { title: 'Understand', body: 'Start with the problem and the people before any code.' },
    { title: 'Build well', body: 'Reusable components and patterns the next person can read.' },
    { title: 'Design for users', body: 'Make complex workflows feel simple and clear.' },
    { title: 'Keep improving', body: 'Iterate on feedback and weigh trade-offs carefully.' },
  ];
}
