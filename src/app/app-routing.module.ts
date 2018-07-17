import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullViewComponent } from './full-view/full-view.component';
import { SearchComponent } from './search/search.component';
import { AboutComponent } from './about/about.component';
const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'about', component: AboutComponent },
  { path: 'definition/:id', component: FullViewComponent },
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: '**', component: SearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
