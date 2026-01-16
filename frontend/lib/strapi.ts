const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

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

async function fetchAPI(path: string, options?: RequestInit) {
  const url = `${STRAPI_URL}/api${path}`;
  
  try {
    const headers: HeadersInit = {
      ...options?.headers,
    };
    
    // Only set Content-Type for requests with a body
    if (options?.body) {
      headers['Content-Type'] = 'application/json';
    }
    
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export async function getArticles(params?: {
  populate?: string[];
  filters?: Record<string, unknown>;
  sort?: string[];
  pagination?: { page?: number; pageSize?: number };
}) {
  const searchParams = new URLSearchParams();
  
  if (params?.populate) {
    params.populate.forEach(field => {
      searchParams.append('populate', field);
    });
  }
  
  if (params?.sort) {
    params.sort.forEach(field => {
      searchParams.append('sort', field);
    });
  }
  
  if (params?.pagination) {
    if (params.pagination.page) {
      searchParams.append('pagination[page]', params.pagination.page.toString());
    }
    if (params.pagination.pageSize) {
      searchParams.append('pagination[pageSize]', params.pagination.pageSize.toString());
    }
  }
  
  const queryString = searchParams.toString();
  const path = `/articles${queryString ? `?${queryString}` : ''}`;
  
  const response = await fetchAPI(path);
  return response.data as Article[];
}

export async function getArticleBySlug(slug: string, populate: string[] = []) {
  const searchParams = new URLSearchParams();
  searchParams.append('filters[slug][$eq]', slug);
  
  populate.forEach(field => {
    searchParams.append('populate', field);
  });
  
  const response = await fetchAPI(`/articles?${searchParams.toString()}`);
  return response.data?.[0] as Article | undefined;
}

export async function getCategories() {
  const response = await fetchAPI('/categories');
  return response.data as Category[];
}

export async function getAuthors() {
  const response = await fetchAPI('/authors');
  return response.data as Author[];
}
