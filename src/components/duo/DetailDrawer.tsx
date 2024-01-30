import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  type UseDisclosureReturn,
} from '@chakra-ui/react';

interface Props {
  disclosure: UseDisclosureReturn;
}

const DetailDrawer = ({ disclosure }: Props) => {
  return (
    <Drawer isOpen={disclosure.isOpen} onClose={disclosure.onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px" alignItems="center">
          <Box textStyle="t1" color="gray800" fontWeight="700">
            상세 필터
          </Box>
          <DrawerCloseButton />
        </DrawerHeader>
        <DrawerBody></DrawerBody>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DetailDrawer;
