import { Component, HostListener, afterNextRender, inject, signal, DestroyRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ScrollService } from '../core/scroll.service';
import { IconComponent } from '../shared/icon.component';

/** A contact shortcut that appears after the hero and hides once the contact section is on screen. */
@Component({
  selector: 'app-floating-cta',
  imports: [IconComponent],
  template: `
    <a class="fab" [class.show]="show()" href="#contact" (click)="go($event)" [attr.tabindex]="show() ? 0 : -1" [attr.aria-hidden]="!show()">
      <app-icon name="mail" /> Let’s talk
    </a>
  `,
  styles: `
    .fab { position: fixed; z-index: 40; right: max(1.25rem, env(safe-area-inset-right)); bottom: max(1.25rem, env(safe-area-inset-bottom));
      display: inline-flex; align-items: center; gap: .55rem; height: 46px; padding: 0 1.2rem; border-radius: 999px; text-decoration: none;
      font: 500 .92rem/1 var(--font); color: var(--accent-ink); background: var(--grad); --icon-size: 16px;
      box-shadow: 0 14px 30px -12px color-mix(in srgb, var(--accent) 60%, transparent);
      opacity: 0; transform: translateY(16px); pointer-events: none; transition: opacity .35s var(--ease), transform .35s var(--ease); }
    .fab.show { opacity: 1; transform: none; pointer-events: auto; }
    .fab.show:hover { transform: translateY(-3px); }
  `,
})
export class FloatingCtaComponent {
  private scroll = inject(ScrollService);
  private router = inject(Router);
  private past = signal(false);
  private contactVisible = signal(false);
  private onHome = signal(true);
  protected show = () => this.past() && !this.contactVisible() && this.onHome();
  private io?: IntersectionObserver;

  constructor() {
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      this.onScroll();
      this.watch();
      const sub = this.router.events.subscribe(e => {
        if (e instanceof NavigationEnd) { this.onHome.set(e.urlAfterRedirects.split(/[?#]/)[0] === '/'); setTimeout(() => this.watch(), 60); }
      });
      destroy.onDestroy(() => { sub.unsubscribe(); this.io?.disconnect(); });
    });
  }

  @HostListener('window:scroll') onScroll() { this.past.set(window.scrollY > 600); }

  private watch() {
    this.io?.disconnect();
    const el = document.getElementById('contact');
    if (!el) { this.contactVisible.set(false); return; }
    this.io = new IntersectionObserver(([en]) => this.contactVisible.set(en.isIntersecting), { threshold: 0.25 });
    this.io.observe(el);
  }

  go(e: Event) { e.preventDefault(); this.scroll.toSection('contact'); }
}
