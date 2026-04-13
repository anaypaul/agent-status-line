import type { ThemeDefinition } from '../../types.js';

// Nord Light - Snow Storm palette
export const nordLightTheme: ThemeDefinition = {
  name: 'nord-light',
  meta: { author: 'arcticicestudio', variant: 'light' },
  base: {
    bg: '#eceff4',
    fg: '#2e3440',
    separator_fg: '#9da4b4',
  },
  segments: {
    'model': {
      normal: { fg: '#5e81ac', bg: '#e5e9f0' },
      warn: { fg: '#2e3440', bg: '#ebcb8b' },
      critical: { fg: '#ffffff', bg: '#bf616a' },
    },
    'context': {
      normal: { fg: '#a3be8c', bg: '#e5e9f0' },
      warn: { fg: '#2e3440', bg: '#ebcb8b' },
      critical: { fg: '#ffffff', bg: '#bf616a' },
    },
    'rate-limit': {
      normal: { fg: '#a3be8c', bg: '#e5e9f0' },
      warn: { fg: '#2e3440', bg: '#ebcb8b' },
      critical: { fg: '#ffffff', bg: '#bf616a' },
    },
    'cost': {
      normal: { fg: '#b48ead', bg: '#e5e9f0' },
      warn: { fg: '#2e3440', bg: '#ebcb8b' },
      critical: { fg: '#ffffff', bg: '#bf616a' },
    },
    'git': {
      normal: { fg: '#a3be8c', bg: '#e5e9f0' },
      warn: { fg: '#2e3440', bg: '#ebcb8b' },
      critical: { fg: '#ffffff', bg: '#bf616a' },
    },
    'session': {
      normal: { fg: '#8fbcbb', bg: '#e5e9f0' },
      warn: { fg: '#2e3440', bg: '#ebcb8b' },
      critical: { fg: '#ffffff', bg: '#bf616a' },
    },
    'directory': {
      normal: { fg: '#5e81ac', bg: '#e5e9f0' },
      warn: { fg: '#2e3440', bg: '#ebcb8b' },
      critical: { fg: '#ffffff', bg: '#bf616a' },
    },
    'vim-mode': {
      normal: { fg: '#5e81ac', bg: '#e5e9f0' },
      warn: { fg: '#2e3440', bg: '#ebcb8b' },
      critical: { fg: '#ffffff', bg: '#bf616a' },
    },
    'agent-info': {
      normal: { fg: '#b48ead', bg: '#e5e9f0' },
      warn: { fg: '#2e3440', bg: '#ebcb8b' },
      critical: { fg: '#ffffff', bg: '#bf616a' },
    },
  },
};
