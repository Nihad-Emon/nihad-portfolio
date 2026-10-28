import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../shared/motion.directives';

@Component({
  selector: 'app-beyond',
  imports: [RouterLink, RevealDirective],
  template: `
    <section class="section" id="beyond" aria-labelledby="beyond-title">
      <div class="container">
        <div class="panel" reveal>
          <div class="glow" aria-hidden="true"></div>
          <div class="copy">
            <span class="eyebrow">Studio</span>
            <h2 id="beyond-title">Beyond the code, I run my own studio.</h2>
            <p>
              I run a small software company in Dhaka that builds its own products and delivers
              websites and apps for clients. It keeps me close to the product side of engineering.
            </p>
          </div>
          <ul class="products">
            @for (p of products; track p.slug) {
              <li><a [routerLink]="['/projects', p.slug]">{{ p.name }}</a></li>
            }
          </ul>
        </div>
      </div>
    </section>
  `,
  styles: `
    .panel { position: relative; overflow: hidden; isolation: isolate; border: 1px solid var(--line-strong); border-radius: 28px;
      padding: clamp(2rem, 5vw, 3.5rem); display: grid; gap: 2.25rem; background: var(--surface); }
    .glow { position: absolute; inset: -40% -10% auto auto; width: 60%; aspect-ratio: 1; z-index: -1; border-radius: 50%;
      background: var(--grad); filter: blur(90px); opacity: .28; animation: pulse 9s ease-in-out infinite alternate; }
    @media (min-width: 900px) { .panel { grid-template-columns: minmax(0, 6fr) minmax(0, 4fr); align-items: center; gap: 4rem; } }
    h2 { font-size: var(--step-3); margin-bottom: 1.25rem; max-width: 18ch; }
    p { color: var(--muted); font-size: var(--step-1); max-width: 48ch; }
    .products { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: .65rem; }
    .products a { display: inline-block; text-decoration: none; font-weight: 500; padding: .75rem 1.2rem; border-radius: 999px;
      border: 1px solid var(--line-strong); background: color-mix(in srgb, var(--bg) 55%, transparent);
      transition: transform .3s var(--ease), border-color .25s, background-color .25s; }
    .products a:hover { transform: translateY(-3px); border-color: var(--accent); background: var(--accent-soft); }
    @keyframes pulse { to { transform: translate(-8%, 10%) scale(1.2); opacity: .4; } }
  `,
})
export class BeyondComponent {
  protected products = [
    { slug: 'fixdeskbd', name: 'IT Support Helpdesk' },
    { slug: 'zolojog', name: 'All-in-One Life & Work App' },
    { slug: 'shipkoro', name: 'Order Management Tool' },
    { slug: 'caltaskbd', name: 'Desktop Calendar App' },
  ];
}
