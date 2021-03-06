import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuDirective } from './shared/directives/menu.directive';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { LandingSectionComponent } from './pages/landing-page/components/landing-section/landing-section.component';

import { TypingAnimationDirective } from './shared/directives/typing-animation.directive';
import { NavComponent } from './shared/components/nav/nav.component';
import { FormInputComponent } from './shared/components/form-input/form-input.component';
import { FormsModule } from '@angular/forms';
import { SameStringValidatorDirective } from './shared/validators/same-string-validator.directive';
import { HttpClientModule } from '@angular/common/http';
import { UsedStringValidatorDirective } from './pages/sign-up/validators/used-string-validator.directive';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { HomeComponent } from './pages/home/home.component';
import { NewTripComponent } from './pages/new-trip/new-trip.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuDirective,
    LandingPageComponent,
    SignUpComponent,
    LogInComponent,
    LandingSectionComponent,

    TypingAnimationDirective,

    NavComponent,

    FormInputComponent,

    SameStringValidatorDirective,

    UsedStringValidatorDirective,

    LoadingSpinnerComponent,

    ButtonComponent,

    HomeComponent,

    NewTripComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
