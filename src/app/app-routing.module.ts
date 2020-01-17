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
import {SendComponent} from './components/send/send.component';
import {SendConfirmComponent} from './components/send/send-confirm/send-confirm.component';
import {WithdrawComponent} from './components/withdraw/withdraw.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent, data: {animation: 'index'}},
  {path: 'welcome/:operation', data: {animation: 'new'}, component: WelcomeComponent},
  {path: 'import', component: ImportAccountComponent, data: {animation: 'import'}},
  {path: 'create', component: CreateAccountComponent, data: {animation: 'create'}},
  {path: 'password/:operation', component: PasswordComponent, data: {animation: 'password'}, canActivate: [AuthGuard]},
  {path: 'repeat', component: RepeatPasswordComponent, data: {animation: 'repeat'}, canActivate: [AuthGuard]},
  {path: 'unlock', data: {animation: 'unlock'}, component: UnlockComponent},
  {path: 'main', component: MainComponent, data: {animation: 'main'}, canActivate: [AuthGuard]},
  {path: 'menu', component: MainMenuComponent, data: {animation: 'menu'}, canActivate: [AuthGuard]},
  {path: 'mnemonic', component: ShowMnemonicComponent, data: {animation: 'mnemonic'}, canActivate: [AuthGuard]},
  {path: 'delete', component: DeleteAccountApproveComponent, data: {animation: 'delete'}, canActivate: [AuthGuard]},
  {path: 'deposit', component: DepositComponent, data: {animation: 'deposit'}, canActivate: [AuthGuard]},
  {path: 'withdraw', component: WithdrawComponent, data: {animation: 'withdraw'}, canActivate: [AuthGuard]},
  {path: 'send', component: SendComponent, data: {animation: 'send'}, canActivate: [AuthGuard]},
  {path: 'confirm', component: SendConfirmComponent, data: {animation: 'confirm'}, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
