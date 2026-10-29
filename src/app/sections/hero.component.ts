import { Component, inject } from '@angular/core';
import { SITE } from '../data/site';
import { PROJECTS } from '../data/projects';
import { ScrollService } from '../core/scroll.service';
import { IconComponent } from '../shared/icon.component';
import { CountUpDirective, TiltDirective, MagneticDirective } from '../shared/motion.directives';

@Component({
  selector: 'app-hero',
  imports: [IconComponent, CountUpDirective, TiltDirective, MagneticDirective],
  template: `
    <section class="hero" id="top" aria-labelledby="hero-title">
      <div class="aurora" aria-hidden="true"><i></i><i></i></div>
      <div class="grid-bg" aria-hidden="true"></div>

      <div class="container grid">
        <div class="copy">
          <p class="pill">
            <span class="dot" aria-hidden="true"></span>
            {{ site.role }} · {{ site.location }}
          </p>
          <h1 id="hero-title">
            Hi, I’m <span class="grad-text">Nihad</span>.<br />
            I build
            <span class="swap" aria-hidden="true"><b>modern web apps</b><b>enterprise tools</b><b>useful products</b></span>
            <span class="visually-hidden">modern web apps, enterprise tools and useful products</span>
          </h1>
          <p class="lede">
            I’m {{ site.shortName }}. I turn complex business needs into clean interfaces and dependable software,
            from the screen to the database.
          </p>
          <div class="ctas">
            <a class="btn btn-primary" magnetic href="#projects" (click)="go($event, 'projects')">View my work <app-icon name="arrow" /></a>
            <a class="btn btn-ghost" magnetic href="#contact" (click)="go($event, 'contact')">Get in touch</a>
            @if (site.resumeUrl) {
              <a class="text-link" [href]="site.resumeUrl" download>Download resume</a>
            }
            <span class="socials">
              <a [href]="'https://wa.me/' + site.phoneDigits" target="_blank" rel="noopener" aria-label="WhatsApp"><app-icon name="whatsapp" /></a>
              @if (site.linkedin) { <a [href]="site.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn"><app-icon name="linkedin" /></a> }
              @if (site.github) { <a [href]="site.github" target="_blank" rel="noopener" aria-label="GitHub"><app-icon name="github" /></a> }
            </span>
          </div>

        </div>

        <div class="visual">
          <div class="frame">
            <div class="ring" aria-hidden="true"></div>
            <figure class="portrait" tilt="6">
              <img [src]="site.photo" [alt]="'Portrait of ' + site.name" width="640" height="640" fetchpriority="high" />
            </figure>
          </div>
          <div class="gcard g1" aria-hidden="true">
            <span class="gi"><app-icon name="code" /></span>
            <span><b>Frontend</b><small>Angular · TypeScript</small></span>
          </div>
          <div class="gcard g2" aria-hidden="true">
            <span class="gi"><app-icon name="database" /></span>
            <span><b>Backend &amp; data</b><small>APIs · Databases</small></span>
          </div>
          <div class="gcard g3" aria-hidden="true">
            <span class="dot"></span><span><b>{{ site.location }}</b></span>
          </div>
        </div>
      </div>

      <div class="container">
        <dl class="statbar">
          <div><dd><span [countUp]="projects">{{ projects }}</span>+</dd><dt>Projects delivered</dt></div>
          <div><dd><span [countUp]="4">4</span>+</dd><dt>Years of experience</dt></div>
          <div><dd><span [countUp]="products">{{ products }}</span></dd><dt>Own products built</dt></div>
          <div class="has-tip" tabindex="0" aria-describedby="layers-tip" (mouseenter)="place($event)" (focus)="place($event)">
            <dd><span [countUp]="layers.length">{{ layers.length }}</span></dd>
            <dt>Layers owned, idea to launch <i class="info" aria-hidden="true">i</i></dt>
            <span class="tip" id="layers-tip" role="tooltip">
              <b>From idea to launch</b>
              <ol>@for (l of layers; track l) { <li>{{ l }}</li> }</ol>
            </span>
          </div>
        </dl>
        <div class="proof">
          <span>Worked with</span>
          <ul>@for (o of orgs; track o) { <li>{{ o }}</li> }</ul>
        </div>
      </div>
    </section>
  `,
  styles: `
    .hero { position: relative; margin-top: -70px; padding-top: calc(70px + clamp(2.5rem, 7vw, 5.5rem)); z-index: 2; isolation: isolate; }

    /* Animated aurora backdrop */
    .aurora { position: absolute; inset: 0; z-index: -2; pointer-events: none; overflow: hidden; }
    .aurora i { position: absolute; border-radius: 50%; filter: blur(100px); opacity: .42; will-change: transform; }
    .aurora i:nth-child(1) { width: 46vw; height: 46vw; max-width: 640px; max-height: 640px; background: var(--accent); top: -14%; right: -6%; animation: drift1 18s ease-in-out infinite alternate; }
    .aurora i:nth-child(2) { width: 34vw; height: 34vw; max-width: 460px; max-height: 460px; background: var(--violet); top: 22%; left: -10%; opacity: .26; animation: drift2 22s ease-in-out infinite alternate; }
    .aurora i:nth-child(3) { width: 26vw; height: 26vw; max-width: 340px; max-height: 340px; background: var(--teal); bottom: 6%; right: 24%; opacity: .1; animation: drift1 26s ease-in-out infinite alternate-reverse; }
    :host-context([data-theme="light"]) .aurora i { opacity: .14; }
    .grid-bg { position: absolute; inset: 0; z-index: -1; opacity: .22;
      background-image: linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px);
      background-size: 64px 64px;
      mask-image: radial-gradient(ellipse 75% 65% at 60% 25%, #000 5%, transparent 70%);
      -webkit-mask-image: radial-gradient(ellipse 75% 65% at 60% 25%, #000 5%, transparent 70%); }

    .grid { display: grid; gap: 3.5rem; align-items: center; }
    @media (min-width: 980px) { .grid { grid-template-columns: minmax(0, 1fr) 400px; gap: 4rem; } }

    .pill { display: inline-flex; align-items: center; gap: .6rem; padding: .45rem .9rem; border-radius: 999px; margin-bottom: 1.75rem;
      border: 1px solid var(--line-strong); background: var(--glass); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
      color: var(--muted); font-size: .85rem; font-weight: 500; animation: rise .7s var(--ease) both; }
    .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--live); position: relative; }
    .dot::after { content: ''; position: absolute; inset: 0; border-radius: 50%; background: var(--live); animation: ping 2.2s ease-out infinite; }

    h1 { font-size: clamp(2.3rem, 1.2rem + 4.8vw, 5.2rem); font-weight: 650; letter-spacing: -.05em; line-height: 1.04;
      animation: rise .8s .08s var(--ease) both; }
    .swap { display: grid; width: fit-content; }
    .swap b { grid-area: 1 / 1; font-weight: inherit; white-space: nowrap; opacity: 0; color: var(--text);
      animation: word 9s infinite; }
    .swap b:nth-child(2) { animation-delay: 3s; }
    .swap b:nth-child(3) { animation-delay: 6s; }
    .swap { position: relative; }
    .swap::after { content: ''; position: absolute; left: 0; right: 0; bottom: .02em; height: 3px; border-radius: 2px; background: var(--grad); opacity: .5; }
    .lede { margin-top: 1.6rem; font-size: var(--step-1); color: var(--muted); max-width: 50ch; animation: rise .8s .16s var(--ease) both; }
    .ctas { display: flex; flex-wrap: wrap; align-items: center; gap: .75rem 1rem; margin-top: 2.25rem; animation: rise .8s .24s var(--ease) both; }
    .ctas .text-link { margin-left: .5rem; }
    .socials { display: inline-flex; gap: .5rem; margin-left: .25rem; }
    .socials a { display: grid; place-items: center; width: 46px; height: 46px; border-radius: 50%; border: 1px solid var(--line-strong); color: var(--muted);
      --icon-size: 19px; transition: color .2s, border-color .2s, background-color .2s, transform .3s var(--ease); }
    .socials a:hover { color: var(--text); border-color: var(--accent); background: var(--accent-soft); transform: translateY(-3px); }


    .visual { order: -1; position: relative; max-width: 190px; width: 100%; justify-self: center; animation: fade 1s .2s both; }
    @media (min-width: 980px) { .visual { order: 0; max-width: 330px; justify-self: center; align-self: start; margin-top: .25rem; } }
    .frame { position: relative; padding: 8px; border-radius: 50%; animation: bob 7s ease-in-out infinite; }
    .ring { position: absolute; inset: 0; border-radius: 50%; padding: 1.5px; z-index: 0;
      background: conic-gradient(from var(--a, 0deg), var(--accent), var(--violet), var(--teal), var(--accent));
      -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor;
      mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0); mask-composite: exclude;
      animation: spin 16s linear infinite; }
    .frame::before { content: ''; position: absolute; inset: 8% 6% -4%; border-radius: 50%; background: var(--grad); filter: blur(60px); opacity: .55; z-index: -1; transform: scale(1.15); }
    .portrait { margin: 0; aspect-ratio: 1; border-radius: 50%; overflow: hidden; background: var(--raised); position: relative; z-index: 1; }
    .portrait img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 25%; transition: transform 1.2s var(--ease); }
    .frame:hover .portrait img { transform: scale(1.04); }

    .gcard { position: absolute; z-index: 3; display: flex; align-items: center; gap: .7rem; padding: .7rem .95rem .7rem .7rem; border-radius: 16px;
      border: 1px solid var(--line-strong); background: color-mix(in srgb, var(--surface) 70%, transparent);
      backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); box-shadow: 0 18px 40px -20px rgba(0, 0, 0, .7);
      font-size: .82rem; line-height: 1.25; --icon-size: 18px; }
    .gcard b { display: block; font-weight: 600; font-size: .85rem; }
    .gcard small { display: block; color: var(--muted); font-size: .75rem; }
    .gi { display: grid; place-items: center; width: 36px; height: 36px; border-radius: 11px; color: var(--accent); background: var(--accent-soft); }
    .g1 { top: 6%; left: -22%; animation: float 7s ease-in-out infinite; }
    .g2 { bottom: 12%; right: -20%; animation: float 8s -3s ease-in-out infinite; }
    .g3 { bottom: -2%; left: 4%; padding: .55rem .9rem; animation: float 9s -5s ease-in-out infinite; }
    @media (max-width: 979px) { .gcard { display: none; } }
    .statbar { margin: clamp(3rem, 6vw, 4.5rem) 0 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: 0;
      border: 1px solid var(--line-strong); border-radius: 22px; background: var(--glass);
      backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
    @media (min-width: 820px) { .statbar { grid-template-columns: repeat(4, 1fr); } }
    .statbar div { display: flex; flex-direction: column-reverse; gap: .3rem; padding: 1.6rem 1.5rem; text-align: center;
      border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); }
    .statbar div:nth-child(2n) { border-right: 0; }
    @media (min-width: 820px) { .statbar div { border-bottom: 0; border-right: 1px solid var(--line) !important; } .statbar div:last-child { border-right: 0 !important; } }
    .statbar dd { margin: 0; font-size: clamp(1.8rem, 1.2rem + 2vw, 2.6rem); font-weight: 600; letter-spacing: -.03em; font-variant-numeric: tabular-nums;
      background: var(--grad); -webkit-background-clip: text; background-clip: text; color: transparent; }
    .statbar div:first-child { border-radius: 22px 0 0 22px; } .statbar div:last-child { border-radius: 0 22px 22px 0; }
    .has-tip { position: relative; cursor: help; outline-offset: -4px; }
    .info { display: inline-grid; place-items: center; width: 15px; height: 15px; margin-left: .3rem; border-radius: 50%; vertical-align: 1px;
      border: 1px solid var(--line-strong); color: var(--muted); font: 600 .62rem/1 var(--font); font-style: normal; }
    .tip { position: absolute; z-index: 5; right: 1rem; bottom: calc(100% - .4rem); width: 250px; padding: 1rem 1.1rem; text-align: left;
      border-radius: 16px; border: 1px solid var(--line-strong); background: color-mix(in srgb, var(--surface) 94%, transparent);
      backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); box-shadow: 0 24px 50px -24px rgba(0, 0, 0, .8);
      opacity: 0; visibility: hidden; transform: translateY(6px); pointer-events: none;
      transition: opacity .25s var(--ease), transform .25s var(--ease), visibility .25s; }
    .tip b { display: block; margin-bottom: .6rem; font-size: .82rem; color: var(--text); }
    .tip ol { list-style: none; counter-reset: l; margin: 0; padding: 0; display: grid; gap: .4rem; }
    .tip li { counter-increment: l; display: flex; align-items: center; gap: .65rem; font-size: .84rem; color: var(--muted); }
    .tip li::before { content: counter(l); display: grid; place-items: center; flex: none; width: 20px; height: 20px; border-radius: 6px;
      background: var(--accent-soft); color: var(--accent); font: 500 .7rem/1 var(--mono); }
    .has-tip.below .tip { bottom: auto; top: calc(100% - .4rem); transform: translateY(-6px); }
    .has-tip:hover .tip, .has-tip:focus .tip, .has-tip:focus-within .tip { opacity: 1; visibility: visible; transform: none; }
    .has-tip:hover .info, .has-tip:focus .info { border-color: var(--accent); color: var(--accent); }
    .statbar dt { color: var(--muted); font-size: .85rem; }
    .proof { margin-top: 1.5rem; padding-block: 1.4rem;
      display: flex; flex-wrap: wrap; align-items: center; gap: .6rem 2rem; }
    .proof > span { color: var(--faint); font-size: .85rem; }
    .proof ul { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: .5rem 2rem; }
    .proof li { font-weight: 500; letter-spacing: -.01em; color: var(--muted); }

    @keyframes spin { to { --a: 360deg; } }
    @keyframes rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
    @keyframes fade { from { opacity: 0; transform: scale(.96); } to { opacity: 1; transform: none; } }
    @keyframes bob { 50% { transform: translateY(-6px); } }
    @keyframes float { 50% { transform: translateY(-7px); } }
    @keyframes ping { 0% { transform: scale(1); opacity: .7; } 80%, 100% { transform: scale(3); opacity: 0; } }
        @keyframes drift1 { to { transform: translate(-60px, 50px) scale(1.12); } }
    @keyframes drift2 { to { transform: translate(70px, -40px) scale(1.15); } }
    @keyframes word {
      0% { opacity: 0; transform: translateY(40%); filter: blur(6px); }
      5%, 30% { opacity: 1; transform: none; filter: none; }
      35%, 100% { opacity: 0; transform: translateY(-40%); filter: blur(6px); }
    }
    @media (prefers-reduced-motion: reduce) {
      .swap b:first-child { opacity: 1; animation: none; }
    }
  `,
})
export class HeroComponent {
  protected site = SITE;
  protected orgs = ['Square Group', 'HurPal', 'McDoaw', 'Quantsys', 'NSoftBD'];
  protected projects = SITE.projectsDelivered;
  protected layers = SITE.layers;
  protected products = PROJECTS.filter(p => p.kind === 'Product').length;
  private scroll = inject(ScrollService);
  /** Open the tooltip downward when there isn't room above it (e.g. under the sticky nav). */
  place(e: Event) {
    const el = e.currentTarget as HTMLElement;
    el.classList.toggle('below', el.getBoundingClientRect().top < 360);
  }
  go(e: Event, id: string) { e.preventDefault(); this.scroll.toSection(id); }
}
