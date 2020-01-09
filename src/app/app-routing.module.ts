import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ImportAccountComponent } from './components/import-account/import-account.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { MainComponent } from './components/main/main.component';
import {PasswordComponent} from './components/password/password.component';
import {RepeatPasswordComponent} from "./components/repeat-password/repeat-password.component";

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'import', component: ImportAccountComponent},
  {path: 'create', component: CreateAccountComponent},
  {path: 'password', component: PasswordComponent},
  {path: 'repeat', component: RepeatPasswordComponent},
  {path: 'main', component: MainComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
