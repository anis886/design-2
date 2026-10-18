import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CollectionCar, findBmwModelBySlug } from './model-collection.data';

/** Minimal route-safe detail fallback; replace this route with the shared car details system when available. */
@Component({
  selector: 'app-collection-model-detail',
  standalone: true,
  templateUrl: './collection-model-detail.component.html',
  styleUrl: './collection-model-detail.component.scss'
})
export class CollectionModelDetailComponent {
  readonly model: CollectionCar | undefined;

  constructor(route: ActivatedRoute, private readonly router: Router) {
    this.model = findBmwModelBySlug(route.snapshot.paramMap.get('slug') ?? '');
  }

  back(): void { this.router.navigateByUrl('/main/bmw-collection'); }
  goBrand(): void { this.router.navigateByUrl('/main/bmw'); }
  imageFallback(event: Event, model: CollectionCar): void {
    const img = event.target as HTMLImageElement;
    if (!img.src.endsWith(model.thumbnail)) img.src = model.thumbnail;
  }
}
