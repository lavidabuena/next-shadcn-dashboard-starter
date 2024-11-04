// lib/metadata.ts
import { Metadata } from 'next';

// デフォルトの画像URL
const url = process.env.url;
const defaultOgImageUrl = url + '/OG-AMANECEN.png';

const defaultKeywords = [
  'Web制作',
  'SEO対策',
  'MEO対策',
  'システム開発',
  'マーケティング支援',
  '神奈川',
  '湘南',
  '中小企業支援',
  'AMANECEN'
];

// `keywords` を追加
export function getMetadata(
  title: string,
  description: string,
  keywords: string[] = defaultKeywords,
  imageUrl: string = defaultOgImageUrl
): Metadata {
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images: [
        {
          url: imageUrl
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl]
    }
  };
}
