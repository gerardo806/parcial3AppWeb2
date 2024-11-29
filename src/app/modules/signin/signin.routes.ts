import {Router, RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './pages/auth/auth.component';
import {SignupComponent} from './pages/signup/signup.component';
import {AboutComponent} from './pages/about/about.component';
import {Signin404Component} from './pages/signin404/signin404.component';
import {NgModule} from '@angular/core';
import {AuthGuard} from '../user/auth.adguard';

export const signinRoutes: Routes = [{
  path: '', children: [
    { path: '', redirectTo: 'iniciar-sesion', pathMatch: 'full' },
    { path: 'iniciar-sesion', component: AuthComponent },
    { path: 'registro', component: SignupComponent },
    { path: 'acerca-de', component: AboutComponent },
    { path: '**', component: Signin404Component }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(signinRoutes)],
  exports: [RouterModule],
})
export class SigninRoutesModule{}
