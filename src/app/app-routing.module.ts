import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { ImageComponent } from './image/image.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { RegisterComponent } from './register/register.component';
import { ProtectGuard } from './protect.guard';
import { LayoutAdminComponent } from './admin/layout-admin/layout-admin.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { DashboardAdminComponent } from './admin/dashboard-admin/dashboard-admin.component';
import { ManagerArticleComponent } from './admin/manager-article/manager-article.component';
import { ManagerUserComponent } from './admin/manager-user/manager-user.component';
import { MessageComponent } from './message/message.component';
import { profile } from 'console';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'post', component: PostComponent },
      { path: 'image', component: ImageComponent },
    ],
    canActivate: [ProtectGuard]
  },
  {
    path:"message",
    component:MessageComponent
  },
  {
    path:`info`,
    component:ProfileComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"register",
    component:RegisterComponent
  },
  {
    path:"admin",
    children:[
      {path:'',component:LoginAdminComponent},
      {path:'dashboard',component:LayoutAdminComponent,
        children:[
          { path: 'managerarticle', component: ManagerArticleComponent },
          { path: 'manageruser', component: ManagerUserComponent },
        ],
        
        canActivate: [ProtectGuard]
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
