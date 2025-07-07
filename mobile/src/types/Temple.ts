export interface Temple {
  id: number;
  city: string;
  address: string;
  phone: string | null;
  fax: string | null;
  email: string | null;
  operatingHours: string | null;
  operatingDays: string | null;
  latitude: number | null;
  longitude: number | null;
}

export interface TempleWithDistance extends Temple {
  distance: number;
}

export interface SearchRequest {
  zipcode?: string;
  latitude?: number;
  longitude?: number;
}

export interface UserLocation {
  latitude: number;
  longitude: number;
}