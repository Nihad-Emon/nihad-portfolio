import { Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { PROJECTS } from '../data/projects';
import { SITE } from '../data/site';
import { ProjectVisualComponent } from '../shared/project-visual.component';
import { IconComponent } from '../shared/icon.component';

@Component({
  selector: 'app-project-page',
  imports: [RouterLink, ProjectVisualComponent, IconComponent],
  template: `
    @if (project(); as p) {
      <article class="container page">
        <a class="back" routerLink="/"><app-icon name="back" /> All work</a>

        <header class="head">
          <p class="meta">
            <span class="tag">{{ p.kind }}</span>
            @if (p.status) { <span class="status" [attr.data-s]="p.status">{{ p.status }}</span> }
            @if (p.org) { <span class="org">{{ p.org }}</span> }
          </p>
          <h1>{{ p.title }}</h1>
          <p class="summary">{{ p.summary }}</p>
          @if (p.links.length) {
            <div class="links">
              @for (l of p.links; track l.url; let first = $first) {
                <a [class]="first ? 'btn btn-primary' : 'btn btn-ghost'" [href]="l.url" target="_blank" rel="noopener">
                  {{ l.label }} <app-icon name="arrowUpRight" />
                </a>
              }
            </div>
          }
        </header>

        <div class="hero-visual"><app-project-visual [project]="p" /></div>

        @if (p.confidential) {
          <p class="note"><app-icon name="lock" />
            This is internal software. Source code, data and screens are confidential, so the preview above is illustrative.
          </p>
        }

        <div class="body">
          <aside class="facts">
            <dl>
              <div><dt>My role</dt><dd>{{ p.role }}</dd></div>
              @if (p.stack.length) {
                <div><dt>Stack</dt><dd><ul class="stack-list">@for (s of p.stack; track s) { <li>{{ s }}</li> }</ul></dd></div>
              }
            </dl>
          </aside>

          <div class="story">
            <section>
              <h2>Overview</h2>
              <p>{{ p.overview }}</p>
            </section>
            <section>
              <h2>The problem</h2>
              <p>{{ p.context }}</p>
            </section>
            <section>
              <h2>What I built</h2>
              <ul class="bullets">@for (c of p.contributions; track c) { <li>{{ c }}</li> }</ul>
            </section>
            @if (p.challenges.length) {
              <section>
                <h2>Challenges and decisions</h2>
                <div class="challenges">
                  @for (c of p.challenges; track c.title) {
                    <div class="challenge"><h3>{{ c.title }}</h3><p>{{ c.body }}</p></div>
                  }
                </div>
              </section>
            }
          </div>
        </div>

        <nav class="next" aria-label="Next project">
          <span>Next project</span>
          <a [routerLink]="['/projects', next().slug]">{{ next().title }} <app-icon name="arrow" /></a>
        </nav>
      </article>
    } @else {
      <section class="container page missing">
        <h1>That project isn’t here.</h1>
        <p>The link may be out of date. Browse the full list of work instead.</p>
        <a class="btn btn-primary" routerLink="/">Back to all work</a>
      </section>
    }
  `,
  styles: `
    .page { padding-block: clamp(2rem, 5vw, 3.5rem) clamp(4rem, 8vw, 6rem); }
    .back { display: inline-flex; align-items: center; gap: .45rem; color: var(--muted); text-decoration: none; font-weight: 500; --icon-size: 16px; }
    .back:hover { color: var(--text); }
    .head { margin-top: 2.5rem; max-width: 820px; }
    .meta { display: flex; flex-wrap: wrap; align-items: center; gap: .5rem 1rem; margin-bottom: 1.25rem; }
    .org { color: var(--faint); font-size: .88rem; }
    h1 { font-size: var(--step-4); letter-spacing: -.045em; line-height: 1.02; }
    .summary { color: var(--muted); font-size: var(--step-1); margin-top: 1.25rem; max-width: 60ch; }
    .links { display: flex; flex-wrap: wrap; gap: .75rem; margin-top: 2rem; }
    .hero-visual { margin-top: clamp(2.5rem, 5vw, 4rem); max-width: 1000px; }
    .note { display: flex; gap: .6rem; align-items: flex-start; margin-top: 1.25rem; color: var(--muted); font-size: .9rem; max-width: 70ch; --icon-size: 16px; }
    .note app-icon { margin-top: .2rem; color: var(--faint); }
    .body { display: grid; gap: 3rem; margin-top: clamp(3rem, 6vw, 5rem); }
    @media (min-width: 900px) { .body { grid-template-columns: minmax(0, 4fr) minmax(0, 8fr); gap: 5rem; } .facts { position: sticky; top: calc(var(--nav-h) + 2rem); align-self: start; } }
    dl { margin: 0; display: grid; gap: 1.5rem; }
    dt { color: var(--faint); font-size: .85rem; margin-bottom: .4rem; }
    dd { margin: 0; }
    .story { display: grid; gap: 3rem; max-width: 68ch; }
    h2 { font-size: var(--step-2); margin-bottom: 1rem; }
    .story p { color: var(--muted); font-size: 1.05rem; line-height: 1.7; }
    .bullets { margin: 0; padding: 0; list-style: none; display: grid; gap: .8rem; }
    .bullets li { position: relative; padding-left: 1.4rem; color: var(--muted); }
    .bullets li::before { content: ''; position: absolute; left: 0; top: .7em; width: 7px; height: 7px; border-radius: 2px; background: var(--accent); }
    .challenges { display: grid; gap: 1rem; }
    .challenge { border: 1px solid var(--line); border-radius: 16px; padding: 1.4rem 1.5rem; background: var(--surface); }
    .challenge h3 { font-size: 1.05rem; margin-bottom: .5rem; }
    .challenge p { font-size: .98rem !important; }
    .next { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: baseline; gap: 1rem; margin-top: clamp(4rem, 8vw, 6rem);
      padding-top: 2rem; border-top: 1px solid var(--line); }
    .next span { color: var(--faint); }
    .next a { display: inline-flex; align-items: center; gap: .6rem; font-size: var(--step-2); font-weight: 600; text-decoration: none; letter-spacing: -.02em; --icon-size: 22px; }
    .next a:hover { color: var(--accent); }
    .missing { min-height: 50vh; display: grid; align-content: center; justify-items: start; gap: 1.25rem; }
    .missing p { color: var(--muted); }
  `,
})
export class ProjectPage {
  readonly slug = input<string>('');
  private title = inject(Title);
  private meta = inject(Meta);
  protected project = computed(() => PROJECTS.find(p => p.slug === this.slug()));
  protected next = computed(() => {
    const i = PROJECTS.findIndex(p => p.slug === this.slug());
    return PROJECTS[(i + 1) % PROJECTS.length];
  });

  constructor() {
    effect(() => {
      const p = this.project();
      this.title.setTitle(p ? `${p.title} · ${SITE.shortName}` : `Project not found · ${SITE.shortName}`);
      if (p) this.meta.updateTag({ name: 'description', content: p.summary });
    });
  }
}
