import { Card, CardContent } from '@/components/ui/card';

export default function PrivacyPolicy() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="my-10 mb-8 flex w-full items-center justify-between py-12 md:py-28">
        <h2
          className="text-4xl font-bold tracking-tight md:text-[100px] md:tracking-tight"
          style={{
            fontFamily: 'Panchang-Bold, sans-serif'
          }}
        >
          PrivacyPolicy
        </h2>
      </div>
      <h1 className="mb-8 text-center text-4xl font-bold">
        プライバシーポリシー
      </h1>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="mb-4 text-2xl font-semibold">当サイトについて</h2>
          <p className="mb-4">
            合同会社AMANECEN（アマネセン）（以下「当社」といいます。）は、当社の提供するサービスにおける、ユーザーについての個人情報を含む利用者情報の
            取扱いについて、以下のとおりプライバシーポリシーを定めます。
          </p>
          <p>
            当サイトは、個人情報を適切に取り扱うことは社会的責務であると認識しております。
            個人情報に関する法令を遵守し、個人情報の適切な取り扱いを徹底いたします。
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="mb-4 text-2xl font-semibold">個人情報の定義</h2>
          <p>
            個人情報とは、当該本人に関する全ての情報であって、かつ具体的に特定の当該本人の氏名、連絡先もしくは住所等の明らかとなる事項（識別情報）の
            事であるとします。
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="mb-4 text-2xl font-semibold">
            お客様から取得する情報
          </h2>
          <p className="mb-4">当社は、お客様から以下の情報を取得します。</p>
          <ul className="list-disc pl-6">
            <li>氏名(ニックネームやペンネームも含む)</li>
            <li>年齢または生年月日</li>
            <li>メールアドレス</li>
            <li>電話番号</li>
            <li>住所</li>
            <li>
              外部サービスでお客様が利用するID、その他外部サービスのプライバシー設定によりお客様が連携先に開示を認めた情報
            </li>
            <li>Cookie(クッキー)を用いて生成された識別情報</li>
            <li>
              OSが生成するID、端末の種類、端末識別子等のお客様が利用するOSや端末に関する情報
            </li>
            <li>
              当社ウェブサイトの滞在時間、入力履歴、購買履歴等の当社ウェブサイトにおけるお客様の行動履歴
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="mb-4 text-2xl font-semibold">個人情報の利用目的</h2>
          <p className="mb-4">
            当社は、お客様から取得した情報を、以下の目的のために利用します。
          </p>
          <ul className="list-disc pl-6">
            <li>
              当社サービスに関する登録の受付、お客様の本人確認、認証のため
            </li>
            <li>お客様の当社サービスの利用履歴を管理するため</li>
            <li>
              当社サービスにおけるお客様の行動履歴を分析し、当社サービスの維持改善に役立てるため
            </li>
            <li>市場分析、マーケティングのため</li>
            <li>当社のサービスに関するご案内をするため</li>
            <li>お客様からのお問い合わせに対応するため</li>
            <li>当社の規約や法令に違反する行為に対応するため</li>
            <li>
              当社サービスの変更、提供中止、終了、契約解除をご連絡するため
            </li>
            <li>当社規約の変更等を通知するため</li>
            <li>以上の他、当社サービスの提供、維持、保護及び改善のため</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="mb-4 text-2xl font-semibold">個人情報の管理</h2>
          <p>
            当社は、お客さまの個人情報を正確かつ最新の状態に保ち、個人情報への不正アクセス・紛失・破損・改ざん・漏洩などを防止するため、セキュリティ
            システムの維持・管理体制の整備・社員教育の徹底等の必要な措置を講じ、安全対策を実施し個人情報の厳重な管理を行ないます。
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="mb-4 text-2xl font-semibold">
            個人情報保護の適用範囲
          </h2>
          <p>
            本プライバシーポリシーは、当ウェブサイトにおいてのみ適用されます。
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="mb-4 text-2xl font-semibold">個人情報の苦情、相談</h2>
          <p>
            当サイトは、ご本人から個人情報の開示、訂正、追加、削除または利用停止を求められた場合には、法令等にしたがい適切な措置を講じます。
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="mb-4 text-2xl font-semibold">
            他サイトからの埋め込みコンテンツ
          </h2>
          <p className="mb-4">
            このサイトの投稿には埋め込みコンテンツ (動画、画像、投稿など)
            が含まれます。他サイトからの埋め込みコンテンツは、訪問者がそのサイトを訪れ
            た場合とまったく同じように振る舞います。
          </p>
          <p>
            これらのサイトは、あなたのデータの収集、Cookie
            の使用、サードパーティによる追加トラッキングの埋め込み、埋め込みコンテンツとのやりとりの
            監視を行うことがあります。アカウントを使ってそのサイトにログイン中の場合、埋め込みコンテンツとのやりとりのトラッキングも含まれます。
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="mb-4 text-2xl font-semibold">
            個人情報の第三者への開示・提供の禁止
          </h2>
          <p className="mb-4">
            当社は、お客様から取得する情報のうち、個人データ（個人情報保護法第２条第６項）に該当するものついては、適切に管理し、次のいずれかに該当す
            る場合を除き、個人情報を第三者に開示いたしません。
          </p>
          <ul className="list-disc pl-6">
            <li>お客さまの同意がある場合</li>
            <li>
              お客さまが希望されるサービスを行なうために当社が業務を委託する業者に対して開示する場合
            </li>
            <li>当社や当社サービスが買収された場合</li>
            <li>
              事業パートナーと共同利用する場合（具体的な共同利用がある場合は、その内容を別途公表します。）
            </li>
            <li>その他、法律によって合法的に第三者提供が許されている場合</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="mb-4 text-2xl font-semibold">
            第三者によるCookie情報の取得について
          </h2>
          <p className="mb-4">
            当サイトでは、グーグル株式会社やヤフー株式会社などをはじめとする第三者から配信される広告が掲載される場合があり、これに関連して当該第三者
            が訪問者のCookie情報等を取得して、利用している場合があります。
            当該第三者によって取得されたCookie情報等は、当該第三者のプライバシーポリ
            シーに従って取り扱われます。
          </p>
          <ul className="list-disc pl-6">
            <li>ヤフー株式会社 https://privacy.yahoo.co.jp/</li>
            <li>
              Google Inc.及びグーグル株式会社
              https://policies.google.com/privacy?gl=jp
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="mb-4 text-2xl font-semibold">
            第三者へのCooke情報等の広告配信の利用停止について
          </h2>
          <p>
            お客様は、当該第三者のウェブサイト内に設けられたオプトアウト（個人情報を第三者に提供することを停止すること）ページにアクセスして、当該第
            三者によるCookie情報等の広告配信への利用を停止することができます。
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="mb-4 text-2xl font-semibold">
            Cookie情報の送受信の許可・拒否について
          </h2>
          <p className="mb-4">
            お客様は、Cookieの送受信に関する設定を「すべてのCookieを許可する」、「すべてのCookieを拒否する」、「Cookieを受信したらユーザーに通知
            する」などから選択できます。設定方法は、ブラウザにより異なります。Cookieに関する設定方法は、お使いのブラウザの「ヘルプ」メニューでご確
            認ください。
          </p>
          <p>
            すべてのCookieを拒否する設定を選択されますと、認証が必要なサービスを受けられなくなる等、インターネット上の各種サービスの利用上、制約を
            受ける場合がありますのでご注意ください。
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="mb-4 text-2xl font-semibold">
            アクセス解析ツールについて
          </h2>
          <p>
            当社は、お客様のアクセス解析のために、「Googleアナリティクス」を利用しています。Googleアナリティクスは、トラフィックデータの収集のため
            にCookieを使用しています。トラフィックデータは匿名で収集されており、個人を特定するものではありません。Cookieを無効にすれば、これらの情
            報の収集を拒否することができます。詳しくはお使いのブラウザの設定をご確認ください。Googleアナリティクスについて、詳しくはこちらからご確
            認ください。
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="mb-4 text-2xl font-semibold">
            法令、規範の遵守と見直し
          </h2>
          <p>
            当社は、保有する個人情報に関して適用される日本の法令、その他規範を遵守するとともに、本ポリシーの内容を適宜見直し、その改善に努めます。
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="mb-4 text-2xl font-semibold">
            プライバシーポリシーの変更について
          </h2>
          <p>
            当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本プライバシーポリシーの内容を適宜見直しその改善に努めます。修正された
            最新のプライバシーポリシーは常に本ページにて開示されます。
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
