import LoginModalBody from '@/components/pages/account/ModalBody/LoginModalBody';
import SignupModalBody from '@/components/pages/account/ModalBody/SignupModalBody';
import { useAccountModalPageContext } from '@/contexts/AccountModalPageContext';

export default function AccountModalBody() {
  const { currentPage } = useAccountModalPageContext();

  return (
    <>
      {currentPage.page == 'LOGIN' && <LoginModalBody />}
      {currentPage.page == 'SIGNUP' && <SignupModalBody />}
    </>
  );
}
