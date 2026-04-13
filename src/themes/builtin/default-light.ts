import type { ThemeDefinition } from '../../types.js';

// Catppuccin Latte palette (official light variant)
export const defaultLightTheme: ThemeDefinition = {
  name: 'default-light',
  meta: { author: 'agent-status-line', variant: 'light' },
  base: {
    bg: '#eff1f5',
    fg: '#4c4f69',
    separator_fg: '#9ca0b0',
  },
  segments: {
    'model': {
      normal: { fg: '#1e66f5', bg: '#dce0e8' },
      warn: { fg: '#4c4f69', bg: '#df8e1d' },
      critical: { fg: '#ffffff', bg: '#d20f39' },
    },
    'context': {
      normal: { fg: '#40a02b', bg: '#dce0e8' },
      warn: { fg: '#4c4f69', bg: '#df8e1d' },
      critical: { fg: '#ffffff', bg: '#d20f39' },
    },
    'rate-limit': {
      normal: { fg: '#40a02b', bg: '#dce0e8' },
      warn: { fg: '#4c4f69', bg: '#df8e1d' },
      critical: { fg: '#ffffff', bg: '#d20f39' },
    },
    'cost': {
      normal: { fg: '#ea76cb', bg: '#dce0e8' },
      warn: { fg: '#4c4f69', bg: '#df8e1d' },
      critical: { fg: '#ffffff', bg: '#d20f39' },
    },
    'git': {
      normal: { fg: '#40a02b', bg: '#dce0e8' },
      warn: { fg: '#4c4f69', bg: '#df8e1d' },
      critical: { fg: '#ffffff', bg: '#d20f39' },
    },
    'session': {
      normal: { fg: '#179299', bg: '#dce0e8' },
      warn: { fg: '#4c4f69', bg: '#df8e1d' },
      critical: { fg: '#ffffff', bg: '#d20f39' },
    },
    'directory': {
      normal: { fg: '#7287fd', bg: '#dce0e8' },
      warn: { fg: '#4c4f69', bg: '#df8e1d' },
      critical: { fg: '#ffffff', bg: '#d20f39' },
    },
    'vim-mode': {
      normal: { fg: '#1e66f5', bg: '#dce0e8' },
      warn: { fg: '#4c4f69', bg: '#df8e1d' },
      critical: { fg: '#ffffff', bg: '#d20f39' },
    },
    'agent-info': {
      normal: { fg: '#ea76cb', bg: '#dce0e8' },
      warn: { fg: '#4c4f69', bg: '#df8e1d' },
      critical: { fg: '#ffffff', bg: '#d20f39' },
    },
  },
};
