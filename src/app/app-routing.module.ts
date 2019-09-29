import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoOneComponent } from './demo-one/demo-one.component';
import { DemoTwoComponent } from './demo-two/demo-two.component';

const routes: Routes = [
  { path: '', redirectTo: '/demo-one', pathMatch: 'full' },
  { path: 'demo-one', component: DemoOneComponent },
  { path: 'demo-two', component: DemoTwoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    // { enableTracing: true } // <-- debugging purposes only
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
