import { Routes } from '@angular/router';
import {LoginComponent} from './layout/login/login.component';
import {SessionComponent} from './layout/session/session.component';
import {AuthUserService} from './services/firebase/auth/auth-user.service';
import {Signin404Component} from './modules/signin/pages/signin404/signin404.component';
import {AuthGuard} from './modules/user/auth.adguard';

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
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: Signin404Component
  }
];
