import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';

const COMPONENTS = [
  HeaderComponent,
  ButtonComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    SearchFilterPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ...COMPONENTS,
    SearchFilterPipe
  ]
})
export class SharedModule { }
