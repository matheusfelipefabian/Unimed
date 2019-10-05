import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
//import { LoggedGuard } from './guards/logged.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  //{ path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule), canActivate: [AuthGuard]},
  //{ path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule), canActivate: [AuthGuard] },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate: [AuthGuard] },
  { path: '', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule), canActivate: [AuthGuard]},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule', canActivate: [LoginGuard]},
  { path: 'patients', loadChildren: './pages/patients/patients.module#PatientsPageModule', canActivate: [AuthGuard] },
  { path: 'patients/:id', loadChildren: './pages/patients/patients.module#PatientsPageModule', canActivate: [AuthGuard] },

  //{ path: 'patients', loadChildren: './pages/patients/patients.module#PatientsPageModule' },
  //{ path: '', loadChildren: './pages/patients/patients.module', canActivate: [AuthGuard]},
  //{ path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  //{ path: '', loadChildren: './pages/home/home.module', canActivate: [AuthGuard]},
  //{ path: 'details', loadChildren: './pages/details/details.module#DetailsPageModule', canActivate: [AuthGuard] },
  //{ path: 'details/:id', loadChildren: './pages/details/details.module#DetailsPageModule', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
