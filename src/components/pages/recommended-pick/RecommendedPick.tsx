import { Button, Heading, Text, Tooltip, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

import type { ProfileEntry } from '@/apis/types';
import useAuth from '@/apis/useAuth';
import TooltipIcon from '@/assets/icons/system/tooltip.svg';
import recommendedPickExceptionImageSrc from '@/assets/images/recommended-pick-exception.png';

import { useAccountModalStore } from '../account/accountModalStore';

import RecommendedPickSelectSummoner from './RecommendedPickSelectSummoner';
import RecommendedPickTable from './RecommendedPickTable';

export default function RecommendedPick() {
  return (
    <VStack w="1080px" alignItems="start" m="40px auto" gap={0}>
      <Heading
        as="h1"
        textStyle="h2"
        fontWeight="bold"
        color="gray800"
        display="flex"
        alignItems="center"
        gap="4px"
        mb="24px"
      >
        <span>추천 Pick!</span>
        <Tooltip
          placement="bottom-end"
          label="그님티 추천 Pick!은 소환사의 전적 데이터를 기반으로 함께 플레이하고 싶은 소환사와 시너지가 좋은 챔피언 조합을 추천드립니다."
          textStyle="t2"
          fontWeight="regular"
          color="gray800"
          bg="white"
          w="320px"
          p="24px"
          borderRadius="8px"
        >
          <TooltipIcon width={24} height={24} />
        </Tooltip>
      </Heading>

      <RecommendedPickBodyDataBoundary />
    </VStack>
  );
}

function RecommendedPickBodyDataBoundary() {
  const { data, isAuthenticated, status } = useAuth();
  const openAccountModal = useAccountModalStore((s) => s.open);
  const router = useRouter();

  if (status === 'pending') {
    return;
  }

  // use `isAuthenticated` only
  if (!isAuthenticated || status !== 'success') {
    return (
      <VStack w="full" align="center" gap="24px">
        <Image
          src={recommendedPickExceptionImageSrc}
          width={160}
          height={160}
          alt="마술사 모자를 벗는 깃털기사(펭구)"
        />
        <VStack gap="4px">
          <Text textStyle="t1" fontWeight="bold" color="gray500">
            서비스를 이용할 수 없어요.
          </Text>
          <Text textStyle="t1" fontWeight="regular" color="gray500">
            그님티 페이지에 로그인하지 않았습니다.
          </Text>
        </VStack>
        <Button
          onClick={openAccountModal}
          size="md"
          bg="gray800"
          p="10px 12px"
          textStyle="t2"
          fontWeight="regular"
          color="white"
        >
          로그인하기
        </Button>
      </VStack>
    );
  }

  if (!data.data.riotDependentInfo.isLinked) {
    return (
      <VStack w="full" align="center" gap="24px">
        <Image
          src={recommendedPickExceptionImageSrc}
          width={160}
          height={160}
          alt="마술사 모자를 벗는 깃털기사(펭구)"
        />
        <VStack gap="4px">
          <Text textStyle="t1" fontWeight="bold" color="gray500">
            서비스를 이용할 수 없어요.
          </Text>
          <Text textStyle="t1" fontWeight="regular" color="gray500">
            라이엇 연동 계정 정보가 존재하지 않습니다.
          </Text>
        </VStack>
        <Button
          onClick={() => {
            router.replace(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/community/oauth/riot/redirect?redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_FRONT_ORIGIN + router.asPath)}`,
            );
          }}
          size="md"
          bg="main"
          p="10px 12px"
          textStyle="t2"
          fontWeight="regular"
          color="white"
        >
          라이엇 계정 연동하기
        </Button>
      </VStack>
    );
  }

  return <RecommendedPickBody myProfile={data.data} />;
}

interface RecommendedPickBodyProps {
  myProfile: ProfileEntry;
}

function RecommendedPickBody(props: RecommendedPickBodyProps) {
  const { myProfile } = props;
  // TODO: unknown을 구체적 타입으로 변경
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents, @typescript-eslint/no-unused-vars
  const [selectedSummoner, setSelectedSummoner] = useState<unknown | null>(null);

  return (
    <VStack gap="80px" w="full">
      <VStack gap="40px">
        <RecommendedPickSelectSummoner
          myProfile={myProfile}
          onSummonerChange={(newSummoner) => {
            setSelectedSummoner(newSummoner);
          }}
        />
        <Button
          onClick={() => {
            // TODO: selectedSummoner 사용 해서 API 요청
          }}
          size="lg"
          w="200px"
          bg="main"
          textStyle="t2"
          fontWeight="regular"
          color="white"
        >
          추천 Pick
        </Button>
      </VStack>
      <RecommendedPickTable />
    </VStack>
  );
}
