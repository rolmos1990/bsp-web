import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceDirective } from './directives/service.directive';
import { CreateUserService } from './services/create-user.service';
import { CoverageService } from './services/coverage.service';
import { CreateNewRequestService } from './services/new-request.service';

@NgModule({
  declarations: [NavBarComponent, FooterComponent,ServiceDirective],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [NavBarComponent, FooterComponent, FormsModule],
  providers: [
    CreateUserService,
    CoverageService,
    CreateNewRequestService
  ]
})
export class CoreModule { }