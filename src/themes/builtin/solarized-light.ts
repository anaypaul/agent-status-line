import type { ThemeDefinition } from '../../types.js';

// Solarized Light - Ethan Schoonover's official light palette
export const solarizedLightTheme: ThemeDefinition = {
  name: 'solarized-light',
  meta: { author: 'ethanschoonover', variant: 'light' },
  base: {
    bg: '#fdf6e3',
    fg: '#657b83',
    separator_fg: '#93a1a1',
  },
  segments: {
    'model': {
      normal: { fg: '#268bd2', bg: '#eee8d5' },
      warn: { fg: '#073642', bg: '#b58900' },
      critical: { fg: '#ffffff', bg: '#dc322f' },
    },
    'context': {
      normal: { fg: '#859900', bg: '#eee8d5' },
      warn: { fg: '#073642', bg: '#b58900' },
      critical: { fg: '#ffffff', bg: '#dc322f' },
    },
    'rate-limit': {
      normal: { fg: '#859900', bg: '#eee8d5' },
      warn: { fg: '#073642', bg: '#b58900' },
      critical: { fg: '#ffffff', bg: '#dc322f' },
    },
    'cost': {
      normal: { fg: '#d33682', bg: '#eee8d5' },
      warn: { fg: '#073642', bg: '#b58900' },
      critical: { fg: '#ffffff', bg: '#dc322f' },
    },
    'git': {
      normal: { fg: '#859900', bg: '#eee8d5' },
      warn: { fg: '#073642', bg: '#b58900' },
      critical: { fg: '#ffffff', bg: '#dc322f' },
    },
    'session': {
      normal: { fg: '#2aa198', bg: '#eee8d5' },
      warn: { fg: '#073642', bg: '#b58900' },
      critical: { fg: '#ffffff', bg: '#dc322f' },
    },
    'directory': {
      normal: { fg: '#268bd2', bg: '#eee8d5' },
      warn: { fg: '#073642', bg: '#b58900' },
      critical: { fg: '#ffffff', bg: '#dc322f' },
    },
    'vim-mode': {
      normal: { fg: '#268bd2', bg: '#eee8d5' },
      warn: { fg: '#073642', bg: '#b58900' },
      critical: { fg: '#ffffff', bg: '#dc322f' },
    },
    'agent-info': {
      normal: { fg: '#d33682', bg: '#eee8d5' },
      warn: { fg: '#073642', bg: '#b58900' },
      critical: { fg: '#ffffff', bg: '#dc322f' },
    },
  },
};
