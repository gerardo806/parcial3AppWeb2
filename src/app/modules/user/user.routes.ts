import {RouterModule, Routes} from '@angular/router';
import {AdminUserComponent} from './pages/admin-user/admin-user.component';
import {NgModule} from '@angular/core';

export const userRoutes: Routes = [{
  path: '', children: [
    { path: '', redirectTo: 'admin-usuario', pathMatch: 'full' },
    { path: 'admin-usuario', component: AdminUserComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class UserRoutesModule{}
