// src/admin/types/index.ts

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  readtime: string;
  full_content: string;
}

export interface StickyScrollContent {
  id: number;
  title: string;
  description: Record<string, any>; 
  image_url: string;
  sort_order: number;
}

export interface StickyScrollReversedContent {
  id: number;
  title: string;
  description: Record<string, any>;
  image_url: string;
  sort_order: number;
}

export interface AnimatedSlide {
  id: number;
  img_url: string;
  texts: Record<string, any>;
  sort_order: number;
}

export type SiteContent = Record<string, string>;

export interface BeforeAfterGalleryItem {
  id: number;
  title: string;
  before_image_url: string;
  after_image_url: string;
  sort_order: number;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon_name: string;
  color: string; 
  sort_order?: number; 
}

