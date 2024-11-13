import { Routes } from '@angular/router';
import {LoginComponent} from './layout/login/login.component';
import {SessionComponent} from './layout/session/session.component';

export const routes: Routes = [
  { path: '', redirectTo: 'credenciales', pathMatch: 'full'},
  {
  path: 'credenciales',
  component: LoginComponent,
  loadChildren: () => import('./modules/signin/signin.module').then(m => m.SigninModule)
  },
  {
    path: 'usuario',
    component: SessionComponent,
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
  }
];
