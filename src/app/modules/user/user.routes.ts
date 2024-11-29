import {RouterModule, Routes} from '@angular/router';
import {AdminUserComponent} from './pages/admin-user/admin-user.component';
import {NgModule} from '@angular/core';
import {InitComponent} from './pages/init/init.component';

export const userRoutes: Routes = [{
  path: '', children: [
    { path: '', redirectTo: 'admin-usuario', pathMatch: 'full' },
    { path: 'admin-usuario', component: AdminUserComponent },
    { path: 'inicio', component: InitComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class UserRoutesModule{}
