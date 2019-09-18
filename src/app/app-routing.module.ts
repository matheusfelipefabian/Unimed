import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule), canActivate: [AuthGuard]},
  //{ path: 'home', loadChildren: './home/home.module#HomePageModule'},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule', canActivate: [LoginGuard]},
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
