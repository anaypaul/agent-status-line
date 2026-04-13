import type { ThemeDefinition } from '../../types.js';

// Gruvbox Light - official light palette
export const gruvboxLightTheme: ThemeDefinition = {
  name: 'gruvbox-light',
  meta: { author: 'morhetz', variant: 'light' },
  base: {
    bg: '#fbf1c7',
    fg: '#3c3836',
    separator_fg: '#a89984',
  },
  segments: {
    'model': {
      normal: { fg: '#076678', bg: '#ebdbb2' },
      warn: { fg: '#3c3836', bg: '#d79921' },
      critical: { fg: '#ffffff', bg: '#cc241d' },
    },
    'context': {
      normal: { fg: '#79740e', bg: '#ebdbb2' },
      warn: { fg: '#3c3836', bg: '#d79921' },
      critical: { fg: '#ffffff', bg: '#cc241d' },
    },
    'rate-limit': {
      normal: { fg: '#79740e', bg: '#ebdbb2' },
      warn: { fg: '#3c3836', bg: '#d79921' },
      critical: { fg: '#ffffff', bg: '#cc241d' },
    },
    'cost': {
      normal: { fg: '#b16286', bg: '#ebdbb2' },
      warn: { fg: '#3c3836', bg: '#d79921' },
      critical: { fg: '#ffffff', bg: '#cc241d' },
    },
    'git': {
      normal: { fg: '#79740e', bg: '#ebdbb2' },
      warn: { fg: '#3c3836', bg: '#d79921' },
      critical: { fg: '#ffffff', bg: '#cc241d' },
    },
    'session': {
      normal: { fg: '#427b58', bg: '#ebdbb2' },
      warn: { fg: '#3c3836', bg: '#d79921' },
      critical: { fg: '#ffffff', bg: '#cc241d' },
    },
    'directory': {
      normal: { fg: '#076678', bg: '#ebdbb2' },
      warn: { fg: '#3c3836', bg: '#d79921' },
      critical: { fg: '#ffffff', bg: '#cc241d' },
    },
    'vim-mode': {
      normal: { fg: '#076678', bg: '#ebdbb2' },
      warn: { fg: '#3c3836', bg: '#d79921' },
      critical: { fg: '#ffffff', bg: '#cc241d' },
    },
    'agent-info': {
      normal: { fg: '#b16286', bg: '#ebdbb2' },
      warn: { fg: '#3c3836', bg: '#d79921' },
      critical: { fg: '#ffffff', bg: '#cc241d' },
    },
  },
};
