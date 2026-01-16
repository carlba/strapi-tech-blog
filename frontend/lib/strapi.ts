import { strapi as strapiClient } from '@strapi/client';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

// Initialize Strapi SDK client
const strapi = strapiClient({
  baseURL: STRAPI_URL,
});

export interface Article {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  publishedDate?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  coverImage?: {
    url: string;
    alternativeText?: string;
  };
  author?: {
    name: string;
    email: string;
    bio?: string;
    avatar?: {
      url: string;
    };
  };
  categories?: Array<{
    name: string;
    slug: string;
  }>;
}

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Author {
  id: number;
  documentId: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: {
    url: string;
  };
}

export async function getArticles(params?: {
  populate?: string[];
  filters?: Record<string, unknown>;
  sort?: string[];
  pagination?: { page?: number; pageSize?: number };
}) {
  try {
    const queryParams: Record<string, unknown> = {};
    
    if (params?.populate) {
      queryParams.populate = params.populate;
    }
    
    if (params?.sort) {
      queryParams.sort = params.sort;
    }
    
    if (params?.pagination) {
      queryParams.pagination = params.pagination;
    }
    
    if (params?.filters) {
      queryParams.filters = params.filters;
    }
    
    const response = await strapi.find('articles', queryParams);
    return response.data as Article[];
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
}

export async function getArticleBySlug(slug: string, populate: string[] = []) {
  try {
    const response = await strapi.find('articles', {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate,
    });
    
    return response.data?.[0] as Article | undefined;
  } catch (error) {
    console.error('Error fetching article:', error);
    throw error;
  }
}

export async function getCategories() {
  try {
    const response = await strapi.find('categories');
    return response.data as Category[];
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

export async function getAuthors() {
  try {
    const response = await strapi.find('authors');
    return response.data as Author[];
  } catch (error) {
    console.error('Error fetching authors:', error);
    throw error;
  }
}

export { strapi };

