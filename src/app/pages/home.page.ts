import { Component } from '@angular/core';
import { HeroComponent } from '../sections/hero.component';
import { AboutComponent } from '../sections/about.component';
import { ServicesComponent } from '../sections/services.component';
import { FaqComponent } from '../sections/faq.component';
import { SkillsComponent } from '../sections/skills.component';
import { ProjectsComponent } from '../sections/projects.component';
import { ExperienceComponent } from '../sections/experience.component';
import { ApproachComponent } from '../sections/approach.component';
import { BeyondComponent } from '../sections/beyond.component';
import { ContactComponent } from '../sections/contact.component';

@Component({
  selector: 'app-home-page',
  imports: [HeroComponent, AboutComponent, ServicesComponent, FaqComponent, SkillsComponent, ProjectsComponent, ExperienceComponent, ApproachComponent, BeyondComponent, ContactComponent],
  template: `
    <app-hero />
    <app-about />
    <app-services />
    <app-skills />
    <app-projects />
    <app-experience />
    <app-approach />
    <app-beyond />
    <app-faq />
    <app-contact />
  `,
})
export class HomePage {}
