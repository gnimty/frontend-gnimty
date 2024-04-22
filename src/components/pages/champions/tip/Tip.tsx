import { HStack, Text, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import dataDragonVersion from '@/apis/constants/dataDragonVersion';
import getMyInfoQuery from '@/apis/queries/getMyInfoQuery';
import type { ChampionCommentsEntry } from '@/apis/types';
import ToggleSwitch from '@/components/common/ToggleSwitch';

import Comment from './Comment';
import TipInput from './TipInput';

interface TipProps {
  tipData?: ChampionCommentsEntry[];
  championId: number;
}

export default function Tip({ tipData, championId }: TipProps) {
  const { data: myInfo } = useQuery({ ...getMyInfoQuery(), retry: (count) => count < 2 });
  const [switchOn, setSwitchOn] = useState(false);
  return (
    <VStack w="full" borderRadius="4px" bg="white">
      <HStack w="full" h="52px" p="12px 24px" borderBottom="1px solid" borderColor="gray200" justify="space-between">
        <Text textStyle="t1" fontWeight="700">
          운영 팁
        </Text>
        <HStack gap="12px">
          <ToggleSwitch
            label="최신 버전만 보기"
            onOff={switchOn}
            onClick={() => setSwitchOn((prev) => !prev)}
            width={30}
          />
          <Text textStyle="t1" fontWeight="400" color="gray700">
            v{dataDragonVersion}
          </Text>
        </HStack>
      </HStack>
      {/* Input */}
      {myInfo?.data && <TipInput />}
      {/* Comments */}
      {tipData
        ?.filter((comment) => !switchOn || comment.version === dataDragonVersion)
        .map((comment) => (
          <Comment key={comment.id} comment={comment} championId={championId} currentUserInfo={myInfo?.data} />
        ))}
    </VStack>
  );
}
