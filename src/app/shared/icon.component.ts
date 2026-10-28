import { Component, input } from '@angular/core';
import { ICONS } from '../core/icons';

@Component({
  selector: 'app-icon',
  template: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path [attr.d]="paths[name()]" /></svg>`,
  styles: `:host { display: inline-flex; } svg { width: var(--icon-size, 18px); height: var(--icon-size, 18px); }`,
})
export class IconComponent {
  readonly name = input.required<keyof typeof ICONS>();
  protected paths = ICONS;
}
