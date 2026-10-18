import { Component, HostListener, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  BMW_COLLECTION, BodyStyle, Category, CollectionCar, FuelType, SortKey
} from './model-collection.data';

@Component({
  selector: 'app-model-collection',
  standalone: true,
  templateUrl: './model-collection.component.html',
  styleUrl: './model-collection.component.scss'
})
export class ModelCollectionComponent {
  readonly collection = BMW_COLLECTION;
  readonly selectedCarId = signal('bmw-m4-competition');
  readonly searchQuery = signal('');
  readonly selectedCategory = signal<Category>('All');
  readonly bodyFilter = signal<BodyStyle | 'All'>('All');
  readonly fuelFilter = signal<FuelType | 'All'>('All');
  readonly sortOption = signal<SortKey>('default');
  readonly filterOpen = signal(false);
  readonly sortOpen = signal(false);
  readonly drawerOpen = signal(false);
  readonly compareOpen = signal(false);
  readonly comparisonSelection = signal<readonly string[]>([]);
  readonly compareNotice = signal('');

  readonly bodyFilters: readonly (BodyStyle | 'All')[] = ['All', 'Coupe', 'Sedan', 'SUV', 'Convertible'];
  readonly fuelFilters: readonly (FuelType | 'All')[] = [
    'All', 'Petrol', 'Diesel', 'Hybrid', 'Plug-in Hybrid', 'Electric'
  ];
  readonly sorts: readonly { value: SortKey; label: string }[] = [
    { value: 'default', label: 'Default order' },
    { value: 'name-asc', label: 'Name A–Z' },
    { value: 'name-desc', label: 'Name Z–A' }
  ];

  readonly filteredModels = computed(() => {
    const category = this.selectedCategory();
    const body = this.bodyFilter();
    const fuel = this.fuelFilter();
    const query = this.searchQuery().toLowerCase().trim();
    return this.collection.models.filter((car) => {
      const categoryMatch = category === 'All' || car.bodyType === category;
      const bodyMatch = body === 'All' || car.bodyType === body;
      const fuelMatch = fuel === 'All' || car.fuelType === fuel;
      const text = [car.name, car.brand, car.bodyType, car.fuelType ?? '',
        car.year ?? '', ...car.keywords].join(' ').toLowerCase();
      return categoryMatch && bodyMatch && fuelMatch && (!query || text.includes(query));
    });
  });

  readonly sortedModels = computed(() => {
    const models = [...this.filteredModels()];
    switch (this.sortOption()) {
      case 'name-asc': return models.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc': return models.sort((a, b) => b.name.localeCompare(a.name));
      default: return models;
    }
  });

  // A filtered-out selection is not deleted. While excluded, the first visible model
  // becomes the effective active car. Clearing filters restores the prior selection.
  readonly selectedCar = computed<CollectionCar | null>(() => {
    const visible = this.sortedModels();
    return visible.find((car) => car.id === this.selectedCarId()) ?? visible[0] ?? null;
  });
  readonly activeIndex = computed(() => {
    const active = this.selectedCar();
    return active ? this.sortedModels().findIndex((car) => car.id === active.id) : -1;
  });
  readonly displayedModelCount = computed(() => this.sortedModels().length);
  readonly comparisonCars = computed(() =>
    this.comparisonSelection().flatMap((id) => {
      const car = this.collection.models.find((item) => item.id === id);
      return car ? [car] : [];
    })
  );

  constructor(private readonly router: Router) {}

  setSearch(value: string): void { this.searchQuery.set(value); }
  select(car: CollectionCar): void { this.selectedCarId.set(car.id); }

  setCategory(category: Category): void {
    this.selectedCategory.set(category);
    // The tab acts as the main category selector. An explicit body dropdown
    // restriction is cleared to avoid a hidden contradictory filter.
    this.bodyFilter.set('All');
  }

  setBodyFilter(value: BodyStyle | 'All'): void {
    this.bodyFilter.set(value);
    this.selectedCategory.set('All');
  }

  clearFilters(): void {
    this.searchQuery.set('');
    this.selectedCategory.set('All');
    this.bodyFilter.set('All');
    this.fuelFilter.set('All');
    this.sortOption.set('default');
  }

  chooseSort(value: SortKey): void {
    this.sortOption.set(value);
    this.sortOpen.set(false);
  }

  toggleFilter(): void {
    this.filterOpen.update((opened) => !opened);
    this.sortOpen.set(false);
  }

  toggleSort(): void {
    this.sortOpen.update((opened) => !opened);
    this.filterOpen.set(false);
  }

  move(direction: -1 | 1): void {
    const models = this.sortedModels();
    if (models.length === 0) return;
    const current = this.activeIndex();
    const nextIndex = (current + direction + models.length) % models.length;
    this.selectedCarId.set(models[nextIndex].id);
  }

  navigateTo(path: string): void { this.router.navigateByUrl(path); }

  back(): void {
    this.router.navigateByUrl(this.collection.backRoute);
  }

  viewModel(): void {
    const model = this.selectedCar();
    if (model) this.router.navigateByUrl(model.route);
  }

  isCompared(id: string): boolean { return this.comparisonSelection().includes(id); }

  toggleCompare(): void {
    const car = this.selectedCar();
    if (!car) return;
    const ids = this.comparisonSelection();
    if (ids.includes(car.id)) {
      this.comparisonSelection.set(ids.filter((id) => id !== car.id));
      this.compareNotice.set('Vehicle removed from comparison.');
    } else if (ids.length >= 3) {
      this.compareNotice.set('You can compare up to three vehicles. Remove one first.');
    } else {
      this.comparisonSelection.set([...ids, car.id]);
      this.compareNotice.set('');
    }
    this.compareOpen.set(true);
  }

  removeCompared(id: string): void {
    this.comparisonSelection.update((ids) => ids.filter((item) => item !== id));
    this.compareNotice.set('');
  }

  formatPower(car: CollectionCar): string {
    return car.horsepower == null ? '—' : `${car.horsepower} hp`;
  }

  formatAcceleration(car: CollectionCar): string {
    return car.acceleration ?? '—';
  }

  formatFuel(car: CollectionCar): string { return car.fuelType ?? '—'; }

  imageFallback(event: Event, car: CollectionCar): void {
    const image = event.target as HTMLImageElement;
    if (!image.src.endsWith(car.thumbnail)) image.src = car.thumbnail;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.filterOpen.set(false);
    this.sortOpen.set(false);
    this.drawerOpen.set(false);
    this.compareOpen.set(false);
  }
}
