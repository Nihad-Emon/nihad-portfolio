import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SITE } from '../data/site';
import { IconComponent } from '../shared/icon.component';
import { RevealDirective, MagneticDirective } from '../shared/motion.directives';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, IconComponent, RevealDirective, MagneticDirective],
  template: `
    <section class="section contact" id="contact" aria-labelledby="contact-title">
      <div class="container grid">
        <div reveal>
          <span class="eyebrow">Contact</span>
          <h2 id="contact-title">Let’s build <span class="grad-text">something great</span> together.</h2>
          <p class="lede">Open to meaningful engineering challenges and collaborative teams.</p>
          <a class="email" [href]="'mailto:' + site.email">{{ site.email }}<app-icon name="arrowUpRight" /></a>
          <ul class="links">
            @if (site.linkedin) { <li><a [href]="site.linkedin" target="_blank" rel="noopener">LinkedIn</a></li> }
            @if (site.github) { <li><a [href]="site.github" target="_blank" rel="noopener">GitHub</a></li> }
            @if (site.resumeUrl) { <li><a [href]="site.resumeUrl" download>Download resume</a></li> }
            <li class="loc">{{ site.location }}</li>
          </ul>
        </div>

        <form class="form" reveal="140" (ngSubmit)="send()" #f="ngForm" novalidate>
          <div class="field">
            <label for="c-name">Your name</label>
            <input id="c-name" name="name" [(ngModel)]="name" required autocomplete="name" #n="ngModel"
                   [attr.aria-invalid]="tried() && n.invalid" aria-describedby="c-name-err" />
            @if (tried() && n.invalid) { <p class="err" id="c-name-err">Add your name so I know who’s writing.</p> }
          </div>
          <div class="field">
            <label for="c-topic">What it’s about</label>
            <select id="c-topic" name="topic" [(ngModel)]="topic">
              <option>A full-time role</option>
              <option>A contract or freelance project</option>
              <option>Something else</option>
            </select>
          </div>
          <div class="field">
            <label for="c-msg">Message</label>
            <textarea id="c-msg" name="message" rows="5" [(ngModel)]="message" required minlength="10" #m="ngModel"
                      [attr.aria-invalid]="tried() && m.invalid" aria-describedby="c-msg-err"></textarea>
            @if (tried() && m.invalid) { <p class="err" id="c-msg-err">Write at least a sentence about what you have in mind.</p> }
          </div>
          <button class="btn btn-primary" magnetic type="submit"><app-icon name="mail" /> Open in my email app</button>
          <p class="hint" aria-live="polite">
            @if (opened()) { Your email app should now be open with this message. If it didn’t open, email {{ site.email }} directly. }
            @else { This opens your own email app with the message filled in. Nothing is sent from this page. }
          </p>
        </form>
      </div>
    </section>
  `,
  styles: `
    .contact { background: radial-gradient(ellipse 60% 70% at 15% 100%, var(--accent-soft), transparent 70%); }
    .grid { display: grid; gap: 3.5rem; }
    @media (min-width: 900px) { .grid { grid-template-columns: minmax(0, 6fr) minmax(0, 5fr); gap: 5rem; align-items: start; } }
    h2 { font-size: var(--step-4); letter-spacing: -.045em; line-height: 1.04; max-width: 14ch; }
    .lede { color: var(--muted); font-size: var(--step-1); margin-top: 1.5rem; max-width: 46ch; }
    .email { display: inline-flex; align-items: center; gap: .5rem; margin-top: 2.25rem; font-size: var(--step-2); font-weight: 600;
      letter-spacing: -.02em; text-decoration: none; border-bottom: 2px solid var(--accent); padding-bottom: .2rem; --icon-size: 22px; word-break: break-all; }
    .email { background: linear-gradient(var(--accent), var(--accent)) 0 100% / 0 2px no-repeat; transition: color .2s, background-size .4s var(--ease); }
    .email:hover { color: var(--accent); }
    .links { list-style: none; padding: 0; margin: 2rem 0 0; display: flex; flex-wrap: wrap; gap: .75rem 1.75rem; }
    .links a { color: var(--text); font-weight: 500; text-underline-offset: 4px; text-decoration-color: var(--line-strong); }
    .links a:hover { text-decoration-color: var(--accent); }
    .loc { color: var(--faint); }
    .form { display: grid; gap: 1.1rem; padding: 1.75rem; border: 1px solid var(--line-strong); border-radius: 24px; background: var(--glass); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); box-shadow: var(--shadow), 0 30px 90px -45px color-mix(in srgb, var(--accent) 70%, transparent); }
    .field { display: grid; gap: .45rem; }
    label { font-size: .88rem; font-weight: 500; }
    input, select, textarea { font: inherit; color: var(--text); background: var(--bg); border: 1px solid var(--line-strong);
      border-radius: 10px; padding: .75rem .9rem; transition: border-color .2s, box-shadow .2s; width: 100%; }
    textarea { resize: vertical; min-height: 120px; }
    input:focus, select:focus, textarea:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }
    [aria-invalid="true"] { border-color: #F26D6D; }
    .err { color: #F26D6D; font-size: .82rem; }
    .btn { justify-self: start; }
    .hint { color: var(--faint); font-size: .82rem; }
  `,
})
export class ContactComponent {
  protected site = SITE;
  protected name = '';
  protected topic = 'A full-time role';
  protected message = '';
  protected tried = signal(false);
  protected opened = signal(false);

  send() {
    this.tried.set(true);
    if (!this.name.trim() || this.message.trim().length < 10) return;
    const subject = `${this.topic}, from ${this.name.trim()}`;
    const body = `${this.message.trim()}\n\n${this.name.trim()}`;
    window.location.href = `mailto:${this.site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    this.opened.set(true);
  }
}
