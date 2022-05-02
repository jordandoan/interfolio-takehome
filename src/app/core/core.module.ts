import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiHttpService } from './api-http.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ], exports: [
    CommonModule
  ],
  providers: [
    ApiHttpService
  ]
})
export class CoreModule { }
