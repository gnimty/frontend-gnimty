import Footer from '../common/Footer';
import Header from '../common/Header';

interface Props {
  children: React.ReactNode;
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
