import {NgModule} from '@angular/core';
import {AdminUserComponent} from './pages/admin-user/admin-user.component';
import {UserRoutesModule} from './user.routes';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    AdminUserComponent,
    FormsModule,
    ReactiveFormsModule,
    UserRoutesModule
  ],
})
export class UserModule{}
