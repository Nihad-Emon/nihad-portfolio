import { Component, signal } from '@angular/core';
import { IconComponent } from '../shared/icon.component';
import { RevealDirective } from '../shared/motion.directives';

@Component({
  selector: 'app-faq',
  imports: [IconComponent, RevealDirective],
  template: `
    <section class="section" id="faq" aria-labelledby="faq-title">
      <div class="container wrap">
        <header reveal>
          <span class="eyebrow">FAQ</span>
          <h2 id="faq-title">Good to know.</h2>
          <p>Quick answers to common questions.</p>
        </header>

        <ul class="list">
          @for (f of items; track f.q; let i = $index) {
            <li [class.open]="open() === i" [reveal]="i * 80">
              <h3>
                <button type="button" [id]="'faq-q-' + i" [attr.aria-expanded]="open() === i" [attr.aria-controls]="'faq-a-' + i" (click)="toggle(i)">
                  <span>{{ f.q }}</span>
                  <span class="chev" aria-hidden="true"><app-icon name="chevron" /></span>
                </button>
              </h3>
              <div class="a" [id]="'faq-a-' + i" role="region" [attr.aria-labelledby]="'faq-q-' + i">
                <div><p>{{ f.a }}</p></div>
              </div>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  styles: `
    .wrap { display: grid; gap: 2.5rem; }
    @media (min-width: 900px) { .wrap { grid-template-columns: minmax(0, 4fr) minmax(0, 7fr); gap: 5rem; align-items: start; } }
    h2 { font-size: var(--step-3); margin-bottom: 1rem; }
    header p { color: var(--muted); font-size: var(--step-1); max-width: 30ch; }
    .list { list-style: none; margin: 0; padding: 0; display: grid; gap: .75rem; }
    .list li { border: 1px solid var(--line); border-radius: 18px; background: var(--surface); transition: border-color .3s, background-color .3s; }
    .list li:hover { border-color: var(--line-strong); }
    .list li.open { border-color: color-mix(in srgb, var(--accent) 45%, var(--line)); background: linear-gradient(180deg, var(--accent-soft), transparent 70%), var(--surface); }
    h3 { font-size: 1rem; font-weight: 500; letter-spacing: -.01em; }
    button { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 1rem; text-align: left; cursor: pointer;
      padding: 1.2rem 1.4rem; background: none; border: 0; color: var(--text); font: 500 1.05rem/1.4 var(--font); border-radius: 18px; }
    .chev { display: grid; place-items: center; flex: none; width: 32px; height: 32px; border-radius: 50%; border: 1px solid var(--line-strong);
      color: var(--muted); --icon-size: 16px; transition: transform .4s var(--ease), background-color .3s, color .3s, border-color .3s; }
    .open .chev { transform: rotate(180deg); background: var(--accent); border-color: var(--accent); color: var(--accent-ink); }
    .a { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .45s var(--ease); }
    .open .a { grid-template-rows: 1fr; }
    .a > div { overflow: hidden; }
    .a p { padding: 0 1.4rem 1.3rem; color: var(--muted); max-width: 60ch; }
  `,
})
export class FaqComponent {
  protected open = signal(0);
  protected items = [
    { q: 'What do you specialise in?', a: 'Frontend engineering with Angular and TypeScript, backed by enough full-stack experience to own a feature from the interface down to the database.' },
    { q: 'What kind of projects do you work on?', a: 'Enterprise platforms, SaaS products and client websites. I’m happiest where a complex workflow can be made simple and reliable.' },
    { q: 'Are you open to freelance or contract work?', a: 'Yes, for the right project. Send me a short note about what you have in mind and I’ll get back to you.' },
    { q: 'How do we get started?', a: 'Use the contact form below or email me directly. A quick conversation about the problem is the best first step.' },
  ];
  toggle(i: number) { this.open.set(this.open() === i ? -1 : i); }
}
