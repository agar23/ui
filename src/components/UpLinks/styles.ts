import styled from '@emotion/styled';

import Text from '../../muiComponents/Text';
import { default as MuiListItemText } from '../../muiComponents/ListItemText';
import { Theme } from '../../design-tokens/theme';

export const StyledText = styled(Text)<{ theme?: Theme }>(props => ({
  fontWeight: props.theme && props.theme.fontWeight.bold,
}));

export const Spacer = styled('div')({
  flex: '1 1 auto',
  borderBottom: '1px dotted rgba(0, 0, 0, 0.2)',
  whiteSpace: 'nowrap',
  height: '0.5em',
});

export const ListItemText = styled(MuiListItemText)({
  flex: 'none',
  color: 'black',
  opacity: 0.6,
});
