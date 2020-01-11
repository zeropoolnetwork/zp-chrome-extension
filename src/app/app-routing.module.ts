import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ImportAccountComponent } from './components/import-account/import-account.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { MainComponent } from './components/main/main.component';
import {PasswordComponent} from './components/password/password.component';
import {RepeatPasswordComponent} from './components/repeat-password/repeat-password.component';
import {MainMenuComponent} from './components/main-menu/main-menu.component';
import {ShowMnemonicComponent} from './components/show-mnemonic/show-mnemonic.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'import', component: ImportAccountComponent},
  {path: 'create', component: CreateAccountComponent},
  {path: 'password/:operation', component: PasswordComponent},
  // {path: 'password', component: PasswordComponent},
  {path: 'repeat', component: RepeatPasswordComponent},
  {path: 'main', component: MainComponent},
  {path: 'menu', component: MainMenuComponent},
  {path: 'mnemonic', component: ShowMnemonicComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
