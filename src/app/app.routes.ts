import { Routes } from '@angular/router';
import { HomePage } from './pages/home.page';
import { ProjectPage } from './pages/project.page';

export const routes: Routes = [
  { path: '', component: HomePage, title: 'Md. Nihad Hasan Emon · Software Engineer' },
  { path: 'projects/:slug', component: ProjectPage },
  { path: '**', redirectTo: '' },
];
