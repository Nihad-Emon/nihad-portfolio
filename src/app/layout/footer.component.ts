import { Component } from '@angular/core';
import { SITE } from '../data/site';
import { IconComponent } from '../shared/icon.component';

@Component({
  selector: 'app-footer',
  imports: [IconComponent],
  template: `
    <footer class="container foot">
      <p>© {{ year }} {{ site.name }} · {{ site.location }}</p>
      <div class="end">
        @if (site.linkedin) { <a [href]="site.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn"><app-icon name="linkedin" /></a> }
        @if (site.github) { <a [href]="site.github" target="_blank" rel="noopener" aria-label="GitHub"><app-icon name="github" /></a> }
        <a class="top" href="#top" (click)="top($event)">Back to top ↑</a>
      </div>
    </footer>
  `,
  styles: `
    .foot { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: .75rem 2rem;
      padding-block: 2rem; border-top: 1px solid var(--line); color: var(--faint); font-size: .85rem; }
    .end { display: flex; align-items: center; gap: 1.1rem; --icon-size: 18px; }
    a { text-decoration: none; transition: color .2s; }
    a:hover { color: var(--text); }
  `,
})
export class FooterComponent {
  protected site = SITE;
  protected year = new Date().getFullYear();
  top(e: Event) { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
}
