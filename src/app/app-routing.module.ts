import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {ImportAccountComponent} from './components/import-account/import-account.component';
import {CreateAccountComponent} from './components/create-account/create-account.component';
import {MainComponent} from './components/main/main.component';
import {PasswordComponent} from './components/password/password.component';
import {RepeatPasswordComponent} from './components/repeat-password/repeat-password.component';
import {MainMenuComponent} from './components/main-menu/main-menu.component';
import {ShowMnemonicComponent} from './components/show-mnemonic/show-mnemonic.component';
import {DeleteAccountApproveComponent} from './components/delete-account-approve/delete-account-approve.component';
import {UnlockComponent} from './components/unlock/unlock.component';
import {AuthGuardService as AuthGuard} from './services/auth-guard.service';
import {DepositComponent} from './components/deposit/deposit.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'welcome/:operation', component: WelcomeComponent},
  {path: 'import', component: ImportAccountComponent},
  {path: 'create', component: CreateAccountComponent},
  {path: 'password/:operation', component: PasswordComponent, canActivate: [AuthGuard]},
  {path: 'repeat', component: RepeatPasswordComponent, canActivate: [AuthGuard]},
  {path: 'unlock', component: UnlockComponent},
  {path: 'main', component: MainComponent, canActivate: [AuthGuard]},
  {path: 'menu', component: MainMenuComponent, canActivate: [AuthGuard]},
  {path: 'mnemonic', component: ShowMnemonicComponent, canActivate: [AuthGuard]},
  {path: 'delete', component: DeleteAccountApproveComponent, canActivate: [AuthGuard]},
  {path: 'deposit', component: DepositComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
