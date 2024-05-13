import { HStack, Text, VStack } from '@chakra-ui/react';
import { useMemo, useState } from 'react';

import dataDragonVersion from '@/apis/constants/dataDragonVersion';
import type { ChampionCommentsEntry, LaneSelectDto } from '@/apis/types';
import useAuth from '@/apis/useAuth';
import ToggleSwitch from '@/components/common/ToggleSwitch';

import Comment from './Comment';
import TipInput from './TipInput';

interface TipProps {
  tipData?: ChampionCommentsEntry[];
  championId: number;
  laneSelectRates?: LaneSelectDto[];
  lastCommentRef: (node: HTMLDivElement | null) => void;
}

export default function Tip({ tipData, championId, laneSelectRates, lastCommentRef }: TipProps) {
  const { data: myInfo } = useAuth();
  const [switchOn, setSwitchOn] = useState(false);
  const filteredTipData = useMemo(
    () => tipData?.filter((comment) => !switchOn || comment.version === dataDragonVersion),
    [tipData, switchOn],
  );
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
      {myInfo?.data && (
        <TipInput championId={championId} currentUserInfo={myInfo.data} laneSelectRates={laneSelectRates} />
      )}
      {/* Comments */}
      {filteredTipData?.map((comment, idx, commentsArray) => (
        <Comment
          key={comment.id}
          comment={comment}
          championId={championId}
          latestVersion={dataDragonVersion}
          currentUserInfo={myInfo?.data}
          refObject={commentsArray.length - 1 === idx ? lastCommentRef : undefined}
        />
      ))}
    </VStack>
  );
}
