import styled from '@emotion/styled';
import { css } from '@styled-system/css';
import { variant } from 'styled-system';

import type { BoxProps } from '@/components/common/Box';
import { Box } from '@/components/common/Box';

import type { PropsWithChildren } from 'react';

interface DefaultButtonProps extends BoxProps, PropsWithChildren {}

interface ButtonProps extends DefaultButtonProps {
  buttonSize?: 'large' | 'medium';
}

const buttonSizeVariants = {
  large: {
    width: '160px',
    height: '48px',
    padding: '14px 12px',
  },
  medium: {
    width: '80px',
    height: '40px',
    padding: '10px 12px',
  },
};

export const Button = styled((props: DefaultButtonProps) => <Box as="button" {...props} />)<ButtonProps>(
  css({
    borderRadius: '4px',
  }),
  variant({
    prop: 'buttonSize',
    variants: buttonSizeVariants,
  }),
);
