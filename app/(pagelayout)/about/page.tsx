import React from 'react';
import HeaderTitle from '@/components/componentspage/HeaderTitle';
import AnimatedText from '@/components/componentspage/AnimatedText';
import AnimatedLottie from '@/components/componentspage/AnimatedLottie';
import { getMetadata } from '@/lib/features/metadata';

export const metadata = getMetadata(
  'アマネセンについて - 神奈川・湘南でのWeb制作とMEO対策 | AMANECEN',
  'アマネセンは神奈川・湘南エリアを中心に、Web制作、MEO対策、システム開発など、中小企業向けに特化した包括的なサポートを提供します。安心の技術力とコストパフォーマンスの高いサービスで、地域集客とビジネス成長を支援します。'
);

export default function About() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-items-center">
      <div className="w-full max-w-[1600px] space-y-12 px-4 py-16 md:space-y-24 md:py-16 lg:py-24">
        <HeaderTitle title="About"></HeaderTitle>
        <AnimatedText
          delay={0.2}
          className="flex flex-col items-center md:items-start"
        >
          <h2 className="mb-6 font-['Noto_Sans_JP'] text-4xl font-bold leading-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">中小企業が選ぶ理由！</span>
            <span className="mt-2 block text-violet-600">
              アマネセンの3つの強みでビジネスを強力サポート!
            </span>
          </h2>
        </AnimatedText>

        <div className="space-y-12 md:space-y-24">
          <div className="relative  rounded-lg bg-white shadow-lg ">
            <div className="flex flex-col  md:flex-row">
              <AnimatedText
                delay={0.4}
                className="w-full bg-gray-100 p-6 md:w-3/5 md:p-12"
              >
                <div className="mb-6">
                  <h3 className="z-10 mb-2 text-xl font-bold text-gray-800 md:text-2xl">
                    システム開発にも強い！
                    <br />
                    元エンジニアが手掛ける安心のWeb制作
                  </h3>
                  <span className="z-100 absolute right-0 top-0 text-6xl font-bold text-gray-200 md:-top-10 md:left-6 md:text-8xl">
                    01
                  </span>
                </div>
                <p className="relative z-10 text-sm text-gray-600 md:text-base">
                  アマネセンの代表は、元バックエンドエンジニアとしての経験を活かし、
                  複雑なシステム開発にも強みを発揮します。Webサイトの構築だけでなく、
                  システム全体を見据えた開発を行うため、クオリティと信頼性の高いサービスを提供します。
                </p>
              </AnimatedText>
              <div className="relative h-64 w-full md:h-auto md:w-2/5">
                <AnimatedLottie
                  src="https://lottie.host/85d530aa-f13f-4e47-9235-148268d053eb/ChlBCCY7Rj.json"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="relative rounded-lg bg-white shadow-lg">
            <div className="flex flex-col md:flex-row-reverse">
              <AnimatedText
                delay={0.6}
                className="w-full bg-gray-100 p-6 md:w-3/5 md:p-12"
              >
                <div className="mb-6">
                  <h3 className="mb-2 text-xl font-bold text-gray-800  md:text-2xl">
                    コストパフォーマンスが抜群！
                    <br />
                    高品質をリーズナブルに提供
                  </h3>
                  <span className="absolute right-0 top-0 z-0 text-6xl font-bold text-gray-200 md:-top-10 md:right-20 md:text-8xl">
                    02
                  </span>
                </div>
                <p className="relative z-10 text-sm text-gray-600 md:text-base">
                  制作会社よりもリーズナブルな価格で提供するため、限られた予算であっても妥協せずに高品質なサービスを受けられます。
                  実際に作業を行うプロが直接対応するため、無駄なコストを抑え、コストパフォーマンスの高いWeb制作が可能です。
                </p>
              </AnimatedText>
              <div className="relative h-64 w-full md:h-auto md:w-2/5">
                <AnimatedLottie
                  src="https://lottie.host/5e01ea29-c5b4-4e6d-a178-5f57235e354c/mfe5TxlNqT.json"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="relative  rounded-lg bg-white shadow-lg">
            <div className="flex flex-col md:flex-row">
              <AnimatedText
                delay={0.8}
                className="w-full bg-gray-100 p-6 md:w-3/5 md:p-12"
              >
                <div className="mb-6">
                  <h3 className="mb-2 text-xl font-bold text-gray-800 md:text-2xl">
                    Webサイト制作から集客支援まで！
                    <br />
                    一気通貫のワンストップサービス
                  </h3>
                  <span className="absolute right-0 top-0 z-0 text-6xl font-bold text-gray-200 md:-top-10 md:left-6 md:text-8xl">
                    03
                  </span>
                </div>
                <p className="relative z-10 text-sm text-gray-600 md:text-base">
                  アマネセンでは、Webサイト制作から集客支援までワンストップで対応。
                  制作だけでなく、マーケティング戦略やSEO対策も一貫して提供するため、
                  複数の依頼先に煩わされることなく、Webの課題を一つの窓口で解決します。
                </p>
              </AnimatedText>
              <div className="relative h-64 w-full md:h-auto md:w-2/5">
                <AnimatedLottie
                  src="https://lottie.host/22d1b6ff-7382-4f10-9415-245581a68fd6/Tm7N8pWGpx.json"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <AnimatedText delay={1.0} className="w-full">
          <div className="flex w-full flex-col items-start justify-center rounded-lg bg-white p-6 shadow-lg md:p-12">
            <div className="flex w-full flex-col items-start justify-between border-b border-gray-200 py-5 md:flex-row">
              <span className="mb-2 w-full text-lg font-semibold text-gray-700 md:mb-0 md:w-48">
                法人名
              </span>
              <span className="flex-1 text-lg text-black">
                合同会社AMANECEN
              </span>
            </div>
            <div className="flex w-full flex-col items-start justify-between border-b border-gray-200 py-5 md:flex-row">
              <span className="mb-2 w-full text-lg font-semibold text-gray-700 md:mb-0 md:w-48">
                代表社員
              </span>
              <span className="flex-1 text-lg text-black">
                石田　翔マイケル
              </span>
            </div>
            <div className="flex w-full flex-col items-start justify-between border-b border-gray-200 py-5 md:flex-row">
              <span className="mb-2 w-full text-lg font-semibold text-gray-700 md:mb-0 md:w-48">
                設立
              </span>
              <span className="flex-1 text-lg text-black">
                令和6年　4月　1日
              </span>
            </div>
            <div className="flex w-full flex-col items-start justify-between border-b border-gray-200 py-5 md:flex-row">
              <span className="mb-2 w-full text-lg font-semibold text-gray-700 md:mb-0 md:w-48">
                所在地
              </span>
              <span className="flex-1 text-lg text-black">
                〒222-0034 神奈川県横浜市港北区岸根町677
              </span>
            </div>
            <div className="flex w-full flex-col items-start justify-between border-b border-gray-200 py-5 md:flex-row">
              <span className="mb-2 w-full text-lg font-semibold text-gray-700 md:mb-0 md:w-48">
                メールアドレス
              </span>
              <span className="flex-1 text-lg text-black">
                amanecen.tech@gmail.com
              </span>
            </div>
            <div className="flex w-full flex-col items-start justify-between border-b border-gray-200 py-5 md:flex-row">
              <span className="mb-2 w-full text-lg font-semibold text-gray-700 md:mb-0 md:w-48">
                事業内容
              </span>
              <div className="flex-1">
                <span className="mb-2 block text-lg font-semibold text-black">
                  Web制作事業
                </span>
                <span className="mb-1 block text-lg text-black">
                  ・ホームページ制作
                </span>
                <span className="mb-1 block text-lg text-black">
                  ・Webサイトの保守管理・運用
                </span>
                <span className="mb-1 block text-lg text-black">
                  ・ランディングページ制作
                </span>
                <span className="mb-4 block text-lg text-black">
                  ・ECサイト制作
                </span>
                <span className="mb-2 block text-lg font-semibold text-black">
                  Webマーケティング事業
                </span>
                <span className="mb-1 block text-lg text-black">・MEO対策</span>
                <span className="mb-1 block text-lg text-black">
                  ・LINE公式構築・運用
                </span>
                <span className="mb-1 block text-lg text-black">
                  ・Web広告運用
                </span>
              </div>
            </div>
          </div>
        </AnimatedText>
      </div>
    </div>
  );
}
