import type { ThemeDefinition } from '../../types.js';

export const catppuccinTheme: ThemeDefinition = {
  name: 'catppuccin',
  meta: { author: 'agent-status-line', variant: 'dark' },
  base: {
    bg: '#1e1e2e',
    fg: '#cdd6f4',
    separator_fg: '#45475a',
  },
  segments: {
    'model': {
      normal: { fg: '#89b4fa', bg: '#313244' },
      warn: { fg: '#000000', bg: '#f9e2af' },
      critical: { fg: '#ffffff', bg: '#f38ba8' },
    },
    'context': {
      normal: { fg: '#a6e3a1', bg: '#313244' },
      warn: { fg: '#000000', bg: '#f9e2af' },
      critical: { fg: '#ffffff', bg: '#f38ba8' },
    },
    'rate-limit': {
      normal: { fg: '#94e2d5', bg: '#313244' },
      warn: { fg: '#000000', bg: '#fab387' },
      critical: { fg: '#ffffff', bg: '#f38ba8' },
    },
    'cost': {
      normal: { fg: '#f5c2e7', bg: '#313244' },
      warn: { fg: '#000000', bg: '#f9e2af' },
      critical: { fg: '#ffffff', bg: '#f38ba8' },
    },
    'git': {
      normal: { fg: '#a6e3a1', bg: '#313244' },
      warn: { fg: '#000000', bg: '#f9e2af' },
      critical: { fg: '#ffffff', bg: '#f38ba8' },
    },
    'session': {
      normal: { fg: '#94e2d5', bg: '#313244' },
      warn: { fg: '#000000', bg: '#f9e2af' },
      critical: { fg: '#ffffff', bg: '#f38ba8' },
    },
    'directory': {
      normal: { fg: '#b4befe', bg: '#313244' },
      warn: { fg: '#000000', bg: '#f9e2af' },
      critical: { fg: '#ffffff', bg: '#f38ba8' },
    },
    'vim-mode': {
      normal: { fg: '#cba6f7', bg: '#313244' },
      warn: { fg: '#000000', bg: '#f9e2af' },
      critical: { fg: '#ffffff', bg: '#f38ba8' },
    },
    'agent-info': {
      normal: { fg: '#f5c2e7', bg: '#313244' },
      warn: { fg: '#000000', bg: '#fab387' },
      critical: { fg: '#ffffff', bg: '#f38ba8' },
    },
  },
};
