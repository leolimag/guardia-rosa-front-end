import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { InterceptorModule } from './pages/interceptors/interceptors.module';
import { UserAuthenticatedGuard } from './services/guards/user-authenticated.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'home',
    canActivate: [UserAuthenticatedGuard],
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
  },
  {
    path: 'folder/:id',
    canActivate: [UserAuthenticatedGuard],
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'profile',
    canActivate: [UserAuthenticatedGuard],
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
  },
  {
    path: 'setting-page',
    canActivate: [UserAuthenticatedGuard],
    loadChildren: () => import('./pages/setting-page/setting-page.module').then( m => m.SettingPagePageModule),
  },
  {
    path: 'location',
    canActivate: [UserAuthenticatedGuard],
    loadChildren: () => import('./pages/location/location.module').then( m => m.LocationPageModule),
  },
  {
    path: 'guardian',
    canActivate: [UserAuthenticatedGuard],
    loadChildren: () => import('./pages/guardian/guardian.module').then( m => m.GuardianPageModule),
  },
  {
    path: 'add-guardian',
    canActivate: [UserAuthenticatedGuard],
    loadChildren: () => import('./pages/add-guardian/add-guardian.module').then( m => m.AddGuardianPageModule)
  },
  {
    path: 'edit-guardian/:id',
    canActivate: [UserAuthenticatedGuard],
    loadChildren: () => import('./pages/edit-guardian/edit-guardian.module').then( m => m.EditGuardianPageModule)
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./pages/forget-password/forget-password.module').then( m => m.ForgetPasswordPageModule)
  },
  {
    path: 'validate-reset-password/:email',
    loadChildren: () => import('./pages/validate-reset-password/validate-reset-password.module').then( m => m.ValidateResetPasswordPageModule)
  },
  {
    path: 'reset-password/:email',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'about',
    canActivate: [UserAuthenticatedGuard],
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'post/:id/:open-modal-comment',
    canActivate: [UserAuthenticatedGuard],
    loadChildren: () => import('./pages/post/post.module').then( m => m.PostPageModule)
  },
  {
    path: 'my-posts',
    canActivate: [UserAuthenticatedGuard],
    loadChildren: () => import('./pages/my-posts/my-posts.module').then( m => m.MyPostsPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }), InterceptorModule
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
