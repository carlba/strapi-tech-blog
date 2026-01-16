import Link from 'next/link';
import { notFound } from 'next/navigation';
import DOMPurify from 'isomorphic-dompurify';
import { Card, CardBody, Chip, Button, Avatar, Divider } from '@heroui/react';
import { getArticleBySlug } from '@/lib/strapi';

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  let article;
  try {
    article = await getArticleBySlug(slug, ['coverImage', 'author', 'categories']);
  } catch (error) {
    console.error('Error fetching article:', error);
  }

  if (!article) {
    notFound();
  }

  const sanitizedContent = DOMPurify.sanitize(article.content);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Button
            as={Link}
            href="/"
            color="primary"
            variant="light"
            size="sm"
          >
            ← Back to articles
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="overflow-hidden">
          {article.coverImage && (
            <div className="aspect-video bg-gray-200">
              <img
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${article.coverImage.url}`}
                alt={article.coverImage.alternativeText || article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <CardBody className="p-8">
            <div className="flex gap-2 mb-4 flex-wrap">
              {article.categories?.map((category) => (
                <Chip
                  key={category.slug}
                  color="primary"
                  variant="flat"
                >
                  {category.name}
                </Chip>
              ))}
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="text-xl text-gray-600 mb-6">{article.excerpt}</p>
            )}

            <div className="flex items-center gap-4 mb-8">
              {article.author && (
                <>
                  {article.author.avatar ? (
                    <Avatar
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${article.author.avatar.url}`}
                      alt={article.author.name}
                      size="lg"
                    />
                  ) : (
                    <Avatar
                      name={article.author.name}
                      size="lg"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-gray-900">{article.author.name}</p>
                    {article.publishedDate && (
                      <p className="text-sm text-gray-500">
                        {new Date(article.publishedDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>

            <Divider className="mb-8" />

            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          </CardBody>
        </Card>
      </main>
    </div>
  );
}
