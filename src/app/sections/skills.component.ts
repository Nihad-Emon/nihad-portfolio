import { Component, signal, computed } from '@angular/core';
import { SKILL_GROUPS } from '../data/skills';
import { RevealDirective } from '../shared/motion.directives';

@Component({
  selector: 'app-skills',
  imports: [RevealDirective],
  template: `
    <section class="section" id="skills" aria-labelledby="skills-title">
      <div class="container">
        <header class="section-head" reveal>
          <div>
            <span class="eyebrow">Skills</span>
            <h2 id="skills-title">A stack that spans the whole product.</h2>
          </div>
          <p>Frontend is where I go deepest. The rest lets me ship a feature from database to screen.</p>
        </header>

        <div class="panel" reveal="100">
          <div class="tabs" role="tablist" aria-label="Skill areas" aria-orientation="vertical" (keydown)="keys($event)">
            @for (g of groups; track g.id; let i = $index) {
              <button type="button" role="tab" [id]="'tab-' + g.id" [attr.aria-selected]="i === active()"
                      [attr.aria-controls]="'panel-' + g.id" [tabindex]="i === active() ? 0 : -1" (click)="active.set(i)">
                <span class="n">0{{ i + 1 }}</span>
                <span class="t">{{ g.title }}</span>
                <span class="bar" aria-hidden="true"></span>
              </button>
            }
          </div>

          <div class="view" role="tabpanel" [id]="'panel-' + current().id" [attr.aria-labelledby]="'tab-' + current().id">
            <h3>{{ current().title }}</h3>
            <ul>
              @for (s of current().core; track current().id + s; let i = $index) {
                <li [style.--i]="i">{{ s }}</li>
              }
            </ul>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    h2 { font-size: var(--step-3); }
    .panel { display: grid; gap: 1.5rem; border: 1px solid var(--line); border-radius: 24px; background: var(--surface); padding: 1rem; }
    @media (min-width: 860px) { .panel { grid-template-columns: minmax(0, 4fr) minmax(0, 7fr); gap: 2rem; padding: 1.25rem; } }

    .tabs { display: flex; gap: .4rem; overflow-x: auto; scrollbar-width: none; }
    @media (min-width: 860px) { .tabs { flex-direction: column; overflow: visible; } }
    .tabs button { position: relative; display: flex; align-items: center; gap: .9rem; text-align: left; cursor: pointer; white-space: nowrap;
      padding: 1rem 1.1rem; border-radius: 14px; border: 1px solid transparent; background: transparent; color: var(--muted);
      font: 500 1rem/1.2 var(--font); transition: background-color .25s, color .25s, border-color .25s; overflow: hidden; }
    .tabs button:hover { color: var(--text); background: var(--raised); }
    .tabs button[aria-selected="true"] { color: var(--text); background: var(--accent-soft); border-color: color-mix(in srgb, var(--accent) 30%, transparent); }
    .n { font: 500 .75rem/1 var(--mono); color: var(--faint); }
    [aria-selected="true"] .n { color: var(--accent); }
    .bar { position: absolute; left: 0; top: 20%; bottom: 20%; width: 3px; border-radius: 3px; background: var(--grad); transform: scaleY(0); transition: transform .35s var(--ease); }
    [aria-selected="true"] .bar { transform: scaleY(1); }

    .view { padding: 1rem .75rem 1rem 0; min-height: 15rem; }
    @media (max-width: 859px) { .view { padding: .5rem .5rem 1rem; } }
    h3 { font-size: var(--step-2); margin-bottom: 1.5rem; }
    ul { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: .6rem; }
    li { font-size: .95rem; padding: .55rem .95rem; border-radius: 999px; border: 1px solid var(--line-strong); background: var(--bg);
      animation: pop .5s calc(var(--i) * 45ms) var(--ease) backwards; transition: border-color .2s, background-color .2s, transform .25s var(--ease); }
    li:hover { border-color: var(--accent); background: var(--accent-soft); transform: translateY(-3px); }
    @keyframes pop { from { opacity: 0; transform: translateY(10px) scale(.96); } to { opacity: 1; transform: none; } }
  `,
})
export class SkillsComponent {
  protected groups = SKILL_GROUPS;
  protected active = signal(0);
  protected current = computed(() => this.groups[this.active()]);

  keys(e: KeyboardEvent) {
    const n = this.groups.length;
    const d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    this.active.set((this.active() + d + n) % n);
    queueMicrotask(() => document.getElementById('tab-' + this.current().id)?.focus());
  }
}
