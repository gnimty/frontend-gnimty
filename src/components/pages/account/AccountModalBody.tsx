import { useContext } from 'react';

import { PageContext } from '@/components/pages/account/AccountModal';
import FindPasswordModalBody from '@/components/pages/account/ModalBody/FindPasswordModalBody';
import LoginModalBody from '@/components/pages/account/ModalBody/LoginModalBody';
import PolicyModalBody from '@/components/pages/account/ModalBody/PolicyModalBody';
import SignupModalBody from '@/components/pages/account/ModalBody/SignupModalBody';
import { termsList } from '@/constants/termsList';

export default function AccountModalBody() {
  const context = useContext(PageContext);

  if (!context) return <></>;

  const { currentPage } = context;

  return (
    <>
      {currentPage.page == 'LOGIN' && <LoginModalBody />}
      {currentPage.page == 'SIGNUP' && <SignupModalBody />}
      {currentPage.page == 'POLICY' && (
        <>
          <PolicyModalBody terms={termsList[0]} />
        </>
      )}
      {currentPage.page == 'FIND_PW' && <FindPasswordModalBody />}
    </>
  );
}
