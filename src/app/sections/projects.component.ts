import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROJECTS, CATEGORY_LABELS, ProjectCategory } from '../data/projects';
import { ProjectVisualComponent } from '../shared/project-visual.component';
import { IconComponent } from '../shared/icon.component';
import { RevealDirective, SpotlightDirective, TiltDirective } from '../shared/motion.directives';

type Filter = 'all' | ProjectCategory;

@Component({
  selector: 'app-projects',
  imports: [RouterLink, ProjectVisualComponent, IconComponent, RevealDirective, SpotlightDirective, TiltDirective],
  template: `
    <section class="section" id="projects" aria-labelledby="projects-title">
      <div class="container">
        <header class="section-head" reveal>
          <div>
            <span class="eyebrow">Work</span>
            <h2 id="projects-title">Selected projects.</h2>
          </div>
          <p>A mix of enterprise systems, products and client builds.</p>
        </header>

        <div class="filters" role="group" aria-label="Filter projects" reveal="80">
          @for (f of filters(); track f.id) {
            <button type="button" [attr.aria-pressed]="filter() === f.id" (click)="filter.set(f.id)">{{ f.label }}</button>
          }
        </div>

        <ul class="cards">
          @for (p of visible(); track p.slug; let i = $index) {
            <li [class.wide]="wide(p.slug)" [reveal]="(i % 3) * 90">
              <a class="card card-surface" spot tilt="4" [routerLink]="['/projects', p.slug]">
                <div class="vis"><app-project-visual [project]="p" /></div>
                <div class="body">
                  <p class="meta">
                    <span class="tag">{{ p.kind }}</span>
                    @if (p.status) { <span class="status" [attr.data-s]="p.status">{{ p.status }}</span> }
                  </p>
                  <h3>{{ p.alias }}</h3>
                  <p class="tagline">{{ p.tagline }}</p>
                  <span class="go">View project <app-icon name="arrow" /></span>
                </div>
              </a>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  styles: `
    h2 { font-size: var(--step-3); }
    .filters { display: flex; flex-wrap: wrap; gap: .5rem; margin-bottom: 2rem; }
    .filters button { font: 500 .88rem/1 var(--font); padding: .65rem 1.05rem; border-radius: 999px; cursor: pointer;
      border: 1px solid var(--line); background: transparent; color: var(--muted); transition: all .25s var(--ease); }
    .filters button:hover { color: var(--text); border-color: var(--line-strong); }
    .filters button[aria-pressed="true"] { background: var(--grad); color: var(--accent-ink); border-color: transparent; }

    .cards { list-style: none; margin: 0; padding: 0; display: grid; gap: 1.25rem; grid-auto-flow: dense;
      grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr)); }
    @media (min-width: 1000px) { .cards { grid-template-columns: repeat(3, 1fr); } .wide { grid-column: span 2; } }
    .cards li { display: flex; }
    .card { display: flex; flex-direction: column; width: 100%; text-decoration: none; padding: .8rem; }
    .vis { border-radius: 14px; overflow: hidden; }
    .vis app-project-visual { transition: transform .7s var(--ease); }
    .card:hover .vis app-project-visual { transform: scale(1.05); }
    .body { display: flex; flex-direction: column; flex: 1; padding: 1.2rem .6rem .5rem; }
    .meta { display: flex; flex-wrap: wrap; align-items: center; gap: .5rem .9rem; margin-bottom: .85rem; }
    h3 { font-size: 1.3rem; }
    .wide h3 { font-size: var(--step-2); }
    .tagline { color: var(--muted); margin-top: .4rem; }
    .go { display: inline-flex; align-items: center; gap: .5rem; margin-top: auto; padding-top: 1.25rem; font-weight: 500; font-size: .92rem; color: var(--accent); --icon-size: 16px; }
    .go app-icon { transition: transform .3s var(--ease); }
    .card:hover .go app-icon { transform: translateX(5px); }
  `,
})
export class ProjectsComponent {
  protected filter = signal<Filter>('all');
  protected visible = computed(() => this.filter() === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === this.filter()));
  protected filters = computed(() => {
    const cats = (Object.keys(CATEGORY_LABELS) as ProjectCategory[])
      .filter(id => PROJECTS.some(p => p.category === id))
      .map(id => ({ id: id as Filter, label: CATEGORY_LABELS[id] }));
    return [{ id: 'all' as Filter, label: 'All' }, ...cats];
  });
  private wideSlugs = PROJECTS.filter(p => p.featured).slice(0, 2).map(p => p.slug);
  protected wide(slug: string) { return this.filter() === 'all' && this.wideSlugs.includes(slug); }
}
