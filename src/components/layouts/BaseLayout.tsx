import Footer from './Footer';
import Header from './Header';

import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function BaseLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
