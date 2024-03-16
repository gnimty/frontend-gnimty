import { tabsAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const helpers = createMultiStyleConfigHelpers(tabsAnatomy.keys);

const tabVariant = helpers.definePartsStyle({
  tab: {
    textStyle: 't2',
    fontWeight: 'regular',
    color: 'gray700',
    py: '16px',
    textAlign: 'center',
    borderWidth: 0,
    _selected: {
      fontWeight: 'bold',
      color: 'gray800',
      boxShadow: 'inset 0 -1px 0 0',
    },
  },
});

const mainSearchTabVariant = helpers.definePartsStyle({
  tab: {
    bg: 'gray200',
    p: '12px 20px',
    textStyle: 't2',
    fontWeight: 'bold',
    color: 'gray500',
    borderBottom: '1px solid',
    borderColor: 'gray200',
    '&:first-of-type': {
      borderTopLeftRadius: '8px',
    },
    '&:last-of-type': {
      borderTopRightRadius: '8px',
    },
    _selected: {
      bg: 'white',
      color: 'gray800',
    },
  },
});

const multipleTabVariant = helpers.definePartsStyle({
  root: {
    bg: 'white',
    borderTopRadius: '4px',
    display: 'flex',
    flexDir: 'column',
    gap: '24px',
  },
  tablist: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    w: '312px',
    h: '40px',
    border: '1px solid',
    borderColor: 'gray200',
    borderTopRadius: '4px',
  },
  tab: {
    borderWidth: '0 1px 0 0',
    borderStyle: 'solid',
    borderColor: 'gray200',
    '&:first-of-type': {
      borderTopLeftRadius: '4px',
    },
    '&:last-of-type': {
      borderTopRightRadius: '4px',
      borderRightWidth: 0,
    },
    _selected: {
      bg: 'red',
    },
    '> svg': {
      display: 'block',
    },
  },
  tabpanels: {
    padding: '0 16px 24px 16px',
  },
});

const tabsTheme = helpers.defineMultiStyleConfig({
  variants: {
    tab: tabVariant,
    mainSearch: mainSearchTabVariant,
    multipleTab: multipleTabVariant,
  },
  defaultProps: {
    variant: 'tab',
  },
});

export default tabsTheme;
