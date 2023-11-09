import { Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react';

import OnSaleChampions from './OnSaleChampions';
import OnSaleSkins from './OnSaleSkins';
import PatchNoteBanner from './PatchNoteBanner';
import RotationChampions from './RotationChampions';

export default function Information() {
  return (
    <VStack gap="40px" w="1080px" m="0 auto 60px">
      <PatchNoteBanner />
      <RotationChampions />
      <Tabs display="flex" flexDir="column" gap="20px">
        <TabList pos="relative" gap="12px" boxShadow="inset 0 -1px 0 0" color="gray300">
          <Tab px="12px">스킨 할인 정보</Tab>
          <Tab px="12px">챔피언 할인 정보</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <OnSaleSkins />
          </TabPanel>
          <TabPanel>
            <OnSaleChampions />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
}
