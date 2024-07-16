import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { ImageComponent } from './image/image.component';
import { NoticesComponent } from './notices/notices.component';
import { MessageComponent } from './message/message.component';
import { ProfileComponent } from './profile/profile.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ListchatComponent } from './listchat/listchat.component';
import { HeaderComponent } from './header/header.component';
import { HoverDirective } from './directive/hover.directive';
import { SendDirective } from './directive/send.directive';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BoldDirective } from './directive/bold.directive';
import { ClickDirective } from './directive/click.directive';
import { DetailPostComponent } from './detail-post/detail-post.component';
import { BoxChatComponent } from './box-chat/box-chat.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowboxDirective } from './directive/showbox.directive';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AuthInterceptor } from './auth.interceptor';
import { ProtectGuard } from './protect.guard';
import { AutoresizeDirective } from './directive/autoresize.directive';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
//import { AngularFireFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { AddDivAfterSixthDirective } from './directive/add-div-after-sixth.directive';
import { ViewImageComponent } from './view-image/view-image.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { LayoutAdminComponent } from './admin/layout-admin/layout-admin.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { DashboardAdminComponent } from './admin/dashboard-admin/dashboard-admin.component';
import { ManagerArticleComponent } from './admin/manager-article/manager-article.component';
import { ManagerUserComponent } from './admin/manager-user/manager-user.component';
import { CreatePostAdminComponent } from './admin/create-post-admin/create-post-admin.component';



@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    PostComponent,
    ImageComponent,
    NoticesComponent,
    MessageComponent,
    ProfileComponent,
    SidebarComponent,
    
    ListchatComponent,
         HeaderComponent,
         HoverDirective,
         SendDirective,
         BoldDirective,
         ClickDirective,
         DetailPostComponent,
         BoxChatComponent,
         LoginComponent,
         RegisterComponent,
         ShowboxDirective,
         AutoresizeDirective,
         AddDivAfterSixthDirective,
         ViewImageComponent,
         UpdatePostComponent,
         LayoutAdminComponent,
         LoginAdminComponent,
         DashboardAdminComponent,
         ManagerArticleComponent,
         ManagerUserComponent,
         CreatePostAdminComponent,
         
         
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CKEditorModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
   
    
  ],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ProtectGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
