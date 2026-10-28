import { Component, HostListener, afterNextRender, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './layout/nav.component';
import { FooterComponent } from './layout/footer.component';
import { FloatingCtaComponent } from './layout/floating-cta.component';
import { ThemeService } from './core/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, FooterComponent, FloatingCtaComponent],
  template: `
    <div class="splash" [class.done]="ready()" aria-hidden="true"><span>NE</span></div>
    <div class="ambient" aria-hidden="true"></div>
    <a class="skip" href="#main" (click)="skip($event)">Skip to content</a>
    <app-nav />
    <main id="main"><router-outlet /></main>
    <app-footer />
    <app-floating-cta />
  `,
  styles: `
    .skip {
      position: fixed;
      left: 1rem;
      top: -60px;
      z-index: 100;
      background: var(--accent);
      color: var(--accent-ink);
      padding: 0.6rem 1rem;
      border-radius: 8px;
      text-decoration: none;
      transition: top 0.2s;
    }
    .skip:focus {
      top: calc(env(safe-area-inset-top, 0px) + 0.75rem);
    }
    main {
      display: block;
      position: relative;
      z-index: 1;
    }
    .splash {
      position: fixed;
      inset: 0;
      z-index: 200;
      display: grid;
      place-items: center;
      background: var(--bg);
      transition:
        opacity 0.6s var(--ease),
        visibility 0.6s;
    }
    .splash.done {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }
    .splash span {
      display: grid;
      place-items: center;
      width: 64px;
      height: 64px;
      border-radius: 18px;
      background: var(--grad);
      color: var(--accent-ink);
      font-weight: 700;
      letter-spacing: 0.02em;
      animation: breathe 1.2s ease-in-out infinite alternate;
    }
    @keyframes breathe {
      to {
        transform: scale(1.1);
        opacity: 0.85;
      }
    }
    .ambient {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      background:
        radial-gradient(640px circle at var(--gx, 50%) var(--gy, 30%), color-mix(in srgb, var(--accent) 9%, transparent), transparent 65%),
        radial-gradient(900px circle at 100% 0%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 60%),
        radial-gradient(800px circle at 0% 100%, color-mix(in srgb, var(--violet) 9%, transparent), transparent 60%);
    }
  `,
})
export class App {
  private theme = inject(ThemeService); // initialise theme on boot
  protected ready = signal(false);
  private raf = 0;
  constructor() {
    afterNextRender(() => setTimeout(() => this.ready.set(true), 700));
  }
  @HostListener('window:pointermove', ['$event'])
  track(e: PointerEvent) {
    if (this.raf) return;
    this.raf = requestAnimationFrame(() => {
      this.raf = 0;
      const s = document.documentElement.style;
      s.setProperty('--gx', e.clientX + 'px');
      s.setProperty('--gy', e.clientY + 'px');
    });
  }
  skip(e: Event) {
    e.preventDefault();
    document.getElementById('main')?.focus();
  }
}
