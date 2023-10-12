import { tabsAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const helpers = createMultiStyleConfigHelpers(tabsAnatomy.keys);

const baseStyle = helpers.definePartsStyle({
  tab: {
    textStyle: 't2',
    fontWeight: 'regular',
    py: '16px',
    textAlign: 'center',
    borderWidth: 0,
    _selected: {
      fontWeight: 'bold',
      borderBottom: '1px solid',
      borderBottomColor: 'gray800',
    },
  },
});

const tabsTheme = helpers.defineMultiStyleConfig({ baseStyle });

export default tabsTheme;
