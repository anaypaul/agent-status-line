import type { ThemeDefinition } from '../../types.js';

export const gruvboxTheme: ThemeDefinition = {
  name: 'gruvbox',
  meta: { author: 'agent-status-line', variant: 'dark' },
  base: {
    bg: '#282828',
    fg: '#ebdbb2',
    separator_fg: '#3c3836',
  },
  segments: {
    'model': {
      normal: { fg: '#83a598', bg: '#3c3836' },
      warn: { fg: '#000000', bg: '#fabd2f' },
      critical: { fg: '#ffffff', bg: '#fb4934' },
    },
    'context': {
      normal: { fg: '#b8bb26', bg: '#3c3836' },
      warn: { fg: '#000000', bg: '#fabd2f' },
      critical: { fg: '#ffffff', bg: '#fb4934' },
    },
    'rate-limit': {
      normal: { fg: '#b8bb26', bg: '#3c3836' },
      warn: { fg: '#000000', bg: '#fabd2f' },
      critical: { fg: '#ffffff', bg: '#fb4934' },
    },
    'cost': {
      normal: { fg: '#d3869b', bg: '#3c3836' },
      warn: { fg: '#000000', bg: '#fabd2f' },
      critical: { fg: '#ffffff', bg: '#fb4934' },
    },
    'git': {
      normal: { fg: '#b8bb26', bg: '#3c3836' },
      warn: { fg: '#000000', bg: '#fabd2f' },
      critical: { fg: '#ffffff', bg: '#fb4934' },
    },
    'session': {
      normal: { fg: '#8ec07c', bg: '#3c3836' },
      warn: { fg: '#000000', bg: '#fabd2f' },
      critical: { fg: '#ffffff', bg: '#fb4934' },
    },
    'directory': {
      normal: { fg: '#fe8019', bg: '#3c3836' },
      warn: { fg: '#000000', bg: '#fabd2f' },
      critical: { fg: '#ffffff', bg: '#fb4934' },
    },
    'vim-mode': {
      normal: { fg: '#83a598', bg: '#3c3836' },
      warn: { fg: '#000000', bg: '#fabd2f' },
      critical: { fg: '#ffffff', bg: '#fb4934' },
    },
    'agent-info': {
      normal: { fg: '#d3869b', bg: '#3c3836' },
      warn: { fg: '#000000', bg: '#fabd2f' },
      critical: { fg: '#ffffff', bg: '#fb4934' },
    },
  },
};
