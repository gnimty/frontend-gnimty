import { tabsAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const helpers = createMultiStyleConfigHelpers(tabsAnatomy.keys);

const baseStyle = helpers.definePartsStyle({
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

const tabsTheme = helpers.defineMultiStyleConfig({ baseStyle });

export default tabsTheme;
