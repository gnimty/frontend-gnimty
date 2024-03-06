import { VStack } from '@chakra-ui/react';

interface DetailPageProps {
  championEnName: string;
}

export default function DetailPage({ championEnName }: DetailPageProps) {
  return (
    <VStack w="1080px" m="0 auto">
      {/* 챔피언 기본정보 */}
      {/* 1 상대하기 쉬운/어려운 챔피언, 패치노트 */}
      {/* 2 룬*/}
      {/* 3 스킬 빌드 */}
      {/* 4 아이템 빌드, 소환사 랭킹 */}
      {/* 5 운영 팁 */}
    </VStack>
  );
}
