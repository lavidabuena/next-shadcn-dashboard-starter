import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Spline from '@splinetool/react-spline';
import AnimatedLottie from '@/components/componentspage/AnimatedLottie';
import AnimatedText from '@/components/componentspage/AnimatedText';
import Link from 'next/link';
import { getMetadata } from '@/lib/features/metadata';

export const metadata = getMetadata(
  'ホームページ - 神奈川・湘南・横浜のWeb制作と集客支援',
  'AMANECENは、神奈川・湘南エリアの中小企業向けにWeb制作、SEO、MEO支援を提供。ビジネスの成長と集客力向上を支援します。'
);

interface Service {
  title: string;
  description: string;
  lottieUrl: string;
}

interface NewsItem {
  title: string;
  url: string;
  category: string;
}

export default function Component() {
  const services: Service[] = [
    {
      title: 'オリジナルホームページ制作',
      description: 'オーダーメイドで成果に繋がる唯一無二のホームページを',
      lottieUrl:
        'https://lottie.host/126f76c4-3a6b-4be3-a3de-975d6633954f/Dqdy9LoGzR.json'
    },
    {
      title: 'SEO対策',
      description: 'SEO対策で検索上位表示を実現し、自然な流入を増やします',
      lottieUrl:
        'https://lottie.host/6877afb9-a698-4da2-a439-f69bc80e2238/8LeTOJDmO8.json'
    },
    {
      title: 'サブスク型ホームページ制作',
      description: '初期費用0円〜制作できるサブスク型パッケージプラン。',
      lottieUrl:
        'https://lottie.host/63cae087-6517-4675-9015-d61a3f0b9315/8iHcmIhEHH.json'
    },
    {
      title: 'システム開発',
      description: '課題解決に向けたカスタムシステム開発でビジネスを効率化',
      lottieUrl:
        'https://lottie.host/7de24966-b94c-4524-ab69-e2730621e8f4/UT1PCz7BJd.json'
    },
    {
      title: 'MEO対策',
      description: '成果報酬制のMEO対策でリスク0で新規集客を獲得',
      lottieUrl:
        'https://lottie.host/88e1b831-745a-45a3-8d00-e545971472b8/s3ihGyltkJ.json'
    },
    {
      title: 'LINE公式構築・運用',
      description: '新規顧客の獲得およびリピート率の改善',
      lottieUrl:
        'https://lottie.host/6f66e210-de8e-4d63-94c6-00bd1b9c3435/XxJ6bTpp3B.json'
    }
  ];

  const newsItems: NewsItem[] = [
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
    }
  ];

  return (
    <div>
      <main className="flex-grow justify-items-center">
        <section className="relative h-screen w-full overflow-hidden bg-black">
          <Spline
            className="z-2 h-screen w-full"
            scene="https://prod.spline.design/ZiZMieuaJcdA6ZTY/scene.splinecode"
          />
          <div className="absolute left-0 right-0 top-[20%] z-10 flex flex-col items-center justify-center px-4 text-white">
            <AnimatedText
              className="text-center text-4xl font-black leading-tight tracking-normal sm:text-6xl sm:tracking-tight md:text-8xl lg:text-[150px]"
              style={{ fontFamily: '"STIX Two Text", serif' }}
            >
              A New Dawn,
            </AnimatedText>
            <AnimatedText
              className="text-center text-4xl font-black leading-tight tracking-normal sm:text-6xl sm:tracking-tight md:text-8xl lg:text-[150px]"
              style={{ fontFamily: '"STIX Two Text", serif' }}
              delay={0.2}
            >
              A New Beginning.
            </AnimatedText>
          </div>
        </section>

        <section className="px-4 py-16 text-center md:px-20 ">
          <AnimatedText
            className="mb-6 text-3xl font-semibold leading-snug tracking-normal md:text-5xl lg:text-7xl"
            style={{
              fontFamily: '"Noto Sans JP", sans-serif'
            }}
          >
            新しい夜明け、新しい始まり。
          </AnimatedText>
          <AnimatedText
            className="mb-8 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl"
            style={{
              fontFamily: '"STIX Two Text", serif',
              letterSpacing: '-2px'
            }}
            delay={0.2}
          >
            A New Dawn, A New Beginning.
          </AnimatedText>
          <AnimatedText delay={0.2} className="mb-12 text-center ">
            <h2 className="mb-6 font-['Noto_Sans_JP'] text-4xl font-bold leading-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block text-violet-600">
                アマネセンは中小企業が抱える課題に応え、
              </span>
              <span className="mt-2 block text-violet-600">
                Web制作から集客支援までワンストップでサポート!
              </span>
            </h2>
          </AnimatedText>
        </section>

        <section className="flex justify-center px-4 py-16 md:px-8 lg:px-16">
          <div className="flex w-full max-w-[1200px] flex-col items-start justify-center gap-12 lg:flex-row lg:items-center">
            <div className="home-frame47 w-full lg:w-1/2">
              <AnimatedLottie
                src="https://lottie.host/72554d58-cb6b-4de5-98c8-a329a50e9f11/CAFSvs8VAw.json"
                className="home-lottie-node1 w-full"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
            <div className="flex w-full max-w-[550px] flex-col gap-8 lg:w-1/2">
              <AnimatedText
                className="text-base leading-relaxed tracking-wide md:text-lg lg:text-xl"
                style={{ fontFamily: 'Meiryo, sans-serif' }}
              >
                サイト制作や効果的な広告運用、SEO対策まで、
                <br className="hidden md:inline" />
                ビジネスの成長を支えるサービスを包括的に提供し、
                <br className="hidden md:inline" />
                経営者が本業に専念できる環境を整えます。
              </AnimatedText>
              <div className="flex flex-col gap-4 md:gap-6">
                {[
                  '制作からWeb集客支援までのトータルサポート',
                  'MEO対策、SEO対策で集客支援',
                  'ビジネスの課題に応えるシステム開発'
                ].map((item, index) => (
                  <AnimatedText
                    key={index}
                    className="flex items-center gap-4 bg-black p-4 text-white md:p-5"
                    delay={index * 0.2}
                  >
                    <div
                      className="h-6 w-6 bg-cover bg-center md:h-8 md:w-8"
                      style={{
                        backgroundImage: `url('/external/tq_vvklu8nbdk-y1ji-200h.webp')`
                      }}
                    ></div>
                    <h3
                      className="text-base leading-snug tracking-wide md:text-lg lg:text-xl"
                      style={{
                        fontFamily: '"Noto Sans JP", sans-serif',
                        letterSpacing: '1.6px'
                      }}
                    >
                      {item}
                    </h3>
                  </AnimatedText>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="w-full max-w-[1600px] px-4 py-16 md:px-8 md:py-24">
          <div className="mb-12 flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <AnimatedText
              className="text-4xl font-bold md:text-6xl lg:text-[100px]"
              style={{
                fontFamily: 'Panchang-Bold, sans-serif',
                letterSpacing: '-2px'
              }}
            >
              Service
            </AnimatedText>
            <Link href="/service">
              <AnimatedText className="flex items-center gap-2" delay={0.2}>
                <span
                  className="text-base md:text-lg lg:text-xl"
                  style={{
                    fontFamily: 'Lexend Giga, sans-serif',
                    letterSpacing: '-1px'
                  }}
                >
                  View Service Top
                </span>
                <Button variant="outline" size="icon" className="rounded-full">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </AnimatedText>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <AnimatedText key={index} delay={index * 0.1}>
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-0">
                    <button className="flex h-full w-full flex-col items-start text-left transition-all hover:bg-gray-50">
                      <div className="relative aspect-video w-full overflow-hidden">
                        <AnimatedLottie
                          src={service.lottieUrl}
                          style={{ width: '100%', height: '100%' }}
                        />
                      </div>
                      <div className="flex flex-col gap-2 p-6">
                        <h3 className="text-xl font-semibold tracking-tight">
                          {service.title}
                        </h3>
                        <p className="line-clamp-2 text-sm text-gray-600">
                          {service.description}
                        </p>
                      </div>
                    </button>
                  </CardContent>
                </Card>
              </AnimatedText>
            ))}
          </div>
        </section>

        <section className="w-full max-w-[1600px] px-4 py-10 md:px-20 md:py-20">
          <div className="mb-8 flex items-center justify-between py-5 md:mb-16 md:flex-row md:py-20">
            <AnimatedText
              className="mb-4 text-4xl font-bold md:mb-0 md:text-[100px]"
              style={{
                fontFamily: 'Panchang-Bold, sans-serif',
                letterSpacing: '-2px'
              }}
            >
              News <span className="text-[#242424]">+</span> Blog
            </AnimatedText>
            <Link href="/blog">
              <AnimatedText className="flex items-center gap-2" delay={0.2}>
                <span
                  className="text-base md:text-[20px]"
                  style={{
                    fontFamily: 'Lexend Giga, sans-serif',
                    letterSpacing: '-2px'
                  }}
                >
                  View News + Blog
                </span>
                <Button variant="outline" size="icon" className="rounded-full">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </AnimatedText>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {newsItems.map((item, index) => (
              <AnimatedText key={index} delay={index * 0.1}>
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-0">
                    <div className="relative">
                      <Image
                        src={`/placeholder.svg?height=250&width=397`}
                        alt={item.title}
                        width={397}
                        height={250}
                        className="h-[200px] w-full object-cover md:h-[250px]"
                      />
                      <Badge className="absolute left-4 top-4 bg-blue-500 text-primary-foreground">
                        {item.category}
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
                      <a
                        href={item.url}
                        className="text-sm text-[#F4951F] hover:underline md:text-base"
                        style={{
                          fontFamily: '"Noto Sans JP", sans-serif',
                          letterSpacing: '1.6px'
                        }}
                      >
                        {item.url}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedText>
            ))}
          </div>
        </section>

        <section className="flex w-full max-w-[1600px] flex-col items-center px-4 py-10 md:px-20 md:py-20">
          <div className="mb-8 flex w-full items-center justify-between py-5 md:py-20">
            <AnimatedText
              className="text-4xl font-bold tracking-tight md:text-[100px] md:tracking-tight"
              style={{
                fontFamily: 'Panchang-Bold, sans-serif'
              }}
            >
              Contact
            </AnimatedText>
            <Link href="/contact">
              <AnimatedText className="flex items-center gap-2" delay={0.2}>
                <span
                  className="text-base md:text-[20px]"
                  style={{
                    fontFamily: 'Lexend Giga, sans-serif',
                    letterSpacing: '-2px'
                  }}
                >
                  View Contact
                </span>
                <Button variant="outline" size="icon" className="rounded-full">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </AnimatedText>
            </Link>
          </div>
          <AnimatedText className="w-full">
            <div className="mb-4 h-[2px] w-full bg-[#242424] md:mb-8"></div>
            <p
              className="mb-4 text-center text-lg font-medium leading-relaxed tracking-wide md:mb-8 md:text-[32px] md:leading-normal md:tracking-normal"
              style={{ fontFamily: '"Noto Sans JP", sans-serif' }}
            >
              弊社サービスに関するご相談・ご依頼は
              <br />
              お問い合わせフォームからお気軽にご連絡ください。
            </p>
            <div className="h-[2px] w-full bg-[#242424]"></div>
          </AnimatedText>
        </section>
      </main>
    </div>
  );
}
