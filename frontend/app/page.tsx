import Link from 'next/link';
import { Card, CardHeader, CardBody, CardFooter, Chip, Divider } from '@heroui/react';
import { getArticles } from '@/lib/strapi';

export default async function Home() {
  let articles = [];
  let error = null;

  try {
    articles = await getArticles({
      populate: ['coverImage', 'author', 'categories'],
      sort: ['publishedDate:desc'],
      pagination: { pageSize: 10 }
    });
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to fetch articles';
    console.error('Error fetching articles:', e);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Tech Blog</h1>
          <p className="mt-2 text-gray-600">A blog powered by Next.js and Strapi</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error ? (
          <Card className="bg-yellow-50 border-l-4 border-yellow-400">
            <CardBody>
              <p className="text-sm text-yellow-700">
                {error}
              </p>
              <p className="mt-2 text-sm text-yellow-700">
                Make sure the Strapi backend is running at{' '}
                <code className="bg-yellow-100 px-1 rounded">
                  {process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}
                </code>
              </p>
            </CardBody>
          </Card>
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">No articles yet</h2>
            <p className="text-gray-600">
              Create your first article in the Strapi admin panel at{' '}
              <a
                href="http://localhost:1337/admin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                http://localhost:1337/admin
              </a>
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow" isPressable>
                <CardHeader className="flex-col items-start p-0">
                  {article.coverImage && (
                    <div className="w-full aspect-video bg-gray-200">
                      <img
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${article.coverImage.url}`}
                        alt={article.coverImage.alternativeText || article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </CardHeader>
                <CardBody className="p-6">
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {article.categories?.map((category) => (
                      <Chip
                        key={category.slug}
                        color="primary"
                        variant="flat"
                        size="sm"
                      >
                        {category.name}
                      </Chip>
                    ))}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    <Link href={`/articles/${article.slug}`} className="hover:text-blue-600">
                      {article.title}
                    </Link>
                  </h2>
                  {article.excerpt && (
                    <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  )}
                </CardBody>
                <CardFooter className="pt-0 px-6 pb-6">
                  <div className="flex items-center text-sm text-gray-500 w-full">
                    {article.author && <span>{article.author.name}</span>}
                    {article.author && article.publishedDate && <span className="mx-2">•</span>}
                    {article.publishedDate && (
                      <span>
                        {new Date(article.publishedDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

