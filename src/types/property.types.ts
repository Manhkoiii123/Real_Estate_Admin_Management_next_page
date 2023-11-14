export interface PropertyItemData {
  id?: number;
  title?: string;
  address?: string;
  facility?: Propertyinfo;
  status?: string;
  type?: string;
  price?: number;
  image?: string[];
  country?: string;
  description?: string;
  rating?: number;
  state?: string;
  agent?: PropertyAgent;
}

export interface Propertyinfo {
  Beds?: number;
  baths?: number;
  Area?: string;
  SmookingArea?: boolean;
  Kitchen?: boolean;
  Balcony?: boolean;
  Wifi?: boolean;
  ParkingArea?: boolean;
}

export interface PropertyAgent {
  name?: string;
  phone?: string;
  address?: string;
  properties?: number;
}
