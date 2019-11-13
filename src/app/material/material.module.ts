import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatProgressBarModule,
  MatButtonToggleModule
} from '@angular/material';

const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatProgressBarModule,
  MatButtonToggleModule
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {}