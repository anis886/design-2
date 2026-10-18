import { Component, provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet, Routes } from '@angular/router';
import { ModelCollectionComponent } from './app/features/model-collection/model-collection.component';
import { CollectionModelDetailComponent } from './app/features/model-collection/collection-model-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
})
class AppComponent {}

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ModelCollectionComponent },
  { path: 'models/:slug', component: CollectionModelDetailComponent },
  { path: 'main/bmw-collection', component: ModelCollectionComponent },
  { path: 'main/bmw-collection/:slug', component: CollectionModelDetailComponent },
  { path: 'main/bmw', redirectTo: '', pathMatch: 'full' },
  { path: 'main/home', redirectTo: '', pathMatch: 'full' },
  { path: 'main/performance', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
}).catch((error: unknown) => console.error(error));
