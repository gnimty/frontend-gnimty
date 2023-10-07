import styled from '@emotion/styled';

import type { BoxProps } from '@/components/common/Box';
import { Box } from '@/components/common/Box';
import type { WebkitLineClampProps } from '@/styles/customStyledSystem';
import { webkitLineClamp } from '@/styles/customStyledSystem';

import type { PropsWithChildren } from 'react';

interface TextProps extends BoxProps, WebkitLineClampProps, PropsWithChildren {}

export const Text = styled((props: TextProps) => (
  <Box fontFamily={props.fontFamily ?? 'inherit'} {...props} />
))<TextProps>(webkitLineClamp);
