import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VolumeCalculatorComponent } from './pages/volume-calculator/volume-calculator.component';
import { PersonListComponent } from './pages/person-list/person-list.component';

const routes: Routes = [
  {
    path: '',
    component: PersonListComponent,
  },
  {
    path: 'calculator',
    component: VolumeCalculatorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
