import LoginModalBody from '@/components/pages/account/ModalBody/LoginModalBody';
import SignupModalBody from '@/components/pages/account/ModalBody/SignupModalBody';
import TermsModalBody from '@/components/pages/account/ModalBody/TermsModalBody';
import { useAccountModalPageContext } from '@/contexts/AccountModalPageContext';

export default function AccountModalBody() {
  const { currentPage, termsData } = useAccountModalPageContext();

  return (
    <>
      {currentPage.page == 'LOGIN' && <LoginModalBody />}
      {currentPage.page == 'SIGNUP' && <SignupModalBody />}
      {currentPage.page == 'TERMS' && termsData && (
        <>
          <TermsModalBody terms={termsData} />
        </>
      )}
    </>
  );
}
