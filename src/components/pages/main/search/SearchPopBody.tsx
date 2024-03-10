import { Center, Text, VStack } from '@chakra-ui/react';

import SearchPopRow, { type SearchPopRowItem } from './SearchPopRow';

export interface SearchPopBodyProps {
  items: SearchPopRowItem[];
  textWhenEmpty: string;
  onXButtonClick?: (puuid: string) => void;
}

export default function SearchPopBody(props: SearchPopBodyProps) {
  const { textWhenEmpty, items, onXButtonClick } = props;

  if (items.length === 0) {
    return (
      <Center h="180px">
        <Text textStyle="t2" fontWeight="regular" color="gray500">
          {textWhenEmpty}
        </Text>
      </Center>
    );
  }

  return (
    <VStack gap="16px" p="20px">
      {items.map((item) => (
        <SearchPopRow
          key={item.puuid}
          searchPopRowItem={item}
          onXButtonClick={
            onXButtonClick !== undefined
              ? () => {
                  onXButtonClick(item.puuid);
                }
              : undefined
          }
        />
      ))}
    </VStack>
  );
}
