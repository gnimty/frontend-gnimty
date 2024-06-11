import FindPasswordModalBody from '@/components/pages/account/ModalBody/FindPasswordModalBody';
import LoginModalBody from '@/components/pages/account/ModalBody/LoginModalBody';
import SetPasswordModalBody from '@/components/pages/account/ModalBody/SetPasswordModalBody';
import SignupModalBody from '@/components/pages/account/ModalBody/SignupModalBody';
import SignupSuccessModalBody from '@/components/pages/account/ModalBody/SignupSuccessModalBody';
import TermsModalBody from '@/components/pages/account/ModalBody/TermsModalBody';
import { useAccountModalPageContext } from '@/contexts/AccountModalPageContext';

import { useAccountModalStore } from './accountModalStore';

export default function AccountModalBody() {
  const currentPage = useAccountModalStore((s) => s.currentPage);
  const { termsData } = useAccountModalPageContext();

  return (
    <>
      {currentPage === 'LOGIN' && <LoginModalBody />}
      {currentPage === 'SIGNUP' && <SignupModalBody />}
      {currentPage === 'TERMS' && termsData && (
        <>
          <TermsModalBody terms={termsData} />
        </>
      )}
      {currentPage === 'SUCCESS' && <SignupSuccessModalBody />}
      {currentPage === 'FIND_PW' && <FindPasswordModalBody />}
      {currentPage === 'SET_PW' && <SetPasswordModalBody />}
    </>
  );
}
