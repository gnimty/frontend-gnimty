import dataDragonVersion from '@/apis/constants/dataDragonVersion';
import profileIconUrl from '@/apis/utils/profileIconUrl';
import PositionImage from '@/components/common/position-image/PositionImage';
import Select from '@/components/common/select/Select';
import { Box, Button, HStack, Textarea, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import ChampionSelect from './ChampionSelect';

export default function TipInput() {
  return (
    <HStack w="full" minH="232px" p="20px" gap="20px" justify="space-between" align="flex-start">
      <Box
        w="80px"
        h="80px"
        borderRadius="40px"
        overflow="hidden"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Image src={profileIconUrl(10)} width="80" height="80" alt="profileIcon" />
      </Box>
      <VStack w="full" minH="192px" gap="12px" align="flex-start">
        <HStack w="full" justify="flex-start" gap="12px">
          <Select
            options={[
              { text: '카테고리 선택', value: '' },
              { text: '그님팁', value: '' },
              { text: '알려주세요', value: '' },
            ]}
            css={{ width: '136px' }}
          />
          <Select
            options={[
              { text: '포지션 선택', value: '' },
              { text: '탑', value: '', leftAsset: <PositionImage position="TOP" /> },
              { text: '정글', value: '', leftAsset: <PositionImage position="JUNGLE" /> },
              { text: '미드', value: '', leftAsset: <PositionImage position="MIDDLE" /> },
              { text: '바텀', value: '', leftAsset: <PositionImage position="BOTTOM" /> },
              { text: '서포터', value: '', leftAsset: <PositionImage position="UTILITY" /> },
            ]}
            css={{ width: '136px' }}
          />
          <ChampionSelect />
        </HStack>
        <HStack w="full" gap="12px" justify="space-between">
          <Textarea
            h="140px"
            rows={4}
            placeholder={`챔피언에 대한 정보나 나만의 팁을 남겨보세요! (현재 버전 v ${dataDragonVersion})`}
            _placeholder={{
              color: 'gray500',
              textStyle: 't2',
              fontWeight: '400',
            }}
            borderColor="gray400"
          />
          <Button
            type="submit"
            textStyle="t2"
            fontWeight="700"
            color="white"
            bgColor="main"
            w="80px"
            h="140px"
            borderRadius="4px"
          >
            등록
          </Button>
        </HStack>
      </VStack>
    </HStack>
  );
}
