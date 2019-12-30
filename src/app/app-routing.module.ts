import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { ImportAccountComponent } from './import-account/import-account.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'import', component: ImportAccountComponent},
  {path: 'create', component: CreateAccountComponent},
  {path: 'main', component: MainComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  //
}
