
import { LucideIcon } from 'lucide-react';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  tags: string[];
  date: string;
  readTime: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
}
