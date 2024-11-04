import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedLottie from '@/components/componentspage/AnimatedLottie';
import AnimatedText from '@/components/componentspage/AnimatedText';
import HeaderTitle from '@/components/componentspage/HeaderTitle';
import { getMetadata } from '@/lib/features/metadata';

export const metadata = getMetadata(
  '神奈川・湘南・横浜の中小企業向けWeb制作と集客支援 | AMANECEN',
  'AMANECENは、神奈川・湘南エリアの中小企業向けにWeb制作、MEO対策、SEO支援を提供。顧客の集客とビジネス成長を支える包括的なサポートで、競争力の向上を実現します。',
  [
    'Web制作',
    'MEO対策',
    'SEO対策',
    '中小企業サポート',
    '神奈川',
    '湘南',
    '横浜',
    '集客支援',
    'アマネセン',
    'AMANECEN'
  ]
);
interface Service {
  title: string;
  description: string;
  lottieUrl: string;
}

export default function Component() {
  const services: Service[] = [
    {
      title: 'オリジナルホームページ制作',
      description:
        'オンライン競争が激化する中、他社との差別化や顧客の信頼獲得が難しい課題を、オーダーメイドのデザインと顧客体験を重視したホームページで解決し、成約率の向上とブランド価値の確立を図ります。',
      lottieUrl:
        'https://lottie.host/126f76c4-3a6b-4be3-a3de-975d6633954f/Dqdy9LoGzR.json'
    },
    {
      title: 'サブスク型ホームページ制作',
      description:
        '初期費用が負担でサイト構築が進まない課題を、初期費用0円で始められるサブスクプランで解決。低リスクで高品質なサイト構築が可能になり、早期に集客強化や販促施策を実施できます。',
      lottieUrl:
        'https://lottie.host/63cae087-6517-4675-9015-d61a3f0b9315/8iHcmIhEHH.json'
    },
    {
      title: 'システム開発',
      description:
        '業務効率の低下を招く非効率な作業をカスタムシステムで解決し、自動化によるコスト削減と生産性向上を実現、ビジネスの成長を支援します。',
      lottieUrl:
        'https://lottie.host/7de24966-b94c-4524-ab69-e2730621e8f4/UT1PCz7BJd.json'
    }
  ];

  const servicesMarking: Service[] = [
    {
      title: 'SEO対策',
      description:
        '検索エンジンで上位表示が難しく、集客に課題を抱える状況を、SEO施策で解決。検索上位表示を実現し、自然流入の増加で認知拡大と新規顧客の獲得が可能にします。',
      lottieUrl:
        'https://lottie.host/6877afb9-a698-4da2-a439-f69bc80e2238/8LeTOJDmO8.json'
    },
    {
      title: 'MEO対策',
      description:
        '地域密着型ビジネスで近隣顧客の集客が課題となる場合、MEO対策で解決。成果報酬型でリスクなく地域顧客の認知度を高め、Googleマップ上位表示で来店機会を増加させます。',
      lottieUrl:
        'https://lottie.host/88e1b831-745a-45a3-8d00-e545971472b8/s3ihGyltkJ.json'
    },
    {
      title: 'LINE公式構築・運用',
      description:
        'リピート率が低く顧客接点が不足する課題を、国内月間アクティブユーザー9,500万人を超えるLINE公式アカウントで解決。通知機能やクーポン配信で顧客との継続的なつながりを作り、リピート率と顧客満足度を向上させます。',
      lottieUrl:
        'https://lottie.host/6f66e210-de8e-4d63-94c6-00bd1b9c3435/XxJ6bTpp3B.json'
    }
  ];

  return (
    <div className="bg-gradient-to-b from-white to-gray-100">
      <main className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <section className="py-16 sm:py-24">
          <HeaderTitle title="Service" />
          <AnimatedText delay={0.2} className="mb-12 text-center sm:text-left">
            <h1 className="mb-6 font-['Noto_Sans_JP'] text-4xl font-bold leading-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">中小企業の課題を解決！</span>
              <span className="mt-2 block text-violet-600">
                集客と成長を支えるWEB制作＆サポート体制!
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
              AMANECENは、あなたのビジネスの夜明けを共に歩みます。
              最適なWEB戦略で、新たな成功への道を切り開きましょう。
            </p>
          </AnimatedText>

          <AnimatedText delay={0.2} className="mb-8 text-center sm:text-left">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
              WEB制作
            </h2>
            <p className="mt-2 text-xl font-semibold text-violet-600 md:text-2xl">
              Web Production
            </p>
          </AnimatedText>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <AnimatedText key={index} delay={index * 0.2}>
                <Link href="/contact" passHref>
                  <Card className="h-full cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg">
                    <CardContent className="flex h-full flex-col p-0">
                      <div className="relative aspect-video w-full overflow-hidden">
                        <AnimatedLottie
                          src={service.lottieUrl}
                          style={{ width: '100%', height: '100%' }}
                        />
                      </div>
                      <div className="flex flex-grow flex-col gap-2 p-6">
                        <h3 className="text-xl font-semibold tracking-tight text-gray-900">
                          {service.title}
                        </h3>
                        <p className="flex-grow text-sm text-gray-600">
                          {service.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </AnimatedText>
            ))}
          </div>

          <AnimatedText
            delay={0.2}
            className="mb-8 mt-16 text-center sm:text-left"
          >
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
              Web集客支援・運用
            </h2>
            <p className="mt-2 text-xl font-semibold text-violet-600 md:text-2xl">
              Web Marketing
            </p>
          </AnimatedText>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {servicesMarking.map((service, index) => (
              <AnimatedText key={index} delay={index * 0.1}>
                <Link href="/contact" passHref>
                  <Card className="h-full cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg">
                    <CardContent className="flex h-full flex-col p-0">
                      <div className="relative aspect-video w-full overflow-hidden">
                        <AnimatedLottie
                          src={service.lottieUrl}
                          style={{ width: '100%', height: '100%' }}
                        />
                      </div>
                      <div className="flex flex-grow flex-col gap-2 p-6">
                        <h3 className="text-xl font-semibold tracking-tight text-gray-900">
                          {service.title}
                        </h3>
                        <p className="flex-grow text-sm text-gray-600">
                          {service.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </AnimatedText>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
