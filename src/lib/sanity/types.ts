import type {MenuKey} from '../menu-routing';

export interface SanityAsset {
  _id: string;
  metadata?: {
    dimensions?: {
      width: number;
      height: number;
      aspectRatio?: number;
    };
    lqip?: string;
  };
}

export interface SanityImageSource {
  _type?: 'image';
  asset?: SanityAsset;
  crop?: {top: number; bottom: number; left: number; right: number};
  hotspot?: {x: number; y: number; width: number; height: number};
}

export interface MenuImage {
  _key: string;
  altText: string;
  caption?: string;
  image?: SanityImageSource;
}

export interface MenuPage {
  _id: string;
  _type: 'menuPage';
  routeKey: MenuKey;
  title: string;
  enabled: boolean;
  unavailableMessage?: string;
  images: MenuImage[];
}
