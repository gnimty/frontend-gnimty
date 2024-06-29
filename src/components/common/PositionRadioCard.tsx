import { Box, GridItem, useRadio, type UseRadioProps } from '@chakra-ui/react';

import type { PositionIconProps } from './position-image/types';
import type { FC } from 'react';

interface PositionRadioCardProps extends UseRadioProps {
  PositionFilterImage: FC<PositionIconProps>;
}

export default function PositionRadioCard(props: PositionRadioCardProps) {
  const { PositionFilterImage, ...useRadioProps } = props;
  const { getInputProps, getRadioProps, state } = useRadio(useRadioProps);

  return (
    <GridItem
      display="flex"
      alignItems="center"
      justifyContent="center"
      as="label"
      borderWidth="0 1px 0 0"
      borderStyle="solid"
      borderColor="gray200"
      cursor="pointer"
      bg={state.isChecked ? 'main' : undefined}
      aria-disabled={state.isDisabled}
      _disabled={{
        bg: 'gray200',
        cursor: 'not-allowed',
      }}
      _first={{
        borderLeftRadius: '4px',
      }}
      _last={{
        borderRightRadius: '4px',
        borderRightWidth: 0,
      }}
    >
      <input {...getInputProps()} />
      {/* FIXME: `getRadioProps()`의 올바른 동작이지만 타입스크립트 이슈가 있음.
       * 아래 링크를 보면 csstype과 관련된 이슈인 거 같은데 package.json에
       * overrides로 csstype의 버전을 아래 버전으로 강제지정해도 해결되지 않음.
       * Chakra UI에 새로운 이슈를 등록해야할듯함.
       * 참고: https://github.com/chakra-ui/chakra-ui/issues/4089#issuecomment-947221479 참조
       */}
      {/* @ts-expect-error 위 코멘트 참고 */}
      <Box {...getRadioProps()} display="flex" alignItems="center" justifyContent="center">
        <PositionFilterImage
          width={20}
          height={20}
          fill={state.isDisabled ? '#ccc' : state.isChecked ? '#fff' : undefined}
        />
      </Box>
    </GridItem>
  );
}
