import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../shared/motion.directives';
import { SITE } from '../data/site';

@Component({
  selector: 'app-beyond',
  imports: [RouterLink, RevealDirective],
  template: `
    <section class="section" id="beyond" aria-labelledby="beyond-title">
      <div class="container">
        <div class="panel" reveal>
          <div class="glow" aria-hidden="true"></div>
          <div class="copy">
            <a class="brand" [href]="company" target="_blank" rel="noopener" aria-label="NSoftBD">
              <img class="logo-dark" src="images/nsoftbd-logo-dark.png" alt="NSoftBD" width="190" height="44" />
              <img class="logo-light" src="images/nsoftbd-logo.png" alt="NSoftBD" width="190" height="44" />
            </a>
            <h2 id="beyond-title">Beyond the code, I run my own studio.</h2>
            <p>
              I run NSoftBD, a small software company in Dhaka that builds its own products and
              delivers websites and apps for clients. It keeps me close to the product side of engineering.
            </p>
            <a class="visit" [href]="company" target="_blank" rel="noopener">Visit nsoftbd.com ↗</a>
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
    .brand { display: inline-block; margin-bottom: 1.5rem; }
    .brand img { height: 44px; width: auto; }
    .visit { display: inline-flex; margin-top: 1.5rem; padding: .7rem 1.2rem; border-radius: 999px; text-decoration: none; font-weight: 600; font-size: .92rem;
      color: var(--accent-ink); background: var(--grad); transition: transform .25s var(--ease), box-shadow .3s; }
    .visit:hover { transform: translateY(-2px); box-shadow: 0 12px 28px -12px color-mix(in srgb, var(--accent) 70%, transparent); }
    .products { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: .65rem; }
    .products a { display: inline-block; text-decoration: none; font-weight: 500; padding: .75rem 1.2rem; border-radius: 999px;
      border: 1px solid var(--line-strong); background: color-mix(in srgb, var(--bg) 55%, transparent);
      transition: transform .3s var(--ease), border-color .25s, background-color .25s; }
    .products a:hover { transform: translateY(-3px); border-color: var(--accent); background: var(--accent-soft); }
    @keyframes pulse { to { transform: translate(-8%, 10%) scale(1.2); opacity: .4; } }
  `,
})
export class BeyondComponent {
  protected company = SITE.company;
  protected products = [
    { slug: 'fixdeskbd', name: 'IT Support Helpdesk' },
    { slug: 'zolojog', name: 'All-in-One Life & Work App' },
    { slug: 'shipkoro', name: 'Order Management Tool' },
    { slug: 'caltaskbd', name: 'Desktop Calendar App' },
  ];
}
