import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './components/app.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {ImportAccountComponent} from './components/import-account/import-account.component';
import {CreateAccountComponent} from './components/create-account/create-account.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MainComponent} from './components/main/main.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {PasswordComponent} from './components/password/password.component';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {RepeatPasswordComponent} from './components/repeat-password/repeat-password.component';
import {SharedDataService} from './services/shared-data.service';
import {HeaderComponent} from './components/header/header.component';
import {MainMenuComponent} from './components/main-menu/main-menu.component';
import {ShowMnemonicComponent} from './components/show-mnemonic/show-mnemonic.component';
import {DeleteAccountApproveComponent} from './components/delete-account-approve/delete-account-approve.component';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ImportAccountComponent,
    CreateAccountComponent,
    MainComponent,
    PasswordComponent,
    RepeatPasswordComponent,
    HeaderComponent,
    MainMenuComponent,
    ShowMnemonicComponent,
    DeleteAccountApproveComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatProgressBarModule,
    AppRoutingModule,
    MatIconModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatListModule,
  ],
  providers: [SharedDataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
