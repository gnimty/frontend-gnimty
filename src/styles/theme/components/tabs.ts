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
  root: {
    borderRadius: '8px',
    boxShadow: '0px 4px 6px 0px rgb(17 17 17 / .1)',
  },
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

  tabpanels: {
    bg: 'white',
    borderBottomRadius: '8px',
  },
});

const tabsTheme = helpers.defineMultiStyleConfig({
  variants: {
    tab: tabVariant,
    mainSearch: mainSearchTabVariant,
  },
  defaultProps: {
    variant: 'tab',
  },
});

export default tabsTheme;
