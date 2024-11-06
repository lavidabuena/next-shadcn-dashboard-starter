import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getMetadata } from '@/lib/features/metadata';
import { client } from '@/libs/micro-client';
import { BlogType } from '@/types/blog';

export const generateMetadata = async ({
  params
}: {
  params: { blogId: string };
}) => {
  const blog = await client.get<BlogType>({
    endpoint: 'blog',
    contentId: params.blogId,
    customRequestInit: {
      cache: 'no-store'
    }
  });
  return getMetadata(
    blog.title,
    blog.description,
    blog.tags.map((tag) => tag.name)
  );
};

// 静的生成を使用しない場合は、この関数を削除または無効化します
// export const generateStaticParams = async () => {
//   const data = await client.getList<BlogType>({ endpoint: 'blog' });
//   return data.contents.map((content) => ({
//     blogId: content.id,
//   }));
// };

const BlogDetailPage = async ({ params }: { params: { blogId: string } }) => {
  let blog: BlogType;
  try {
    blog = await client.get<BlogType>({
      endpoint: 'blog',
      contentId: params.blogId,
      customRequestInit: {
        cache: 'no-store'
      }
    });
  } catch (error) {
    notFound();
  }

  const relatedBlogs = await client.getList<BlogType>({
    endpoint: 'blog',
    queries: {
      filters: `tags[contains]${blog.tags[0].name}[and]id[not_equals]${blog.id}`,
      limit: 3
    },
    customRequestInit: {
      cache: 'no-store'
    }
  });

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <main className="flex-grow justify-items-center">
        <section className="w-full max-w-[1600px] px-4 py-16 md:px-20 md:py-20">
          <div className="mb-8 flex-row items-start justify-between py-5 text-left md:mb-16 md:flex-col md:pt-20">
            <h1
              className="mb-4 text-3xl font-bold md:text-5xl"
              style={{
                fontFamily: 'Panchang-Bold, sans-serif',
                letterSpacing: '-1px'
              }}
            >
              {blog.title}
            </h1>
            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-500">
                公開日: {new Date(blog.publishedAt).toLocaleDateString('ja-JP')}
              </p>
              {blog.tags.map((tag, index) => (
                <Badge key={index} className="bg-blue-500 text-white">
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>
          <div className="mb-8">
            <Image
              src={blog.thumbnail.url}
              alt={blog.title}
              width={500}
              height={300}
              className="rounded-lg object-cover"
            />
          </div>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
          <div className="mt-16">
            <h2
              className="mb-8 text-2xl font-bold md:text-3xl"
              style={{
                fontFamily: 'Panchang-Bold, sans-serif',
                letterSpacing: '-1px'
              }}
            >
              関連記事
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedBlogs.contents.map((item, index) => (
                <Card
                  key={index}
                  className="overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <Link href={`/blog/${item.id}`}>
                        <Image
                          src={item.thumbnail.url}
                          alt={item.title}
                          width={397}
                          height={250}
                          className="h-[200px] w-full object-cover md:h-[250px]"
                        />
                      </Link>
                      <Badge className="absolute left-4 top-4 bg-blue-500 text-white">
                        {item.tags[0].name}
                      </Badge>
                    </div>
                    <div className="p-6">
                      <h3
                        className="mb-2 text-lg font-medium md:text-xl"
                        style={{
                          fontFamily: '"Noto Sans JP", sans-serif',
                          letterSpacing: '1.6px'
                        }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="text-sm text-gray-700 md:text-base"
                        style={{
                          fontFamily: '"Noto Sans JP", sans-serif',
                          letterSpacing: '1.6px'
                        }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BlogDetailPage;
