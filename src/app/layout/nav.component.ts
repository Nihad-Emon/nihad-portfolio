import { Component, inject, signal, afterNextRender, DestroyRef, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ScrollService } from '../core/scroll.service';
import { ThemeService } from '../core/theme.service';
import { IconComponent } from '../shared/icon.component';
import { SITE } from '../data/site';

@Component({
  selector: 'app-nav',
  imports: [IconComponent],
  template: `
    <header class="nav" [class.scrolled]="scrolled()">
      <div class="progress" aria-hidden="true" [style.transform]="'scaleX(' + progress() + ')'"></div>
      <div class="container wrap">
      <div class="bar">
        <a class="brand" href="#top" (click)="go($event, 'top')" aria-label="Nihad Hasan Emon, back to top">
          <span class="mark" aria-hidden="true">NE</span>
          <span class="name">Nihad Hasan Emon</span>
        </a>

        <nav class="links" aria-label="Primary">
          @for (l of links; track l.id) {
            <a [href]="'#' + l.id" (click)="go($event, l.id)" [attr.aria-current]="active() === l.id ? 'location' : null">{{ l.label }}</a>
          }
        </nav>

        <div class="actions">
          @if (site.resumeUrl) {
            <a class="resume" [href]="site.resumeUrl" download>Resume</a>
          }
          <button class="icon-btn" type="button" (click)="theme.toggle()"
                  [attr.aria-label]="theme.theme() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'">
            <app-icon [name]="theme.theme() === 'dark' ? 'sun' : 'moon'" />
          </button>
          <button class="icon-btn menu-btn" type="button" (click)="open.set(!open())"
                  [attr.aria-expanded]="open()" aria-controls="mobile-menu" aria-label="Menu">
            <app-icon [name]="open() ? 'close' : 'menu'" />
          </button>
          <a class="talk" href="#contact" (click)="go($event, 'contact')">Let’s talk</a>
        </div>
      </div>

      @if (open()) {
        <nav id="mobile-menu" class="mobile" aria-label="Mobile">
          @for (l of links; track l.id) {
            <a [href]="'#' + l.id" (click)="go($event, l.id)">{{ l.label }}</a>
          }
          @if (site.resumeUrl) {
            <a [href]="site.resumeUrl" download>Download resume</a>
          }
        </nav>
      }
      </div>
    </header>
  `,
  styles: `
    .nav { position: sticky; top: 0; z-index: 50; padding-top: calc(env(safe-area-inset-top, 0px) + .75rem); margin-top: calc(-1 * env(safe-area-inset-top, 0px)); }
    .progress { position: fixed; left: 0; right: 0; top: 0; height: 2px; z-index: 60; background: var(--grad); transform-origin: left; transform: scaleX(0); }
    .bar { height: 58px; display: flex; align-items: center; gap: 1.25rem; padding: 0 .55rem 0 1rem; border-radius: 999px;
      border: 1px solid var(--line-strong); background: color-mix(in srgb, var(--surface) 62%, transparent);
      backdrop-filter: blur(16px) saturate(1.4); -webkit-backdrop-filter: blur(16px) saturate(1.4);
      box-shadow: 0 12px 40px -18px rgba(0, 0, 0, .55); transition: background-color .3s, box-shadow .3s; }
    .nav.scrolled .bar { background: color-mix(in srgb, var(--surface) 86%, transparent); }
    .talk { display: none; align-items: center; height: 40px; padding: 0 1.1rem; border-radius: 999px; text-decoration: none; font-size: .88rem; font-weight: 600;
      color: var(--accent-ink); background: var(--grad); transition: transform .25s var(--ease), box-shadow .3s; }
    .talk:hover { transform: translateY(-1px); box-shadow: 0 10px 24px -10px color-mix(in srgb, var(--accent) 70%, transparent); }
    .brand { display: flex; align-items: center; gap: .65rem; text-decoration: none; font-weight: 600; letter-spacing: -.01em; }
    .mark { display: grid; place-items: center; width: 30px; height: 30px; border-radius: 8px; font-size: .72rem; font-weight: 700;
      background: var(--grad); color: var(--accent-ink); letter-spacing: 0; transition: transform .4s var(--ease); }
    .brand:hover .mark { transform: rotate(-8deg) scale(1.08); }
    .links { display: none; margin-left: auto; gap: .25rem; }
    .links a { text-decoration: none; color: var(--muted); font-size: .9rem; font-weight: 500; padding: .45rem .85rem; border-radius: 999px; transition: color .2s, background-color .2s; }
    .links a:hover { color: var(--text); }
    .links a[aria-current] { color: var(--text); background: var(--accent-soft); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--accent) 35%, transparent); }
    .actions { display: flex; align-items: center; gap: .4rem; margin-left: auto; }
    .resume { display: none; font-size: .88rem; font-weight: 500; text-decoration: none; padding: .45rem .9rem; border: 1px solid var(--line-strong); border-radius: 999px; }
    .resume:hover { border-color: var(--text); }
    .icon-btn { width: 40px; height: 40px; display: grid; place-items: center; border-radius: 50%; border: 1px solid var(--line);
      background: transparent; color: var(--text); cursor: pointer; transition: border-color .2s; }
    .icon-btn:hover { border-color: var(--line-strong); }
    .mobile { display: grid; margin-top: .5rem; padding: .5rem 1.25rem 1rem; border: 1px solid var(--line-strong); border-radius: 24px; background: color-mix(in srgb, var(--surface) 92%, transparent); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); }
    .mobile a { padding: .9rem 0; text-decoration: none; font-size: 1.1rem; font-weight: 500; border-bottom: 1px solid var(--line); }
    .mobile a:last-child { border-bottom: 0; }
    @media (max-width: 520px) { .name { display: none; } }
    @media (min-width: 900px) {
      .links { display: flex; } .actions { margin-left: .5rem; } .resume { display: inline-block; } .talk { display: inline-flex; }
      .menu-btn, .mobile { display: none; }
    }
  `,
})
export class NavComponent {
  protected site = SITE;
  protected theme = inject(ThemeService);
  private scroll = inject(ScrollService);
  private router = inject(Router);
  protected open = signal(false);
  protected scrolled = signal(false);
  protected progress = signal(0);
  protected active = signal('');
  protected links = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Work' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];
  private observer?: IntersectionObserver;

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      this.onScroll();
      this.observe();
      const sub = this.router.events.subscribe(e => {
        if (e instanceof NavigationEnd) { this.open.set(false); setTimeout(() => this.observe(), 50); }
      });
      destroyRef.onDestroy(() => { sub.unsubscribe(); this.observer?.disconnect(); });
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 8);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    this.progress.set(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
  }

  @HostListener('document:keydown.escape')
  close() { this.open.set(false); }

  go(e: Event, id: string) {
    e.preventDefault();
    this.open.set(false);
    if (id === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); if (this.router.url !== '/') this.router.navigateByUrl('/'); return; }
    this.scroll.toSection(id);
  }

  private observe() {
    this.observer?.disconnect();
    this.active.set('');
    this.observer = new IntersectionObserver(entries => {
      for (const en of entries) if (en.isIntersecting) this.active.set(en.target.id);
    }, { rootMargin: '-45% 0px -50% 0px' });
    this.links.forEach(l => { const el = document.getElementById(l.id); if (el) this.observer!.observe(el); });
  }
}
