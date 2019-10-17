import { makeStyles } from '@material-ui/styles';
import React from 'react';

import { fontSize, fontWeight } from '../utils/styles/sizes';
import colors from '../utils/styles/colors';

// reset styles based on https://gist.github.com/DavidWells/18e73022e723037a50d6
const resetStyles = makeStyles(() => ({
  '@global': {
    '*, *:before, *:after': {
      boxSizing: 'inherit',
    },
    'html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video': {
      margin: '0',
      padding: '0',
      border: '0',
      fontSize: '100%',
      font: 'inherit',
      verticalAlign: 'baseline',
    },
    'article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section': {
      display: 'block',
    },
    'html, body': {
      height: '100%;',
    },
    html: {
      boxSizing: 'border-box',
    },
    body: {
      lineHeight: 1,
      fontSize: fontSize.base,
      color: colors.eclipse,
      fontFamily:
        // eslint-disable-next-line max-len
        '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    },
    'ol, ul': {
      listStyle: 'none',
    },
    'blockquote, q': {
      quotes: 'none',
      '&:before, &:after': {
        content: 'none',
      },
    },
    table: {
      borderCollapse: 'collapse',
      borderSpacing: 0,
    },
    a: {
      textDecoration: 'none',
    },
    strong: {
      fontWeight: fontWeight.semiBold,
    },
    '#root': {
      height: '100%',
    },
  },
}));

const ResetStyles: React.FC = ({ children }) => {
  resetStyles();
  return <>{children}</>;
};

export default ResetStyles;
