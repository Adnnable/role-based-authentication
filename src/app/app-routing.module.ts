import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { AuthGuard } from './authentication/auth.guard';
import { SummaryComponent } from './components/admin/summary/summary.component';

const routes: Routes = [
  {path:'login' , component:LoginComponent},

  {path:'Admin',component: AdminComponent, canActivate:[AuthGuard]},
  
  {path:'home' , component:HomeComponent , canActivate:[AuthGuard]},

  {path:'home/summary' , component:SummaryComponent , canActivate:[AuthGuard]},

  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
