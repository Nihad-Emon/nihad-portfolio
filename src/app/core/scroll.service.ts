import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

/** Section navigation that works from any route and with any location strategy. */
@Injectable({ providedIn: 'root' })
export class ScrollService {
  private router = inject(Router);

  async toSection(id: string): Promise<void> {
    const onHome = this.router.url.split(/[?#]/)[0] === '/';
    if (!onHome) {
      await this.router.navigateByUrl('/');
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    }
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  }
}
