export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  items: string[];
  icon: string; // lucide icon name
  timeline?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  type: string;
  area: string;
  year: number;
  city: string;
  images: string[];
  description: string;
  works: string[];
}

export interface ProcessStep {
  step: number;
  title: string;
  body: string;
}

export interface CompanyData {
  name: string;
  shortName: string;
  founded: number;
  phone: string;
  phoneDisplay: string;
  telegram: string;
  email: string;
  address: string;
  inn: string;
  ogrn: string;
  stats: { value: string; label: string; sublabel?: string }[];
}
