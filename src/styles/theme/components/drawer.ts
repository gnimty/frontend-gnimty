import { drawerAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, cssVar, defineStyle } from '@chakra-ui/styled-system';
import { runIfFn } from '@chakra-ui/utils';

const helpers = createMultiStyleConfigHelpers(parts.keys);

const $bg = cssVar('drawer-bg');
const $bs = cssVar('drawer-box-shadow');

function getSize(value: string) {
  if (value === 'full') {
    return helpers.definePartsStyle({
      dialog: { maxW: '100vw', h: '100vh' },
    });
  }
  return helpers.definePartsStyle({
    dialog: { maxW: value },
  });
}

const baseStyleOverlay = defineStyle({
  bg: 'dim60',
  zIndex: 'modal',
});

const baseStyleDialogContainer = defineStyle({
  display: 'flex',
  zIndex: 'modal',
  justifyContent: 'center',
});

const baseStyleDialog = defineStyle((props) => {
  const { isFullHeight } = props;

  return {
    ...(isFullHeight && { height: '100vh' }),
    zIndex: 'modal',
    maxH: '100vh',
    color: 'inherit',
    [$bg.variable]: 'colors.white',
    [$bs.variable]: 'shadows.lg',
    _dark: {
      [$bg.variable]: 'colors.gray.700',
      [$bs.variable]: 'shadows.dark-lg',
    },
    bg: $bg.reference,
    boxShadow: $bs.reference,
  };
});

const baseStyleHeader = defineStyle({
  px: '20px',
  py: '16px',
  textStyle: 't1',
  fontWeight: 700,
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

const baseStyleBody = defineStyle({
  px: '6',
  py: '2',
  flex: '1',
  overflow: 'auto',
});

const baseStyleFooter = defineStyle({
  px: '6',
  py: '4',
});

const baseStyle = helpers.definePartsStyle((props) => ({
  overlay: baseStyleOverlay,
  dialogContainer: baseStyleDialogContainer,
  dialog: runIfFn(baseStyleDialog, props),
  header: baseStyleHeader,
  closeButton: baseStyleCloseButton,
  body: baseStyleBody,
  footer: baseStyleFooter,
}));

const sizes = {
  xs: getSize('xs'),
  sm: getSize('md'),
  md: getSize('lg'),
  lg: getSize('2xl'),
  xl: getSize('4xl'),
  full: getSize('full'),
};

const drawerTheme = helpers.defineMultiStyleConfig({
  baseStyle,
  sizes,
  defaultProps: {
    size: 'xs',
  },
});

export default drawerTheme;
