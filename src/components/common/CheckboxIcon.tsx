import { AbsoluteCenter, Box } from '@chakra-ui/react';

import Check from '@/assets/icons/system/check.svg';

function CheckboxIcon(props: { isChecked?: boolean }) {
  const { isChecked } = props;
  return (
    <>
      {isChecked ? (
        <Box position="relative" w="full" h="full">
          <AbsoluteCenter>
            <Check />
          </AbsoluteCenter>
        </Box>
      ) : null}
    </>
  );
}

export default CheckboxIcon;
