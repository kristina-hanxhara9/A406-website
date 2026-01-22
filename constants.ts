import { Product, Review, ServiceType } from './types';

export const COMPANY_INFO = {
  name: "A406 Windows",
  tagline: "Architectural Glazing Systems",
  rating: 4.1,
  reviewCount: 13,
  address: "377 B, N Circular Rd., London N13 5UU",
  phone: "020 8889 9982",
  email: "info@a406windows.co.uk",
  hours: "Mon-Fri: 08:00 - 17:00",
  mapsLink: "https://www.google.com/maps/place/A406+Windows/@51.615,-0.115,15z"
};

export const SERVICES = [
  {
    title: "Structural Glazing",
    description: "Bespoke frameless glass solutions for modern architectural statements.",
    icon: "window"
  },
  {
    title: "Residential Systems",
    description: "High-performance uPVC and Aluminium window systems for the contemporary home.",
    icon: "home"
  },
  {
    title: "Entrance Technology",
    description: "Secure, automated, and composite entry systems designed for longevity.",
    icon: "door"
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    title: 'Aluminium Casement',
    description: 'Slim sightlines, maximum light. The architect’s choice.',
    priceRange: '£600 - £1200 per unit',
    features: ['Thermal Break Technology', 'High Security Locks', 'Powder Coated Finish'],
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2700&auto=format&fit=crop'
  },
  {
    id: 'p2',
    title: 'Heritage Sash',
    description: 'Timeless design meeting modern thermal standards.',
    priceRange: '£900 - £1600 per unit',
    features: ['Woodgrain Effect', 'Easy Clean Tilt', 'A++ Energy Rating'],
    image: 'https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 'p3',
    title: 'Panoramic Sliding Doors',
    description: 'Floor-to-ceiling glass walls for seamless indoor-outdoor living.',
    priceRange: '£1200 - £3000 per meter',
    features: ['Ultra Slim Frames', 'Smooth Lift & Slide', 'Triple Glazing Option'],
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2600&auto=format&fit=crop'
  }
];

export const REVIEWS: Review[] = [
  {
    author: "S. Jenkins",
    rating: 5,
    text: "The architectural quality of the glazing has completely transformed our property's facade.",
    date: "2 months ago"
  },
  {
    author: "D. Miller",
    rating: 4,
    text: "Professional installation of the composite door system. Secure and visually striking.",
    date: "5 months ago"
  },
  {
    author: "A. Patel",
    rating: 5,
    text: "Exceptional precision on the window fit-out. Highly recommended for renovation projects.",
    date: "1 year ago"
  }
];