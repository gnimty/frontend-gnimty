import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import { cssVar, defineStyle } from '@chakra-ui/react';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';
import { runIfFn } from '@chakra-ui/utils';

const helpers = createMultiStyleConfigHelpers(parts.keys);

const $bg = cssVar('modal-bg');
const $shadow = cssVar('modal-shadow');

const baseStyleOverlay = defineStyle({
  bg: 'dim60',
  zIndex: 'modal',
});

const baseStyleDialogContainer = defineStyle((props) => {
  const { isCentered, scrollBehavior } = props;

  return {
    display: 'flex',
    zIndex: 'modal',
    justifyContent: 'center',
    alignItems: isCentered ? 'center' : 'flex-start',
    overflow: scrollBehavior === 'inside' ? 'hidden' : 'auto',
    overscrollBehaviorY: 'none',
  };
});

const baseStyleDialog = defineStyle((props) => {
  const { isCentered, scrollBehavior } = props;

  return {
    borderRadius: '8px',
    color: 'inherit',
    my: isCentered ? 'auto' : '16',
    mx: isCentered ? 'auto' : undefined,
    zIndex: 'modal',
    maxH: scrollBehavior === 'inside' ? 'calc(100% - 7.5rem)' : undefined,
    bg: $bg.reference,
    boxShadow: $shadow.reference,
  };
});

const baseStyleHeader = defineStyle({
  px: '20px',
  py: '16px',
});

const baseStyleCloseButton = defineStyle({
  position: 'absolute',
  top: '16px',
  insetEnd: '20px',
  width: '32px',
  height: '32px',
  '> svg': {
    width: '16px',
    height: '16px',
  },
});

const baseStyleBody = defineStyle((props) => {
  const { scrollBehavior } = props;
  return {
    px: '40px',
    flex: '1',
    overflow: scrollBehavior === 'inside' ? 'auto' : undefined,
  };
});

const baseStyleFooter = defineStyle({});

const baseStyle = helpers.definePartsStyle((props) => ({
  overlay: baseStyleOverlay,
  dialogContainer: runIfFn(baseStyleDialogContainer, props),
  dialog: runIfFn(baseStyleDialog, props),
  header: baseStyleHeader,
  closeButton: baseStyleCloseButton,
  body: runIfFn(baseStyleBody, props),
  footer: baseStyleFooter,
}));

const modalTheme = helpers.defineMultiStyleConfig({
  baseStyle,
});

export default modalTheme;
