/** Brand-agnostic collection data: no page logic depends on BMW string matching. */
export type BodyStyle = 'Coupe' | 'Sedan' | 'SUV' | 'Convertible';
export type FuelType = 'Petrol' | 'Diesel' | 'Hybrid' | 'Plug-in Hybrid' | 'Electric';
export type Category = 'All' | 'Coupe' | 'Sedan' | 'SUV';
export type SortKey = 'default' | 'name-asc' | 'name-desc';

export interface CollectionCar {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly brand: string;
  readonly bodyType: BodyStyle;
  readonly fuelType: FuelType | null;
  readonly image: string;
  readonly thumbnail: string;
  readonly horsepower: number | null;
  readonly acceleration: string | null;
  readonly year: number | null;
  readonly keywords: readonly string[];
  readonly route: string;
  readonly imageIsReferenceThumbnail: boolean;
}

export interface BrandCollectionConfig {
  readonly brand: string;
  readonly heading: string;
  readonly backRoute: string;
  readonly categories: readonly Category[];
  readonly models: readonly CollectionCar[];
}

const asset = 'assets/cars/bmw/';
const detail = (slug: string) => `/main/bmw-collection/${slug}`;

export const BMW_COLLECTION: BrandCollectionConfig = {
  brand: 'BMW',
  heading: 'Find your BMW.',
  backRoute: '/main/bmw',
  categories: ['All', 'Coupe', 'Sedan', 'SUV'],
  models: [
    {
      id: 'bmw-m2', slug: 'm2', name: 'BMW M2', brand: 'BMW', bodyType: 'Coupe', fuelType: 'Petrol',
      image: `${asset}bmw-m2-hero-fallback.webp`, thumbnail: `${asset}bmw-m2.webp`,
      horsepower: null, acceleration: null, year: null, keywords: ['m series', '2 series', 'performance'],
      route: detail('m2'), imageIsReferenceThumbnail: true
    },
    {
      id: 'bmw-m3-competition', slug: 'm3-competition', name: 'BMW M3 Competition', brand: 'BMW',
      bodyType: 'Sedan', fuelType: 'Petrol',
      image: `${asset}bmw-m3-competition-hero-fallback.webp`, thumbnail: `${asset}bmw-m3-competition.webp`,
      horsepower: null, acceleration: null, year: null, keywords: ['m series', '3 series', 'performance'],
      route: detail('m3-competition'), imageIsReferenceThumbnail: true
    },
    {
      id: 'bmw-m4-competition', slug: 'm4-competition', name: 'BMW M4 Competition', brand: 'BMW',
      bodyType: 'Coupe', fuelType: 'Petrol',
      image: `${asset}bmw-m4-competition-hero.webp`, thumbnail: `${asset}bmw-m4-competition.webp`,
      horsepower: null, acceleration: null, year: null, keywords: ['m series', '4 series', 'yellow', 'performance'],
      route: detail('m4-competition'), imageIsReferenceThumbnail: false
    },
    {
      id: 'bmw-m5', slug: 'm5', name: 'BMW M5', brand: 'BMW', bodyType: 'Sedan',
      // The screenshot does not specify an M5 model year or drivetrain, so fuel is deliberately unasserted.
      fuelType: null, image: `${asset}bmw-m5-hero-fallback.webp`, thumbnail: `${asset}bmw-m5.webp`,
      horsepower: null, acceleration: null, year: null, keywords: ['m series', '5 series', 'performance'],
      route: detail('m5'), imageIsReferenceThumbnail: true
    },
    {
      id: 'bmw-x5-m-competition', slug: 'x5-m-competition', name: 'BMW X5 M Competition', brand: 'BMW',
      bodyType: 'SUV', fuelType: 'Petrol',
      image: `${asset}bmw-x5-m-competition-hero-fallback.webp`, thumbnail: `${asset}bmw-x5-m-competition.webp`,
      horsepower: null, acceleration: null, year: null, keywords: ['m series', 'x5', 'performance'],
      route: detail('x5-m-competition'), imageIsReferenceThumbnail: true
    },
    {
      id: 'bmw-m4-convertible', slug: 'm4-convertible', name: 'BMW M4 Convertible', brand: 'BMW',
      bodyType: 'Convertible', fuelType: 'Petrol',
      image: `${asset}bmw-m4-convertible-hero-fallback.webp`, thumbnail: `${asset}bmw-m4-convertible.webp`,
      horsepower: null, acceleration: null, year: null, keywords: ['m series', '4 series', 'cabriolet', 'drop top'],
      route: detail('m4-convertible'), imageIsReferenceThumbnail: true
    }
  ]
};

export function findBmwModelBySlug(slug: string): CollectionCar | undefined {
  return BMW_COLLECTION.models.find((model) => model.slug === slug);
}
