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
import { HttpClientModule } from '@angular/common/http';
import { BoldDirective } from './directive/bold.directive';
import { ClickDirective } from './directive/click.directive';
import { DetailPostComponent } from './detail-post/detail-post.component';
import { BoxChatComponent } from './box-chat/box-chat.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowboxDirective } from './directive/showbox.directive';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

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
         ShowboxDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CKEditorModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
