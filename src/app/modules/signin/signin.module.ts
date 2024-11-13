import {NgModule} from '@angular/core';
import {signinRoutes, SigninRoutesModule} from './signin.routes';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthComponent} from './pages/auth/auth.component';

@NgModule({
  declarations: [],
  imports: [
    AuthComponent,
    FormsModule,
    ReactiveFormsModule,
    SigninRoutesModule
  ],
})
export class SigninModule{}
