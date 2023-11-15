import LoginModalBody from '@/components/pages/account/ModalBody/LoginModalBody';
import { useAccountModalPageContext } from '@/contexts/AccountModalPageContext';

export default function AccountModalBody() {
  const { currentPage } = useAccountModalPageContext();

  return <>{currentPage.page == 'LOGIN' && <LoginModalBody />}</>;
}
