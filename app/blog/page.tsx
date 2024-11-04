import React from 'react';

import PaginationComponent from '@/components/componentspage/PaginationComponent';

import { getMetadata } from '@/lib/features/metadata';

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
const newsItems = [
  {
    title: '株式会社ラピネス',
    url: 'https://lappiness.jp',
    category: 'Web制作'
  },
  {
    title: 'みんため サービスサイト',
    url: 'https://mintame.jp/',
    category: 'サービス'
  },
  {
    title: 'ラフェスタリンク株式会社',
    url: 'https://hikawa-hybridspray.com/',
    category: 'コーポレート'
  },
  {
    title: 'デジタルマーケティング最新動向',
    url: 'https://example.com/digital-marketing',
    category: 'マーケティング'
  },
  {
    title: 'UI/UXデザイントレンド2024',
    url: 'https://example.com/design-trends',
    category: 'デザイン'
  },
  {
    title: 'アプリ開発成功事例',
    url: 'https://example.com/app-success',
    category: 'アプリ開発'
  },
  {
    title: 'SEO対策最新ガイド',
    url: 'https://example.com/seo-guide',
    category: 'SEO'
  },
  {
    title: 'ウェブセキュリティ入門',
    url: 'https://example.com/web-security',
    category: 'セキュリティ'
  },
  {
    title: 'クラウドサービス活用法',
    url: 'https://example.com/cloud-services',
    category: 'クラウド'
  },
  {
    title: 'AI導入事例集',
    url: 'https://example.com/ai-cases',
    category: 'AI'
  }
];

export default function Blog() {
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
          <PaginationComponent items={newsItems} itemsPerPage={6} />
        </section>
      </main>
    </div>
  );
}
