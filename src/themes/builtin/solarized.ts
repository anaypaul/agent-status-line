import type { ThemeDefinition } from '../../types.js';

export const solarizedTheme: ThemeDefinition = {
  name: 'solarized',
  meta: { author: 'agent-status-line', variant: 'dark' },
  base: {
    bg: '#002b36',
    fg: '#839496',
    separator_fg: '#073642',
  },
  segments: {
    'model': {
      normal: { fg: '#268bd2', bg: '#073642' },
      warn: { fg: '#000000', bg: '#b58900' },
      critical: { fg: '#ffffff', bg: '#dc322f' },
    },
    'context': {
      normal: { fg: '#859900', bg: '#073642' },
      warn: { fg: '#000000', bg: '#b58900' },
      critical: { fg: '#ffffff', bg: '#dc322f' },
    },
    'rate-limit': {
      normal: { fg: '#859900', bg: '#073642' },
      warn: { fg: '#000000', bg: '#b58900' },
      critical: { fg: '#ffffff', bg: '#dc322f' },
    },
    'cost': {
      normal: { fg: '#6c71c4', bg: '#073642' },
      warn: { fg: '#000000', bg: '#b58900' },
      critical: { fg: '#ffffff', bg: '#dc322f' },
    },
    'git': {
      normal: { fg: '#859900', bg: '#073642' },
      warn: { fg: '#000000', bg: '#b58900' },
      critical: { fg: '#ffffff', bg: '#dc322f' },
    },
    'session': {
      normal: { fg: '#2aa198', bg: '#073642' },
      warn: { fg: '#000000', bg: '#b58900' },
      critical: { fg: '#ffffff', bg: '#dc322f' },
    },
    'directory': {
      normal: { fg: '#cb4b16', bg: '#073642' },
      warn: { fg: '#000000', bg: '#b58900' },
      critical: { fg: '#ffffff', bg: '#dc322f' },
    },
    'vim-mode': {
      normal: { fg: '#268bd2', bg: '#073642' },
      warn: { fg: '#000000', bg: '#b58900' },
      critical: { fg: '#ffffff', bg: '#dc322f' },
    },
    'agent-info': {
      normal: { fg: '#6c71c4', bg: '#073642' },
      warn: { fg: '#000000', bg: '#b58900' },
      critical: { fg: '#ffffff', bg: '#dc322f' },
    },
  },
};
