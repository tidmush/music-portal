import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes }  from '@angular/router';

import {Settings} from './settings';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { MainComponent } from './main/main.component';
import { UserComponent } from './user/user.component';
import { PlayerComponent } from './player/player.component';
import { GeneralListComponent } from './main/general-list.component';
import {SafePipe} from './main/safe.pipe';

import { AuthGuard } from './main/auth-guard.service';
import { GeneralService } from './main/general.service';
import { LoginService } from './login/login.service';
import { UserService } from './user/user.service';
import { PlayerService } from './player/player.service';


const appRoutes: Routes = [
  { path: "home", component: MainComponent, canActivate:[AuthGuard] },
  { path: "login", component: LoginComponent },
   { path: "", redirectTo:"home", pathMatch: 'full'},
  { path: '**', redirectTo:"home"}
];


 @NgModule({
   imports: [BrowserModule, RouterModule.forRoot(appRoutes), HttpModule,HttpClientModule],
   declarations: [AppComponent, LoginComponent, MainComponent, UserComponent, PlayerComponent, GeneralListComponent,SafePipe],
   providers: [GeneralService, LoginService, UserService,PlayerService, AuthGuard, Settings],
   bootstrap: [AppComponent]
 })

export class AppModule { }


