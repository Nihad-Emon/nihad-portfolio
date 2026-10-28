import { Component } from '@angular/core';
import { IconComponent } from '../shared/icon.component';
import { RevealDirective, SpotlightDirective, TiltDirective } from '../shared/motion.directives';

@Component({
  selector: 'app-services',
  imports: [IconComponent, RevealDirective, SpotlightDirective, TiltDirective],
  template: `
    <section class="section" id="services" aria-labelledby="services-title">
      <div class="container">
        <header class="section-head" reveal>
          <div>
            <span class="eyebrow">What I do</span>
            <h2 id="services-title">Where I can help.</h2>
          </div>
          <p>Three areas where I do my best work.</p>
        </header>

        <ul class="cards">
          @for (s of services; track s.title; let i = $index) {
            <li class="card-surface" spot tilt="5" [reveal]="i * 110">
              <span class="icon" aria-hidden="true"><app-icon [name]="s.icon" /></span>
              <h3>{{ s.title }}</h3>
              <p>{{ s.body }}</p>
              <ul class="tags">@for (t of s.tags; track t) { <li>{{ t }}</li> }</ul>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  styles: `
    h2 { font-size: var(--step-3); }
    .cards { list-style: none; margin: 0; padding: 0; display: grid; gap: 1.25rem; }
    @media (min-width: 860px) { .cards { grid-template-columns: repeat(3, 1fr); } }
    .cards > li { padding: 1.9rem; display: flex; flex-direction: column; gap: .7rem; }
    .icon { display: grid; place-items: center; width: 52px; height: 52px; border-radius: 16px; margin-bottom: .8rem; --icon-size: 24px;
      color: var(--accent); background: var(--accent-soft); border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
      transition: transform .4s var(--ease), background-color .3s, color .3s; }
    .cards > li:hover .icon { transform: rotate(-6deg) scale(1.08); background: var(--accent); color: var(--accent-ink); }
    h3 { font-size: 1.3rem; }
    p { color: var(--muted); }
    .tags { list-style: none; margin: auto 0 0; padding: 1rem 0 0; display: flex; flex-wrap: wrap; gap: .4rem; }
    .tags li { font: 400 .78rem/1 var(--mono); color: var(--muted); padding: .4rem .6rem; border-radius: 6px; border: 1px solid var(--line); }
  `,
})
export class ServicesComponent {
  protected services = [
    { icon: 'code' as const, title: 'Frontend Engineering', body: 'Fast, accessible and well-structured interfaces that feel effortless to use.', tags: ['Angular', 'TypeScript', 'UI systems'] },
    { icon: 'layers' as const, title: 'Full-stack Development', body: 'Features built end to end, from the screen through the API to the data.', tags: ['.NET', 'REST APIs', 'Integration'] },
    { icon: 'database' as const, title: 'Enterprise Solutions', body: 'Dependable business software, modernised carefully and built to last.', tags: ['Databases', 'Reporting', 'Modernisation'] },
  ];
}
