import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from 'src/app/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {title: 'Happy New Year'}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
