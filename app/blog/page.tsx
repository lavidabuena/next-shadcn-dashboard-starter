// app/blog/page.tsx

import React from 'react';
import PaginationComponent from '@/components/componentspage/PaginationComponent';
import { getMetadata } from '@/lib/features/metadata';
import { client } from '@/libs/micro-client';
import { BlogType } from '@/types/blog';

export const metadata = getMetadata(
  '最新のWeb制作とデジタルマーケティング情報｜AMANECENブログ',
  'AMANECENの公式ブログでは、最新のWeb制作トレンドやデジタルマーケティング、SEO対策、アプリ開発など、役立つ技術情報と成功事例を紹介。神奈川・湘南エリアを中心に、ビジネスの成長をサポートします。',
  [
    'Web制作',
    'デジタルマーケティング',
    'SEO対策',
    'アプリ開発',
    'デザイントレンド',
    '湘南エリア',
    'AMANECENブログ'
  ]
);

const BlogPage = async () => {
  const allBlogs = await client.getList<BlogType>({
    endpoint: 'blog',
    queries: {
      orders: '-publishedAt',
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
            <h2
              className="mb-4 text-4xl font-bold md:text-[100px]"
              style={{
                fontFamily: 'Panchang-Bold, sans-serif',
                letterSpacing: '-2px'
              }}
            >
              News <span className="text-[#242424]">+</span> Blog
            </h2>
            <p className="my-10 text-lg text-gray-600 md:text-xl">
              最新のウェブ制作トレンドや技術情報、成功事例をお届けします。
              <br />
              デジタルの世界で一歩先を行くための情報源として、ぜひご活用ください。
            </p>
          </div>
          <PaginationComponent items={allBlogs.contents} itemsPerPage={6} />
        </section>
      </main>
    </div>
  );
};

export default BlogPage;
