import { Directive, ElementRef, HostListener, afterNextRender, inject, input, DestroyRef } from '@angular/core';

/** Fades and lifts an element into view the first time it scrolls on screen. */
@Directive({
  selector: '[reveal]',
  host: { class: 'reveal', '[style.--d]': 'delay() + "ms"' },
})
export class RevealDirective {
  readonly delay = input(0, { alias: 'reveal', transform: (v: unknown) => Number(v) || 0 });
  private el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  constructor() {
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      if (!('IntersectionObserver' in window)) { this.el.classList.add('in'); return; }
      const io = new IntersectionObserver(([en]) => {
        if (en.isIntersecting) { this.el.classList.add('in'); io.disconnect(); }
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
      io.observe(this.el);
      destroy.onDestroy(() => io.disconnect());
    });
  }
}

/** Cursor-following glow on cards. Styling lives in styles.scss (.spot). */
@Directive({ selector: '[spot]', host: { class: 'spot' } })
export class SpotlightDirective {
  private el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  @HostListener('pointermove', ['$event'])
  move(e: PointerEvent) {
    const r = this.el.getBoundingClientRect();
    this.el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    this.el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }
}

/** Counts a number up from zero when it scrolls into view. */
@Directive({ selector: '[countUp]' })
export class CountUpDirective {
  readonly countUp = input.required<number>();
  private el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  constructor() {
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      const target = this.countUp();
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce || !('IntersectionObserver' in window)) { this.el.textContent = String(target); return; }
      this.el.textContent = '0';
      const io = new IntersectionObserver(([en]) => {
        if (!en.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now(), dur = 1400;
        const tick = (now: number) => {
          const p = Math.min((now - t0) / dur, 1);
          this.el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }, { threshold: 0.6 });
      io.observe(this.el);
      destroy.onDestroy(() => io.disconnect());
    });
  }
}

const canHover = () => window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches;

/** Gentle 3D tilt toward the cursor. `tilt` is the max angle in degrees. */
@Directive({ selector: '[tilt]' })
export class TiltDirective {
  readonly max = input(5, { alias: 'tilt', transform: (v: unknown) => Number(v) || 5 });
  private el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private lift = false;

  @HostListener('pointermove', ['$event'])
  move(e: PointerEvent) {
    if (!canHover()) return;
    const r = this.el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    const m = this.max();
    this.el.style.transition = 'transform .12s ease-out, border-color .3s, box-shadow .4s';
    this.el.style.transform = `perspective(900px) rotateX(${(-y * m).toFixed(2)}deg) rotateY(${(x * m).toFixed(2)}deg) translateY(${this.lift ? -4 : 0}px)`;
  }

  @HostListener('pointerenter') enter() { this.lift = this.el.classList.contains('card-surface'); }
  @HostListener('pointerleave')
  leave() {
    this.el.style.transition = 'transform .5s cubic-bezier(.2,.7,.2,1), border-color .3s, box-shadow .4s';
    this.el.style.transform = '';
    setTimeout(() => (this.el.style.transition = ''), 520);
  }
}

/** Nudges a button slightly toward the cursor. */
@Directive({ selector: '[magnetic]' })
export class MagneticDirective {
  private el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  @HostListener('pointermove', ['$event'])
  move(e: PointerEvent) {
    if (!canHover()) return;
    const r = this.el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * .18, y = (e.clientY - (r.top + r.height / 2)) * .3;
    this.el.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
  }
  @HostListener('pointerleave') leave() { this.el.style.translate = ''; }
}
