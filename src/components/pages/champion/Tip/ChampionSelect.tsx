import { Box, Grid, HStack, Menu, MenuButton, MenuList, Text, VStack, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';

import champions from '@/apis/constants/champions';
import Down from '@/assets/icons/system/down.svg';
import Exit from '@/assets/icons/system/exit.svg';
import Up from '@/assets/icons/system/up.svg';
import Champion from '@/components/duo/Champion';

export default function ChampionSelect() {
  const [selectedChampion, setSelectedChampion] = useState('');
  const handleChampionSelect = (championName: string) => {
    setSelectedChampion(championName);
  };
  return (
    <Menu>
      {({ isOpen, onClose }) => (
        <>
          <MenuButton>
            <Box
              w="142px"
              h="40px"
              p="10px 10px 10px 12px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderRadius="4px"
              border="1px solid"
              borderColor="gray400"
            >
              <Text w="92px" textStyle="t2" fontWeight="400" textAlign="left">
                {/* TODO: 선택된 챔피언 이미지도 보이게 하면 좋을 듯 */}
                {selectedChampion ? selectedChampion : '상대 챔피언 선택'}
                {/* 상대 챔피언 선택 */}
              </Text>
              {isOpen ? <Up width="16" height="16" aria-hidden /> : <Down width="16" height="16" aria-hidden />}
            </Box>
          </MenuButton>
          <MenuList>
            <VStack w="389px" h="376px" borderRadius="8px" bg="white">
              <HStack
                w="full"
                h="56px"
                p="16px 20px"
                justify="space-between"
                borderBottom="1px solid"
                borderColor="gray200"
              >
                <Text textStyle="t1" fontWeight="700">
                  상대 챔피언 선택
                </Text>
                <Exit width="24" height="24" onClick={onClose} />
              </HStack>
              <Box w="full" h="389px" overflowY="scroll" p="20px">
                <Grid templateColumns="repeat(7, 1fr)">
                  {champions.map(({ enName, krName }) => (
                    // TODO: krName으로 표기하도록 수정
                    <Champion
                      key={enName}
                      championKrName={krName}
                      championEnName={enName}
                      onClick={() => {
                        handleChampionSelect(krName);
                        onClose();
                      }}
                      selected={selectedChampion === krName}
                    />
                  ))}
                </Grid>
              </Box>
            </VStack>
          </MenuList>
        </>
      )}
    </Menu>
  );
}
