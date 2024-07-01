import Document, { Head, Html, Main, NextScript } from 'next/document';

const meta = {
  title: '그님티 - Gnimty.lol',
  description: '그님티? 당신과 함께 협곡을 누빌 듀오 파트너를 찾아보세요!',
  og: {
    title: '그님티 - Gnimty.lol',
    description: '그님티? 당신과 함께 협곡을 누빌 듀오 파트너를 찾아보세요!',
    url: 'https://gnimty.lol',
    image: '/gnimty.png',
  },
};

const favicon = {
  ico: '/favicon.ico',
  png: '/favicon.png',
  svg: '/favicon.svg',
};

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko" style={{ scrollbarGutter: 'stable' }}>
        <Head>
          <link rel="icon" type="image/x-icon" href={favicon.ico} />
          <link rel="icon" type="image/png" href={favicon.png} />
          <link rel="icon" type="image/svg+xml" href={favicon.svg} />
          <link rel="apple-touch-icon" href={favicon.png} />
          <meta name="title" content={meta.title} />
          <meta name="description" content={meta.description} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={meta.og.title} />
          <meta property="og:description" content={meta.og.description} />
          <meta property="og:url" content={meta.og.url} />
          <meta property="og:image" content={meta.og.image} />
          <link
            rel="stylesheet"
            as="style"
            href="https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/static/pretendard-dynamic-subset.min.css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
