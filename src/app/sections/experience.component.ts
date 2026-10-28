import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EXPERIENCE } from '../data/experience';
import { PROJECTS } from '../data/projects';
import { RevealDirective } from '../shared/motion.directives';

@Component({
  selector: 'app-experience',
  imports: [RouterLink, RevealDirective],
  template: `
    <section class="section" id="experience" aria-labelledby="exp-title">
      <div class="container">
        <header class="section-head" reveal>
          <div>
            <span class="eyebrow">Experience</span>
            <h2 id="exp-title">My journey.</h2>
          </div>
          <p>Select a company to see what I did there.</p>
        </header>

        <div class="timeline" reveal="100">
          <div class="rail" role="tablist" aria-label="Companies" (keydown)="keys($event)">
            <span class="line" aria-hidden="true"><i [style.width.%]="progress()"></i></span>
            @for (e of items; track e.org; let i = $index) {
              <button type="button" role="tab" [id]="'exp-tab-' + i" [attr.aria-selected]="i === active()" [attr.aria-controls]="'exp-panel'"
                      [tabindex]="i === active() ? 0 : -1" [class.past]="i < active()" (click)="active.set(i)">
                <span class="node" aria-hidden="true"></span>
                <span class="name">{{ e.org }}</span>
                @if (e.period) { <span class="when">{{ e.period }}</span> }
              </button>
            }
          </div>

          <div class="detail" id="exp-panel" role="tabpanel" [attr.aria-labelledby]="'exp-tab-' + active()">
            @for (e of [current()]; track e.org) {
              <article>
                <p class="eyebrow-sm">{{ e.period }}{{ e.period && e.orgDetail ? ' · ' : '' }}{{ e.orgDetail }}</p>
                <h3>{{ e.org }}</h3>
                @if (e.title) { <span class="tag">{{ e.title }}</span> }
                <p class="focus">{{ e.focus }}</p>
                @if (e.projects?.length) {
                  <p class="rel">
                    @for (slug of e.projects; track slug) {
                      <a [routerLink]="['/projects', slug]">{{ title(slug) }}</a>
                    }
                  </p>
                }
              </article>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    h2 { font-size: var(--step-3); }
    .rail { position: relative; display: flex; gap: .5rem; overflow-x: auto; padding: 0 0 1.25rem; scrollbar-width: none; }
    @media (min-width: 760px) { .rail { justify-content: space-between; overflow: visible; } }
    .line { position: absolute; left: 0; right: 0; top: 13px; height: 2px; background: var(--line-strong); border-radius: 2px; }
    .line i { display: block; height: 100%; background: var(--grad); border-radius: 2px; transition: width .6s var(--ease); }
    .rail button { position: relative; flex: none; display: flex; flex-direction: column; align-items: center; gap: .9rem; min-width: 130px; padding: 0;
      background: none; border: 0; cursor: pointer; color: var(--muted); font: 500 .95rem/1.2 var(--font); transition: color .25s; }
    @media (min-width: 760px) { .rail button { flex: 1; } .rail button:first-of-type { align-items: flex-start; } .rail button:last-of-type { align-items: flex-end; } }
    .rail button:hover { color: var(--text); }
    .node { position: relative; width: 28px; height: 28px; display: grid; place-items: center; }
    .node::before { content: ''; width: 14px; height: 14px; border-radius: 50%; background: var(--bg); border: 2px solid var(--line-strong);
      transition: transform .35s var(--ease), border-color .3s, background-color .3s, box-shadow .3s; }
    .past .node::before { border-color: var(--accent); }
    [aria-selected="true"] { color: var(--text); }
    [aria-selected="true"] .node::before { transform: scale(1.25); border-color: var(--accent); background: var(--accent); box-shadow: 0 0 0 6px var(--accent-soft); }
    .when { margin-top: -.55rem; font: 400 .72rem/1 var(--mono); color: var(--faint); white-space: nowrap; }
    .name { padding: .45rem .9rem; border-radius: 999px; border: 1px solid transparent; transition: background-color .25s, border-color .25s; white-space: nowrap; }
    [aria-selected="true"] .name { background: var(--accent-soft); border-color: color-mix(in srgb, var(--accent) 35%, transparent); }

    .detail { margin-top: 1rem; border: 1px solid var(--line-strong); border-radius: 24px; padding: clamp(1.5rem, 4vw, 2.5rem); background: var(--surface);
      background-image: radial-gradient(ellipse 60% 100% at 100% 0, var(--accent-soft), transparent 70%); min-height: 13rem; }
    article { animation: swap .5s var(--ease) both; }
    @keyframes swap { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
    .eyebrow-sm { font: 500 .75rem/1 var(--mono); letter-spacing: .12em; text-transform: uppercase; color: var(--faint); margin-bottom: .8rem; }
    h3 { font-size: var(--step-3); display: inline-block; margin-right: .75rem; }
    .focus { color: var(--accent); font-weight: 500; font-size: var(--step-1); margin-top: .6rem; }
    .rel { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: 1.5rem; }
    .rel a { font-size: .85rem; text-decoration: none; padding: .45rem .85rem; border-radius: 999px; border: 1px solid var(--line-strong); color: var(--muted);
      transition: color .2s, border-color .2s, background-color .2s; }
    .rel a:hover { color: var(--text); border-color: var(--accent); background: var(--accent-soft); }
  `,
})
export class ExperienceComponent {
  protected items = EXPERIENCE;
  protected active = signal(0);
  protected current = computed(() => this.items[this.active()]);
  protected progress = computed(() => (this.items.length > 1 ? (this.active() / (this.items.length - 1)) * 100 : 100));

  title(slug: string) { return PROJECTS.find(p => p.slug === slug)?.alias ?? slug; }

  keys(e: KeyboardEvent) {
    const n = this.items.length;
    const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    this.active.set((this.active() + d + n) % n);
    queueMicrotask(() => document.getElementById('exp-tab-' + this.active())?.focus());
  }
}
