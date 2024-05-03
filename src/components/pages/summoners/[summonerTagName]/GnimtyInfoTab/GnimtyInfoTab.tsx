import { VStack } from '@chakra-ui/react';
import Image from 'next/image';

import notGnimtyImage from '@/assets/images/summoner-not-gnimty.png';

export default function GnimtyInfoTab() {
  // 그님티 정보가 없는 회원에 대한 이미지와 문구 표시
  const gnimtyUser = false;

  if (!gnimtyUser) {
    return (
      <VStack pt="120px" gap="24px">
        <Image src={notGnimtyImage} width={160} height={160} alt="그님티 정보가 없는 회원" />
      </VStack>
    );
  }

  return (
    <VStack w="full" gap="24px" align="flex-start">
      {/* 상태 메시지 */}
      {/* 게임 가능 시간 */}
      {/* 선호 게임 타입 */}
    </VStack>
  );
}
