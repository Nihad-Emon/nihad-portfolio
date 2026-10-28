import { Component, input } from '@angular/core';
import { Project } from '../data/projects';
import { MockupComponent } from './mockup.component';

/** Real screenshot when `cover` is set, otherwise the labelled illustrative mockup. */
@Component({
  selector: 'app-project-visual',
  imports: [MockupComponent],
  template: `
    @if (project().cover) {
      <img class="cover" [src]="project().cover" [alt]="project().alias + ' screenshot'" loading="lazy" />
    } @else {
      <app-mockup [variant]="project().mockup" [label]="project().alias" />
    }
  `,
  styles: `:host { display: block; } .cover { width: 100%; aspect-ratio: 16 / 10.5; object-fit: cover; border-radius: 14px; border: 1px solid var(--line-strong); }`,
})
export class ProjectVisualComponent { readonly project = input.required<Project>(); }
