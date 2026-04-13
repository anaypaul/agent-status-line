import type { ThemeDefinition } from '../../types.js';

// Monokai Light variant
export const monokaiLightTheme: ThemeDefinition = {
  name: 'monokai-light',
  meta: { author: 'monokai', variant: 'light' },
  base: {
    bg: '#fafafa',
    fg: '#2c292d',
    separator_fg: '#9e9aa0',
  },
  segments: {
    'model': {
      normal: { fg: '#6796e6', bg: '#f0f0f0' },
      warn: { fg: '#2c292d', bg: '#e5b567' },
      critical: { fg: '#ffffff', bg: '#b4261a' },
    },
    'context': {
      normal: { fg: '#23974a', bg: '#f0f0f0' },
      warn: { fg: '#2c292d', bg: '#e5b567' },
      critical: { fg: '#ffffff', bg: '#b4261a' },
    },
    'rate-limit': {
      normal: { fg: '#23974a', bg: '#f0f0f0' },
      warn: { fg: '#2c292d', bg: '#e5b567' },
      critical: { fg: '#ffffff', bg: '#b4261a' },
    },
    'cost': {
      normal: { fg: '#d73bd5', bg: '#f0f0f0' },
      warn: { fg: '#2c292d', bg: '#e5b567' },
      critical: { fg: '#ffffff', bg: '#b4261a' },
    },
    'git': {
      normal: { fg: '#23974a', bg: '#f0f0f0' },
      warn: { fg: '#2c292d', bg: '#e5b567' },
      critical: { fg: '#ffffff', bg: '#b4261a' },
    },
    'session': {
      normal: { fg: '#3a94c5', bg: '#f0f0f0' },
      warn: { fg: '#2c292d', bg: '#e5b567' },
      critical: { fg: '#ffffff', bg: '#b4261a' },
    },
    'directory': {
      normal: { fg: '#6796e6', bg: '#f0f0f0' },
      warn: { fg: '#2c292d', bg: '#e5b567' },
      critical: { fg: '#ffffff', bg: '#b4261a' },
    },
    'vim-mode': {
      normal: { fg: '#6796e6', bg: '#f0f0f0' },
      warn: { fg: '#2c292d', bg: '#e5b567' },
      critical: { fg: '#ffffff', bg: '#b4261a' },
    },
    'agent-info': {
      normal: { fg: '#d73bd5', bg: '#f0f0f0' },
      warn: { fg: '#2c292d', bg: '#e5b567' },
      critical: { fg: '#ffffff', bg: '#b4261a' },
    },
  },
};
