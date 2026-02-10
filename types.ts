
export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

export interface FeatureCardProps {
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  dark?: boolean;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  logo: string;
  image: string;
}
