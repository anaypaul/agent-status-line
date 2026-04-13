import type { ThemeDefinition } from '../../types.js';

// Catppuccin Latte - official light variant
export const catppuccinLightTheme: ThemeDefinition = {
  name: 'catppuccin-light',
  meta: { author: 'catppuccin', variant: 'light' },
  base: {
    bg: '#eff1f5',
    fg: '#4c4f69',
    separator_fg: '#9ca0b0',
  },
  segments: {
    'model': {
      normal: { fg: '#1e66f5', bg: '#e6e9ef' },
      warn: { fg: '#4c4f69', bg: '#df8e1d' },
      critical: { fg: '#ffffff', bg: '#d20f39' },
    },
    'context': {
      normal: { fg: '#40a02b', bg: '#e6e9ef' },
      warn: { fg: '#4c4f69', bg: '#df8e1d' },
      critical: { fg: '#ffffff', bg: '#d20f39' },
    },
    'rate-limit': {
      normal: { fg: '#40a02b', bg: '#e6e9ef' },
      warn: { fg: '#4c4f69', bg: '#df8e1d' },
      critical: { fg: '#ffffff', bg: '#d20f39' },
    },
    'cost': {
      normal: { fg: '#ea76cb', bg: '#e6e9ef' },
      warn: { fg: '#4c4f69', bg: '#df8e1d' },
      critical: { fg: '#ffffff', bg: '#d20f39' },
    },
    'git': {
      normal: { fg: '#40a02b', bg: '#e6e9ef' },
      warn: { fg: '#4c4f69', bg: '#df8e1d' },
      critical: { fg: '#ffffff', bg: '#d20f39' },
    },
    'session': {
      normal: { fg: '#179299', bg: '#e6e9ef' },
      warn: { fg: '#4c4f69', bg: '#df8e1d' },
      critical: { fg: '#ffffff', bg: '#d20f39' },
    },
    'directory': {
      normal: { fg: '#7287fd', bg: '#e6e9ef' },
      warn: { fg: '#4c4f69', bg: '#df8e1d' },
      critical: { fg: '#ffffff', bg: '#d20f39' },
    },
    'vim-mode': {
      normal: { fg: '#1e66f5', bg: '#e6e9ef' },
      warn: { fg: '#4c4f69', bg: '#df8e1d' },
      critical: { fg: '#ffffff', bg: '#d20f39' },
    },
    'agent-info': {
      normal: { fg: '#ea76cb', bg: '#e6e9ef' },
      warn: { fg: '#4c4f69', bg: '#df8e1d' },
      critical: { fg: '#ffffff', bg: '#d20f39' },
    },
  },
};
